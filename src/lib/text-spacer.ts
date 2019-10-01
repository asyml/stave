import {
  ISinglePack,
  ISpaceMap,
  LinkWithPos,
  AnnotationPosition,
  IAnnotation,
  ILink,
} from './interfaces';
import { notNullOrUndefined, attributeId } from './utils';

export const fontWidth = 6;

export interface SpacedText {
  text: string;
  annotationSpanMap: {
    [annotationId: string]: {
      begin: number;
      end: number;
    };
  };
}

export function spaceOutText(
  textPack: ISinglePack,
  selectedLegendIds: string[],
  selectedLegendAttributeIds: string[],
  collpasedLinesIndex: number[]
): SpacedText {
  const existSpaceEl = document.getElementById('text-spacer');
  if (existSpaceEl) {
    existSpaceEl.remove();
  }

  const root = document.getElementById('root') as HTMLElement;
  const domContainer = document.createElement('div');
  domContainer.id = 'text-spacer';

  root.appendChild(domContainer);
  domContainer.style.width = 'calc(100% - 500px)';
  domContainer.style.margin = '50px auto';
  domContainer.style.padding = '16px';
  domContainer.style.border = '1px solid red';
  domContainer.style.position = 'fixed';
  domContainer.style.left = '-9999px';

  const dom = document.createElement('div');
  domContainer.appendChild(dom);
  dom.style.whiteSpace = 'pre-wrap';

  dom.textContent = textPack.text;
  const { annotations } = textPack;
  const textNodeStep1 = dom && (dom.childNodes[0] as HTMLElement);

  const textAreaRectStep1 = domContainer.getBoundingClientRect();
  const textNodeRectStep1 = dom.getBoundingClientRect();

  const textAreaDimensionStep1 = {
    width: textNodeRectStep1.width,
    height: textNodeRectStep1.height,
    x: textNodeRectStep1.left - textAreaRectStep1.left,
    y: textNodeRectStep1.top - textAreaRectStep1.top,
  };

  const annotationPositionsStep1 = annotations.map(anno => {
    const range = document.createRange();

    range.setStart(textNodeStep1, anno.span.begin);
    range.setEnd(textNodeStep1, anno.span.end);
    const rects = Array.from(range.getClientRects() as DOMRectList);

    return {
      rects: rects.map(rect => ({
        x: rect.x - textAreaRectStep1.left,
        y: rect.y - textAreaRectStep1.top,
        width: rect.width,
        height: rect.height,
      })),
    };
  });

  const annotationWithPositionStep1 = mergeAnnotationWithPosition(
    annotationPositionsStep1,
    annotations
  ).filter(ann => selectedLegendIds.indexOf(ann.annotation.legendId) > -1);

  const linksWithPosStep1 = mergeLinkWithPosition(
    textPack.links,
    annotationWithPositionStep1
  ).filter(link => selectedLegendIds.indexOf(link.link.legendId) > -1);

  const spaceMapStep1: ISpaceMap = calcuateSpaceMap(
    annotationWithPositionStep1,
    linksWithPosStep1,
    selectedLegendAttributeIds
  );

  const [
    caculcatedSpacedTextStep1,
    caculcatedSpacedAnnotationSpanStep1,
  ] = calculateSpacedText(textPack, spaceMapStep1, ' ');

  dom.textContent = caculcatedSpacedTextStep1;

  const textNode = dom && (dom.childNodes[0] as HTMLElement);
  const annotationPositions = annotations.map(anno => {
    const range = document.createRange();

    range.setStart(
      textNode,
      caculcatedSpacedAnnotationSpanStep1[anno.id].begin
    );
    range.setEnd(textNode, caculcatedSpacedAnnotationSpanStep1[anno.id].end);
    const rects = Array.from(range.getClientRects() as DOMRectList);

    return {
      rects: rects.map(rect => ({
        x: rect.x - textAreaRectStep1.left,
        y: rect.y - textAreaRectStep1.top,
        width: rect.width,
        height: rect.height,
      })),
    };
  });

  const annotationWithPosition = mergeAnnotationWithPosition(
    annotationPositions,
    annotations
  ).filter(ann => selectedLegendIds.indexOf(ann.annotation.legendId) > -1);

  const linksWithPos = mergeLinkWithPosition(
    textPack.links,
    annotationWithPosition
  ).filter(link => selectedLegendIds.indexOf(link.link.legendId) > -1);

  const lineStartX = textAreaDimensionStep1.x;
  const lineWidth = textAreaDimensionStep1.width;

  const linesLevels = calcuateLinesLevels(linksWithPos, lineStartX, lineWidth);

  const spaceMap: ISpaceMap = {};
  Object.keys(linesLevels).forEach((lineHeight, i) => {
    const levelNum = linesLevels[lineHeight].length;
    const firstAnnotation = getFirstAnnotationOfLine(
      annotationWithPosition,
      +lineHeight
    );

    spaceMap[firstAnnotation.annotation.id] = {
      annotationWithPos: {
        position: firstAnnotation.position,
        annotation: {
          ...firstAnnotation.annotation,
          span: {
            begin:
              caculcatedSpacedAnnotationSpanStep1[firstAnnotation.annotation.id]
                .begin,
            end:
              caculcatedSpacedAnnotationSpanStep1[firstAnnotation.annotation.id]
                .end,
          },
        },
      },
      spaceToMove:
        (collpasedLinesIndex.indexOf(i) === -1 ? Math.ceil(levelNum / 2) : 0) +
        (i === 0 ? 1 : 4),
    };
  });

  const updatedTextPack = {
    ...textPack,
    text: caculcatedSpacedTextStep1,
    annotations: textPack.annotations.map(ann => {
      return {
        ...ann,
        span: {
          begin: caculcatedSpacedAnnotationSpanStep1[ann.id].begin,
          end: caculcatedSpacedAnnotationSpanStep1[ann.id].end,
        },
      };
    }),
  };

  const [textWithNewLine, annotationSpanMap] = calculateSpacedText(
    updatedTextPack,
    spaceMap,
    '\n',
    'before'
  );

  dom.textContent = textWithNewLine;

  return {
    text: textWithNewLine,
    annotationSpanMap,
  };
}

function getFirstAnnotationOfLine(
  annotationWithPosition: {
    position: AnnotationPosition;
    annotation: IAnnotation;
  }[],
  lineHeight: number
) {
  return annotationWithPosition
    .filter(ann => ann.position.rects[0].y === lineHeight)
    .sort((annA, annB) => {
      return annA.position.rects[0].x - annB.position.rects[0].x;
    })[0];
}

export function mergeAnnotationWithPosition(
  annotationPositions: AnnotationPosition[],
  annotations: IAnnotation[]
) {
  return (annotationPositions || []).map((position, i) => {
    return {
      position,
      annotation: annotations[i],
    };
  });
}

export function mergeLinkWithPosition(
  links: ILink[],
  annotationWithPosition: {
    position: AnnotationPosition;
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

function calcuateSpaceMap(
  annotationWithPosition: {
    position: AnnotationPosition;
    annotation: IAnnotation;
  }[],

  linksWithPos: {
    link: ILink;
    fromEntryWithPos: {
      position: AnnotationPosition;
      annotation: IAnnotation;
    };

    toEntryWithPos: {
      position: AnnotationPosition;
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

    const spaceNeedForLabel = label.length * fontWidth + 15;
    const distance = Math.abs(linkPos.fromLinkX - linkPos.toLinkX);
    const annotationWithPos =
      linkPos.fromLinkX < linkPos.toLinkX
        ? linkPos.fromEntryWithPos
        : linkPos.toEntryWithPos;
    const spaceToMove =
      distance > spaceNeedForLabel
        ? 0
        : Math.ceil((spaceNeedForLabel - distance) / fontWidth);

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

  const pxielNeededForLabel = 35;
  annotationWithPosition
    .slice(0)
    .sort((a, b) => a.annotation.span.end - b.annotation.span.end)
    .forEach((annPos, i, arr) => {
      if (i < arr.length - 1 && annPos.position.rects.length === 1) {
        const nextAnnPos = arr[i + 1];
        const midAnnX =
          annPos.position.rects[0].x + annPos.position.rects[0].width / 2;
        const nextMidAnnX =
          nextAnnPos.position.rects[0].x +
          nextAnnPos.position.rects[0].width / 2;
        const isSameLine =
          annPos.position.rects[0].y === nextAnnPos.position.rects[0].y;

        let distance;
        if (isSameLine) {
          distance = nextMidAnnX - midAnnX;
        } else {
          const midAnnXToEnd = annPos.position.rects[0].width / 2;
          const nextMidAnnXToStart = nextAnnPos.position.rects[0].width / 2;

          distance = midAnnXToEnd + nextMidAnnXToStart + 4;
        }

        if (distance < pxielNeededForLabel && distance > 0) {
          const spaceToMove = Math.ceil(
            (pxielNeededForLabel - distance) / fontWidth
          );
          if (spaceMap[annPos.annotation.id] === undefined) {
            spaceMap[annPos.annotation.id] = {
              annotationWithPos: annPos,
              spaceToMove,
            };
          } else {
            if (spaceToMove > spaceMap[annPos.annotation.id].spaceToMove) {
              spaceMap[annPos.annotation.id] = {
                annotationWithPos: annPos,
                spaceToMove,
              };
            }
          }
        }
      }
    });

  return spaceMap;
}

export function calculateSpacedText(
  textPack: ISinglePack,
  spaceMap: ISpaceMap,
  fill: string,
  insertDirection: 'before' | 'after' = 'after'
) {
  const textSplit = textPack.text.split('');
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
    [key: string]: { begin: number; end: number };
  } = {};

  textPack.annotations.forEach(ann => {
    spacedAnnotationSpan[ann.id] = {
      begin: ann.span.begin,
      end: ann.span.end,
    };
  });

  for (let i = 0; i < sortedSpaceMap.length; i++) {
    const space = sortedSpaceMap[i];
    const spaceFromLast = sortedSpaceMap[sortedSpaceMap.length - i - 1];
    const emptySpaces = Array(spaceFromLast.spaceToMove)
      .fill(fill)
      .join('');

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

export function calcuateLinesLevels(
  linksWithPos: LinkWithPos[],
  lineStartX: number,
  lineWidth: number
): Record<string, LinkWithPos[][]> {
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
   * - if no overlap with any link in current lavel, push to same level
   * - if there is overlap but only super set, insert a level above, and push to it
   * - if reach the end, insert a new level below then push to it
   * - otherwise, check lower level.
   *
   * after levels is build
   * - project each link down into lower levels
   *
   */
  function calculateLevelForSingleLine(links: LinkWithPos[]): LinkWithPos[][] {
    const levels: LinkWithPos[][] = [];
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

    projectDownLinksInLevels(levels);
    return levels.filter(l => l.length);
  }

  // go through each level from bottom to top
  // - if the link can be push down, move the link to the lower level, until it cann't
  //   - to check if the link can be push down, check lower level has intersetps
  function projectDownLinksInLevels(levels: LinkWithPos[][]) {
    for (let i = levels.length - 2; i >= 0; i--) {
      const level = levels[i];
      const linkstoProject: number[][] = [];

      for (let j = 0; j < level.length; j++) {
        const link = level[j];
        let levelToProject = -1;
        for (let k = i + 1; k < levels.length; k++) {
          if (checkLevelOverlap(link, levels[k]) === 'no-overlap') {
            levelToProject = k;
          } else {
            break;
          }
        }
        if (levelToProject !== -1) {
          linkstoProject.push([j, levelToProject]);
        }
      }

      levels[i] = level.filter(
        (_, i) => linkstoProject.map(l => l[0]).indexOf(i) === -1
      );
      linkstoProject.forEach(([linkIndex, levelIndex]) => {
        levels[levelIndex].push(level[linkIndex]);
      });
    }
  }

  function checkLevelOverlap(
    link: LinkWithPos,
    linkGroup: LinkWithPos[]
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

  function checkLinkOverlap(
    link1: LinkWithPos,
    link2: LinkWithPos
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

export function calcuateLinkHeight(
  linkLevels: Record<string, LinkWithPos[][]>,
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

export function shouldMultiLineGoLeft(
  link: LinkWithPos,
  lineStartX: number,
  lineWidth: number
) {
  const topLineX =
    link.fromLinkY < link.toLinkY ? link.fromLinkX : link.toLinkX;
  return topLineX < lineStartX + lineWidth / 2;
}
