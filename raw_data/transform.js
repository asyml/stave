const path = require('path');
const fs = require('fs');

const configFromArgs = process.argv[2];
const dataFromArgs = process.argv[3];
const config = require(path.resolve(configFromArgs));
const data = require(path.resolve(dataFromArgs));

main();

function main() {
  const packData = data['py/state'];

  const annotationLegendNames = [];
  packData.annotations.forEach(ann => {
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

  const linkLegendNames = [];
  packData.links.forEach(link => {
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

  const groupLegendNames = [];
  packData.groups.forEach(group => {
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

  const annotations = packData.annotations.map(a => {
    const legendName = getLegendName(a);
    const existedLegend = annotationLegends.find(l => l.id === legendName);
    return {
      span: {
        begin: a['py/state']._span.begin,
        end: a['py/state']._span.end,
      },
      id: a['py/state']._tid + '',
      legendId: existedLegend.id,
      attributes: getAttrs(a),
    };
  });

  const links = packData.links.map(link => {
    const legendName = getLegendName(link);
    const existedLegend = linkLegends.find(l => l.id === legendName);
    return {
      id: link['py/state']._tid + '',
      fromEntryId: link['py/state']._parent + '',
      toEntryId: link['py/state']._child + '',
      legendId: existedLegend.id,
      attributes: getAttrs(link),
    };
  });

  const groups = packData.groups.map(group => {
    const legendName = getLegendName(group);
    const existedLegend = groupLegends.find(l => l.id === legendName);
    return {
      id: group['py/state']._tid + '',
      members: group['py/state']['_members']['py/set'].map(i => i + ''),
      memberType: getGroupType(existedLegend.id, config),
      legendId: existedLegend.id,
      attributes: getAttrs(group),
    };
  });

  const pack = {
    text: packData._text,
    annotations: annotations,
    links: links,
    groups: groups,
    attributes: packData.meta['py/state'],
    legends: {
      annotations: annotationLegends,
      links: linkLegends,
      groups: groupLegends,
    },
  };

  fs.writeFileSync(
    path.join(__dirname, '../src/lib/mock-data-2.ts'),
    `import { ISinglePack } from './interfaces';

export const singlePack: ISinglePack = ${JSON.stringify(pack, null, 2)};
`
  );

  const configTransformed = camelCaseDeep(config);
  fs.writeFileSync(
    path.join(__dirname, '../src/lib/mock-config-data.ts'),
    `import { IOntology } from './interfaces';

export const ontology: IOntology = ${JSON.stringify(
      configTransformed,
      null,
      2
    )};
`
  );

  console.log(
    'Done, file created at: src/lib/mock-data-2.ts, src/lib/mock-config-data.ts'
  );
}

function getLegendName(a) {
  return a['py/object'];
}

function camelCaseDeep(obj) {
  if (Array.isArray(obj)) {
    return obj.map(camelCaseDeep);
  } else if (typeof obj === 'object') {
    const camelCaseObj = {};
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

function getAttrs(a) {
  const legendName = getLegendName(a);
  const legend = config['entry_definitions'].find(
    entry => entry.entry_name === legendName
  );

  if (!legend || !legend.attributes) {
    return {};
  }

  const attrNames = legend.attributes.map(a => a.attribute_name);
  const attrs = {};

  Object.keys(a['py/state']).forEach(key => {
    if (attrNames.includes(key)) {
      attrs[key] = a['py/state'][key];
    }
  });

  return attrs;
}

function getGroupType(groupEntryName, config) {
  const entry = config.entry_definitions.find(
    ent => ent.entry_name === groupEntryName
  );

  if (isEntryAnnotation(config, entry.member_type)) {
    return 'annotation';
  } else if (isEntryLink(config, entry.member_type)) {
    return 'link';
  } else {
    throw new Error('unknow group entry ' + groupEntryName);
  }
}

function isEntryAnnotation(config, entryName) {
  return findEntryNameMatchDeep(
    config,
    entryName,
    'forte.data.ontology.top.Annotation'
  );
}

function isEntryLink(config, entryName) {
  return findEntryNameMatchDeep(
    config,
    entryName,
    'forte.data.ontology.top.Link'
  );
}

function findEntryNameMatchDeep(config, entryName, matchName) {
  if (entryName === matchName) {
    return true;
  }

  const entry = config.entry_definitions.find(
    ent => ent.entry_name === entryName
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
