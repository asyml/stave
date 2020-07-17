import { ISinglePack, IOntology, IAnnotation, ILink } from './interfaces';
import { isEntryAnnotation, isEntryLink } from './utils';

export function transformPack(
  rawPack: string,
  rawOntology: string
): [ISinglePack, IOntology] {
  const data = JSON.parse(rawPack);
  const config = JSON.parse(rawOntology);

  const packData = data['py/state'];
  const annotations = packData.annotations.filter((a: any) => !!a['py/state']);

  const configTransformed = {
    constraints: [],
    ...camelCaseDeep(config),
  };

  const formatedAnnotations = annotations
    .map((a: any) => {
      const legendName = getLegendName(a);

      return {
        span: {
          begin: a['py/state']._span.begin,
          end: a['py/state']._span.end,
        },
        id: a['py/state']._tid + '',
        legendId: legendName,
        attributes: getAttrs(configTransformed, a),
      };
    })
    .filter(Boolean);

  const links = packData.links
    .map((link: any) => {
      const legendName = getLegendName(link);

      return {
        id: link['py/state']._tid + '',
        fromEntryId: link['py/state']._parent + '',
        toEntryId: link['py/state']._child + '',
        legendId: legendName,
        attributes: getAttrs(configTransformed, link),
      };
    })
    .filter(Boolean);

  const groups = packData.groups.map((group: any) => {
    const legendName = getLegendName(group);

    return {
      id: group['py/state']._tid + '',
      members: group['py/state']['_members']['py/set'].map((i: any) => i + ''),
      memberType: getGroupType(legendName, configTransformed),
      legendId: legendName,
      attributes: getAttrs(configTransformed, group),
    };
  });

  const pack = {
    text: packData._text,
    annotations: formatedAnnotations,
    links: links,
    groups: groups,
    attributes: packData.meta['py/state'],
  };

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

  const legend = config['definitions'].find(
    (entry: any) => entry.entryName === legendName
  );

  if (!legend || !legend.attributes) {
    return {};
  }

  const attrNames = legend.attributes.map((a: any) => a.name);
  const attrs: any = {};

  Object.keys(a['py/state']).forEach(key => {
    if (attrNames.includes(key)) {
      attrs[key] = a['py/state'][key];
    }
  });

  return attrs;
}

function getGroupType(groupEntryName: any, config: any) {
  const entry = config.definitions.find(
    (ent: any) => ent.entryName === groupEntryName
  );

  if (isEntryAnnotation(config, entry.memberType)) {
    return 'annotation';
  } else if (isEntryLink(config, entry.memberType)) {
    return 'link';
  } else {
    throw new Error('unknown group entry ' + groupEntryName);
  }
}

export function transformBackAnnotation(annotation: IAnnotation): any {
  return {
    'py/object': annotation.legendId,
    'py/state': {
      _span: {
        begin: annotation.span.begin,
        end: annotation.span.end,
        'py/object': 'forte.data.span.Span',
      },
      _tid: annotation.id,
      ...annotation.attributes,
    },
  };
}

export function transformBackLink(link: ILink): any {
  return {
    'py/object': link.legendId,
    'py/state': {
      _child: link.toEntryId,
      _parent: link.toEntryId,
      _tid: link.id,
      ...link.attributes,
    },
  };
}
