import {
  ILegend,
  IColoredLegend,
  ILinkWithPos,
  ISinglePack,
  ISpaceMap,
} from './interfaces';
import { colorPalettes } from './color';

export function applyColorToLegend(legends: ILegend[]): IColoredLegend[] {
  return legends.map((leg, i) => {
    return {
      ...leg,
      color: colorPalettes[i % colorPalettes.length],
    };
  });
}

export function notNullOrUndefined<T>(x: T | null | undefined): x is T {
  return x !== null && x !== undefined;
}

/**

{
    321: [ // line at position 321
        ...
        [linkPos1, linkPos2], // level n
        [linkPos3], // lower then level n
        ...
    ],
    ...
}

 */
export function calcuateLinesLevels(
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
   * - if no overlap with any link in current lavel, push to same level
   * - if there is overlap but only super set, insert a level above, and push to it
   * - if reach the end, insert a new level below then push to it
   * - otherwise, check lower level.
   *
   * after levels is build
   * - project each link down into lower levels
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

    projectDownLinksInLevels(levels);
    return levels.filter(l => l.length);
  }

  // go through each level from bottom to top
  // - if the link can be push down, move the link to the lower level, until it cann't
  //   - to check if the link can be push down, check lower level has intersetps
  function projectDownLinksInLevels(levels: ILinkWithPos[][]) {
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

export function calcuateLinkHeight(
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

export function shouldMultiLineGoLeft(
  link: ILinkWithPos,
  lineStartX: number,
  lineWidth: number
) {
  const topLineX =
    link.fromLinkY < link.toLinkY ? link.fromLinkX : link.toLinkX;
  return topLineX < lineStartX + lineWidth / 2;
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

    textSplit.splice(
      insertDirection === 'before'
        ? spaceFromLast.annotationWithPos.annotation.span.begin
        : spaceFromLast.annotationWithPos.annotation.span.end,
      0,
      emptySpaces
    );

    const end = spacedAnnotationSpan[space.annotationWithPos.annotation.id].end;

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

  const spacedText = textSplit.join('');

  return [spacedText, spacedAnnotationSpan] as [
    typeof spacedText,
    typeof spacedAnnotationSpan
  ];
}

export const fontWidth = 6;

export function attributeId(legendId: string, attributeId: string) {
  return legendId + '_' + attributeId;
}

export function shortId(id: string) {
  return id.replace('forte.data.ontology.stanfordnlp_ontology.', '');
}

export function checkAnnotationInGroup(
  groupId: string,
  textPack: ISinglePack,
  annotationId: string
) {
  const group = textPack.groups.find(g => g.id === groupId);
  if (group) {
    return group.annotationIds.includes(annotationId);
  } else {
    return false;
  }
}

export function checkLinkInGroup(
  groupId: string,
  textPack: ISinglePack,
  linkId: string
) {
  const group = textPack.groups.find(g => g.id === groupId);
  if (group) {
    return group.linkIds.includes(linkId);
  } else {
    return false;
  }
}
