import { ISinglePack, IOntology } from './interfaces';

export function transformPack(
  rawPack: string,
  rawOntology: string
): [ISinglePack, IOntology] {
  const data = JSON.parse(rawPack);
  const config = JSON.parse(rawOntology);
  const packData = data['py/state'];

  const annotationLegendNames: string[] = [];
  packData.annotations.forEach((ann: any) => {
    const legendName = getLegendName(ann);
    if (annotationLegendNames.indexOf(legendName) === -1) {
      annotationLegendNames.push(legendName);
    }
  });

  const annotationLegends = annotationLegendNames.map((l, i) => {
    return {
      id: l,
      name: l.split('.').pop(),
    };
  });

  const linkLegendNames: string[] = [];
  packData.links.forEach((link: any) => {
    const legendName = getLegendName(link);
    if (linkLegendNames.indexOf(legendName) === -1) {
      linkLegendNames.push(legendName);
    }
  });

  const linkLegends = linkLegendNames.map((l, i) => {
    return {
      id: l,
      name: l.split('.').pop(),
    };
  });

  const groupLegendNames: string[] = [];
  packData.groups.forEach((group: any) => {
    const legendName = getLegendName(group);
    if (groupLegendNames.indexOf(legendName) === -1) {
      groupLegendNames.push(legendName);
    }
  });

  const groupLegends = groupLegendNames.map((l, i) => {
    return {
      id: l,
      name: l.split('.').pop(),
    };
  });

  const annotations = packData.annotations.map((a: any) => {
    const legendName = getLegendName(a);
    const existedLegend: any = annotationLegends.find(l => l.id === legendName);
    return {
      span: {
        begin: a['py/state']._span.begin,
        end: a['py/state']._span.end,
      },
      id: a['py/state']._tid + '',
      legendId: existedLegend.id,
      attributes: getAttrs(config, a),
    };
  });

  const links = packData.links.map((link: any) => {
    const legendName = getLegendName(link);
    const existedLegend: any = linkLegends.find(l => l.id === legendName);
    return {
      id: link['py/state']._tid + '',
      fromEntryId: link['py/state']._parent + '',
      toEntryId: link['py/state']._child + '',
      legendId: existedLegend.id,
      attributes: getAttrs(config, link),
    };
  });

  const groups = packData.groups.map((group: any) => {
    const legendName = getLegendName(group);
    const existedLegend: any = groupLegends.find(l => l.id === legendName);
    return {
      id: group['py/state']._tid + '',
      members: group['py/state']['_members']['py/set'].map((i: any) => i + ''),
      memberType: getGroupType(existedLegend.id, config),
      legendId: existedLegend.id,
      attributes: getAttrs(config, group),
    };
  });

  const pack = {
    text: packData._text,
    annotations: annotations,
    links: links,
    groups: groups,
    attributes: packData.meta,
    legends: {
      annotations: annotationLegends,
      links: linkLegends,
      groups: groupLegends,
    },
  };

  const configTransformed = camelCaseDeep(config);

  return [pack, configTransformed] as any;
}

function getLegendName(a: any) {
  return a['py/object'];
}

function camelCaseDeep(obj: any): any {
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

function getAttrs(config: any, a: any) {
  const legendName = getLegendName(a);
  const legend = config['entry_definitions'].find(
    (entry: any) => entry.entry_name === legendName
  );

  if (!legend || !legend.attributes) {
    return {};
  }

  const attrNames = legend.attributes.map((a: any) => a.attribute_name);
  const attrs: any = {};

  Object.keys(a['py/state']).forEach(key => {
    if (attrNames.includes(key)) {
      attrs[key] = a['py/state'][key];
    }
  });

  return attrs;
}

function getGroupType(groupEntryName: any, config: any) {
  const entry = config.entry_definitions.find(
    (ent: any) => ent.entry_name === groupEntryName
  );

  if (isEntryAnnotation(config, entry.member_type)) {
    return 'annotation';
  } else if (isEntryLink(config, entry.member_type)) {
    return 'link';
  } else {
    throw new Error('unknow group entry ' + groupEntryName);
  }
}

function isEntryAnnotation(config: any, entryName: any) {
  return findEntryNameMatchDeep(
    config,
    entryName,
    'forte.data.ontology.top.Annotation'
  );
}

function isEntryLink(config: any, entryName: any) {
  return findEntryNameMatchDeep(
    config,
    entryName,
    'forte.data.ontology.top.Link'
  );
}

function findEntryNameMatchDeep(
  config: any,
  entryName: any,
  matchName: any
): any {
  if (entryName === matchName) {
    return true;
  }

  const entry = config.entry_definitions.find(
    (ent: any) => ent.entry_name === entryName
  );

  if (!entry) {
    throw new Error('unknow entry name ' + entryName);
  }

  if (entry.parent_entry) {
    return findEntryNameMatchDeep(config, entry.parent_entry, matchName);
  } else {
    return false;
  }
}
