import {
  IEntryDefinition,
  ILinkWithPos,
  ISinglePack,
  IOntology,
  ILegendConfigs,
  IScopeConfigs,
} from './interfaces';
import { colorPalettes } from './color';

export function applyColorToLegend(
  legends: IEntryDefinition[]
): (IEntryDefinition & { color: string })[] {
  return legends.map((leg, i) => {
    return {
      ...leg,
      color: colorPalettes[i % colorPalettes.length],
    };
  });
}

export function displayAttributeInline(attr_value: any) {
  const attr_type:string = (typeof attr_value)
  
  // The way that we display null value and other objects will leave an empty box.
  // We can probably use the ontology to filter out some of these.

  if (attr_type === 'boolean'){
    return attr_value.toString()
  } else if (attr_type === 'string'){
    return attr_value.substring(0,3)
  }else if (attr_type === 'number'){
    return attr_value.toString()
  }else if (attr_value === null){
    return ''
  }else{
    return '-'
  }
}

export function displayAttributeFloating(attr_value: any){
  const attr_type:string = (typeof attr_value)

  if (attr_type === 'boolean'){
    return attr_value.toString()
  } else if (attr_type === 'string'){
    return attr_value.substring(0,3)
  }else if (attr_type === 'number'){
    return attr_value.toString()
  }else if (attr_value === null){
    return 'N/A'
  }else{
    return 'complex object'
  }
}

export function displayAttributeSidebar(attr_value: any){
  const attr_type:string = (typeof attr_value)

  if (attr_type === 'boolean'){
    return attr_value.toString()
  } else if (attr_type === 'string'){
    return attr_value.substring(0,3)
  }else if (attr_type === 'number'){
    return attr_value.toString()
  }else if (attr_value === null){
    return 'N/A'
  }else{
    return 'complex object'
  }
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
export function calculateLinesLevels(
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
  // - if the link can be push down, move the link to the lower level, until it can't
  //   - to check if the link can be push down, check lower level has intercepts.
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

export function shouldMultiLineGoLeft(
  link: ILinkWithPos,
  lineStartX: number,
  lineWidth: number
) {
  const topLineX =
    link.fromLinkY < link.toLinkY ? link.fromLinkX : link.toLinkX;

  return topLineX < lineStartX + lineWidth / 2;
}

export const fontWidth = 6;

export function attributeId(legendId: string, attributeId: string) {
  return legendId + '_' + attributeId;
}

export function shortId(id: string) {
  return id.replace('forte.data.ontology.', '');
}

// export function checkAnnotationInGroup(
//   groupIds: string[],
//   textPack: ISinglePack,
//   annotationId: string
// ) {
//   return checkMemberInGroup(groupIds, 'annotation', textPack, annotationId);
// }

export function getGroupByAnnotation(
  groupIds: string[],
  textPack: ISinglePack,
  annotationId: string
) {
  return getMemberInGroup(groupIds, 'annotation', textPack, annotationId);
}

export function getGroupByLink(
  groupIds: string[],
  textPack: ISinglePack,
  linkId: string
) {
  return getMemberInGroup(groupIds, 'link', textPack, linkId);
}

// export function checkLinkInGroup(
//   groupIds: string[],
//   textPack: ISinglePack,
//   linkId: string
// ) {
//   return checkMemberInGroup(groupIds, 'link', textPack, linkId);
// }

export function getMemberInGroup(
  groupIds: string[],
  memberType: 'link' | 'annotation',
  textPack: ISinglePack,
  memberId: string
) {
  if (!groupIds.length) {
    return null;
  }

  const groups = textPack.groups.filter(
    g => groupIds.includes(g.id) && g.memberType === memberType
  );

  if (groups.length) {
    return groups.find(group => group.members.includes(memberId)) || null;
  } else {
    return null;
  }
}
// export function checkMemberInGroup(
//   groupIds: string[],
//   memberType: 'link' | 'annotation',
//   textPack: ISinglePack,
//   memberId: string
// ) {
//   if (!groupIds.length) {
//     return false;
//   }

//   const groups = textPack.groups.filter(
//     g => groupIds.includes(g.id) && g.memberType === memberType
//   );
//   if (groups.length) {
//     return groups.some(group => group.members.includes(memberId));
//   } else {
//     return false;
//   }
// }

export function isAvailableScope(config: IScopeConfigs, entryName: string){
  return entryName in config;
}

export function isAvailableLegend(config: ILegendConfigs, entryName: string){
  // Show all legends if no configuration is provided.
  if (Object.keys(config).length === 0){
    return true;
  }
  return entryName in config;
}

export function isEntryAnnotation(config: IOntology, entryName: string) {
  return findEntryNameMatchDeep(
    config,
    entryName,
    'forte.data.ontology.top.Annotation'
  );
}

export function isEntryLink(config: IOntology, entryName: string) {
  return findEntryNameMatchDeep(
    config,
    entryName,
    'forte.data.ontology.top.Link'
  );
}

function findEntryNameMatchDeep(
  config: IOntology,
  entryName: string,
  matchName: string
): boolean {
  if (entryName === matchName) {
    return true;
  }

  const entry = config.definitions.find(
    ent => ent.entryName === entryName
  );

  if (!entry) {
    return false;
  }

  if (entry.parentEntryName) {
    return findEntryNameMatchDeep(config, entry.parentEntryName, matchName);
  } else {
    return false;
  }
}

export function getGroupType(groupEntryName: string, config: IOntology) {
  const entry = config.definitions.find(
    ent => ent.entryName === groupEntryName
  );

  if (!entry) {
    throw new Error('unknow group entry ' + groupEntryName);
  }

  if (entry.memberType && isEntryAnnotation(config, entry.memberType)) {
    return 'annotation';
  } else if (entry.memberType && isEntryLink(config, entry.memberType)) {
    return 'link';
  } else {
    throw new Error('unknow group entry ' + groupEntryName);
  }
}

export function camelCaseDeep(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(camelCaseDeep);
  } else if (typeof obj === 'object') {
    const camelCaseObj: any = {};
    Object.keys(obj).forEach(key => {
      let camelKey = key.replace(/_\w/g, function(match, offset, string) {
        if (offset === 0) {
          return match;
        } else {
          return match[1].toUpperCase();
        }
      });

      if (camelKey === 'parentEntry') {
        camelKey = 'parentEntryName';
      }
      camelCaseObj[camelKey] = camelCaseDeep(obj[key]);
    });
    return camelCaseObj;
  } else {
    return obj;
  }
}
