/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ISpaceMap,
  ILinkWithPos,
  IAnnotationPosition,
  IAnnotation,
  ILink,
} from './interfaces';
import {notNullOrUndefined, attributeId} from './utils';

export const fontWidth = 6;

export interface SpacedText {
  spacedText: string;
  charMoveMap: Map<number, number>;
  annotationPositions: IAnnotationPosition[];
  textNodeWidth: number;
}

/**
 *
 * Given
 *  - a text pack (with links, annotations)
 *  - selected legend ids (to know which annotation and link are effecting),
 *  - selected attribute ids (to know what link label are effecting) and lines to be collapsed
 *
 * calculate
 *  - new text that inserted empty space and new lines
 *  - a map of [annotation original end position] to number of character to insert after
 *    - used to restore the original position when new annotation is added to new text
 *  - every annotation's new position
 *  - dimension of the text node
 *
 * the calculation has two steps, first it find and insert empty space, then based on
 * the result, decide how many new line to insert between each line.
 *
 */
export function spaceOutText(
  annotations: IAnnotation[],
  text: string,
  links: ILink[],
  selectedLegendIds: string[],
  selectedLegendAttributeIds: string[],
  collapsedLinesIndex: number[]
): SpacedText {
  const existSpaceEl = document.getElementById('text-spacer');
  if (existSpaceEl) {
    existSpaceEl.remove();
  }

  const root = document.getElementById('root') as HTMLElement;
  const textNodeEl = document.createElement('div');
  const scrollbarWidth = getScrollbarWidth();
  const otherWidth = 250 * 2 + 16 * 2 + scrollbarWidth; // two side panel + 2 padding

  textNodeEl.id = 'text-spacer';
  textNodeEl.style.width = `calc(100% - ${otherWidth}px)`;
  textNodeEl.style.minWidth = '350px';
  textNodeEl.style.margin = '50px auto';
  textNodeEl.style.whiteSpace = 'pre-wrap';
  textNodeEl.style.lineHeight = '20px';
  textNodeEl.style.border = '1px solid red';
  textNodeEl.style.position = 'fixed';
  textNodeEl.style.left = '-9999px';
  textNodeEl.textContent = text;

  root.appendChild(textNodeEl);

  // // START: debugging text view
  // textNodeEl.style.top = '0';
  // textNodeEl.style.left = '0';
  // textNodeEl.style.background = 'white';
  // textNodeEl.style.zIndex = '100';

  // const dom = document.createElement('div');
  // textNodeEl.appendChild(dom);
  // dom.style.whiteSpace = 'pre-wrap';
  // // END: debugging text view

  const textNode = textNodeEl && (textNodeEl.childNodes[0] as HTMLElement);

  const textAreaRect = textNodeEl.getBoundingClientRect();

  const textAreaDimensionWithEmptySpace = {
    width: textAreaRect.width,
    height: textAreaRect.height,
  };

  // add invisibleAnnotations for each words,
  // so that long annotation can be broken down
  const invisibleAnnotations: any[] = [];
  let currPosition = -1;
  text.split(/\s/).forEach((text, i) => {
    invisibleAnnotations.push({
      span: {begin: currPosition + 1, end: currPosition + 1 + text.length},
      id: 'i-' + i,
      legendId: 'invisible',
      attributes: {},
    });
    currPosition = currPosition + 1 + text.length;
  });

  annotations = annotations.concat(invisibleAnnotations);

  const annotationsPos = annotations.map(anno => {
    const range = document.createRange();

    range.setStart(textNode, anno.span.begin);
    range.setEnd(textNode, anno.span.end);
    const rects = Array.from(range.getClientRects() as DOMRectList);

    return {
      rects: rects.map(rect => ({
        x: rect.x - textAreaRect.left,
        y: rect.y - textAreaRect.top,
        width: rect.width,
        height: rect.height,
      })),
    };
  });

  const annotationsWithPos = mergeAnnotationWithPosition(
    annotationsPos,
    annotations
  ).filter(
    ann =>
      ann.annotation.legendId === 'invisible' ||
      selectedLegendIds.indexOf(ann.annotation.legendId) > -1
  );

  const linksWithPos = mergeLinkWithPosition(links, annotationsWithPos).filter(
    link => selectedLegendIds.indexOf(link.link.legendId) > -1
  );

  const spaceMap: ISpaceMap = calculateSpaceMap(
    annotationsWithPos,
    linksWithPos,
    selectedLegendAttributeIds
  );

  const [
    calculatedSpacedTextWithEmptySpace,
    calculatedSpacedAnnotationSpanWithEmptySpace,
  ] = calculateNewText(annotations, text, spaceMap, ' ');

  textNodeEl.textContent = calculatedSpacedTextWithEmptySpace;

  const textAreaRectWithEmptySpace = textNodeEl.getBoundingClientRect();
  const textNodeWithEmptySpace =
    textNodeEl && (textNodeEl.childNodes[0] as HTMLElement);

  const annotationsPosWithEmptySpaces = annotations.map(anno => {
    const range = document.createRange();

    range.setStart(
      textNodeWithEmptySpace,
      calculatedSpacedAnnotationSpanWithEmptySpace[anno.id].begin
    );
    range.setEnd(
      textNodeWithEmptySpace,
      calculatedSpacedAnnotationSpanWithEmptySpace[anno.id].end
    );
    const rects = Array.from(range.getClientRects() as DOMRectList);

    return {
      rects: rects.map(rect => ({
        x: rect.x - textAreaRectWithEmptySpace.left,
        y: rect.y - textAreaRectWithEmptySpace.top,
        width: rect.width,
        height: rect.height,
      })),
    };
  });

  const annotationsWithPosWithEmptySpaces = mergeAnnotationWithPosition(
    annotationsPosWithEmptySpaces,
    annotations
  ).filter(
    ann =>
      ann.annotation.legendId === 'invisible' ||
      selectedLegendIds.indexOf(ann.annotation.legendId) > -1
  );

  const linksWithPosWithEmptySpaces = mergeLinkWithPosition(
    links,
    annotationsWithPosWithEmptySpaces
  ).filter(link => selectedLegendIds.indexOf(link.link.legendId) > -1);

  const lineStartXWithEmptySpace = 0; //textAreaDimensionWithEmptySpace.x;
  const lineWidthWithEmptySpace = textAreaDimensionWithEmptySpace.width;

  const linesLevelsWithNewline = {
    ...getLevelsFromJustAnnotations(annotationsWithPosWithEmptySpaces),
    ...calculateLinesLevels(
      linksWithPosWithEmptySpaces,
      lineStartXWithEmptySpace,
      lineWidthWithEmptySpace
    ),
  };

  const spaceMapWithNewline: ISpaceMap = {};

  Object.keys(linesLevelsWithNewline).forEach((lineHeight, i) => {
    const levelNum = linesLevelsWithNewline[lineHeight].length;
    const annotationsAtCurrLine = getAnnotationsByLine(
      annotationsWithPosWithEmptySpaces,
      +lineHeight
    );

    const firstAnnotation = annotationsAtCurrLine[0];
    const fullOfInvisible = annotationsAtCurrLine.every(
      ann => ann.annotation.legendId === 'invisible'
    );

    spaceMapWithNewline[firstAnnotation.annotation.id] = {
      annotationWithPos: {
        position: firstAnnotation.position,
        annotation: {
          ...firstAnnotation.annotation,
          span: {
            begin:
              calculatedSpacedAnnotationSpanWithEmptySpace[
                firstAnnotation.annotation.id
              ].begin,
            end:
              calculatedSpacedAnnotationSpanWithEmptySpace[
                firstAnnotation.annotation.id
              ].end,
          },
        },
      },
      spaceToMove: fullOfInvisible
        ? 0
        : calculateLinesToInsertByLevelNum(collapsedLinesIndex, i, levelNum),
    };
  });

  const updatedTextPackWithNewline = {
    text: calculatedSpacedTextWithEmptySpace,
    annotations: annotations.map(ann => {
      return {
        ...ann,
        span: {
          begin: calculatedSpacedAnnotationSpanWithEmptySpace[ann.id].begin,
          end: calculatedSpacedAnnotationSpanWithEmptySpace[ann.id].end,
        },
      };
    }),
  };

  const [textWithNewLine, annotationSpanMap] = calculateNewText(
    updatedTextPackWithNewline.annotations,
    updatedTextPackWithNewline.text,
    spaceMapWithNewline,
    '\n',
    'before'
  );

  textNodeEl.textContent = textWithNewLine;

  const textNodeWithNewline =
    textNodeEl && (textNodeEl.childNodes[0] as HTMLElement);
  const textAreaRectWithNewLine = textNodeEl.getBoundingClientRect() as DOMRect;
  const lineWidthWithNewLine = textAreaRectWithNewLine.width;

  const annotationPositionsWithNewLine = annotations
    .filter(a => a.legendId !== 'invisible')
    .map(anno => {
      const range = document.createRange();

      range.setStart(textNodeWithNewline, annotationSpanMap[anno.id].begin);
      range.setEnd(textNodeWithNewline, annotationSpanMap[anno.id].end);

      let rects = Array.from(range.getClientRects() as DOMRectList);

      if (rects.length > 1) {
        rects = rects.filter(rect => rect.width > 5);
      }

      return {
        rects: rects.map(rect => ({
          x: rect.x - textAreaRectWithNewLine.left,
          y: rect.y - textAreaRectWithNewLine.top,
          width: rect.width,
          height: rect.height,
        })),
      };
    });

  const charMoveMap = new Map<number, number>();
  Object.keys(spaceMap).forEach(annId => {
    const annotation = annotations.find(ann => ann.id === annId);
    if (annotation) {
      charMoveMap.set(annotation.span.end, spaceMap[annId].spaceToMove);
    }
  });

  Object.keys(spaceMapWithNewline).forEach(annId => {
    const annotation = annotations.find(ann => ann.id === annId);
    if (annotation) {
      charMoveMap.set(
        annotation.span.begin - 1,
        spaceMapWithNewline[annId].spaceToMove +
          (charMoveMap.get(annotation.span.begin - 1) || 0)
      );
    }
  });

  return {
    spacedText: textWithNewLine,
    charMoveMap,
    annotationPositions: annotationPositionsWithNewLine,
    textNodeWidth: lineWidthWithNewLine,
  };
}

/**
 *
 * merge annotation data with its position in the text.
 *
 * so it's easy to access both data
 *
 */
export function mergeAnnotationWithPosition(
  annotationPositions: IAnnotationPosition[],
  annotations: IAnnotation[]
) {
  return (annotationPositions || []).map((position, i) => {
    return {
      position,
      annotation: annotations[i],
    };
  });
}

/**
 *
 * merge link data with the corresponding annotation
 * data and their position, also calculate the link's
 * position based on their corresponding annotation
 *
 * so it's easy to access both data
 *
 */
export function mergeLinkWithPosition(
  links: ILink[],
  annotationWithPosition: {
    position: IAnnotationPosition;
    annotation: IAnnotation;
  }[]
) {
  return links
    .map(link => {
      const fromEntryWithPosition = annotationWithPosition.find(
        ann => ann.annotation.id === link.fromEntryId
      );
      const toEntryWithPosition = annotationWithPosition.find(
        ann => ann.annotation.id === link.toEntryId
      );
      if (fromEntryWithPosition && toEntryWithPosition) {
        const fromEntryX = fromEntryWithPosition.position.rects[0].x;
        const fromEntryY = fromEntryWithPosition.position.rects[0].y;
        const fromEntryWidth = fromEntryWithPosition.position.rects[0].width;
        const toEntryX = toEntryWithPosition.position.rects[0].x;
        const toEntryY = toEntryWithPosition.position.rects[0].y;
        const toEntryWidth = toEntryWithPosition.position.rects[0].width;
        const fromLinkX = fromEntryX + fromEntryWidth / 2;
        const toLinkX = toEntryX + toEntryWidth / 2;
        return {
          link,
          fromEntryWithPos: fromEntryWithPosition,
          toEntryWithPos: toEntryWithPosition,
          fromLinkX,
          toLinkX,
          fromLinkY: fromEntryY,
          toLinkY: toEntryY,
        };
      } else {
        return null;
      }
    })
    .filter(notNullOrUndefined);
}

/**
 *
 * given a map of [each annotation] to
 * [number empty space need to insert], calculate
 * the new text after inserting those empty
 * spaces. Meanwhile, also calculate a map of
 * [each annotation] to [their position in the new text]
 *
 */
function calculateNewText(
  annotations: IAnnotation[],
  text: string,
  spaceMap: ISpaceMap,
  fill: string,
  insertDirection: 'before' | 'after' = 'after'
) {
  const textSplit = text.split('');
  const sortedSpaceMap = Object.keys(spaceMap)
    .filter(annId => spaceMap[annId].spaceToMove > 0)
    .map(annId => spaceMap[annId])
    .sort((annA, annB) => {
      return (
        annA.annotationWithPos.annotation.span.end -
        annB.annotationWithPos.annotation.span.end
      );
    });

  const spacedAnnotationSpan: {
    [key: string]: {begin: number; end: number};
  } = {};

  annotations.forEach(ann => {
    spacedAnnotationSpan[ann.id] = {
      begin: ann.span.begin,
      end: ann.span.end,
    };
  });

  for (let i = 0; i < sortedSpaceMap.length; i++) {
    const space = sortedSpaceMap[i];
    const spaceFromLast = sortedSpaceMap[sortedSpaceMap.length - i - 1];
    const emptySpaces = Array(spaceFromLast.spaceToMove).fill(fill).join('');

    if (insertDirection === 'before') {
      textSplit.splice(
        spaceFromLast.annotationWithPos.annotation.span.begin,
        0,
        emptySpaces
      );

      const begin =
        spacedAnnotationSpan[space.annotationWithPos.annotation.id].begin;

      Object.keys(spacedAnnotationSpan).forEach(annId => {
        if (spacedAnnotationSpan[annId].begin >= begin) {
          spacedAnnotationSpan[annId].begin =
            spacedAnnotationSpan[annId].begin + space.spaceToMove;
          spacedAnnotationSpan[annId].end =
            spacedAnnotationSpan[annId].end + space.spaceToMove;
        } else if (
          spacedAnnotationSpan[annId].begin < begin &&
          spacedAnnotationSpan[annId].end > begin
        ) {
          spacedAnnotationSpan[annId].end =
            spacedAnnotationSpan[annId].end + space.spaceToMove;
        } else {
          // don't change
        }
      });
    } else {
      textSplit.splice(
        spaceFromLast.annotationWithPos.annotation.span.end,
        0,
        emptySpaces
      );

      const end =
        spacedAnnotationSpan[space.annotationWithPos.annotation.id].end;

      Object.keys(spacedAnnotationSpan).forEach(annId => {
        if (spacedAnnotationSpan[annId].begin >= end) {
          spacedAnnotationSpan[annId].begin =
            spacedAnnotationSpan[annId].begin + space.spaceToMove;
          spacedAnnotationSpan[annId].end =
            spacedAnnotationSpan[annId].end + space.spaceToMove;
        } else if (
          spacedAnnotationSpan[annId].begin < end &&
          spacedAnnotationSpan[annId].end > end
        ) {
          spacedAnnotationSpan[annId].end =
            spacedAnnotationSpan[annId].end + space.spaceToMove;
        } else {
          // don't change
        }
      });
    }
  }

  const spacedText = textSplit.join('');

  return [spacedText, spacedAnnotationSpan] as [
    typeof spacedText,
    typeof spacedAnnotationSpan
  ];
}

/**
 *
 * Given links with their position, the starting position
 * of a line, and the width of a line. Find, for each
 * line, how many levels is that line, and what links
 * are in each level. So that no links are overlapped.
 *
 * at the end, a line looks like:
 *
 *                    |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
 *      |‾‾‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾‾|           |
 *   |‾‾|‾‾‾‾‾‾| |‾‾‾‾|‾‾| |‾|‾‾‾‾|      |
 *   *  *      * *    *  * * *    *      *
 */
function calculateLinesLevels(
  linksWithPos: ILinkWithPos[],
  lineStartX: number,
  lineWidth: number
): Record<string, ILinkWithPos[][]> {
  const lineMap: any = {};
  linksWithPos.forEach(link => {
    if (link.fromLinkY === link.toLinkY) {
      lineMap[link.fromLinkY] = lineMap[link.fromLinkY] || [];
      lineMap[link.fromLinkY].push(link);
    } else {
      const goLeft = shouldMultiLineGoLeft(link, lineStartX, lineWidth);
      lineMap[link.fromLinkY] = lineMap[link.fromLinkY] || [];
      lineMap[link.fromLinkY].push({
        ...link,
        toLinkY: link.fromLinkY,
        toLinkX: goLeft ? lineStartX : lineStartX + lineWidth,
      });

      lineMap[link.toLinkY] = lineMap[link.toLinkY] || [];
      lineMap[link.toLinkY].push({
        ...link,
        fromLinkY: link.toLinkY,
        fromLinkX: goLeft ? lineStartX : lineStartX + lineWidth,
      });
    }
  });

  Object.keys(lineMap).forEach(key => {
    lineMap[key] = calculateLevelForSingleLine(lineMap[key]);
  });

  return lineMap;

  /**
   *
   * go through each level from top
   * - if no overlap with any link in current level, push to same level
   * - if there is overlap but only super set, insert a level above, and push to it
   * - if reach the end, insert a new level below then push to it
   * - otherwise, check lower level.
   *
   * after levels is build
   * - push each link down into lower levels
   *
   */
  function calculateLevelForSingleLine(
    links: ILinkWithPos[]
  ): ILinkWithPos[][] {
    const levels: ILinkWithPos[][] = [];
    links.forEach(link => {
      let insertLevel = -1;
      let pushLevel = -1;
      for (let i = 0; i < levels.length; i++) {
        let shouldBreak = false;
        let shouldContinue = false;
        switch (checkLevelOverlap(link, levels[i])) {
          case 'superset':
            insertLevel = i;
            shouldBreak = true;
            break;
          case 'no-overlap':
            pushLevel = i;
            shouldBreak = true;
            break;
          case 'subset':
          case 'intersect':
            shouldContinue = true;
            break;
        }
        if (shouldBreak) break;
        if (shouldContinue) continue;
      }

      if (insertLevel !== -1) {
        levels.splice(insertLevel, 0, [link]);
      } else if (pushLevel !== -1) {
        levels[pushLevel].push(link);
      } else {
        levels.push([link]);
      }
    });

    pushDownLinksInLevels(levels);
    return levels.filter(l => l.length);
  }

  // go through each level from bottom to top
  // - if the link can be push down, move the link to the lower level, until we can't
  //   - to check if the link can be push down, check lower level has intersects
  function pushDownLinksInLevels(levels: ILinkWithPos[][]) {
    for (let i = levels.length - 2; i >= 0; i--) {
      const level = levels[i];
      const linksToPush: number[][] = [];

      for (let j = 0; j < level.length; j++) {
        const link = level[j];
        let levelToPush = -1;
        for (let k = i + 1; k < levels.length; k++) {
          if (checkLevelOverlap(link, levels[k]) === 'no-overlap') {
            levelToPush = k;
          } else {
            break;
          }
        }
        if (levelToPush !== -1) {
          linksToPush.push([j, levelToPush]);
        }
      }

      levels[i] = level.filter(
        (_, i) => linksToPush.map(l => l[0]).indexOf(i) === -1
      );
      linksToPush.forEach(([linkIndex, levelIndex]) => {
        levels[levelIndex].push(level[linkIndex]);
      });
    }
  }

  /**
   *
   * Check if a link is horizontally with a group of links
   *
   */
  function checkLevelOverlap(
    link: ILinkWithPos,
    linkGroup: ILinkWithPos[]
  ): 'intersect' | 'superset' | 'subset' | 'no-overlap' {
    let hasSuperset = false;
    for (let i = 0; i < linkGroup.length; i++) {
      const linkToCompare = linkGroup[i];
      switch (checkLinkOverlap(link, linkToCompare)) {
        case 'intersect':
          return 'intersect';

        case 'subset':
          return 'subset';

        case 'superset':
          hasSuperset = true;
          continue;

        case 'no-overlap':
          continue;
      }
    }

    return hasSuperset ? 'superset' : 'no-overlap';
  }

  /**
   *
   * Check if a link is horizontally overlap with another link,
   *
   */

  function checkLinkOverlap(
    link1: ILinkWithPos,
    link2: ILinkWithPos
  ): 'intersect' | 'superset' | 'subset' | 'no-overlap' {
    const [line1Left, line1Right] = [
      Math.min(link1.fromLinkX, link1.toLinkX),
      Math.max(link1.fromLinkX, link1.toLinkX),
    ];
    const [line2Left, line2Right] = [
      Math.min(link2.fromLinkX, link2.toLinkX),
      Math.max(link2.fromLinkX, link2.toLinkX),
    ];

    const noOverlap = line1Right <= line2Left || line1Left >= line2Right;
    const isSuperset = line1Left <= line2Left && line1Right >= line2Right;
    const isSubset = line2Left < line1Left && line2Right > line1Right;

    if (noOverlap) {
      return 'no-overlap';
    } else if (isSuperset) {
      return 'superset';
    } else if (isSubset) {
      return 'subset';
    } else {
      return 'intersect';
    }
  }
}

/**
 *
 * Give a map of [line (represented by height)]
 * to [links grouped in levels in that line], and
 * the gap height of each level
 *
 * Find how many pixels above each line is needed in order
 * to display all the levels above each line.
 *
 */
export function calculateLinkHeight(
  linkLevels: Record<string, ILinkWithPos[][]>,
  gap: number
) {
  const linksHeightMap: Record<string, Record<string, number>> = {};

  Object.keys(linkLevels).forEach(y => {
    linkLevels[y].forEach((links, i, arr) => {
      links.forEach(link => {
        linksHeightMap[link.link.id] = linksHeightMap[link.link.id] || {};
        linksHeightMap[link.link.id][y] = (arr.length - 1 - i) * gap;
      });
    });
  });

  return linksHeightMap;
}

/**
 *
 * give a link with position that not are at the same
 * line, decide if it should go left of right.
 *
 */
export function shouldMultiLineGoLeft(
  link: ILinkWithPos,
  lineStartX: number,
  lineWidth: number
) {
  const topLineX =
    link.fromLinkY < link.toLinkY ? link.fromLinkX : link.toLinkX;
  return topLineX < lineStartX + lineWidth / 2;
}

/**
 *
 * restore new annotation position to original position based
 * on a map of [end of original annotation position ] to
 * [number of characters to move]
 *
 */
export function restorePos(
  charMoveMap: Map<number, number>,
  begin: number,
  end: number
) {
  let actualBegin = -1;
  let actualEnd = -1;
  let accumulatedMove = 0;

  const entries = Array.from(charMoveMap.entries()).sort((a, b) => a[0] - b[0]);
  let previousAnnoEnd = -1;

  for (const [annoEnd, annoMove] of entries) {
    if (annoEnd + accumulatedMove >= begin && actualBegin === -1) {
      if (
        previousAnnoEnd !== -1 &&
        previousAnnoEnd + accumulatedMove >= begin
      ) {
        actualBegin = previousAnnoEnd + 1;
      } else {
        actualBegin = begin - accumulatedMove;
      }
    }

    if (annoEnd + accumulatedMove >= end && actualEnd === -1) {
      if (previousAnnoEnd !== -1 && previousAnnoEnd + accumulatedMove >= end) {
        actualEnd = previousAnnoEnd;
      } else {
        actualEnd = end - accumulatedMove;
      }
    }
    accumulatedMove += annoMove;
    previousAnnoEnd = annoEnd;
  }

  // The procedures above are intended to fix annotations inserted in between existing annotations.
  // If we have a new mention that the offset is larger than all existing annotations, then the
  // procedures above will not be activated (since annoEnd + accumulatedMove < begin or end)
  //
  // For these annotation, there begin and end should still be adjusted by the accumulatedMove amount.
  // The following procedures try to achieve this.

  // First check for undefined actualBegin (i.e. actualBegin === -1).
  if (actualBegin === -1) {
    // If actualBegin is not defined.
    const lastAnnoEnd = entries[entries.length - 1][0];
    if (begin > lastAnnoEnd + accumulatedMove) {
      // If the new annotation is after those
      actualBegin = begin - accumulatedMove;
    } else {
      console.error(
        `Unknown causes for undefined actualBegin of surface begin 
        at ${begin}. Offset calculation may be wrong.`
      );
      actualBegin = begin;
    }
  }

  // Then check for undefined actualEnd (i.e. actualEnd === -1).
  // We check these separately, since there might be cases where the actualBegin is defined but the
  //  actualEnd is not.
  if (actualEnd === -1) {
    const lastAnnoEnd = entries[entries.length - 1][0];
    if (end > lastAnnoEnd + accumulatedMove) {
      actualEnd = end - accumulatedMove;
    } else {
      console.error(
        `Unknown causes for undefined actualBegin of surface begin 
        at ${begin}. Offset calculation may be wrong.`
      );
      actualEnd = end;
    }
  }

  return [actualBegin, actualEnd];
}

/**
 *
 * calculate how many empty space need to insert for
 * each annotation, so that there is enough space
 * to show the annotation label and link label.
 *
 */
function calculateSpaceMap(
  annotationWithPosition: {
    position: IAnnotationPosition;
    annotation: IAnnotation;
  }[],

  linksWithPos: {
    link: ILink;
    fromEntryWithPos: {
      position: IAnnotationPosition;
      annotation: IAnnotation;
    };

    toEntryWithPos: {
      position: IAnnotationPosition;
      annotation: IAnnotation;
    };
    fromLinkX: number;
    toLinkX: number;
    fromLinkY: number;
    toLinkY: number;
  }[],
  selectedLegendAttributeIds: string[]
) {
  const spaceMap: ISpaceMap = {};

  linksWithPos.forEach(linkPos => {
    const label = Object.keys(linkPos.link.attributes)
      .filter(attrKey => {
        return (
          selectedLegendAttributeIds.indexOf(
            attributeId(linkPos.link.legendId, attrKey)
          ) > -1
        );
      })
      .map(attrKey => linkPos.link.attributes[attrKey])
      .join(',');

    const pixelNeedForLinkLabel = getTextWidth(label, fontWidth);
    const distance = Math.abs(linkPos.fromLinkX - linkPos.toLinkX);
    const annotationWithPos =
      linkPos.fromLinkX < linkPos.toLinkX
        ? linkPos.fromEntryWithPos
        : linkPos.toEntryWithPos;
    const spaceToMove =
      distance > pixelNeedForLinkLabel
        ? 0
        : Math.ceil((pixelNeedForLinkLabel - distance) / fontWidth);

    if (spaceMap[annotationWithPos.annotation.id] === undefined) {
      spaceMap[annotationWithPos.annotation.id] = {
        annotationWithPos,
        spaceToMove,
      };
    } else {
      if (spaceToMove > spaceMap[annotationWithPos.annotation.id].spaceToMove) {
        spaceMap[annotationWithPos.annotation.id] = {
          annotationWithPos,
          spaceToMove,
        };
      }
    }
  });

  return spaceMap;
}

/**
 *
 * get a map [line (represented by height)]
 * to [links grouped in levels in that line],
 * all levels of links are empty in this function,
 * because it only use annotations.
 *
 * we use this to capture lines that don't has links
 * in it.
 *
 */
function getLevelsFromJustAnnotations(
  annotationWithPosition: {
    position: IAnnotationPosition;
    annotation: IAnnotation;
  }[]
): Record<string, ILinkWithPos[][]> {
  const levels: any = {};
  const set = new Set(
    annotationWithPosition.map(ann => ann.position.rects[0].y)
  );
  for (const height of Array.from(set)) {
    levels[height] = [];
  }

  return levels;
}

/**
 *
 * Find new line to insert by how many level is there,
 * we need this because level number don't directly
 * translate to number of new lines.
 *
 */
function calculateLinesToInsertByLevelNum(
  collapsedLinesIndex: number[],
  lineIndex: number,
  levelNum: number
) {
  return (
    (collapsedLinesIndex.indexOf(lineIndex) === -1
      ? Math.ceil(levelNum / 4)
      : 0) + (lineIndex === 0 ? 1 : 3)
  );
}

/**
 *
 * get first annotation from left to right in a line.
 *
 * TODO: there is a bug. When the first rect of the line is
 * the also a part of annotation in last line. This function
 * returns the second rect. However there seems no good way
 * to resolve this, because we don't know the exact cursor
 * to insert.
 *
 */
function getAnnotationsByLine(
  annotationWithPosition: {
    position: IAnnotationPosition;
    annotation: IAnnotation;
  }[],
  lineHeight: number
) {
  return annotationWithPosition
    .filter(ann => ann.position.rects[0].y === lineHeight)
    .sort((annA, annB) => {
      return annA.position.rects[0].x - annB.position.rects[0].x;
    });
}

function getTextWidth(text: string, fontWidth: number) {
  const textUpperLen = text.split('').filter(c => c === c.toUpperCase()).length;
  const textOtherLen = text.length - textUpperLen;
  const padding = fontWidth * 2;

  return textUpperLen * (fontWidth + 3) + textOtherLen * fontWidth + padding;
}

// https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  (outer.style as any).msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.remove();

  return scrollbarWidth;
}
