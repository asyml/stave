const data = require('./data2.json');
const packData = data['py/state'];

const legendNames = [];
packData.annotations.forEach(ann => {
  const legendName = getLegendName(ann);
  if (legendNames.indexOf(legendName) === -1) {
    legendNames.push(legendName);
  }
});

const legends = legendNames.map((l, i) => {
  return {
    id: `l${i}`,
    name: l
  };
});

const annotations = packData.annotations
  .filter(a => a._span)
  .map(a => {
    const legendName = getLegendName(a);
    const existedLegend = legends.find(l => l.name === legendName);
    return {
      span: {
        begin: a._span.begin,
        end: a._span.end
      },
      id: a._tid,
      legendId: existedLegend.id,
      attributes: getAnnotaionAtt(a)
    };
  });

const links = packData.links.map(link => {
  return {
    id: link._tid,
    fromEntryId: link._parent,
    toEntryId: link._child,
    attributes: getLinkAtt(link)
  };
});

const pack = {
  text: packData._text,
  annotations: annotations,
  links: links,
  groups: [],
  attributes: packData.meta,
  legends: legends
};

console.log(pack);
debugger;
function getLegendName(a) {
  const idSplit = a._tid.split('.');
  return idSplit[idSplit.length - 2];
}

function getAnnotaionAtt(a) {
  let x = { ...a };
  delete x._span;
  delete x._tid;
  delete x._data_pack;
  return x;
}

function getLinkAtt(a) {
  let x = { ...a };
  delete x._tid;
  delete x._child;
  delete x._parent;
  delete x._data_pack;
  return x;
}
