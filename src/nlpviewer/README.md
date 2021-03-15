# NLPViewer Component

## Packaging

We use rollup.js [https://rollupjs.org/guide/en/] to bundle the NLPViewer component for use in client-side applications. Configurations are made in rollup.config.js in combination with tsconfig.json and package.json in this same directory.


To create a new version of the bundle JavaScript, from this nlpviewer directory we simply run:
`yarn && yarn run build`

The module containing NLPViewer React component will be written to nlpviewer/dist/index.es.js (along with its sourcemap).


index.es.js can then be included in other projects along with the following peer dependencies:

'react';
'@material-ui/core/Checkbox';
'@material-ui/icons/CheckBoxOutlineBlank';
'@material-ui/icons/CheckBox';
'@material-ui/lab/Pagination';
'@material-ui/core/Tooltip';
'@material-ui/core/styles';
'@material-ui/core/IconButton';
'@material-ui/icons/Info';
'@material-ui/icons/MoreVert';
'lodash-es';
'react-select';
'@material-ui/core/FormControlLabel';