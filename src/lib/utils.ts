import {
  ILegend,
  IColoredLegend,
  LinkWithPos,
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
    return levels;
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

export function calculateSpacedText(
  textPack: ISinglePack,
  spaceMap: ISpaceMap
) {
  const textSplit = textPack.text.split('');
  const sortedSpaceMap = Object.keys(spaceMap)
    .filter(annId => spaceMap[annId].spaceToMove > 0)
    .map(annId => {
      return {
        space: spaceMap[annId],
        annotation: textPack.annotations.find(an => an.id === annId),
      };
    })
    .sort((annA, annB) => {
      if (annA.annotation && annB.annotation) {
        return annA.annotation.span.end - annB.annotation.span.end;
      } else {
        return 0;
      }
    })
    .map(ann => {
      return {
        spaceToMove: ann.space.spaceToMove,
        annotaion: ann.annotation,
        end: ann.annotation ? ann.annotation.span.end : -1,
      };
    });

  console.log(sortedSpaceMap);

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
      .fill('&nbsp;')
      .join('');

    textSplit.splice(spaceFromLast.end, 0, emptySpaces);

    if (space.annotaion) {
      const end = spacedAnnotationSpan[space.annotaion.id].end;
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
