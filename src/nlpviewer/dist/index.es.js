import React, { useState, createContext, useReducer, useContext, memo, useEffect, useRef, useMemo } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Pagination from '@material-ui/lab/Pagination';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { debounce } from 'lodash-es';
import Select from 'react-select';
import { FormControlLabel } from '@material-ui/core';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$d = ".Tab-module_tab_header__1EOAh {\n  border-bottom: 1px solid #ccc;\n  padding: 0 8px;\n}\n\n.Tab-module_tab_body__1A5bB {\n  padding: 8px;\n}\n\n.Tab-module_tab_header_button__1Ed-m {\n  display: inline-block;\n  padding: 4px;\n  cursor: pointer;\n  border: 1px solid transparent;\n  border-bottom: 0;\n}\n\n.Tab-module_tab_header_button__1Ed-m:hover {\n  background: #eee;\n}\n\n.Tab-module_tab_header_button_selected__3FL-- {\n  border: 1px solid #ccc;\n  border-bottom: 0;\n}\n";
var style$b = {"tab_header":"Tab-module_tab_header__1EOAh","tab_body":"Tab-module_tab_body__1A5bB","tab_header_button":"Tab-module_tab_header_button__1Ed-m","tab_header_button_selected":"Tab-module_tab_header_button_selected__3FL--"};
styleInject(css_248z$d);

function Tab(_a) {
    var tabs = _a.tabs, activeTabIndex = _a.activeTabIndex;
    var _b = __read(useState(activeTabIndex || 0), 2), state = _b[0], setState = _b[1];
    return (React.createElement("div", { className: style$b.tab_container },
        React.createElement("div", { className: style$b.tab_header }, tabs.map(function (tab, i) {
            var isSelected = i === state;
            return (React.createElement("div", { key: i, className: style$b.tab_header_button + " " + (isSelected ? style$b.tab_header_button_selected : ''), onClick: function () {
                    setState(i);
                } }, typeof tab.title === 'string' ? tab.title : tab.title()));
        })),
        React.createElement("div", { className: style$b.tab_body }, tabs[state] ? tabs[state].body() : null)));
}

var css_248z$c = ".TextViewer-module_text_viewer__1mC2O {\n  font-size: 13px;\n  min-width: 800px;\n}\n\n.TextViewer-module_layout_container__2HMmx {\n  display: flex;\n  height: calc(100% - 35px);\n}\n\n.TextViewer-module_metadata_side_container__2afD1 {\n  color: #595959;\n  flex: 0 0 250px;\n  padding: 8px 0 8px 10px;\n  overflow: hidden;\n  background: #F6F7F9;\n}\n\n.TextViewer-module_attributes_side_container__aUalT {\n  flex: 0 0 250px;\n  padding: 8px;\n  overflow: hidden;\n}\n\n.TextViewer-module_center_area_container__3Gu60 {\n  border: 1px solid #ccc;\n  border-top: none;\n  height: calc(100vh - 50px);\n  flex: 1;\n  position: relative;\n  transition: background 0.2s;\n  display: flex;\n  flex-direction: column;\n}\n\n.TextViewer-module_attributes_side_container__aUalT h2 {\n  font-size: 16px;\n}\n\n.TextViewer-module_tool_bar_container__17FhO {\n  border-bottom: 1px solid #ccc;\n  padding: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.TextViewer-module_is_adding_annotation__olghG {\n  background: rgba(9, 154, 235, 0.05);\n}\n\n.TextViewer-module_is_grouping_annotation__2O8sj {\n  background: rgba(235, 9, 9, 0.05);\n}\n\n.TextViewer-module_text_area_container__25O4H {\n  height: 100vh;\n  overflow-y: scroll;\n  clear: both;\n  border-bottom: 1px solid #ccc;\n  padding: 16px;\n}\n\n.TextViewer-module_button_action_description__39XPZ {\n  margin-bottom: 4px;\n  font-size: 12px;\n  color: #999;\n}\n\n.TextViewer-module_plugins_container__3nCf3 {\n  max-height: 300px;\n  overflow-y: scroll;\n  border-top: 1px solid #ccc;\n}\n\n.TextViewer-module_scope_selector_container__1sFkm {\n  display: flex;\n  align-items: center;\n}\n\n.TextViewer-module_scope_selector_container__1sFkm > span {\n  margin-right: 8px;\n}\n\n.TextViewer-module_scope_nav_container__3eUb6 {\n  margin-left: 8px;\n}\n\n.TextViewer-module_anno_legends_heading__3g4eY {\n  font-size: 22px;\n  line-height: 26px;\n  font-weight: 500;\n}\n";
var style$a = {"text_viewer":"TextViewer-module_text_viewer__1mC2O","layout_container":"TextViewer-module_layout_container__2HMmx","metadata_side_container":"TextViewer-module_metadata_side_container__2afD1","attributes_side_container":"TextViewer-module_attributes_side_container__aUalT","center_area_container":"TextViewer-module_center_area_container__3Gu60","tool_bar_container":"TextViewer-module_tool_bar_container__17FhO","is_adding_annotation":"TextViewer-module_is_adding_annotation__olghG","is_grouping_annotation":"TextViewer-module_is_grouping_annotation__2O8sj","text_area_container":"TextViewer-module_text_area_container__25O4H","button_action_description":"TextViewer-module_button_action_description__39XPZ","plugins_container":"TextViewer-module_plugins_container__3nCf3","scope_selector_container":"TextViewer-module_scope_selector_container__1sFkm","scope_nav_container":"TextViewer-module_scope_nav_container__3eUb6","anno_legends_heading":"TextViewer-module_anno_legends_heading__3g4eY"};
styleInject(css_248z$c);

// https://css-tricks.com/snippets/javascript/lighten-darken-color/
var colorPalettes = [
    '#099AEB',
    '#FCB527',
    '#00BFA4',
    '#FF9961',
    '#52BA52',
    '#F26DCC',
    '#38D8F7',
    '#0776BA',
    '#E47700',
    '#00BFA4',
    '#FF5B00',
    '#20822B',
    '#D3279F',
    '#09BEE2',
    '#05588D',
    '#BD5800',
    '#00BFA4',
    '#D63D00',
    '#16491C',
    '#A51B88',
    '#068098',
    '#014439',
    '#971900',
    '#72145E', // 24
];

function applyColorToLegend(legends) {
    return legends.map(function (leg, i) {
        return __assign(__assign({}, leg), { color: colorPalettes[i % colorPalettes.length] });
    });
}
function displayAttributeInline(attr_value) {
    var attr_type = typeof attr_value;
    // The way that we display null value and other objects will leave an empty box.
    // We can probably use the ontology to filter out some of these.
    if (attr_type === 'boolean') {
        return attr_value.toString();
    }
    else if (attr_type === 'string') {
        return attr_value.substring(0, 3);
    }
    else if (attr_type === 'number') {
        return attr_value.toString();
    }
    else if (attr_value === null) {
        return '';
    }
    else {
        return '-';
    }
}
function displayAttributeFloating(attr_value) {
    var attr_type = typeof attr_value;
    if (attr_type === 'boolean') {
        return attr_value.toString();
    }
    else if (attr_type === 'string') {
        return attr_value.substring(0, 3);
    }
    else if (attr_type === 'number') {
        return attr_value.toString();
    }
    else if (attr_value === null) {
        return 'N/A';
    }
    else {
        return 'complex object';
    }
}
function displayAttributeSidebar(attr_value) {
    var attr_type = typeof attr_value;
    if (attr_type === 'boolean') {
        return attr_value.toString();
    }
    else if (attr_type === 'string') {
        return attr_value.substring(0, 3);
    }
    else if (attr_type === 'number') {
        return attr_value.toString();
    }
    else if (attr_value === null) {
        return 'N/A';
    }
    else {
        return 'complex object';
    }
}
function notNullOrUndefined(x) {
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
function calculateLinesLevels$1(linksWithPos, lineStartX, lineWidth) {
    var lineMap = {};
    linksWithPos.forEach(function (link) {
        if (link.fromLinkY === link.toLinkY) {
            lineMap[link.fromLinkY] = lineMap[link.fromLinkY] || [];
            lineMap[link.fromLinkY].push(link);
        }
        else {
            var goLeft = shouldMultiLineGoLeft$1(link, lineStartX, lineWidth);
            lineMap[link.fromLinkY] = lineMap[link.fromLinkY] || [];
            lineMap[link.fromLinkY].push(__assign(__assign({}, link), { toLinkY: link.fromLinkY, toLinkX: goLeft ? lineStartX : lineStartX + lineWidth }));
            lineMap[link.toLinkY] = lineMap[link.toLinkY] || [];
            lineMap[link.toLinkY].push(__assign(__assign({}, link), { fromLinkY: link.toLinkY, fromLinkX: goLeft ? lineStartX : lineStartX + lineWidth }));
        }
    });
    Object.keys(lineMap).forEach(function (key) {
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
    function calculateLevelForSingleLine(links) {
        var levels = [];
        links.forEach(function (link) {
            var insertLevel = -1;
            var pushLevel = -1;
            for (var i = 0; i < levels.length; i++) {
                var shouldBreak = false;
                var shouldContinue = false;
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
                if (shouldBreak)
                    break;
                if (shouldContinue)
                    continue;
            }
            if (insertLevel !== -1) {
                levels.splice(insertLevel, 0, [link]);
            }
            else if (pushLevel !== -1) {
                levels[pushLevel].push(link);
            }
            else {
                levels.push([link]);
            }
        });
        projectDownLinksInLevels(levels);
        return levels.filter(function (l) { return l.length; });
    }
    // go through each level from bottom to top
    // - if the link can be push down, move the link to the lower level, until it can't
    //   - to check if the link can be push down, check lower level has intercepts.
    function projectDownLinksInLevels(levels) {
        var _loop_1 = function (i) {
            var level = levels[i];
            var linkstoProject = [];
            for (var j = 0; j < level.length; j++) {
                var link = level[j];
                var levelToProject = -1;
                for (var k = i + 1; k < levels.length; k++) {
                    if (checkLevelOverlap(link, levels[k]) === 'no-overlap') {
                        levelToProject = k;
                    }
                    else {
                        break;
                    }
                }
                if (levelToProject !== -1) {
                    linkstoProject.push([j, levelToProject]);
                }
            }
            levels[i] = level.filter(function (_, i) { return linkstoProject.map(function (l) { return l[0]; }).indexOf(i) === -1; });
            linkstoProject.forEach(function (_a) {
                var _b = __read(_a, 2), linkIndex = _b[0], levelIndex = _b[1];
                levels[levelIndex].push(level[linkIndex]);
            });
        };
        for (var i = levels.length - 2; i >= 0; i--) {
            _loop_1(i);
        }
    }
    function checkLevelOverlap(link, linkGroup) {
        var hasSuperset = false;
        for (var i = 0; i < linkGroup.length; i++) {
            var linkToCompare = linkGroup[i];
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
    function checkLinkOverlap(link1, link2) {
        var _a = __read([
            Math.min(link1.fromLinkX, link1.toLinkX),
            Math.max(link1.fromLinkX, link1.toLinkX),
        ], 2), line1Left = _a[0], line1Right = _a[1];
        var _b = __read([
            Math.min(link2.fromLinkX, link2.toLinkX),
            Math.max(link2.fromLinkX, link2.toLinkX),
        ], 2), line2Left = _b[0], line2Right = _b[1];
        var noOverlap = line1Right <= line2Left || line1Left >= line2Right;
        var isSuperset = line1Left <= line2Left && line1Right >= line2Right;
        var isSubset = line2Left < line1Left && line2Right > line1Right;
        if (noOverlap) {
            return 'no-overlap';
        }
        else if (isSuperset) {
            return 'superset';
        }
        else if (isSubset) {
            return 'subset';
        }
        else {
            return 'intersect';
        }
    }
}
function calculateLinkHeight(linkLevels, gap) {
    var linksHeightMap = {};
    Object.keys(linkLevels).forEach(function (y) {
        linkLevels[y].forEach(function (links, i, arr) {
            links.forEach(function (link) {
                linksHeightMap[link.link.id] = linksHeightMap[link.link.id] || {};
                linksHeightMap[link.link.id][y] = (arr.length - 1 - i) * gap;
            });
        });
    });
    return linksHeightMap;
}
function shouldMultiLineGoLeft$1(link, lineStartX, lineWidth) {
    var topLineX = link.fromLinkY < link.toLinkY ? link.fromLinkX : link.toLinkX;
    return topLineX < lineStartX + lineWidth / 2;
}
function attributeId(legendId, attributeId) {
    return legendId + '_' + attributeId;
}
function shortId(id) {
    return id.split('.').pop();
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
function isAvailableScope(config, entryName) {
    return entryName in config;
}
function isAvailableLegend(config, entryName) {
    // Show all legends if no configuration is provided.
    if (Object.keys(config).length === 0) {
        return true;
    }
    return entryName in config && config[entryName]['is_shown'];
}
function isEntryAnnotation(config, entryName) {
    return findEntryNameMatchDeep(config, entryName, 'forte.data.ontology.top.Annotation');
}
function isEntryLink(config, entryName) {
    return findEntryNameMatchDeep(config, entryName, 'forte.data.ontology.top.Link');
}
function findEntryNameMatchDeep(config, entryName, matchName) {
    if (entryName === matchName) {
        return true;
    }
    var entry = config.definitions.find(function (ent) { return ent.entryName === entryName; });
    if (!entry) {
        return false;
    }
    if (entry.parentEntryName) {
        return findEntryNameMatchDeep(config, entry.parentEntryName, matchName);
    }
    else {
        return false;
    }
}
function camelCaseDeep(obj) {
    if (Array.isArray(obj)) {
        return obj.map(camelCaseDeep);
    }
    else if (typeof obj === 'object') {
        var camelCaseObj_1 = {};
        Object.keys(obj).forEach(function (key) {
            var camelKey = key.replace(/_\w/g, function (match, offset) {
                if (offset === 0) {
                    return match;
                }
                else {
                    return match[1].toUpperCase();
                }
            });
            if (camelKey === 'parentEntry') {
                camelKey = 'parentEntryName';
            }
            camelCaseObj_1[camelKey] = camelCaseDeep(obj[key]);
        });
        return camelCaseObj_1;
    }
    else {
        return obj;
    }
}

var css_248z$b = ".Attributes-module_attribute__1LxRy {\n  margin-bottom: 8px;\n}\n\n.Attributes-module_attribute_name__xLYLG {\n  font-weight: bold;\n  font-size: 12px;\n}\n\n.Attributes-module_attribute_value__NxzMz {\n  font-size: 12px;\n  overflow-wrap: break-word;\n}\n\n.Attributes-module_attribute_value_array__3vfZm {\n  font-size: 11px;\n  padding-left: 16px;\n  margin: 0;\n}\n\n.Attributes-module_attribute_value_dict__2w501 {\n  font-size: 11px;\n  padding-left: 16px;\n  margin: 0;\n}\n";
var style$9 = {"attribute":"Attributes-module_attribute__1LxRy","attribute_name":"Attributes-module_attribute_name__xLYLG","attribute_value":"Attributes-module_attribute_value__NxzMz","attribute_value_array":"Attributes-module_attribute_value_array__3vfZm","attribute_value_dict":"Attributes-module_attribute_value_dict__2w501"};
styleInject(css_248z$b);

function Attributes(_a) {
    var attributes = _a.attributes;
    return (React.createElement(React.Fragment, null, Object.keys(attributes).map(function (key) { return (React.createElement("div", { className: style$9.attribute, key: key },
        React.createElement("div", { className: style$9.attribute_name }, key),
        displayAttributeSidebar(attributes[key]))); })));
}

var css_248z$a = ".AnnotationDetail-module_linked_annotation_list__270Gh {\n  margin: 0;\n  padding-left: 0;\n}\n\n.AnnotationDetail-module_linked_annotation__2vLO- {\n  width: 100%;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  cursor: pointer;\n  padding: 4px;\n  text-decoration: underline;\n  direction: rtl;\n}\n\n.AnnotationDetail-module_annotation_detail_section__2qNu6 {\n  border: 1px solid #ccc;\n  margin-bottom: 8px;\n}\n\n.AnnotationDetail-module_annotation_detail_section__2qNu6 h2 {\n  font-size: 12px;\n  padding: 8px;\n  margin: 0;\n  border-bottom: 1px solid #ccc;\n  background: #f8f8fa;\n}\n\n.AnnotationDetail-module_annotation_detail_section_body__OcdBi {\n  padding: 8px;\n}\n\n.AnnotationDetail-module_linked_annotation_container__3eZhl {\n  margin-bottom: 16px;\n}\n";
var style$8 = {"linked_annotation_list":"AnnotationDetail-module_linked_annotation_list__270Gh","linked_annotation":"AnnotationDetail-module_linked_annotation__2vLO-","annotation_detail_section":"AnnotationDetail-module_annotation_detail_section__2qNu6","annotation_detail_section_body":"AnnotationDetail-module_annotation_detail_section_body__OcdBi","linked_annotation_container":"AnnotationDetail-module_linked_annotation_container__3eZhl"};
styleInject(css_248z$a);

function createContextProvider(reducer, initialState) {
    var StateContext = createContext(undefined);
    var DispatchContext = createContext(undefined);
    function ContextProvider(_a) {
        var children = _a.children;
        var _b = __read(useReducer(reducer, initialState), 2), state = _b[0], dispatch = _b[1];
        return (React.createElement(StateContext.Provider, { value: state },
            React.createElement(DispatchContext.Provider, { value: dispatch }, children)));
    }
    function useContextState() {
        var context = useContext(StateContext);
        if (context === undefined) {
            throw new Error('useContextState must be used with a ContextProvider');
        }
        return context;
    }
    function useContextDispatch() {
        var context = useContext(DispatchContext);
        if (context === undefined) {
            throw new Error('useContextDispatch must be used with a ContextProvider');
        }
        return context;
    }
    return [ContextProvider, useContextState, useContextDispatch];
}

var initialSpacingState = {
    spacingCalculated: false,
    spacedText: null,
    spacedAnnotationSpan: {},
    charMoveMap: new Map(),
    annotationPositions: [],
    textNodeWidth: 0,
    jumpToAnnotation: null,
};
var initialLinkEditState = {
    linkEditFromEntryId: null,
    linkEditToEntryId: null,
    linkEditIsDragging: false,
    linkEditIsCreating: false,
    linkEditSelectedLegendId: null,
};
var initialAnnoEditState = {
    annoEditIsCreating: false,
    annoEditCursorBegin: null,
    annoEditCursorEnd: null,
    annoEditSelectedLegendId: null,
};
var initialUserSelectState = {
    selectedAnnotationId: null,
    halfSelectedAnnotationIds: [],
    highlightedAnnotationIds: [],
    selectedLinkId: null,
    halfSelectedLinkIds: [],
    highlightedLinkIds: [],
};
var initialState = __assign(__assign(__assign(__assign(__assign({ textPack: null, ontology: null, selectedLegendIds: [], selectedLegendAttributeIds: [], collapsedLineIndexes: [] }, initialUserSelectState), initialLinkEditState), initialSpacingState), initialAnnoEditState), { selectedScopeId: null, selectedScopeIndex: 0 });
/**
 *
 *
 * The reducer
 *
 *
 */
function textViewerReducer(state, action) {
    // ll('reducer', action);
    switch (action.type) {
        case 'set-text-pack':
            return __assign(__assign(__assign({}, state), initialSpacingState), { 
                // textPack: action.textPack,
                textPack: __assign(__assign({}, action.textPack), { 
                    // Validate spans.
                    annotations: action.textPack.annotations.map(function (anno) {
                        var text = action.textPack.text;
                        var begin = Math.min(text.length, Math.max(0, anno.span.begin));
                        var end = Math.min(text.length, Math.max(0, anno.span.end));
                        return __assign(__assign({}, anno), { span: { begin: begin, end: end } });
                    }) }), 
                // // TODO: remove the following test code
                selectedLegendIds: state.textPack
                    ? state.selectedLegendIds
                    : [
                    // 'forte.data.ontology.base_ontology.Sentence',
                    // 'forte.data.ontology.ontonotes_ontology.PredicateMention',
                    // 'forte.data.ontology.base_ontology.PredicateArgument',
                    // 'forte.data.ontology.base_ontology.PredicateLink',
                    // 'forte.data.ontology.base_ontology.CoreferenceGroup',
                    // 'forte.data.ontology.base_ontology.Token',
                    // 'forte.data.ontology.base_ontology.CoreferenceMention',
                    // 'forte.data.ontology.base_ontology.CoreferenceGroup2',
                    ], selectedLegendAttributeIds: state.textPack
                    ? state.selectedLegendAttributeIds
                    : [
                    // attributeId(
                    //   'forte.data.ontology.stanfordnlp_ontology.Token',
                    //   'pos_tag'
                    // ),
                    // attributeId('forte.data.ontology.stanfordnlp_ontology.Foo', 'name'),
                    // attributeId(action.textPack.legends.links[0].id, 'rel_type'),
                    // attributeId(
                    //   'forte.onto.base_ontology.PredicateMention',
                    //   'pred_type'
                    // ),
                    // attributeId(
                    //   'forte.onto.base_ontology.PredicateLink',
                    //   'arg_type'
                    // ),
                    // attributeId('forte.data.ontology.base_ontology.Token', 'pos_tag'),
                    ] });
        case 'set-ontology':
            return __assign(__assign(__assign({}, state), initialSpacingState), { ontology: action.ontology });
        case 'select-legend':
            if (state.selectedLegendIds.indexOf(action.legendId) === -1) {
                return __assign(__assign(__assign({}, state), initialSpacingState), { selectedLegendIds: __spreadArray(__spreadArray([], __read(state.selectedLegendIds)), [action.legendId]) });
            }
            else {
                return __assign(__assign(__assign({}, state), initialSpacingState), { selectedLegendIds: __spreadArray([], __read(state.selectedLegendIds)) });
            }
        case 'deselect-legend':
            if (state.selectedLegendIds.indexOf(action.legendId) === -1) {
                return __assign(__assign(__assign({}, state), initialSpacingState), { selectedLegendIds: __spreadArray([], __read(state.selectedLegendIds)) });
            }
            else {
                return __assign(__assign(__assign({}, state), initialSpacingState), { selectedLegendIds: state.selectedLegendIds.filter(function (id) { return id !== action.legendId; }) });
            }
        case 'select-all-legend':
            if (!state.textPack || !state.ontology) {
                return state;
            }
            return __assign(__assign(__assign({}, state), initialSpacingState), { selectedLegendIds: state.ontology.definitions.map(function (entry) { return entry.entryName; }) });
        case 'deselect-all-legend':
            return __assign(__assign(__assign({}, state), initialSpacingState), { selectedLegendIds: [] });
        case 'select-annotation': {
            if (state.linkEditIsCreating && !state.linkEditToEntryId) {
                return __assign(__assign({}, state), { linkEditToEntryId: action.annotationId });
            }
            // if (state.groupEditIsCreating) {
            //   const groupEditAnnotationIds = [...state.groupEditAnnotationIds];
            //   if (groupEditAnnotationIds.includes(action.annotationId)) {
            //     return {
            //       ...state,
            //       groupEditAnnotationIds: state.groupEditAnnotationIds.filter(
            //         id => id !== action.annotationId
            //       ),
            //     };
            //   } else {
            //     groupEditAnnotationIds.push(action.annotationId);
            //     return {
            //       ...state,
            //       groupEditAnnotationIds,
            //     };
            //   }
            // }
            var halfSelectedAnnotationIds_1 = [];
            var halfSelectedLinkIds_1 = [];
            if (state.textPack) {
                state.textPack.links.forEach(function (link) {
                    if (link.fromEntryId === action.annotationId) {
                        halfSelectedLinkIds_1.push(link.id);
                        halfSelectedAnnotationIds_1.push(link.toEntryId);
                        return;
                    }
                    if (link.toEntryId === action.annotationId) {
                        halfSelectedLinkIds_1.push(link.id);
                        halfSelectedAnnotationIds_1.push(link.fromEntryId);
                        return;
                    }
                });
            }
            return __assign(__assign({}, state), { selectedAnnotationId: action.annotationId, selectedLinkId: null, halfSelectedAnnotationIds: halfSelectedAnnotationIds_1, halfSelectedLinkIds: halfSelectedLinkIds_1 });
        }
        case 'deselect-annotation':
            return __assign(__assign({}, state), { selectedAnnotationId: null, halfSelectedAnnotationIds: [], halfSelectedLinkIds: [] });
        case 'highlight-annotation': {
            if (state.linkEditIsDragging) {
                return __assign(__assign({}, state), { highlightedAnnotationIds: [action.annotationId] });
            }
            var highlightedAnnotationIds_1 = [];
            var highlightedLinkIds_1 = [];
            if (state.textPack) {
                state.textPack.links.forEach(function (link) {
                    if (link.fromEntryId === action.annotationId) {
                        highlightedLinkIds_1.push(link.id);
                        highlightedAnnotationIds_1.push(link.toEntryId);
                        return;
                    }
                    if (link.toEntryId === action.annotationId) {
                        highlightedLinkIds_1.push(link.id);
                        highlightedAnnotationIds_1.push(link.fromEntryId);
                        return;
                    }
                });
            }
            return __assign(__assign({}, state), { highlightedAnnotationIds: __spreadArray([
                    action.annotationId
                ], __read(highlightedAnnotationIds_1)), highlightedLinkIds: highlightedLinkIds_1 });
        }
        case 'unhighlight-annotation':
            return __assign(__assign({}, state), { highlightedAnnotationIds: [], highlightedLinkIds: [] });
        case 'delete-annotation': {
            if (!state.textPack) {
                return state;
            }
            var annotations = state.textPack.annotations.filter(function (ann) { return ann.id !== action.annotationId; });
            var links = state.textPack.links.filter(function (link) {
                return link.fromEntryId !== action.annotationId &&
                    link.toEntryId !== action.annotationId;
            });
            var removedLinkIds_1 = state.textPack.links
                .filter(function (link) {
                return link.fromEntryId === action.annotationId ||
                    link.toEntryId === action.annotationId;
            })
                .map(function (l) { return l.id; });
            var groups = state.textPack.groups.map(function (group) {
                var filteredMemberIds = group.members.filter(function (id) {
                    if (group.memberType === 'annotation') {
                        return id !== action.annotationId;
                    }
                    else if (group.memberType === 'link') {
                        return removedLinkIds_1.includes(id);
                    }
                    else {
                        throw new Error('invalid member type ' + group.memberType);
                    }
                });
                return __assign(__assign({}, group), { members: filteredMemberIds });
            });
            return __assign(__assign(__assign({}, state), initialSpacingState), { textPack: __assign(__assign({}, state.textPack), { annotations: annotations,
                    links: links,
                    groups: groups }) });
        }
        case 'select-legend-attribute': {
            var selectedLegendAttributeIds = state.selectedLegendAttributeIds.filter(function (id) {
                return id.indexOf(action.legendId) !== 0;
            });
            selectedLegendAttributeIds.push(attributeId(action.legendId, action.attributeId));
            return __assign(__assign(__assign({}, state), initialSpacingState), { selectedLegendAttributeIds: selectedLegendAttributeIds });
        }
        case 'deselect-legend-attribute': {
            var selectedLegendAttributeIds = state.selectedLegendAttributeIds.filter(function (id) {
                return id.indexOf(action.legendId) !== 0;
            });
            return __assign(__assign(__assign({}, state), initialSpacingState), { selectedLegendAttributeIds: selectedLegendAttributeIds });
        }
        case 'reset-calculated-text-space':
            return __assign(__assign({}, state), initialSpacingState);
        case 'set-spaced-annotation-span':
            return __assign(__assign({}, state), { spacingCalculated: true, spacedText: action.spacedText, charMoveMap: action.charMoveMap, annotationPositions: action.annotationPositions, textNodeWidth: action.textNodeWidth });
        case 'collapse-line':
            if (state.collapsedLineIndexes.indexOf(action.lineIndex) > -1) {
                return state;
            }
            return __assign(__assign(__assign({}, state), initialSpacingState), { collapsedLineIndexes: __spreadArray(__spreadArray([], __read(state.collapsedLineIndexes)), [action.lineIndex]) });
        case 'uncollapse-line':
            if (state.collapsedLineIndexes.indexOf(action.lineIndex) === -1) {
                return state;
            }
            return __assign(__assign(__assign({}, state), initialSpacingState), { collapsedLineIndexes: state.collapsedLineIndexes.filter(function (i) { return i !== action.lineIndex; }) });
        case 'select-link': {
            if (state.linkEditIsCreating && !state.linkEditToEntryId) {
                return state;
            }
            var halfSelectedAnnotationIds = [];
            if (state.textPack) {
                var link = state.textPack.links.find(function (l) { return l.id === action.linkId; });
                if (link) {
                    halfSelectedAnnotationIds = [link.fromEntryId, link.toEntryId];
                }
            }
            return __assign(__assign({}, state), { selectedLinkId: action.linkId, halfSelectedAnnotationIds: halfSelectedAnnotationIds, highlightedLinkIds: [], halfSelectedLinkIds: [], selectedAnnotationId: null });
        }
        case 'deselect-link':
            return __assign(__assign({}, state), { selectedLinkId: null });
        case 'highlight-link': {
            if (state.linkEditIsDragging) {
                return state;
            }
            var heighligAnnotationIds = state.highlightedAnnotationIds;
            if (state.textPack) {
                var link = state.textPack.links.find(function (l) { return l.id === action.linkId; });
                if (link) {
                    heighligAnnotationIds = [link.fromEntryId, link.toEntryId];
                }
            }
            return __assign(__assign({}, state), { highlightedLinkIds: [action.linkId], highlightedAnnotationIds: heighligAnnotationIds });
        }
        case 'unhighlight-link':
            return __assign(__assign({}, state), { highlightedLinkIds: [], highlightedAnnotationIds: [] });
        case 'delete-link': {
            if (!state.textPack) {
                return state;
            }
            var links = state.textPack.links.filter(function (link) { return link.id !== action.linkId; });
            var groups = state.textPack.groups.map(function (group) {
                if (group.memberType === 'link') {
                    var filteredMemberIds = group.members.filter(function () { return !action.linkId; });
                    return __assign(__assign({}, group), { members: filteredMemberIds });
                }
                else {
                    return group;
                }
            });
            return __assign(__assign(__assign({}, state), initialSpacingState), { textPack: __assign(__assign({}, state.textPack), { links: links,
                    groups: groups }) });
        }
        case 'start-create-link':
            if (state.linkEditIsCreating) {
                if (state.linkEditFromEntryId === action.annotationId) {
                    return __assign(__assign({}, state), initialLinkEditState);
                }
                else {
                    return state;
                }
            }
            return __assign(__assign({}, state), { linkEditFromEntryId: action.annotationId, linkEditIsCreating: true, linkEditIsDragging: true });
        case 'cancel-create-link':
            return __assign(__assign({}, state), initialLinkEditState);
        case 'stop-create-link-dragging':
            if (!action.hasMoved) {
                return __assign(__assign({}, state), { linkEditIsDragging: false });
            }
            if (state.linkEditToEntryId) {
                return __assign(__assign({}, state), { linkEditIsDragging: false });
            }
            return __assign(__assign({}, state), { linkEditIsDragging: false, linkEditIsCreating: false, linkEditFromEntryId: null, linkEditToEntryId: null });
        case 'end-create-link':
            if (state.linkEditToEntryId &&
                state.linkEditFromEntryId &&
                state.linkEditSelectedLegendId) {
                return __assign(__assign({}, state), { linkEditIsDragging: false, linkEditIsCreating: false, linkEditFromEntryId: null, linkEditToEntryId: null });
            }
            else {
                return __assign(__assign(__assign({}, state), initialLinkEditState), { linkEditSelectedLegendId: state.linkEditSelectedLegendId });
            }
        case 'set-create-link-target':
            if (state.linkEditIsDragging) {
                return __assign(__assign({}, state), { linkEditToEntryId: action.annotationId });
            }
            else if (state.linkEditIsCreating) {
                return state;
            }
            else {
                return __assign(__assign({}, state), { linkEditFromEntryId: action.annotationId });
            }
        case 'link-edit-select-legend-type':
            return __assign(__assign({}, state), { linkEditSelectedLegendId: action.legendId });
        case 'start-annotation-edit':
            return __assign(__assign(__assign(__assign({}, state), initialLinkEditState), initialUserSelectState), { 
                // ...initialGroupEditState,
                annoEditIsCreating: true });
        case 'exit-annotation-edit':
            return __assign(__assign({}, state), initialAnnoEditState);
        case 'annotation-edit-set-begin':
            return __assign(__assign({}, state), { annoEditCursorBegin: action.begin });
        case 'annotation-edit-set-end': {
            if (state.annoEditCursorBegin !== null &&
                state.annoEditCursorBegin > action.end) {
                return __assign(__assign({}, state), { annoEditCursorBegin: action.end });
            }
            else {
                return __assign(__assign({}, state), { annoEditCursorEnd: action.end });
            }
        }
        case 'annotation-edit-cancel': {
            return __assign(__assign(__assign({}, state), initialAnnoEditState), { annoEditIsCreating: true });
        }
        case 'annotation-edit-select-text': {
            return __assign(__assign({}, state), { annoEditCursorBegin: action.begin, annoEditCursorEnd: action.end });
        }
        case 'annotation-edit-select-legend-type':
            return __assign(__assign({}, state), { annoEditSelectedLegendId: action.legendId });
        case 'annotation-edit-submit': {
            return __assign(__assign({}, state), { annoEditCursorBegin: null, annoEditCursorEnd: null });
        }
        case 'jump-to-annotation': {
            return __assign(__assign({}, state), { jumpToAnnotation: action.annotationId });
        }
        case 'jump-to-annotation-done': {
            return __assign(__assign({}, state), { jumpToAnnotation: null });
        }
        case 'add-member-to-group': {
            var textPack = state.textPack;
            var groups = textPack.groups.map(function (g) {
                if (g.id === action.groupId) {
                    return __assign(__assign({}, g), { members: __spreadArray(__spreadArray([], __read(g.members)), [action.memberId]) });
                }
                else {
                    return g;
                }
            });
            return __assign(__assign({}, state), { textPack: __assign(__assign({}, textPack), { groups: groups }) });
        }
        case 'set-scope': {
            return __assign(__assign(__assign({}, state), initialSpacingState), { selectedScopeIndex: 0, selectedScopeId: action.scopeId });
        }
        case 'set-scope-index': {
            return __assign(__assign(__assign({}, state), initialSpacingState), { selectedScopeIndex: action.scopeIndex });
        }
        case 'prev-scope-item': {
            var prevScopeIndex = state.selectedScopeIndex <= 0 ? 0 : state.selectedScopeIndex - 1;
            return __assign(__assign(__assign({}, state), initialSpacingState), { selectedScopeIndex: prevScopeIndex });
        }
        case 'next-scope-item': {
            if (!state.textPack)
                return state;
            var scopeAnnotations = state.textPack.annotations.filter(function (ann) { return ann.legendId === state.selectedScopeId; });
            var prevScopeIndex = state.selectedScopeIndex >= scopeAnnotations.length
                ? 0
                : state.selectedScopeIndex + 1;
            return __assign(__assign(__assign({}, state), initialSpacingState), { selectedScopeIndex: prevScopeIndex });
        }
    }
}
var __currentState = initialState;
function storeCurrentStateReducer(state) {
    __currentState = state;
    return state;
}
function combineReducers() {
    var reducers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        reducers[_i] = arguments[_i];
    }
    return function (state, action) {
        reducers.forEach(function (reducer) {
            state = reducer(state, action);
        });
        return state;
    };
}
function getState() {
    return __currentState;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var w = window;
w.getState = getState;
var _a = __read(createContextProvider(combineReducers(textViewerReducer, storeCurrentStateReducer), initialState), 3), TextViewerProvider = _a[0], useTextViewerState = _a[1], useTextViewerDispatch = _a[2];

function AnnotationDetail(_a) {
    var annotation = _a.annotation, parentAnnotations = _a.parentAnnotations, childAnnotations = _a.childAnnotations, onEvent = _a.onEvent, options = _a.options;
    var dispatch = useTextViewerDispatch();
    function renderLinkedAnnotations(annotations, title) {
        if (!annotations.length) {
            return null;
        }
        return (React.createElement("div", { className: style$8.linked_annotation_container },
            React.createElement("strong", null, title),
            annotations.map(function (ann) {
                return (React.createElement("span", { key: ann.id, title: ann.id, className: style$8.linked_annotation, onClick: function () {
                        dispatch({
                            type: 'select-annotation',
                            annotationId: ann.id,
                        });
                    } }, shortId(ann.id)));
            })));
    }
    return (React.createElement("div", { className: style$8.annotation_detail },
        renderLinkedAnnotations(parentAnnotations, '↘ parents'),
        renderLinkedAnnotations(childAnnotations, '↗ children'),
        React.createElement("div", { className: style$8.annotation_detail_section },
            React.createElement("h2", null, "Attributes"),
            React.createElement("div", { className: style$8.annotation_detail_section_body },
                React.createElement(Attributes, { attributes: __assign({ id: annotation.id }, annotation.attributes) }))),
        (options && options.allowEditAnnotations) && (React.createElement("div", null,
            React.createElement("button", { onClick: function () {
                    if (onEvent) {
                        onEvent({
                            type: 'annotation-delete',
                            annotationId: annotation.id,
                        });
                    }
                    dispatch({
                        type: 'delete-annotation',
                        annotationId: annotation.id,
                    });
                } }, "remove")))));
}

function LinkDetail(_a) {
    var link = _a.link, onEvent = _a.onEvent;
    var dispatch = useTextViewerDispatch();
    if (link === null) {
        return null;
    }
    return (React.createElement("div", null,
        React.createElement(Attributes, { attributes: __assign({ id: link.id }, link.attributes) }),
        React.createElement("div", null,
            React.createElement("button", { onClick: function () {
                    if (onEvent) {
                        onEvent({
                            type: 'link-delete',
                            linkId: link.id,
                        });
                    }
                    dispatch({
                        type: 'delete-link',
                        linkId: link.id,
                    });
                } }, "remove"))));
}

var css_248z$9 = ".LegendList-module_list__39_Vk {\n  list-style: none;\n  padding-left: 0;\n  margin: 0;\n  padding: 8px;\n}\n\n.LegendList-module_list__39_Vk li {\n  margin-bottom: 10px;\n}\n\n.LegendList-module_lengend_container__3fS2R {\n  display: flex;\n  align-items: center;\n  height: 32px;\n  padding: 2px 4px;\n}\n\n.LegendList-module_lengend_container__3fS2R:hover {\n  cursor: pointer;\n  background: #f8f8f8;\n}\n\n.LegendList-module_list__39_Vk li span {\n  vertical-align: middle;\n  margin-left: 4px;\n  pointer-events: none;\n  padding: 2px 4px;\n  display: inline-block;\n  user-select: none;\n  border-radius: 3px;\n}\n\n.LegendList-module_metadata__vxVfG {\n  margin-bottom: 8px;\n}\n.LegendList-module_metadata_name__3oLHH {\n  font-weight: bold;\n  font-size: 10px;\n}\n\n.LegendList-module_metadata_value__uMgfy {\n  font-size: 11px;\n  overflow-wrap: break-word;\n  width: 234px; /* 250 - 16 */\n}\n\n.LegendList-module_attribute_name_container__17zwl {\n  margin-left: 16px;\n}\n\n.LegendList-module_attribute_name__3gbNb {\n  padding: 2px 4px 2px 14px;\n}\n\n.LegendList-module_attribute_name__3gbNb input {\n  margin-right: 4px;\n}\n\n.LegendList-module_attribute_name__3gbNb:hover {\n  cursor: pointer;\n  background: #f8f8f8;\n}\n\n.LegendList-module_annotation_legend_container__1y7LE {\n  margin-bottom: 8px;\n  color: #595959;\n}\n\n.LegendList-module_annotation_legend_container__1y7LE h2 {\n  font-size: 12px;\n  padding: 8px;\n  margin: 0;\n  border-bottom: 1px solid #ccc;\n  background: #f8f8fa;\n}\n";
var style$7 = {"list":"LegendList-module_list__39_Vk","lengend_container":"LegendList-module_lengend_container__3fS2R","metadata":"LegendList-module_metadata__vxVfG","metadata_name":"LegendList-module_metadata_name__3oLHH","metadata_value":"LegendList-module_metadata_value__uMgfy","attribute_name_container":"LegendList-module_attribute_name_container__17zwl","attribute_name":"LegendList-module_attribute_name__3gbNb","annotation_legend_container":"LegendList-module_annotation_legend_container__1y7LE"};
styleInject(css_248z$9);

function LegendList(_a) {
    var legends = _a.legends, selectedLegendIds = _a.selectedLegendIds, selectedLegendAttributeIds = _a.selectedLegendAttributeIds, dispatch = _a.dispatch;
    return (React.createElement("div", { className: style$7.annotation_legend_container },
        React.createElement("ul", { className: style$7.list }, legends.map(function (legend, i) {
            var isSelected = selectedLegendIds.indexOf(legend.entryName) > -1;
            return (React.createElement("li", { key: legend.entryName + i },
                React.createElement("div", { className: style$7.lengend_container, onClick: function () {
                        isSelected
                            ? dispatch({
                                type: 'deselect-legend',
                                legendId: legend.entryName,
                            })
                            : dispatch({
                                type: 'select-legend',
                                legendId: legend.entryName,
                            });
                    } },
                    React.createElement("input", { type: "checkbox", readOnly: true, checked: isSelected }),
                    React.createElement("div", { style: {
                            backgroundColor: legend.color,
                            color: '#595959',
                            fontWeight: 500,
                            padding: '5px',
                            marginLeft: '10px',
                            minWidth: '193px',
                            borderTopLeftRadius: '6px',
                            borderBottomLeftRadius: '6px',
                            fontSize: '16px',
                        } }, legend.entryName.split('.').pop()),
                    React.createElement("div", { style: {
                            position: 'relative',
                            right: 40,
                            top: 2,
                        } },
                        React.createElement(IconButton, { "aria-label": "More" },
                            React.createElement(MoreVertIcon, { fontSize: "small" })))),
                legend.attributes ? (React.createElement("div", { className: style$7.attribute_name_container }, legend.attributes.map(function (attr) {
                    var isSelected = selectedLegendAttributeIds.indexOf(attributeId(legend.entryName, attr.name)) > -1;
                    return (React.createElement("div", { className: style$7.attribute_name, key: attr.name, onClick: function () {
                            isSelected
                                ? dispatch({
                                    type: 'deselect-legend-attribute',
                                    legendId: legend.entryName,
                                    attributeId: attr.name,
                                })
                                : dispatch({
                                    type: 'select-legend-attribute',
                                    legendId: legend.entryName,
                                    attributeId: attr.name,
                                });
                        } },
                        React.createElement("input", { type: "radio", readOnly: true, checked: isSelected }),
                        attr.name));
                }))) : null));
        }))));
}

function TextDetail(_a) {
    var attributes = _a.attributes, annotationLegends = _a.annotationLegends, linkLegends = _a.linkLegends;
    var _b = useTextViewerState(), selectedLegendIds = _b.selectedLegendIds, selectedLegendAttributeIds = _b.selectedLegendAttributeIds;
    var HtmlTooltip = withStyles(function (theme) { return ({
        tooltip: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            minWidth: 200,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }); })(Tooltip);
    var dispatch = useTextViewerDispatch();
    return (React.createElement(React.Fragment, null,
        React.createElement(HtmlTooltip, { title: React.createElement(React.Fragment, null,
                "Metadata",
                React.createElement(Attributes, { attributes: attributes })) },
            React.createElement(IconButton, { "aria-label": "Info Metadata", style: { marginLeft: 190, marginTop: -55 } },
                React.createElement(InfoIcon, null))),
        React.createElement(LegendList, { legends: __spreadArray(__spreadArray([], __read(annotationLegends)), __read(linkLegends)), selectedLegendIds: selectedLegendIds, selectedLegendAttributeIds: selectedLegendAttributeIds, dispatch: dispatch })));
}

var css_248z$8 = ".TextArea-module_text_area_container__Csp3V {\n  position: relative;\n  opacity: 0;\n}\n\n.TextArea-module_text_area_container_visible__1EjbC {\n  opacity: 1;\n  transition: opacity 0.2s;\n}\n\n.TextArea-module_text_node_container__3aP8z {\n  white-space: pre-wrap;\n  position: relative;\n  z-index: 20;\n  pointer-events: none;\n  line-height: 20px;\n  min-width: 350px;\n}\n\n.TextArea-module_annotation_line_toggle__BM_D9 {\n  position: absolute;\n  left: -22px;\n  width: 18px;\n  font-size: 10px;\n  padding: 0px;\n}\n\n.TextArea-module_link_edit_container__12W76 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 10;\n  transform: translateZ(0);\n}\n\n.TextArea-module_ann_edit_rect__jyhMB {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.TextArea-module_annotation_text_selection_cursor__2Lesp {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 7;\n}\n\n.TextArea-module_cursor__31wNo {\n  border-left: 3px solid transparent;\n  border-right: 3px solid transparent;\n  border-top: 8px solid black;\n  transform: translate(-50%, 0);\n  display: block;\n  margin-top: -8px;\n  animation: TextArea-module_floating__1G3HQ 0.36s ease-in 0s infinite alternate;\n}\n\n@keyframes TextArea-module_floating__1G3HQ {\n  from {\n    transform: translate(-50%, -5px);\n  }\n  to {\n    transform: translate(-50%, 0);\n  }\n}\n\n.TextArea-module_annotations_container__2gbCx {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 5;\n}\n\n.TextArea-module_links_container__3x3sn {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1;\n}\n";
var style$6 = {"text_area_container":"TextArea-module_text_area_container__Csp3V","text_area_container_visible":"TextArea-module_text_area_container_visible__1EjbC","text_node_container":"TextArea-module_text_node_container__3aP8z","annotation_line_toggle":"TextArea-module_annotation_line_toggle__BM_D9","link_edit_container":"TextArea-module_link_edit_container__12W76","ann_edit_rect":"TextArea-module_ann_edit_rect__jyhMB","annotation_text_selection_cursor":"TextArea-module_annotation_text_selection_cursor__2Lesp","cursor":"TextArea-module_cursor__31wNo","floating":"TextArea-module_floating__1G3HQ","annotations_container":"TextArea-module_annotations_container__2gbCx","links_container":"TextArea-module_links_container__3x3sn"};
styleInject(css_248z$8);

var fontWidth = 6;
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
function spaceOutText(annotations, text, links, selectedLegendIds, selectedLegendAttributeIds, collapsedLinesIndex) {
    var existSpaceEl = document.getElementById('text-spacer');
    if (existSpaceEl) {
        existSpaceEl.remove();
    }
    var root = document.getElementById('root');
    var textNodeEl = document.createElement('div');
    var scrollbarWidth = getScrollbarWidth();
    var otherWidth = 250 * 2 + 16 * 2 + scrollbarWidth; // two side panel + 2 padding
    textNodeEl.id = 'text-spacer';
    textNodeEl.style.width = "calc(100% - " + otherWidth + "px)";
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
    var textNode = textNodeEl && textNodeEl.childNodes[0];
    var textAreaRect = textNodeEl.getBoundingClientRect();
    var textAreaDimensionWithEmptySpace = {
        width: textAreaRect.width,
        height: textAreaRect.height,
    };
    // add invisibleAnnotations for each words,
    // so that long annotation can be broken down
    var invisibleAnnotations = [];
    var currPosition = -1;
    text.split(/\s/).forEach(function (text, i) {
        invisibleAnnotations.push({
            span: { begin: currPosition + 1, end: currPosition + 1 + text.length },
            id: 'i-' + i,
            legendId: 'invisible',
            attributes: {},
        });
        currPosition = currPosition + 1 + text.length;
    });
    annotations = annotations.concat(invisibleAnnotations);
    var annotationsPos = annotations.map(function (anno) {
        var range = document.createRange();
        range.setStart(textNode, anno.span.begin);
        range.setEnd(textNode, anno.span.end);
        var rects = Array.from(range.getClientRects());
        return {
            rects: rects.map(function (rect) { return ({
                x: rect.x - textAreaRect.left,
                y: rect.y - textAreaRect.top,
                width: rect.width,
                height: rect.height,
            }); }),
        };
    });
    var annotationsWithPos = mergeAnnotationWithPosition(annotationsPos, annotations).filter(function (ann) {
        return ann.annotation.legendId === 'invisible' ||
            selectedLegendIds.indexOf(ann.annotation.legendId) > -1;
    });
    var linksWithPos = mergeLinkWithPosition(links, annotationsWithPos).filter(function (link) { return selectedLegendIds.indexOf(link.link.legendId) > -1; });
    var spaceMap = calculateSpaceMap(annotationsWithPos, linksWithPos, selectedLegendAttributeIds);
    var _a = __read(calculateNewText(annotations, text, spaceMap, ' '), 2), calculatedSpacedTextWithEmptySpace = _a[0], calculatedSpacedAnnotationSpanWithEmptySpace = _a[1];
    textNodeEl.textContent = calculatedSpacedTextWithEmptySpace;
    var textAreaRectWithEmptySpace = textNodeEl.getBoundingClientRect();
    var textNodeWithEmptySpace = textNodeEl && textNodeEl.childNodes[0];
    var annotationsPosWithEmptySpaces = annotations.map(function (anno) {
        var range = document.createRange();
        range.setStart(textNodeWithEmptySpace, calculatedSpacedAnnotationSpanWithEmptySpace[anno.id].begin);
        range.setEnd(textNodeWithEmptySpace, calculatedSpacedAnnotationSpanWithEmptySpace[anno.id].end);
        var rects = Array.from(range.getClientRects());
        return {
            rects: rects.map(function (rect) { return ({
                x: rect.x - textAreaRectWithEmptySpace.left,
                y: rect.y - textAreaRectWithEmptySpace.top,
                width: rect.width,
                height: rect.height,
            }); }),
        };
    });
    var annotationsWithPosWithEmptySpaces = mergeAnnotationWithPosition(annotationsPosWithEmptySpaces, annotations).filter(function (ann) {
        return ann.annotation.legendId === 'invisible' ||
            selectedLegendIds.indexOf(ann.annotation.legendId) > -1;
    });
    var linksWithPosWithEmptySpaces = mergeLinkWithPosition(links, annotationsWithPosWithEmptySpaces).filter(function (link) { return selectedLegendIds.indexOf(link.link.legendId) > -1; });
    var lineStartXWithEmptySpace = 0; //textAreaDimensionWithEmptySpace.x;
    var lineWidthWithEmptySpace = textAreaDimensionWithEmptySpace.width;
    var linesLevelsWithNewline = __assign(__assign({}, getLevelsFromJustAnnotations(annotationsWithPosWithEmptySpaces)), calculateLinesLevels(linksWithPosWithEmptySpaces, lineStartXWithEmptySpace, lineWidthWithEmptySpace));
    var spaceMapWithNewline = {};
    Object.keys(linesLevelsWithNewline).forEach(function (lineHeight, i) {
        var levelNum = linesLevelsWithNewline[lineHeight].length;
        var annotationsAtCurrLine = getAnnotationsByLine(annotationsWithPosWithEmptySpaces, +lineHeight);
        var firstAnnotation = annotationsAtCurrLine[0];
        var fullOfInvisible = annotationsAtCurrLine.every(function (ann) { return ann.annotation.legendId === 'invisible'; });
        spaceMapWithNewline[firstAnnotation.annotation.id] = {
            annotationWithPos: {
                position: firstAnnotation.position,
                annotation: __assign(__assign({}, firstAnnotation.annotation), { span: {
                        begin: calculatedSpacedAnnotationSpanWithEmptySpace[firstAnnotation.annotation.id].begin,
                        end: calculatedSpacedAnnotationSpanWithEmptySpace[firstAnnotation.annotation.id].end,
                    } }),
            },
            spaceToMove: fullOfInvisible
                ? 0
                : calculateLinesToInsertByLevelNum(collapsedLinesIndex, i, levelNum),
        };
    });
    var updatedTextPackWithNewline = {
        text: calculatedSpacedTextWithEmptySpace,
        annotations: annotations.map(function (ann) {
            return __assign(__assign({}, ann), { span: {
                    begin: calculatedSpacedAnnotationSpanWithEmptySpace[ann.id].begin,
                    end: calculatedSpacedAnnotationSpanWithEmptySpace[ann.id].end,
                } });
        }),
    };
    var _b = __read(calculateNewText(updatedTextPackWithNewline.annotations, updatedTextPackWithNewline.text, spaceMapWithNewline, '\n', 'before'), 2), textWithNewLine = _b[0], annotationSpanMap = _b[1];
    textNodeEl.textContent = textWithNewLine;
    var textNodeWithNewline = textNodeEl && textNodeEl.childNodes[0];
    var textAreaRectWithNewLine = textNodeEl.getBoundingClientRect();
    var lineWidthWithNewLine = textAreaRectWithNewLine.width;
    var annotationPositionsWithNewLine = annotations
        .filter(function (a) { return a.legendId !== 'invisible'; })
        .map(function (anno) {
        var range = document.createRange();
        range.setStart(textNodeWithNewline, annotationSpanMap[anno.id].begin);
        range.setEnd(textNodeWithNewline, annotationSpanMap[anno.id].end);
        var rects = Array.from(range.getClientRects());
        if (rects.length > 1) {
            rects = rects.filter(function (rect) { return rect.width > 5; });
        }
        return {
            rects: rects.map(function (rect) { return ({
                x: rect.x - textAreaRectWithNewLine.left,
                y: rect.y - textAreaRectWithNewLine.top,
                width: rect.width,
                height: rect.height,
            }); }),
        };
    });
    var charMoveMap = new Map();
    Object.keys(spaceMap).forEach(function (annId) {
        var annotation = annotations.find(function (ann) { return ann.id === annId; });
        if (annotation) {
            charMoveMap.set(annotation.span.end, spaceMap[annId].spaceToMove);
        }
    });
    Object.keys(spaceMapWithNewline).forEach(function (annId) {
        var annotation = annotations.find(function (ann) { return ann.id === annId; });
        if (annotation) {
            charMoveMap.set(annotation.span.begin - 1, spaceMapWithNewline[annId].spaceToMove +
                (charMoveMap.get(annotation.span.begin - 1) || 0));
        }
    });
    return {
        spacedText: textWithNewLine,
        charMoveMap: charMoveMap,
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
function mergeAnnotationWithPosition(annotationPositions, annotations) {
    return (annotationPositions || []).map(function (position, i) {
        return {
            position: position,
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
function mergeLinkWithPosition(links, annotationWithPosition) {
    return links
        .map(function (link) {
        var fromEntryWithPosition = annotationWithPosition.find(function (ann) { return ann.annotation.id === link.fromEntryId; });
        var toEntryWithPosition = annotationWithPosition.find(function (ann) { return ann.annotation.id === link.toEntryId; });
        if (fromEntryWithPosition && toEntryWithPosition) {
            var fromEntryX = fromEntryWithPosition.position.rects[0].x;
            var fromEntryY = fromEntryWithPosition.position.rects[0].y;
            var fromEntryWidth = fromEntryWithPosition.position.rects[0].width;
            var toEntryX = toEntryWithPosition.position.rects[0].x;
            var toEntryY = toEntryWithPosition.position.rects[0].y;
            var toEntryWidth = toEntryWithPosition.position.rects[0].width;
            var fromLinkX = fromEntryX + fromEntryWidth / 2;
            var toLinkX = toEntryX + toEntryWidth / 2;
            return {
                link: link,
                fromEntryWithPos: fromEntryWithPosition,
                toEntryWithPos: toEntryWithPosition,
                fromLinkX: fromLinkX,
                toLinkX: toLinkX,
                fromLinkY: fromEntryY,
                toLinkY: toEntryY,
            };
        }
        else {
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
function calculateNewText(annotations, text, spaceMap, fill, insertDirection) {
    if (insertDirection === void 0) { insertDirection = 'after'; }
    var textSplit = text.split('');
    var sortedSpaceMap = Object.keys(spaceMap)
        .filter(function (annId) { return spaceMap[annId].spaceToMove > 0; })
        .map(function (annId) { return spaceMap[annId]; })
        .sort(function (annA, annB) {
        return (annA.annotationWithPos.annotation.span.end -
            annB.annotationWithPos.annotation.span.end);
    });
    var spacedAnnotationSpan = {};
    annotations.forEach(function (ann) {
        spacedAnnotationSpan[ann.id] = {
            begin: ann.span.begin,
            end: ann.span.end,
        };
    });
    var _loop_1 = function (i) {
        var space = sortedSpaceMap[i];
        var spaceFromLast = sortedSpaceMap[sortedSpaceMap.length - i - 1];
        var emptySpaces = Array(spaceFromLast.spaceToMove).fill(fill).join('');
        if (insertDirection === 'before') {
            textSplit.splice(spaceFromLast.annotationWithPos.annotation.span.begin, 0, emptySpaces);
            var begin_1 = spacedAnnotationSpan[space.annotationWithPos.annotation.id].begin;
            Object.keys(spacedAnnotationSpan).forEach(function (annId) {
                if (spacedAnnotationSpan[annId].begin >= begin_1) {
                    spacedAnnotationSpan[annId].begin =
                        spacedAnnotationSpan[annId].begin + space.spaceToMove;
                    spacedAnnotationSpan[annId].end =
                        spacedAnnotationSpan[annId].end + space.spaceToMove;
                }
                else if (spacedAnnotationSpan[annId].begin < begin_1 &&
                    spacedAnnotationSpan[annId].end > begin_1) {
                    spacedAnnotationSpan[annId].end =
                        spacedAnnotationSpan[annId].end + space.spaceToMove;
                }
                else ;
            });
        }
        else {
            textSplit.splice(spaceFromLast.annotationWithPos.annotation.span.end, 0, emptySpaces);
            var end_1 = spacedAnnotationSpan[space.annotationWithPos.annotation.id].end;
            Object.keys(spacedAnnotationSpan).forEach(function (annId) {
                if (spacedAnnotationSpan[annId].begin >= end_1) {
                    spacedAnnotationSpan[annId].begin =
                        spacedAnnotationSpan[annId].begin + space.spaceToMove;
                    spacedAnnotationSpan[annId].end =
                        spacedAnnotationSpan[annId].end + space.spaceToMove;
                }
                else if (spacedAnnotationSpan[annId].begin < end_1 &&
                    spacedAnnotationSpan[annId].end > end_1) {
                    spacedAnnotationSpan[annId].end =
                        spacedAnnotationSpan[annId].end + space.spaceToMove;
                }
                else ;
            });
        }
    };
    for (var i = 0; i < sortedSpaceMap.length; i++) {
        _loop_1(i);
    }
    var spacedText = textSplit.join('');
    return [spacedText, spacedAnnotationSpan];
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
function calculateLinesLevels(linksWithPos, lineStartX, lineWidth) {
    var lineMap = {};
    linksWithPos.forEach(function (link) {
        if (link.fromLinkY === link.toLinkY) {
            lineMap[link.fromLinkY] = lineMap[link.fromLinkY] || [];
            lineMap[link.fromLinkY].push(link);
        }
        else {
            var goLeft = shouldMultiLineGoLeft(link, lineStartX, lineWidth);
            lineMap[link.fromLinkY] = lineMap[link.fromLinkY] || [];
            lineMap[link.fromLinkY].push(__assign(__assign({}, link), { toLinkY: link.fromLinkY, toLinkX: goLeft ? lineStartX : lineStartX + lineWidth }));
            lineMap[link.toLinkY] = lineMap[link.toLinkY] || [];
            lineMap[link.toLinkY].push(__assign(__assign({}, link), { fromLinkY: link.toLinkY, fromLinkX: goLeft ? lineStartX : lineStartX + lineWidth }));
        }
    });
    Object.keys(lineMap).forEach(function (key) {
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
    function calculateLevelForSingleLine(links) {
        var levels = [];
        links.forEach(function (link) {
            var insertLevel = -1;
            var pushLevel = -1;
            for (var i = 0; i < levels.length; i++) {
                var shouldBreak = false;
                var shouldContinue = false;
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
                if (shouldBreak)
                    break;
                if (shouldContinue)
                    continue;
            }
            if (insertLevel !== -1) {
                levels.splice(insertLevel, 0, [link]);
            }
            else if (pushLevel !== -1) {
                levels[pushLevel].push(link);
            }
            else {
                levels.push([link]);
            }
        });
        pushDownLinksInLevels(levels);
        return levels.filter(function (l) { return l.length; });
    }
    // go through each level from bottom to top
    // - if the link can be push down, move the link to the lower level, until we can't
    //   - to check if the link can be push down, check lower level has intersects
    function pushDownLinksInLevels(levels) {
        var _loop_2 = function (i) {
            var level = levels[i];
            var linksToPush = [];
            for (var j = 0; j < level.length; j++) {
                var link = level[j];
                var levelToPush = -1;
                for (var k = i + 1; k < levels.length; k++) {
                    if (checkLevelOverlap(link, levels[k]) === 'no-overlap') {
                        levelToPush = k;
                    }
                    else {
                        break;
                    }
                }
                if (levelToPush !== -1) {
                    linksToPush.push([j, levelToPush]);
                }
            }
            levels[i] = level.filter(function (_, i) { return linksToPush.map(function (l) { return l[0]; }).indexOf(i) === -1; });
            linksToPush.forEach(function (_a) {
                var _b = __read(_a, 2), linkIndex = _b[0], levelIndex = _b[1];
                levels[levelIndex].push(level[linkIndex]);
            });
        };
        for (var i = levels.length - 2; i >= 0; i--) {
            _loop_2(i);
        }
    }
    /**
     *
     * Check if a link is horizontally with a group of links
     *
     */
    function checkLevelOverlap(link, linkGroup) {
        var hasSuperset = false;
        for (var i = 0; i < linkGroup.length; i++) {
            var linkToCompare = linkGroup[i];
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
    function checkLinkOverlap(link1, link2) {
        var _a = __read([
            Math.min(link1.fromLinkX, link1.toLinkX),
            Math.max(link1.fromLinkX, link1.toLinkX),
        ], 2), line1Left = _a[0], line1Right = _a[1];
        var _b = __read([
            Math.min(link2.fromLinkX, link2.toLinkX),
            Math.max(link2.fromLinkX, link2.toLinkX),
        ], 2), line2Left = _b[0], line2Right = _b[1];
        var noOverlap = line1Right <= line2Left || line1Left >= line2Right;
        var isSuperset = line1Left <= line2Left && line1Right >= line2Right;
        var isSubset = line2Left < line1Left && line2Right > line1Right;
        if (noOverlap) {
            return 'no-overlap';
        }
        else if (isSuperset) {
            return 'superset';
        }
        else if (isSubset) {
            return 'subset';
        }
        else {
            return 'intersect';
        }
    }
}
/**
 *
 * give a link with position that not are at the same
 * line, decide if it should go left of right.
 *
 */
function shouldMultiLineGoLeft(link, lineStartX, lineWidth) {
    var topLineX = link.fromLinkY < link.toLinkY ? link.fromLinkX : link.toLinkX;
    return topLineX < lineStartX + lineWidth / 2;
}
/**
 *
 * restore new annotation position to original position based
 * on a map of [end of original annotation position ] to
 * [number of characters to move]
 *
 */
function restorePos(charMoveMap, begin, end) {
    var e_1, _a;
    var actualBegin = -1;
    var actualEnd = -1;
    var accumulatedMove = 0;
    var entries = Array.from(charMoveMap.entries()).sort(function (a, b) { return a[0] - b[0]; });
    var previousAnnoEnd = -1;
    try {
        for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var _b = __read(entries_1_1.value, 2), annoEnd = _b[0], annoMove = _b[1];
            if (annoEnd + accumulatedMove >= begin && actualBegin === -1) {
                if (previousAnnoEnd !== -1 &&
                    previousAnnoEnd + accumulatedMove >= begin) {
                    actualBegin = previousAnnoEnd + 1;
                }
                else {
                    actualBegin = begin - accumulatedMove;
                }
            }
            if (annoEnd + accumulatedMove >= end && actualEnd === -1) {
                if (previousAnnoEnd !== -1 && previousAnnoEnd + accumulatedMove >= end) {
                    actualEnd = previousAnnoEnd;
                }
                else {
                    actualEnd = end - accumulatedMove;
                }
            }
            accumulatedMove += annoMove;
            previousAnnoEnd = annoEnd;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
        }
        finally { if (e_1) throw e_1.error; }
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
        var lastAnnoEnd = entries[entries.length - 1][0];
        if (begin > lastAnnoEnd + accumulatedMove) {
            // If the new annotation is after those
            actualBegin = begin - accumulatedMove;
        }
        else {
            console.error("Unknown causes for undefined actualBegin of surface begin \n        at " + begin + ". Offset calculation may be wrong.");
            actualBegin = begin;
        }
    }
    // Then check for undefined actualEnd (i.e. actualEnd === -1).
    // We check these separately, since there might be cases where the actualBegin is defined but the
    //  actualEnd is not.
    if (actualEnd === -1) {
        var lastAnnoEnd = entries[entries.length - 1][0];
        if (end > lastAnnoEnd + accumulatedMove) {
            actualEnd = end - accumulatedMove;
        }
        else {
            console.error("Unknown causes for undefined actualBegin of surface begin \n        at " + begin + ". Offset calculation may be wrong.");
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
function calculateSpaceMap(annotationWithPosition, linksWithPos, selectedLegendAttributeIds) {
    var spaceMap = {};
    linksWithPos.forEach(function (linkPos) {
        var label = Object.keys(linkPos.link.attributes)
            .filter(function (attrKey) {
            return (selectedLegendAttributeIds.indexOf(attributeId(linkPos.link.legendId, attrKey)) > -1);
        })
            .map(function (attrKey) { return linkPos.link.attributes[attrKey]; })
            .join(',');
        var pixelNeedForLinkLabel = getTextWidth(label, fontWidth);
        var distance = Math.abs(linkPos.fromLinkX - linkPos.toLinkX);
        var annotationWithPos = linkPos.fromLinkX < linkPos.toLinkX
            ? linkPos.fromEntryWithPos
            : linkPos.toEntryWithPos;
        var spaceToMove = distance > pixelNeedForLinkLabel
            ? 0
            : Math.ceil((pixelNeedForLinkLabel - distance) / fontWidth);
        if (spaceMap[annotationWithPos.annotation.id] === undefined) {
            spaceMap[annotationWithPos.annotation.id] = {
                annotationWithPos: annotationWithPos,
                spaceToMove: spaceToMove,
            };
        }
        else {
            if (spaceToMove > spaceMap[annotationWithPos.annotation.id].spaceToMove) {
                spaceMap[annotationWithPos.annotation.id] = {
                    annotationWithPos: annotationWithPos,
                    spaceToMove: spaceToMove,
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
function getLevelsFromJustAnnotations(annotationWithPosition) {
    var e_2, _a;
    var levels = {};
    var set = new Set(annotationWithPosition.map(function (ann) { return ann.position.rects[0].y; }));
    try {
        for (var _b = __values(Array.from(set)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var height = _c.value;
            levels[height] = [];
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
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
function calculateLinesToInsertByLevelNum(collapsedLinesIndex, lineIndex, levelNum) {
    return ((collapsedLinesIndex.indexOf(lineIndex) === -1
        ? Math.ceil(levelNum / 4)
        : 0) + (lineIndex === 0 ? 1 : 3));
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
function getAnnotationsByLine(annotationWithPosition, lineHeight) {
    return annotationWithPosition
        .filter(function (ann) { return ann.position.rects[0].y === lineHeight; })
        .sort(function (annA, annB) {
        return annA.position.rects[0].x - annB.position.rects[0].x;
    });
}
function getTextWidth(text, fontWidth) {
    var textUpperLen = text.split('').filter(function (c) { return c === c.toUpperCase(); }).length;
    var textOtherLen = text.length - textUpperLen;
    var padding = fontWidth * 2;
    return textUpperLen * (fontWidth + 3) + textOtherLen * fontWidth + padding;
}
// https://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript
function getScrollbarWidth() {
    // Creating invisible container
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);
    // Creating inner element and placing it in the container
    var inner = document.createElement('div');
    outer.appendChild(inner);
    // Calculating difference between container's full width and the child width
    var scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    // Removing temporary elements from the DOM
    outer.remove();
    return scrollbarWidth;
}

var css_248z$7 = ".Annotation-module_annotation_container__3ytg1 {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transition: box-shadow 0.36s;\n}\n\n.Annotation-module_annotation__1o8ff {\n  cursor: pointer;\n  transition: opacity 0.36s;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n}\n\n.Annotation-module_annotation_inner_left__Sa8NC {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  width: 0;\n  height: 0;\n  border-right: 3px solid red;\n  border-top: 3px solid transparent;\n  border-bottom: 3px solid transparent;\n  transform: rotate(45deg);\n}\n\n.Annotation-module_annotation_inner_right__1Cqvg {\n  position: absolute;\n  top: -0;\n  right: 0px;\n  width: 0;\n  height: 0;\n  border-left: 3px solid red;\n  border-top: 3px solid transparent;\n  border-bottom: 3px solid transparent;\n  transform: rotate(-45deg);\n}\n\n.Annotation-module_connect_point__TMVC1 {\n  position: absolute;\n  top: -4px;\n  right: -4px;\n  width: 9px;\n  height: 9px;\n  border-radius: 5px;\n  border: 1px solid #555;\n  background: #ccc;\n  transition: transform 0.15s, background 0.15s, box-shadow 0.15s;\n}\n\n.Annotation-module_connect_point_active__6Q_MG,\n.Annotation-module_connect_point__TMVC1:hover {\n  background: #555;\n  transform: scale(1.6);\n  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);\n}\n\n.Annotation-module_connect_point_active__6Q_MG .Annotation-module_add_icon__3zBLd::before,\n.Annotation-module_connect_point_active__6Q_MG .Annotation-module_add_icon__3zBLd::after,\n.Annotation-module_connect_point__TMVC1:hover .Annotation-module_add_icon__3zBLd::before,\n.Annotation-module_connect_point__TMVC1:hover .Annotation-module_add_icon__3zBLd::after {\n  border-color: white;\n}\n\n.Annotation-module_add_icon__3zBLd {\n  width: 5px;\n  height: 5px;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.Annotation-module_add_icon__3zBLd::before {\n  content: '';\n  width: 5px;\n  position: absolute;\n  top: 3px;\n  left: 1px;\n  border-top: 1px solid #555;\n}\n\n.Annotation-module_add_icon__3zBLd::after {\n  content: '';\n  height: 5px;\n  position: absolute;\n  left: 3px;\n  top: 1px;\n  border-left: 1px solid #555;\n}\n\n.Annotation-module_annotation_container_in_group__sMxBN {\n  border: 1px solid red;\n}\n\n.Annotation-module_group_id__2VTH- {\n  position: absolute;\n  top: 0;\n  left: 0;\n  transform: translateY(-100%);\n  background: red;\n  font-size: 10px;\n  padding: 1px 2px;\n  color: white;\n}\n";
var style$5 = {"annotation_container":"Annotation-module_annotation_container__3ytg1","annotation":"Annotation-module_annotation__1o8ff","annotation_inner_left":"Annotation-module_annotation_inner_left__Sa8NC","annotation_inner_right":"Annotation-module_annotation_inner_right__1Cqvg","connect_point":"Annotation-module_connect_point__TMVC1","connect_point_active":"Annotation-module_connect_point_active__6Q_MG","add_icon":"Annotation-module_add_icon__3zBLd","annotation_container_in_group":"Annotation-module_annotation_container_in_group__sMxBN","group_id":"Annotation-module_group_id__2VTH-"};
styleInject(css_248z$7);

function Annotation(_a) {
    var annotation = _a.annotation, isSelected = _a.isSelected, isHighlighted = _a.isHighlighted, legendColor = _a.legendColor, position = _a.position, linkEditIsCreating = _a.linkEditIsCreating, linkEditIsDragging = _a.linkEditIsDragging, linkEditFromEntryId = _a.linkEditFromEntryId, linkEditToEntryId = _a.linkEditToEntryId;
    var dispatch = useTextViewerDispatch();
    return (React.createElement(React.Fragment, null, position.rects.map(function (rect, i) {
        var isConnectPointActive = (linkEditIsDragging || linkEditIsCreating) &&
            linkEditFromEntryId === annotation.id;
        return (React.createElement("div", { key: i, className: style$5.annotation_container + "\n              " + (isHighlighted || isSelected
                ? style$5.annotation_container_selected
                : '') + "\n              ", style: {
                transform: "translate(" + (rect.x - 1) + "px," + rect.y + "px)",
            }, "data-annotation-id": annotation.id, onMouseEnter: function () {
                if (!isHighlighted) {
                    dispatch({
                        type: 'highlight-annotation',
                        annotationId: annotation.id,
                    });
                }
                if (linkEditToEntryId !== annotation.id) {
                    dispatch({
                        type: 'set-create-link-target',
                        annotationId: annotation.id,
                    });
                }
            }, onMouseLeave: function () {
                dispatch({
                    type: 'unhighlight-annotation',
                });
                dispatch({
                    type: 'set-create-link-target',
                    annotationId: null,
                });
            } },
            React.createElement("div", { className: "" + style$5.annotation, style: {
                    marginTop: -2,
                    height: rect.height,
                    width: rect.width + 2,
                    borderTopColor: legendColor,
                    borderTopWidth: 5,
                    borderTopStyle: 'solid',
                    background: isHighlighted || isSelected || isConnectPointActive
                        ? legendColor
                        : undefined,
                }, draggable: true, onDragStart: function (e) {
                    e.dataTransfer.dropEffect = 'move';
                    e.dataTransfer.setData('text/plain', JSON.stringify({
                        type: 'drag-annotation',
                        annotationId: annotation.id,
                    }));
                }, onClick: function () {
                    isSelected
                        ? dispatch({
                            type: 'deselect-annotation',
                        })
                        : dispatch({
                            type: 'select-annotation',
                            annotationId: annotation.id,
                        });
                } },
                React.createElement("div", { className: "" + style$5.annotation_inner_left, style: { borderRightColor: legendColor } }),
                React.createElement("div", { className: "" + style$5.annotation_inner_right, style: { borderLeftColor: legendColor } })),
            React.createElement("div", { className: style$5.connect_point + "\n              " + (isConnectPointActive && style$5.connect_point_active), style: {
                    display: linkEditFromEntryId === annotation.id ? 'block' : 'none',
                }, onMouseDown: function () {
                    dispatch({ type: 'deselect-link' });
                    dispatch({ type: 'deselect-annotation' });
                    dispatch({
                        type: 'start-create-link',
                        annotationId: annotation.id,
                    });
                } },
                React.createElement("span", { className: style$5.add_icon }))));
    })));
}
var Annotation$1 = memo(Annotation);

var css_248z$6 = ".Link-module_link_line__1eP-R {\n  pointer-events: none;\n}\n\n.Link-module_link_event_mask__2DsW4 {\n  cursor: pointer;\n}\n\n.Link-module_arrow__F94ii {\n  border-left: 2px solid transparent;\n  border-right: 2px solid transparent;\n  border-top: 5px solid #aaa;\n}\n.Link-module_arrow_large__37M24 {\n  border-left: 3px solid transparent;\n  border-right: 3px solid transparent;\n  border-top: 6px solid #aaa;\n}\n\n.Link-module_link_label__ll3GT {\n  font-size: 9px;\n  line-height: 8px;\n  background: white;\n  color: #555;\n  pointer-events: none;\n  z-index: 5;\n  white-space: nowrap;\n}\n\n.Link-module_line_in_group__XbFxf {\n  position: relative;\n  z-index: 10;\n}\n";
var style$4 = {"link_line":"Link-module_link_line__1eP-R","link_event_mask":"Link-module_link_event_mask__2DsW4","arrow":"Link-module_arrow__F94ii","arrow_large":"Link-module_arrow_large__37M24","link_label":"Link-module_link_label__ll3GT","line_in_group":"Link-module_line_in_group__XbFxf"};
styleInject(css_248z$6);

var lineMaskWidth$1 = 8;
var lineMaskColor$1 = 'none';
var textLinkDistance$1 = 8;
var borderRadius$1 = 8;
function LinkSingleLine(_a) {
    var linkWithPosition = _a.linkWithPosition, isSelected = _a.isSelected, isHightlighted = _a.isHightlighted, isCollapsed = _a.isCollapsed, linkHeight = _a.linkHeight, selectedLegendAttributeIds = _a.selectedLegendAttributeIds;
    var dispatch = useTextViewerDispatch();
    var borderColor = '#888';
    if (isSelected || isHightlighted) {
        borderColor = '#555';
    }
    var labelColor = '#666';
    if (isSelected || isHightlighted) {
        labelColor = '#333';
    }
    var borderWidth = isSelected || isHightlighted ? '2px' : '1px';
    var zIndex = isSelected || isHightlighted ? 1 : 0;
    var height = isCollapsed
        ? textLinkDistance$1
        : textLinkDistance$1 +
            linkHeight[linkWithPosition.link.id][linkWithPosition.fromLinkY];
    var goLeft = linkWithPosition.fromLinkX > linkWithPosition.toLinkX;
    var arrowRadiusAdjust = Math.max(borderRadius$1 - height, 0) / 2;
    var arrowPosition = {
        x: goLeft
            ? linkWithPosition.toLinkX - arrowRadiusAdjust
            : linkWithPosition.toLinkX - 4 + arrowRadiusAdjust,
        y: linkWithPosition.toLinkY - height - 2,
    };
    var linkLabelPosition = {
        x: Math.min(linkWithPosition.fromLinkX, linkWithPosition.toLinkX) +
            Math.abs(linkWithPosition.fromLinkX - linkWithPosition.toLinkX) / 2,
        y: linkWithPosition.toLinkY - height - 4,
    };
    var linkLabel = Object.keys(linkWithPosition.link.attributes)
        .filter(function (attrKey) {
        return (selectedLegendAttributeIds.indexOf(attributeId(linkWithPosition.link.legendId, attrKey)) > -1);
    })
        .map(function (attrKey) { return linkWithPosition.link.attributes[attrKey]; })
        .join(',');
    return (React.createElement("div", { className: 'single-line-container', "data-from-id": linkWithPosition.link.fromEntryId, "data-to-id": linkWithPosition.link.toEntryId },
        React.createElement("div", { className: style$4.link_line, style: {
                height: height,
                width: Math.abs(linkWithPosition.fromLinkX - linkWithPosition.toLinkX),
                position: 'absolute',
                top: linkWithPosition.fromLinkY - height,
                left: Math.min(linkWithPosition.fromLinkX, linkWithPosition.toLinkX),
                border: '1px solid #aaa',
                borderTopWidth: borderWidth,
                borderLeftWidth: borderWidth,
                borderRightWidth: borderWidth,
                borderColor: borderColor,
                borderTopLeftRadius: borderRadius$1,
                borderTopRightRadius: borderRadius$1,
                borderBottomWidth: '0px',
                zIndex: zIndex,
            } }),
        React.createElement("div", { onClick: function () {
                return dispatch({ type: 'select-link', linkId: linkWithPosition.link.id });
            }, onMouseEnter: function () {
                dispatch({
                    type: 'highlight-link',
                    linkId: linkWithPosition.link.id,
                });
            }, onMouseLeave: function () {
                dispatch({ type: 'unhighlight-link' });
            }, style: {
                position: 'absolute',
                width: Math.abs(linkWithPosition.fromLinkX - linkWithPosition.toLinkX),
                height: lineMaskWidth$1,
                background: lineMaskColor$1,
                top: linkWithPosition.fromLinkY - height - lineMaskWidth$1 / 2,
                left: Math.min(linkWithPosition.fromLinkX, linkWithPosition.toLinkX),
            }, className: style$4.link_event_mask }),
        React.createElement("div", { onClick: function () {
                return dispatch({ type: 'select-link', linkId: linkWithPosition.link.id });
            }, onMouseEnter: function () {
                dispatch({
                    type: 'highlight-link',
                    linkId: linkWithPosition.link.id,
                });
            }, onMouseLeave: function () {
                dispatch({ type: 'unhighlight-link' });
            }, style: {
                position: 'absolute',
                width: lineMaskWidth$1,
                background: lineMaskColor$1,
                height: height,
                top: linkWithPosition.fromLinkY - height,
                left: Math.min(linkWithPosition.fromLinkX, linkWithPosition.toLinkX) -
                    lineMaskWidth$1 / 2,
            }, className: style$4.link_event_mask }),
        React.createElement("div", { onClick: function () {
                return dispatch({ type: 'select-link', linkId: linkWithPosition.link.id });
            }, onMouseEnter: function () {
                dispatch({
                    type: 'highlight-link',
                    linkId: linkWithPosition.link.id,
                });
            }, onMouseLeave: function () {
                dispatch({ type: 'unhighlight-link' });
            }, style: {
                position: 'absolute',
                width: lineMaskWidth$1,
                background: lineMaskColor$1,
                height: height,
                top: linkWithPosition.fromLinkY - height,
                left: Math.min(linkWithPosition.fromLinkX, linkWithPosition.toLinkX) +
                    Math.abs(linkWithPosition.fromLinkX - linkWithPosition.toLinkX) -
                    lineMaskWidth$1 / 2,
            }, className: style$4.link_event_mask }),
        React.createElement("div", { className: style$4.arrow + "\n          " + ((isSelected || isHightlighted) && style$4.arrow_large), style: {
                transformOrigin: 'center bottom',
                transform: "\n                  rotate(\n                      " + (goLeft ? '60deg' : '-60deg') + ")",
                position: 'absolute',
                top: arrowPosition.y,
                left: arrowPosition.x,
                borderTopColor: borderColor,
            } }),
        linkLabel && !isCollapsed ? (React.createElement("div", { className: style$4.link_label, style: {
                transform: 'translate(-50%)',
                position: 'absolute',
                textAlign: goLeft ? 'left' : 'right',
                top: linkLabelPosition.y + "px",
                left: linkLabelPosition.x + "px",
                color: labelColor,
            } }, linkLabel)) : null));
}
var LinkSingleLine$1 = memo(LinkSingleLine);

var lineMaskWidth = 8;
var lineMaskColor = 'none';
var textLinkDistance = 8;
var borderRadius = 8;
function LinkMultiLine(_a) {
    var linkWithPosition = _a.linkWithPosition, isSelected = _a.isSelected, isHightlighted = _a.isHightlighted, linkHeight = _a.linkHeight, lineHeights = _a.lineHeights, selectedLegendAttributeIds = _a.selectedLegendAttributeIds, collapsedLineIndexes = _a.collapsedLineIndexes, lineStartX = _a.lineStartX, lineWidth = _a.lineWidth;
    var dispatch = useTextViewerDispatch();
    var borderColor = '#888';
    if (isSelected || isHightlighted) {
        borderColor = '#555';
    }
    var labelColor = '#666';
    if (isSelected || isHightlighted) {
        labelColor = '#333';
    }
    var borderWidth = isSelected || isHightlighted ? '2px' : '1px';
    var zIndex = isSelected || isHightlighted ? 1 : 0;
    var fromLineIndex = lineHeights.indexOf(linkWithPosition.fromLinkY);
    var fromLineCollapsed = collapsedLineIndexes.indexOf(fromLineIndex) !== -1;
    var fromLineHeight = fromLineCollapsed
        ? textLinkDistance
        : textLinkDistance +
            linkHeight[linkWithPosition.link.id][linkWithPosition.fromLinkY];
    var toLineIndex = lineHeights.indexOf(linkWithPosition.toLinkY);
    var toLineCollapsed = collapsedLineIndexes.indexOf(toLineIndex) !== -1;
    var toLineHeight = toLineCollapsed
        ? textLinkDistance
        : textLinkDistance +
            linkHeight[linkWithPosition.link.id][linkWithPosition.toLinkY];
    var goLeft = shouldMultiLineGoLeft$1(linkWithPosition, lineStartX, lineWidth);
    var sideGap = 5;
    var arrowRadiusAdjust = Math.max(borderRadius - toLineHeight, 0) / 2;
    var arrowGoLeft = !goLeft;
    var arrowPosition = {
        x: arrowGoLeft
            ? linkWithPosition.toLinkX - arrowRadiusAdjust
            : linkWithPosition.toLinkX - 4 + arrowRadiusAdjust,
        y: linkWithPosition.toLinkY - toLineHeight - 2,
    };
    var fromLineX = goLeft
        ? Math.min(linkWithPosition.fromLinkX, lineStartX) - sideGap
        : Math.min(linkWithPosition.fromLinkX, lineStartX + lineWidth);
    var fromLineWidth = goLeft
        ? Math.abs(linkWithPosition.fromLinkX - lineStartX) + sideGap
        : Math.abs(linkWithPosition.fromLinkX - (lineStartX + lineWidth)) + sideGap;
    var toLineX = goLeft
        ? Math.min(linkWithPosition.toLinkX, lineStartX) - sideGap
        : Math.min(linkWithPosition.toLinkX, lineStartX + lineWidth);
    var toLineWidth = goLeft
        ? Math.abs(linkWithPosition.toLinkX - lineStartX) + sideGap
        : Math.abs(linkWithPosition.toLinkX - (lineStartX + lineWidth)) + sideGap;
    var fromLinkLabelPosition = {
        x: fromLineX + fromLineWidth / 2,
        y: linkWithPosition.fromLinkY - fromLineHeight - 4,
    };
    var toLinkLabelPosition = {
        x: toLineX + toLineWidth / 2,
        y: linkWithPosition.toLinkY - toLineHeight - 4,
    };
    var linkLabel = Object.keys(linkWithPosition.link.attributes)
        .filter(function (attrKey) {
        return (selectedLegendAttributeIds.indexOf(attributeId(linkWithPosition.link.legendId, attrKey)) > -1);
    })
        .map(function (attrKey) { return linkWithPosition.link.attributes[attrKey]; })
        .join(',');
    return (React.createElement("div", { className: "cross-line-container", "data-from-id": linkWithPosition.link.fromEntryId, "data-to-id": linkWithPosition.link.toEntryId },
        React.createElement("div", { className: style$4.link_line, style: {
                height: fromLineHeight,
                width: fromLineWidth,
                position: 'absolute',
                top: linkWithPosition.fromLinkY - fromLineHeight,
                left: fromLineX,
                border: '1px solid #aaa',
                borderColor: borderColor,
                borderTopLeftRadius: goLeft ? 0 : borderRadius,
                borderTopRightRadius: goLeft ? borderRadius : 0,
                borderBottomWidth: 0,
                borderTopWidth: borderWidth,
                borderLeftWidth: goLeft ? 0 : borderWidth,
                borderRightWidth: goLeft ? borderWidth : 0,
                zIndex: zIndex,
            } }),
        React.createElement("div", { className: style$4.link_line, style: {
                height: toLineHeight,
                width: toLineWidth,
                position: 'absolute',
                top: linkWithPosition.toLinkY - toLineHeight,
                left: toLineX,
                border: '1px solid #aaa',
                borderColor: borderColor,
                borderTopLeftRadius: goLeft ? 0 : borderRadius,
                borderTopRightRadius: goLeft ? borderRadius : 0,
                borderBottomWidth: 0,
                borderTopWidth: borderWidth,
                borderLeftWidth: goLeft ? 0 : borderWidth,
                borderRightWidth: goLeft ? borderWidth : 0,
                zIndex: zIndex,
            } }),
        React.createElement("div", { className: style$4.link_line, style: {
                height: Math.abs(linkWithPosition.toLinkY -
                    toLineHeight -
                    (linkWithPosition.fromLinkY - fromLineHeight)) + 1,
                width: 1,
                position: 'absolute',
                top: Math.min(linkWithPosition.toLinkY - toLineHeight, linkWithPosition.fromLinkY - fromLineHeight),
                left: goLeft
                    ? lineStartX - sideGap
                    : lineStartX + lineWidth + sideGap,
                borderLeft: '1px solid #aaa',
                borderLeftWidth: borderWidth,
                borderColor: borderColor,
                zIndex: zIndex,
            } }),
        React.createElement("div", { onClick: function () {
                return dispatch({ type: 'select-link', linkId: linkWithPosition.link.id });
            }, onMouseEnter: function () {
                dispatch({
                    type: 'highlight-link',
                    linkId: linkWithPosition.link.id,
                });
            }, onMouseLeave: function () {
                dispatch({ type: 'unhighlight-link' });
            }, style: {
                position: 'absolute',
                width: fromLineWidth,
                height: lineMaskWidth,
                background: lineMaskColor,
                top: linkWithPosition.fromLinkY - fromLineHeight - lineMaskWidth / 2,
                left: fromLineX,
            }, className: style$4.link_event_mask }),
        React.createElement("div", { onClick: function () {
                return dispatch({ type: 'select-link', linkId: linkWithPosition.link.id });
            }, onMouseEnter: function () {
                dispatch({
                    type: 'highlight-link',
                    linkId: linkWithPosition.link.id,
                });
            }, onMouseLeave: function () {
                dispatch({ type: 'unhighlight-link' });
            }, style: {
                position: 'absolute',
                width: toLineWidth,
                height: lineMaskWidth,
                background: lineMaskColor,
                top: linkWithPosition.toLinkY - toLineHeight - lineMaskWidth / 2,
                left: toLineX,
            }, className: style$4.link_event_mask }),
        React.createElement("div", { onClick: function () {
                return dispatch({ type: 'select-link', linkId: linkWithPosition.link.id });
            }, onMouseEnter: function () {
                dispatch({
                    type: 'highlight-link',
                    linkId: linkWithPosition.link.id,
                });
            }, onMouseLeave: function () {
                dispatch({ type: 'unhighlight-link' });
            }, style: {
                position: 'absolute',
                width: lineMaskWidth,
                background: lineMaskColor,
                height: fromLineHeight,
                top: linkWithPosition.fromLinkY - fromLineHeight,
                left: fromLineX - lineMaskWidth / 2 + (goLeft ? fromLineWidth : 0),
            }, className: style$4.link_event_mask }),
        React.createElement("div", { onClick: function () {
                return dispatch({ type: 'select-link', linkId: linkWithPosition.link.id });
            }, onMouseEnter: function () {
                dispatch({
                    type: 'highlight-link',
                    linkId: linkWithPosition.link.id,
                });
            }, onMouseLeave: function () {
                dispatch({ type: 'unhighlight-link' });
            }, style: {
                position: 'absolute',
                width: lineMaskWidth,
                background: lineMaskColor,
                height: toLineHeight,
                top: linkWithPosition.toLinkY - toLineHeight,
                left: toLineX - lineMaskWidth / 2 + (goLeft ? toLineWidth : 0),
            }, className: style$4.link_event_mask }),
        React.createElement("div", { onClick: function () {
                return dispatch({ type: 'select-link', linkId: linkWithPosition.link.id });
            }, onMouseEnter: function () {
                dispatch({
                    type: 'highlight-link',
                    linkId: linkWithPosition.link.id,
                });
            }, onMouseLeave: function () {
                dispatch({ type: 'unhighlight-link' });
            }, style: {
                height: Math.abs(linkWithPosition.toLinkY -
                    toLineHeight -
                    (linkWithPosition.fromLinkY - fromLineHeight)) + 1,
                width: lineMaskWidth,
                background: lineMaskColor,
                position: 'absolute',
                top: Math.min(linkWithPosition.toLinkY - toLineHeight, linkWithPosition.fromLinkY - fromLineHeight),
                left: goLeft
                    ? lineStartX - sideGap
                    : lineStartX + lineWidth + sideGap - lineMaskWidth / 2,
            }, className: style$4.link_event_mask }),
        React.createElement("div", { className: style$4.arrow + "\n          " + ((isSelected || isHightlighted) && style$4.arrow_large), style: {
                transformOrigin: 'center bottom',
                transform: "\n              rotate(" + (arrowGoLeft ? '60deg' : '-60deg') + ")",
                position: 'absolute',
                top: arrowPosition.y,
                left: arrowPosition.x,
            } }),
        fromLineCollapsed ? null : (React.createElement("div", { className: style$4.link_label, style: {
                transform: 'translate(-50%)',
                position: 'absolute',
                textAlign: goLeft ? 'left' : 'right',
                top: fromLinkLabelPosition.y + "px",
                left: fromLinkLabelPosition.x + "px",
                color: labelColor,
            } }, linkLabel)),
        toLineCollapsed ? null : (React.createElement("div", { className: style$4.link_label, style: {
                transform: 'translate(-50%)',
                position: 'absolute',
                textAlign: goLeft ? 'left' : 'right',
                top: toLinkLabelPosition.y + "px",
                left: toLinkLabelPosition.x + "px",
                color: labelColor,
            } }, linkLabel))));
}
var LinkMultiLine$1 = memo(LinkMultiLine);

var css_248z$5 = ".AnnotationLabel-module_annotation_attr_container_selected__3eyhG {\n  border: 1px solid #ccc;\n  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);\n  overflow: hidden;\n  padding: 4px 0;\n}\n.AnnotationLabel-module_annotation_attr_rect_selected__2fcBg {\n  display: flex;\n  font-size: 10px;\n}\n.AnnotationLabel-module_annotation_attr_rect__21P7e {\n  padding: 0 4px;\n  text-align: center;\n  border: 1px solid #ccc;\n  position: relative;\n  border-radius: 2px;\n  font-size: 10px;\n}\n\n.AnnotationLabel-module_annotation_attr_label__1QYfW {\n  display: inline-block;\n  width: 60px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-weight: bold;\n  margin-right: 2px;\n  padding: 2px 4px;\n}\n\n.AnnotationLabel-module_annotation_attr_value__9jpAU {\n  display: inline-block;\n  width: 120px;\n  padding: 2px 4px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n";
var style$3 = {"annotation_attr_container_selected":"AnnotationLabel-module_annotation_attr_container_selected__3eyhG","annotation_attr_rect_selected":"AnnotationLabel-module_annotation_attr_rect_selected__2fcBg","annotation_attr_rect":"AnnotationLabel-module_annotation_attr_rect__21P7e","annotation_attr_label":"AnnotationLabel-module_annotation_attr_label__1QYfW","annotation_attr_value":"AnnotationLabel-module_annotation_attr_value__9jpAU"};
styleInject(css_248z$5);

function AnnotationLabel(_a) {
    var position = _a.position, annotation = _a.annotation, isSelected = _a.isSelected, selectedLegendAttributeIds = _a.selectedLegendAttributeIds;
    var attrKeys = Object.keys(annotation.attributes).filter(function (attrKey) {
        if (isSelected) {
            return true;
        }
        else {
            return (selectedLegendAttributeIds.indexOf(attributeId(annotation.legendId, attrKey)) > -1);
        }
    });
    if (!attrKeys.length) {
        return null;
    }
    return (React.createElement("div", { key: annotation.id, className: isSelected ? style$3.annotation_attr_container_selected : '', style: {
            position: 'absolute',
            zIndex: isSelected ? 30 : 0,
            transform: 'translate(-50%, 0)',
            top: position.rects[0].y + 20,
            left: position.rects[0].x + position.rects[0].width / 2,
            fontSize: 10,
            backgroundColor: 'white',
        } }, position.rects.map(function (rect, i) {
        return attrKeys.map(function (attrKey, j) {
            return (React.createElement("div", { className: isSelected
                    ? style$3.annotation_attr_rect_selected
                    : style$3.annotation_attr_rect, key: attrKey + i, style: __assign({}, (!isSelected && {
                    top: j * 2,
                    left: j * 2,
                })) }, isSelected ? (React.createElement(React.Fragment, null,
                React.createElement("span", { className: style$3.annotation_attr_label }, attrKey),
                React.createElement("span", { className: style$3.annotation_attr_value }, displayAttributeFloating(annotation.attributes[attrKey])))) : (displayAttributeInline(annotation.attributes[attrKey]))));
        });
    })));
}
var AnnotationLabel$1 = memo(AnnotationLabel);

var css_248z$4 = ".LineWithArrow-module_link_edit_connector__1pLx2 {\n  background: #555;\n  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);\n  pointer-events: none;\n}\n\n.LineWithArrow-module_link_drag_arrow__2N12k {\n  position: absolute;\n  bottom: -3px;\n  right: 0;\n  transform: rotate(-90deg);\n\n  border-left: 3px solid transparent;\n  border-right: 3px solid transparent;\n  border-top: 7px solid #555;\n}\n";
var style$2 = {"link_edit_connector":"LineWithArrow-module_link_edit_connector__1pLx2","link_drag_arrow":"LineWithArrow-module_link_drag_arrow__2N12k"};
styleInject(css_248z$4);

function LineWithArrow(_a) {
    var fromPos = _a.fromPos, toPos = _a.toPos;
    var x = fromPos.x;
    var y = fromPos.y;
    var width = toPos.x - x;
    var height = toPos.y - y;
    var rotate = (Math.atan(height / width) * 180) / Math.PI;
    if (width === 0) {
        if (height > 0) {
            rotate = -90;
        }
        else {
            rotate = 90;
        }
    }
    else if (width < 0) {
        if (height > 0) {
            rotate += 180;
        }
        else {
            rotate -= 180;
        }
    }
    return (React.createElement("div", { className: style$2.link_edit_connector, style: {
            position: 'absolute',
            top: y,
            left: x,
            transformOrigin: '0 0',
            transform: "rotate(" + rotate + "deg)",
            width: Math.sqrt(width * width + height * height) - 2,
            height: 1,
        } },
        React.createElement("span", { className: style$2.link_drag_arrow })));
}

function LinkEditConnector(_a) {
    var position = _a.position, offsetX = _a.offsetX, offsetY = _a.offsetY;
    var dispatch = useTextViewerDispatch();
    var _b = __read(useState({
        x: 0,
        y: 0,
    }), 2), pos = _b[0], setPos = _b[1];
    useEffect(function () {
        var moved = false;
        function updatePos(e) {
            moved = true;
            requestAnimationFrame(function () {
                setPos({ x: e.clientX, y: e.clientY });
            });
        }
        function endMove() {
            dispatch({ type: 'stop-create-link-dragging', hasMoved: moved });
        }
        window.addEventListener('mousemove', updatePos);
        window.addEventListener('mouseup', endMove);
        return function () {
            window.removeEventListener('mousemove', updatePos);
            window.removeEventListener('mouseup', endMove);
        };
    }, [dispatch]);
    var isMoved = pos.x !== 0 || pos.y !== 0;
    if (!isMoved)
        return null;
    var x = position.rects[0].x + position.rects[0].width;
    var y = position.rects[0].y;
    var fromPos = {
        x: x,
        y: y,
    };
    var toPos = {
        x: pos.x - offsetX,
        y: pos.y - offsetY,
    };
    return React.createElement(LineWithArrow, { fromPos: fromPos, toPos: toPos });
}
var LinkEditConnector$1 = memo(LinkEditConnector);

function TextArea(_a) {
    var textPack = _a.textPack, annotationLegendsColored = _a.annotationLegendsColored;
    var annotations = textPack.annotations, text = textPack.text;
    var links = textPack.links;
    var textNodeEl = useRef(null);
    var textAreaEl = useRef(null);
    var dispatch = useTextViewerDispatch();
    var _b = useTextViewerState(), selectedLegendIds = _b.selectedLegendIds, selectedLegendAttributeIds = _b.selectedLegendAttributeIds, spacingCalculated = _b.spacingCalculated, spacedText = _b.spacedText, collapsedLineIndexes = _b.collapsedLineIndexes, annotationPositions = _b.annotationPositions, textNodeWidth = _b.textNodeWidth, selectedAnnotationId = _b.selectedAnnotationId, highlightedAnnotationIds = _b.highlightedAnnotationIds, halfSelectedAnnotationIds = _b.halfSelectedAnnotationIds, selectedLinkId = _b.selectedLinkId, highlightedLinkIds = _b.highlightedLinkIds, halfSelectedLinkIds = _b.halfSelectedLinkIds, linkEditFromEntryId = _b.linkEditFromEntryId, linkEditToEntryId = _b.linkEditToEntryId, linkEditIsCreating = _b.linkEditIsCreating, linkEditIsDragging = _b.linkEditIsDragging, annoEditIsCreating = _b.annoEditIsCreating, annoEditCursorBegin = _b.annoEditCursorBegin, annoEditCursorEnd = _b.annoEditCursorEnd, jumpToAnnotation = _b.jumpToAnnotation, selectedScopeId = _b.selectedScopeId, selectedScopeIndex = _b.selectedScopeIndex;
    if (selectedScopeId !== null) {
        var scopeAnnotations = annotations.filter(function (ann) { return ann.legendId === selectedScopeId; });
        if (scopeAnnotations.length > 0) {
            var currScopeAnnotation_1 = scopeAnnotations[selectedScopeIndex];
            text = text.substring(currScopeAnnotation_1.span.begin, currScopeAnnotation_1.span.end);
            annotations = annotations
                .filter(function (ann) {
                return ann.span.begin >= currScopeAnnotation_1.span.begin &&
                    ann.span.end <= currScopeAnnotation_1.span.end;
            })
                .map(function (ann) {
                var scoppedSpan = {
                    begin: ann.span.begin - currScopeAnnotation_1.span.begin,
                    end: ann.span.end - currScopeAnnotation_1.span.begin,
                };
                return __assign(__assign({}, ann), { span: scoppedSpan });
            });
        }
    }
    useEffect(function () {
        function calculateTextSpace(annotations, text, links, selectedLegendIds, selectedLegendAttributeIds, spacingCalculated, collapsedLinesIndex) {
            if (!spacingCalculated) {
                var _a = spaceOutText(annotations, text, links, selectedLegendIds, selectedLegendAttributeIds, collapsedLinesIndex), spacedText_1 = _a.spacedText, charMoveMap = _a.charMoveMap, annotationPositions_1 = _a.annotationPositions, textNodeWidth_1 = _a.textNodeWidth;
                dispatch({
                    type: 'set-spaced-annotation-span',
                    spacedText: spacedText_1,
                    charMoveMap: charMoveMap,
                    annotationPositions: annotationPositions_1,
                    textNodeWidth: textNodeWidth_1,
                });
            }
        }
        var handleWindowResize = debounce(function () {
            dispatch({
                type: 'reset-calculated-text-space',
            });
        }, 300);
        calculateTextSpace(annotations, text, links, selectedLegendIds, selectedLegendAttributeIds, spacingCalculated, collapsedLineIndexes);
        if (spacingCalculated && jumpToAnnotation !== null) {
            var el = document.querySelector("[data-annotation-id=\"" + jumpToAnnotation + "\"]");
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            dispatch({
                type: 'jump-to-annotation-done',
            });
        }
        window.addEventListener('resize', handleWindowResize);
        return function () {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [
        annotations,
        text,
        links,
        selectedLegendIds,
        selectedLegendAttributeIds,
        spacingCalculated,
        dispatch,
        collapsedLineIndexes,
        jumpToAnnotation,
    ]);
    var annotationsWithPosition = useMemo(function () {
        return mergeAnnotationWithPosition(annotationPositions, annotations).filter(function (ann) { return selectedLegendIds.indexOf(ann.annotation.legendId) > -1; });
    }, [annotationPositions, annotations, selectedLegendIds]);
    var linksWithPos = useMemo(function () {
        return mergeLinkWithPosition(links, annotationsWithPosition).filter(function (link) { return selectedLegendIds.indexOf(link.link.legendId) > -1; });
    }, [links, annotationsWithPosition, selectedLegendIds]);
    var lineStartX = 0; // textNodeDimension.x;
    var lineWidth = textNodeWidth; // textNodeDimension.width;
    var linkGap = 8;
    var linesLevels = useMemo(function () {
        return calculateLinesLevels$1(linksWithPos, lineStartX, lineWidth);
    }, [linksWithPos, lineStartX, lineWidth]);
    var linkHeight = useMemo(function () {
        return calculateLinkHeight(linesLevels, linkGap);
    }, [linesLevels, linkGap]);
    var lineHeights = Object.keys(linesLevels).map(function (l) { return +l; });
    var textAreaClass = "text_area_container " + style$6.text_area_container + " " + (spacedText ? style$6.text_area_container_visible : '');
    useEffect(function () {
        function handleTextMouseUp(e) {
            if (annoEditIsCreating) {
                var selection = window.getSelection();
                if (selection) {
                    if (selection.type === 'Range') {
                        var begin = Math.min(selection.anchorOffset, selection.focusOffset);
                        var end = Math.max(selection.anchorOffset, selection.focusOffset);
                        dispatch({
                            type: 'annotation-edit-select-text',
                            begin: begin,
                            end: end,
                        });
                        selection.empty();
                    }
                    else if (selection.type === 'Caret' &&
                        e.target === textAreaEl.current) {
                        if (annoEditCursorBegin === null) {
                            dispatch({
                                type: 'annotation-edit-set-begin',
                                begin: selection.anchorOffset,
                            });
                        }
                        else {
                            dispatch({
                                type: 'annotation-edit-set-end',
                                end: selection.anchorOffset,
                            });
                        }
                    }
                }
            }
        }
        window.addEventListener('mouseup', handleTextMouseUp);
        return function () {
            window.removeEventListener('mouseup', handleTextMouseUp);
        };
    }, [dispatch, annoEditIsCreating, annoEditCursorBegin, textAreaEl]);
    var annoEditRangeRects = [];
    var annoEditBeginRect = null;
    var annoEditEndRect = null;
    if (annoEditCursorBegin !== null &&
        textNodeEl.current &&
        textAreaEl.current) {
        var selectionIndicators = getTextSelectionIndicators(annoEditCursorBegin, annoEditCursorEnd, textNodeEl.current, textAreaEl.current);
        annoEditRangeRects = selectionIndicators.rangeRects;
        annoEditBeginRect = selectionIndicators.beginRect;
        annoEditEndRect = selectionIndicators.endRect;
    }
    return (React.createElement("div", { className: textAreaClass, style: {
            userSelect: linkEditIsCreating ? 'none' : 'auto',
            cursor: annoEditIsCreating ? 'text' : 'initial',
        }, ref: textAreaEl },
        React.createElement("div", { className: style$6.text_node_container, ref: textNodeEl }, spacedText || text),
        React.createElement("div", { className: style$6.annotations_container, style: {
                pointerEvents: annoEditIsCreating ? 'none' : 'initial',
            } }, annotationsWithPosition.map(function (ann, i) {
            var legend = annotationLegendsColored.find(function (legend) { return legend.entryName === ann.annotation.legendId; });
            if (!legend) {
                return null;
            }
            return (React.createElement(Annotation$1, { key: i, annotation: ann.annotation, isSelected: ann.annotation.id === selectedAnnotationId, isHighlighted: highlightedAnnotationIds.indexOf(ann.annotation.id) > -1 ||
                    halfSelectedAnnotationIds.indexOf(ann.annotation.id) > -1, legendColor: legend.color, position: ann.position, linkEditIsCreating: linkEditIsCreating, linkEditIsDragging: linkEditIsDragging, linkEditFromEntryId: linkEditFromEntryId, linkEditToEntryId: linkEditToEntryId }));
        })),
        React.createElement("div", { className: "ann_edit_rects_container" },
            annoEditRangeRects.map(function (rect, i) {
                return (React.createElement("div", { key: i, className: style$6.ann_edit_rect, style: {
                        transform: "translate(" + rect.x + "px," + rect.y + "px)",
                        pointerEvents: 'none',
                        background: '#555',
                        opacity: 0.3,
                        height: rect.height,
                        width: rect.width,
                    } }));
            }),
            annoEditBeginRect && (React.createElement("div", { className: style$6.annotation_text_selection_cursor, style: {
                    transform: "translate(" + annoEditBeginRect.x + "px," + annoEditBeginRect.y + "px)",
                    pointerEvents: 'none',
                    height: annoEditBeginRect.height,
                    width: annoEditBeginRect.width,
                } },
                React.createElement("span", { className: style$6.cursor }))),
            annoEditEndRect && (React.createElement("div", { className: style$6.annotation_text_selection_cursor, style: {
                    transform: "translate(" + annoEditEndRect.x + "px," + annoEditEndRect.y + "px)",
                    pointerEvents: 'none',
                    height: annoEditEndRect.height,
                    width: annoEditEndRect.width,
                } },
                React.createElement("span", { className: style$6.cursor })))),
        React.createElement("div", { className: "annotation_line_toggles_container", style: {
                pointerEvents: annoEditIsCreating ? 'none' : 'initial',
            } }, lineHeights.map(function (lineHeight, i) {
            function collapse() {
                dispatch({
                    type: 'collapse-line',
                    lineIndex: i,
                });
            }
            function uncollapse() {
                dispatch({
                    type: 'uncollapse-line',
                    lineIndex: i,
                });
            }
            var isCollapsed = collapsedLineIndexes.indexOf(i) > -1;
            return (React.createElement("button", { key: i, onClick: isCollapsed ? uncollapse : collapse, className: style$6.annotation_line_toggle, style: { top: lineHeight } }, isCollapsed ? '+' : '-'));
        })),
        React.createElement("div", { className: "annotation_label_container", style: {
                pointerEvents: annoEditIsCreating ? 'none' : 'initial',
            } }, annotationsWithPosition.map(function (ann) {
            var isSelected = ann.annotation.id === selectedAnnotationId;
            return (React.createElement(AnnotationLabel$1, { key: ann.annotation.id, position: ann.position, annotation: ann.annotation, isSelected: isSelected, selectedLegendAttributeIds: selectedLegendAttributeIds }));
        })),
        React.createElement("div", { className: style$6.links_container, style: {
                pointerEvents: annoEditIsCreating ? 'none' : 'initial',
            } }, linksWithPos.map(function (linkPos) {
            var isLinkSelected = selectedLinkId === linkPos.link.id;
            var isLinkHightlighted = highlightedLinkIds.includes(linkPos.link.id) ||
                halfSelectedLinkIds.includes(linkPos.link.id);
            if (linkPos.fromLinkY === linkPos.toLinkY) {
                var lineIndex = lineHeights.indexOf(linkPos.fromLinkY);
                var isLineCollapsed = collapsedLineIndexes.indexOf(lineIndex) !== -1;
                return (React.createElement(LinkSingleLine$1, { key: linkPos.link.id, linkWithPosition: linkPos, isSelected: isLinkSelected, isHightlighted: isLinkHightlighted, isCollapsed: isLineCollapsed, linkHeight: linkHeight, selectedLegendAttributeIds: selectedLegendAttributeIds }));
            }
            else {
                return (React.createElement(LinkMultiLine$1, { key: linkPos.link.id, linkWithPosition: linkPos, isSelected: isLinkSelected, isHightlighted: isLinkHightlighted, linkHeight: linkHeight, selectedLegendAttributeIds: selectedLegendAttributeIds, collapsedLineIndexes: collapsedLineIndexes, lineHeights: lineHeights, lineStartX: lineStartX, lineWidth: lineWidth }));
            }
        })),
        React.createElement(ConnectorContainer, { linkEditIsDragging: linkEditIsDragging, textNodeEl: textNodeEl.current, annotationsWithPosition: annotationsWithPosition, linkEditFromEntryId: linkEditFromEntryId }),
        React.createElement(LineWithArrowContainer, { linkEditIsCreating: linkEditIsCreating, linkEditIsDragging: linkEditIsDragging, linkEditFromEntryId: linkEditFromEntryId, linkEditToEntryId: linkEditToEntryId, annotationsWithPosition: annotationsWithPosition })));
}
function LineWithArrowContainer(_a) {
    var linkEditIsCreating = _a.linkEditIsCreating, linkEditIsDragging = _a.linkEditIsDragging, linkEditFromEntryId = _a.linkEditFromEntryId, linkEditToEntryId = _a.linkEditToEntryId, annotationsWithPosition = _a.annotationsWithPosition;
    if (linkEditIsCreating &&
        !linkEditIsDragging &&
        linkEditFromEntryId &&
        linkEditToEntryId) {
        var startAnnotation = annotationsWithPosition.find(function (link) { return link.annotation.id === linkEditFromEntryId; });
        var endAnnotation = annotationsWithPosition.find(function (link) { return link.annotation.id === linkEditToEntryId; });
        if (!startAnnotation || !endAnnotation)
            return null;
        var fromPos = {
            x: startAnnotation.position.rects[0].x +
                startAnnotation.position.rects[0].width,
            y: startAnnotation.position.rects[0].y,
        };
        var toPos = {
            x: endAnnotation.position.rects[0].x +
                endAnnotation.position.rects[0].width / 2,
            y: endAnnotation.position.rects[0].y,
        };
        return (React.createElement("div", { className: style$6.link_edit_container },
            React.createElement(LineWithArrow, { fromPos: fromPos, toPos: toPos })));
    }
    else {
        return null;
    }
}
function ConnectorContainer(_a) {
    var linkEditIsDragging = _a.linkEditIsDragging, textNodeEl = _a.textNodeEl, annotationsWithPosition = _a.annotationsWithPosition, linkEditFromEntryId = _a.linkEditFromEntryId;
    if (!linkEditIsDragging) {
        return null;
    }
    if (!textNodeEl) {
        return null;
    }
    var textNodeRect = textNodeEl.getBoundingClientRect();
    var startAnnotation = annotationsWithPosition.find(function (link) { return link.annotation.id === linkEditFromEntryId; });
    if (!startAnnotation)
        return null;
    return (React.createElement("div", { className: style$6.link_edit_container },
        React.createElement(LinkEditConnector$1
        // annotation={startAnnotation}
        , { 
            // annotation={startAnnotation}
            position: startAnnotation.position, 
            // fromEntryId={linkEditFromEntryId}
            offsetX: textNodeRect.left, offsetY: textNodeRect.top })));
}
function getTextSelectionIndicators(begin, end, textNodeEl, textAreaEl) {
    if (end !== null) {
        var textNode = textNodeEl && textNodeEl.childNodes[0];
        var textAreaRect_1 = textAreaEl.getBoundingClientRect();
        var range = document.createRange();
        var beginRange = document.createRange();
        var endRange = document.createRange();
        range.setStart(textNode, begin);
        range.setEnd(textNode, end);
        var rects = Array.from(range.getClientRects());
        var annoEditTextSelectionRect = rects.map(function (rect) { return ({
            x: rect.x - textAreaRect_1.left,
            y: rect.y - textAreaRect_1.top,
            width: rect.width,
            height: rect.height,
        }); });
        beginRange.setStart(textNode, begin);
        beginRange.setEnd(textNode, begin);
        var beginRect = Array.from(beginRange.getClientRects())[0];
        endRange.setStart(textNode, end);
        endRange.setEnd(textNode, end);
        var endRect = Array.from(endRange.getClientRects())[0];
        return {
            rangeRects: annoEditTextSelectionRect,
            beginRect: {
                x: beginRect.x - textAreaRect_1.left,
                y: beginRect.y - textAreaRect_1.top,
                width: beginRect.width,
                height: beginRect.height,
            },
            endRect: {
                x: endRect.x - textAreaRect_1.left,
                y: endRect.y - textAreaRect_1.top,
                width: endRect.width,
                height: endRect.height,
            },
        };
    }
    else {
        var textNode = textNodeEl && textNodeEl.childNodes[0];
        var textAreaRect = textAreaEl.getBoundingClientRect();
        var beginRange = document.createRange();
        beginRange.setStart(textNode, begin);
        beginRange.setEnd(textNode, begin);
        var beginRect = Array.from(beginRange.getClientRects())[0];
        return {
            rangeRects: [],
            beginRect: {
                x: beginRect.x - textAreaRect.left,
                y: beginRect.y - textAreaRect.top,
                width: beginRect.width,
                height: beginRect.height,
            },
            endRect: null,
        };
    }
}

var css_248z$3 = ".ScopeSelectorProp-module_input__HjvRn {\n  display: inline-block;\n  width: 200px;\n  z-index: 999;\n}\n";
var style$1 = {"input":"ScopeSelectorProp-module_input__HjvRn"};
styleInject(css_248z$3);

function ScopeSelector(_a) {
    var ontology = _a.ontology, selectedScopeId = _a.selectedScopeId, scopeConfig = _a.scopeConfig;
    var dispatch = useTextViewerDispatch();
    var legendTypeOptions = ontology.definitions
        .filter(function (entry) {
        return (isEntryAnnotation(ontology, entry.entryName) &&
            isAvailableScope(scopeConfig, entry.entryName));
    })
        .map(function (def) {
        return {
            value: def.entryName,
            label: shortId(def.entryName) || '',
        };
    });
    legendTypeOptions.unshift({ value: null, label: 'Full text' });
    var selectedLegendTypeOptions = legendTypeOptions.find(function (legendType) {
        return selectedScopeId === legendType.value;
    });
    return (React.createElement(Select, { className: style$1.input, value: selectedLegendTypeOptions, onChange: function (item) {
            dispatch({
                type: 'set-scope',
                scopeId: item.value,
            });
        }, options: legendTypeOptions }));
}

var css_248z$2 = ".CreateBox-module_create_box__19evK {\n  transform: translateX(-30px);\n  opacity: 0;\n  background: rgba(9, 154, 235, 0.2);\n  border: 1px solid rgba(9, 154, 235);\n  transition: transform 0.36s, opacity 0.36s;\n  padding: 8px;\n  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);\n}\n\n.CreateBox-module_create_box_group__3hDmZ {\n  border: 1px solid red;\n  background: rgba(235, 9, 9, 0.11);\n}\n\n.CreateBox-module_slide_in_animated__3lHw8 {\n  opacity: 1;\n  transform: translateX(0);\n}\n\n.CreateBox-module_flash_animated_off__2LgTc {\n  background: rgba(255, 0, 0, 0.5);\n}\n\n.CreateBox-module_flash_animated_on__1orFT {\n  transition: background 0.5s;\n  background: rgba(255, 0, 0, 0);\n}\n\n.CreateBox-module_create_title__2eGbp {\n  font-weight: bold;\n  width: 40px;\n  font-size: 11px;\n  margin-right: 4px;\n}\n\n.CreateBox-module_create_entry_container__2q8t5 {\n  margin-bottom: 8px;\n  display: flex;\n  align-items: center;\n}\n\n.CreateBox-module_create_id__2Inen {\n  width: 100%;\n  flex: 1;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  cursor: pointer;\n  text-decoration: underline;\n}\n\n.CreateBox-module_buttons__3UiED button {\n  margin-top: 8px;\n  margin-right: 8px;\n}\n\n.CreateBox-module_to_be_select__3qeVv {\n  color: #999;\n}\n\n.CreateBox-module_legend_attributes__1Y4H4 {\n  margin-top: 8px;\n}\n\n.CreateBox-module_legend_attribute_item_title__2P0vO {\n  font-weight: bold;\n  margin-bottom: 4px;\n}\n\n.CreateBox-module_legend_attribute_item__IT-rK input {\n  width: 100%;\n  height: 30px;\n}\n\n.CreateBox-module_legend_attribute_item__IT-rK .CreateBox-module_input__3oLiP {\n  margin-bottom: 4px;\n}\n\n.CreateBox-module_legend_type_container__1XVRs {\n  margin-top: 16px;\n}\n\n.CreateBox-module_legend_type_title__3zf6d {\n  font-weight: bold;\n  margin-bottom: 4px;\n}\n\n.CreateBox-module_group_edit_container__2DZoC h3 {\n  margin: 8px 0;\n  font-size: 13px;\n}\n\n.CreateBox-module_group_edit_item__3wXdY {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  border-bottom: 1px solid #ffbcbc;\n  padding: 3px 0;\n}\n\n.CreateBox-module_group_edit_description__165F9 {\n  font-size: 12px;\n  color: #555;\n}\n\n.CreateBox-module_buttons__3UiED button {\n  margin-top: 8px;\n  margin-right: 8px;\n}\n\n.CreateBox-module_group_edit_item_id__3ahBc {\n  font-size: 12px;\n}\n";
var style = {"create_box":"CreateBox-module_create_box__19evK","create_box_group":"CreateBox-module_create_box_group__3hDmZ","slide_in_animated":"CreateBox-module_slide_in_animated__3lHw8","flash_animated_off":"CreateBox-module_flash_animated_off__2LgTc","flash_animated_on":"CreateBox-module_flash_animated_on__1orFT","create_title":"CreateBox-module_create_title__2eGbp","create_entry_container":"CreateBox-module_create_entry_container__2q8t5","create_id":"CreateBox-module_create_id__2Inen","buttons":"CreateBox-module_buttons__3UiED","to_be_select":"CreateBox-module_to_be_select__3qeVv","legend_attributes":"CreateBox-module_legend_attributes__1Y4H4","legend_attribute_item_title":"CreateBox-module_legend_attribute_item_title__2P0vO","legend_attribute_item":"CreateBox-module_legend_attribute_item__IT-rK","input":"CreateBox-module_input__3oLiP","legend_type_container":"CreateBox-module_legend_type_container__1XVRs","legend_type_title":"CreateBox-module_legend_type_title__3zf6d","group_edit_container":"CreateBox-module_group_edit_container__2DZoC","group_edit_item":"CreateBox-module_group_edit_item__3wXdY","group_edit_description":"CreateBox-module_group_edit_description__165F9","group_edit_item_id":"CreateBox-module_group_edit_item_id__3ahBc"};
styleInject(css_248z$2);

function LinkCreateBox(_a) {
    var fromEntryId = _a.fromEntryId, toEntryId = _a.toEntryId, ontology = _a.ontology, onEvent = _a.onEvent;
    var dispatch = useTextViewerDispatch();
    var _b = useTextViewerState(), linkEditSelectedLegendId = _b.linkEditSelectedLegendId, textPack = _b.textPack;
    var _c = __read(useState(false), 2), slideInAnimated = _c[0], setSlideInAnimated = _c[1];
    var _d = __read(useState(false), 2), flashAnimated = _d[0], setFlashAnimated = _d[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var _e = __read(useState({}), 2), enteredAttribute = _e[0], setEnteredAttribute = _e[1];
    useEffect(function () {
        setSlideInAnimated(true);
    }, []);
    useEffect(function () {
        setTimeout(function () {
            setFlashAnimated(true);
        }, 100);
        return function () {
            setFlashAnimated(false);
        };
    }, [toEntryId]);
    var selectedLegendDefinition = ontology.definitions.find(function (def) {
        return def.entryName === linkEditSelectedLegendId;
    });
    var isAddEnabled = fromEntryId && toEntryId && linkEditSelectedLegendId;
    function renderLegendSelect() {
        if (!fromEntryId || !toEntryId || !textPack) {
            return null;
        }
        var fromEntry = textPack.annotations.find(function (ann) { return ann.id === fromEntryId; });
        var toEntry = textPack.annotations.find(function (ann) { return ann.id === toEntryId; });
        var legendTypeOptions = ontology.definitions
            .filter(function (entry) {
            return isEntryLink(ontology, entry.entryName);
        })
            // filter by constraint
            .filter(function (entry) {
            var constraints = ontology.constraints[entry.entryName];
            if (!constraints)
                return true;
            var matchedConstraint = constraints.find(function (constraint) {
                return matchLinkConstraint(constraint, fromEntry, toEntry);
            });
            return !!matchedConstraint;
        })
            .map(function (def) {
            return {
                value: def.entryName,
                label: shortId(def.entryName),
            };
        });
        var selectedLegendTypeOption = legendTypeOptions.find(function (legendType) {
            return linkEditSelectedLegendId === legendType.value;
        });
        return (React.createElement("div", { className: style.legend_type_container },
            React.createElement("div", { className: style.legend_type_title }, "Legend Type"),
            legendTypeOptions.length ? (React.createElement(Select, { value: selectedLegendTypeOption, onChange: function (item) {
                    var selectedItem = item;
                    dispatch({
                        type: 'link-edit-select-legend-type',
                        legendId: selectedItem.value,
                    });
                }, options: legendTypeOptions })) : ('No options')));
    }
    return (React.createElement("div", { className: style.create_box + "\n      " + (slideInAnimated && style.slide_in_animated) },
        React.createElement("div", { className: style.create_entry_container },
            React.createElement("div", { className: style.create_title }, "Parent"),
            React.createElement("div", { className: style.create_id, onClick: function () {
                    // only allow to select when link is select is created
                    if (fromEntryId && toEntryId) {
                        dispatch({
                            type: 'select-annotation',
                            annotationId: fromEntryId,
                        });
                    }
                } }, fromEntryId ? shortId(fromEntryId) : '')),
        React.createElement("div", { className: style.create_entry_container + "\n          " + (flashAnimated ? style.flash_animated_on : style.flash_animated_off) },
            React.createElement("div", { className: style.create_title }, "Child"),
            React.createElement("div", { className: style.create_id + "\n          " + (!toEntryId && style.to_be_select), onClick: function () {
                    if (fromEntryId && toEntryId) {
                        dispatch({
                            type: 'select-annotation',
                            annotationId: toEntryId,
                        });
                    }
                } }, toEntryId ? shortId(toEntryId) : '[Click annotation to select]')),
        renderLegendSelect(),
        selectedLegendDefinition &&
            selectedLegendDefinition.attributes &&
            selectedLegendDefinition.attributes.length && (React.createElement("div", { className: style.legend_attributes }, (selectedLegendDefinition.attributes || []).map(function (attr) {
            return (React.createElement("div", { className: style.legend_attribute_item, key: attr.name },
                React.createElement("div", { className: style.legend_attribute_item_title }, attr.name),
                React.createElement("div", null,
                    React.createElement("input", { type: "text", value: enteredAttribute[attr.name] || '', onChange: function (e) {
                            var _a;
                            return setEnteredAttribute(__assign(__assign({}, enteredAttribute), (_a = {}, _a[attr.name] = e.target.value, _a)));
                        } }))));
        }))),
        React.createElement("div", { className: style.buttons },
            React.createElement("button", { onClick: function () {
                    dispatch({
                        type: 'cancel-create-link',
                    });
                } }, "Cancel"),
            React.createElement("button", { onClick: function () {
                    if (onEvent) {
                        var state = getState();
                        onEvent({
                            type: 'link-add',
                            fromEntryId: state.linkEditFromEntryId,
                            toEntryId: state.linkEditToEntryId,
                            legendId: state.linkEditSelectedLegendId,
                            attributes: enteredAttribute,
                        });
                    }
                    dispatch({
                        type: 'end-create-link',
                        enteredAttributes: enteredAttribute,
                    });
                }, disabled: !isAddEnabled }, "Confirm"))));
}
function matchLinkConstraint(constraint, fromEntry, toEntry) {
    return (matchLinkConstraintEntry(constraint.parentType, fromEntry) &&
        matchLinkConstraintEntry(constraint.childType, toEntry));
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function matchLinkConstraintEntry(entryConstraint, entry) {
    var isMatch = true;
    Object.keys(entryConstraint).forEach(function (propKey) {
        var propValues = entryConstraint[propKey];
        if (Array.isArray(propValues)) {
            if (!propValues.includes(entry[propKey])) {
                isMatch = false;
            }
        }
        else {
            if (!matchLinkConstraintEntry(propValues, entry[propKey])) {
                isMatch = false;
            }
        }
    });
    return isMatch;
}

function AnnotationCreateBox(_a) {
    var cursorBegin = _a.cursorBegin, cursorEnd = _a.cursorEnd, ontology = _a.ontology, onEvent = _a.onEvent;
    var dispatch = useTextViewerDispatch();
    var annoEditSelectedLegendId = useTextViewerState().annoEditSelectedLegendId;
    var _b = __read(useState(false), 2), slideInAnimated = _b[0], setSlideInAnimated = _b[1];
    var _c = __read(useState(false), 2), flashAnimated = _c[0], setFlashAnimated = _c[1];
    var _d = __read(useState({}), 2), enteredAttribute = _d[0], setEnteredAttribute = _d[1];
    useEffect(function () {
        setSlideInAnimated(true);
    }, []);
    useEffect(function () {
        setTimeout(function () {
            setFlashAnimated(true);
        }, 100);
        return function () {
            setFlashAnimated(false);
        };
    }, [cursorEnd]);
    var legendTypeOptions = ontology.definitions
        .filter(function (entry) {
        return isEntryAnnotation(ontology, entry.entryName);
    })
        .map(function (def) {
        return {
            value: def.entryName,
            label: shortId(def.entryName),
        };
    });
    var selectedLegendDefinition = ontology.definitions.find(function (def) {
        return def.entryName === annoEditSelectedLegendId;
    });
    var selectedLegendTypeOption = legendTypeOptions.find(function (legendType) {
        return annoEditSelectedLegendId === legendType.value;
    });
    var isAddEnabled = cursorBegin !== null && cursorEnd !== null && annoEditSelectedLegendId;
    function renderAttributeSelect() {
        if (!selectedLegendDefinition ||
            !selectedLegendDefinition.attributes ||
            !selectedLegendDefinition.attributes.length) {
            return null;
        }
        var legendConstraint = ontology.constraints[selectedLegendDefinition.entryName] || [];
        var attrConstraint = {};
        legendConstraint.forEach(function (cons) {
            Object.keys(cons.attributes || {}).forEach(function (attrName) {
                var attrValues = cons.attributes[attrName];
                attrConstraint[attrName] = attrConstraint[attrName] || new Set();
                attrValues.forEach(function (v) { return attrConstraint[attrName].add(v); });
            });
        });
        return (React.createElement("div", { className: style.legend_attributes }, (selectedLegendDefinition.attributes || []).map(function (attr) {
            return (React.createElement("div", { className: style.legend_attribute_item, key: attr.name },
                React.createElement("div", { className: style.legend_attribute_item_title }, attr.name),
                renderAttributeInput(attr, attrConstraint)));
        })));
    }
    function renderAttributeInput(attr, attrConstraint) {
        if (attrConstraint[attr.name]) {
            var options = Array.from(attrConstraint[attr.name]).map(function (v) { return ({
                value: v,
                label: v,
            }); });
            var selectedOption = options.find(function (o) { return o.value === enteredAttribute[attr.name]; });
            return (React.createElement("div", null,
                React.createElement(Select, { className: style.input, value: selectedOption, onChange: function (item) {
                        var _a;
                        setEnteredAttribute(__assign(__assign({}, enteredAttribute), (_a = {}, _a[attr.name] = item.value, _a)));
                    }, options: options })));
        }
        else {
            return (React.createElement("div", null,
                React.createElement("input", { type: "text", className: style.input, value: enteredAttribute[attr.name] || '', onChange: function (e) {
                        var _a;
                        return setEnteredAttribute(__assign(__assign({}, enteredAttribute), (_a = {}, _a[attr.name] = e.target.value, _a)));
                    } })));
        }
    }
    return (React.createElement("div", { className: style.create_box + "\n      " + (slideInAnimated && style.slide_in_animated) },
        React.createElement("div", { className: style.create_entry_container },
            React.createElement("div", { className: style.create_title }, "Begin"),
            React.createElement("div", { className: style.create_id }, cursorBegin !== null ? cursorBegin : '')),
        React.createElement("div", { className: style.create_entry_container + "\n          " + (flashAnimated ? style.flash_animated_on : style.flash_animated_off) },
            React.createElement("div", { className: style.create_title }, "End"),
            React.createElement("div", { className: style.create_id + "\n          " + (cursorEnd === null && style.to_be_select) }, cursorEnd !== null ? cursorEnd : '[Click text to select end]')),
        React.createElement("div", { className: style.legend_type_container },
            React.createElement("div", { className: style.legend_type_title }, "Legend Type"),
            React.createElement(Select, { value: selectedLegendTypeOption, onChange: function (item) {
                    var selectedItem = item;
                    dispatch({
                        type: 'annotation-edit-select-legend-type',
                        legendId: selectedItem.value,
                    });
                }, options: legendTypeOptions })),
        renderAttributeSelect(),
        React.createElement("div", { className: style.buttons },
            React.createElement("button", { onClick: function () {
                    dispatch({
                        type: 'annotation-edit-cancel',
                    });
                } }, "Cancel"),
            React.createElement("button", { onClick: function () {
                    if (onEvent) {
                        var state = getState();
                        if (state.annoEditCursorBegin === null ||
                            state.annoEditCursorEnd === null ||
                            state.annoEditSelectedLegendId === null) {
                            throw new Error('cannot create annotation with no begin or end cursor selected');
                        }
                        var _a = __read(restorePos(state.charMoveMap, state.annoEditCursorBegin, state.annoEditCursorEnd), 2), actualBegin = _a[0], actualEnd = _a[1];
                        onEvent({
                            type: 'annotation-add',
                            span: {
                                begin: actualBegin,
                                end: actualEnd,
                            },
                            legendId: state.annoEditSelectedLegendId,
                            attributes: enteredAttribute,
                        });
                    }
                    dispatch({
                        type: 'annotation-edit-submit',
                    });
                }, disabled: !isAddEnabled }, "Confirm"))));
}

function TextViewer(_a) {
    var plugins = _a.plugins, onEvent = _a.onEvent, projectConfig = _a.projectConfig, documents = _a.documents, options = _a.options;
    var appState = useTextViewerState();
    var dispatch = useTextViewerDispatch();
    var textPack = appState.textPack, ontology = appState.ontology, selectedAnnotationId = appState.selectedAnnotationId, selectedLinkId = appState.selectedLinkId, linkEditFromEntryId = appState.linkEditFromEntryId, linkEditToEntryId = appState.linkEditToEntryId, linkEditIsCreating = appState.linkEditIsCreating, annoEditIsCreating = appState.annoEditIsCreating, annoEditCursorBegin = appState.annoEditCursorBegin, annoEditCursorEnd = appState.annoEditCursorEnd, selectedScopeId = appState.selectedScopeId, selectedScopeIndex = appState.selectedScopeIndex;
    if (!textPack || !ontology || !projectConfig)
        return null;
    var doc_id = window.location.pathname.split('/').pop();
    var annotations = textPack.annotations, links = textPack.links, attributes = textPack.attributes;
    var annotationLegendsWithColor = applyColorToLegend(ontology.definitions.filter(function (entry) {
        return isEntryAnnotation(ontology, entry.entryName) &&
            isAvailableLegend(projectConfig['legendConfigs'], entry.entryName);
    }));
    var linksLegendsWithColor = applyColorToLegend(ontology.definitions.filter(function (entry) {
        return isEntryLink(ontology, entry.entryName) &&
            isAvailableLegend(projectConfig['legendConfigs'], entry.entryName);
    }));
    var selectedAnnotation = annotations.find(function (ann) { return ann.id === selectedAnnotationId; }) || null;
    var selectedAnnotationParents = [];
    var selectedAnnotationChildren = [];
    links.forEach(function (link) {
        if (link.fromEntryId === selectedAnnotationId) {
            var anno = annotations.find(function (ann) { return ann.id === link.toEntryId; });
            if (anno)
                selectedAnnotationChildren.push(anno);
        }
        else if (link.toEntryId === selectedAnnotationId) {
            var anno = annotations.find(function (ann) { return ann.id === link.fromEntryId; });
            if (anno)
                selectedAnnotationParents.push(anno);
        }
    });
    var selectedLink = links.find(function (link) { return link.id === selectedLinkId; }) || null;
    var enabledPlugins = plugins.filter(function (p) { return p.enabled(appState); });
    var pluginsByName = new Map(enabledPlugins.map(function (p) { return [p.name, p]; }));
    function renderPlugin(p) {
        var Comp = p.component;
        return (React.createElement(Comp, { key: 'plugin_' + p.name, dispatch: dispatch, appState: appState }));
    }
    function renderPluginByName(name) {
        if (pluginsByName.has(name)) {
            var p = pluginsByName.get(name);
            if (typeof p !== 'undefined') {
                return renderPlugin(p);
            }
        }
        return null;
    }
    function renderAllPlugin() {
        console.log('Rendering all plugins');
        if (enabledPlugins.length === 0) {
            return (React.createElement("div", { className: style$a.plugins_container }, "No Plugins Configured."));
        }
        else if (enabledPlugins.length > 0) {
            var tabList = enabledPlugins.map(function (p) {
                return {
                    title: p.name,
                    body: function () { return renderPlugin(p); },
                };
            });
            return (React.createElement("div", { className: style$a.plugins_container },
                React.createElement(Tab, { tabs: tabList, activeTabIndex: 0 })));
        }
        return null;
    }
    function customRender(areaName) {
        // Rendering based on customized layout setup.
        // Disable this area
        if (projectConfig['layoutConfigs'][areaName] === 'disable') {
            return null;
        }
        // Render Plugins.
        if (projectConfig['layoutConfigs'][areaName] === 'plugins') {
            return renderAllPlugin();
        }
        if (pluginsByName.has(projectConfig['layoutConfigs'][areaName])) {
            return renderPluginByName(projectConfig['layoutConfigs'][areaName]);
        }
        return React.createElement("span", null, "Invalid component");
    }
    function MiddleCenterArea() {
        var areaName = 'center-middle';
        if (typeof projectConfig['layoutConfigs'][areaName] === 'undefined' ||
            projectConfig['layoutConfigs'][areaName] === 'default-nlp') {
            if (textPack) {
                return (React.createElement(TextArea, { textPack: textPack, annotationLegendsColored: annotationLegendsWithColor }));
            }
        }
        return customRender(areaName);
    }
    function MiddleBottomArea() {
        var areaName = 'center-bottom';
        return customRender(areaName);
    }
    function LeftArea() {
        var areaName = 'left';
        if (typeof projectConfig['layoutConfigs'][areaName] === 'undefined' ||
            projectConfig['layoutConfigs'][areaName] === 'default-meta') {
            if (textPack && ontology) {
                return (React.createElement("div", { className: style$a.metadata_side_container },
                    React.createElement("h1", { className: style$a.anno_legends_heading }, "Annotation Legends"),
                    React.createElement("div", { className: style$a.anno_legends_sub },
                        React.createElement("p", null,
                            "See the summary visualiations of annotations and explore them in-situ.",
                            React.createElement("br", null),
                            " Select edit to change them.")),
                    (options && options.allowEditAnnotations) && (React.createElement("div", { className: style$a.add_annotation_container },
                        React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { icon: React.createElement(CheckBoxOutlineBlankIcon, { fontSize: "small" }), checkedIcon: React.createElement(CheckBoxIcon, { fontSize: "small", htmlColor: "#246ED6" }), size: "small", checked: annoEditIsCreating, onChange: function () {
                                    dispatch({
                                        type: annoEditIsCreating
                                            ? 'exit-annotation-edit'
                                            : 'start-annotation-edit',
                                    });
                                }, inputProps: { 'aria-label': 'Edit annotations checkbox' } }), label: "Edit annotations" }),
                        annoEditIsCreating && (React.createElement("div", { className: style$a.button_action_description }, "select text to add annotation")))),
                    React.createElement(TextDetail, { annotationLegends: annotationLegendsWithColor, linkLegends: linksLegendsWithColor, attributes: attributes })));
            }
        }
        return customRender(areaName);
    }
    function RightArea() {
        var areaName = 'right';
        if (typeof projectConfig['layoutConfigs'][areaName] === 'undefined' ||
            projectConfig['layoutConfigs'][areaName] === 'default-attribute') {
            if (textPack && ontology) {
                return (React.createElement("div", { className: style$a.attributes_side_container },
                    linkEditIsCreating && (React.createElement("div", null,
                        React.createElement("h2", null, "Create Link"),
                        React.createElement(LinkCreateBox, { fromEntryId: linkEditFromEntryId, toEntryId: linkEditToEntryId, ontology: ontology, onEvent: onEvent }))),
                    annoEditIsCreating && annoEditCursorBegin !== null && (React.createElement("div", { className: style$a.link_edit_container },
                        React.createElement(AnnotationCreateBox, { cursorBegin: annoEditCursorBegin, cursorEnd: annoEditCursorEnd, ontology: ontology, onEvent: onEvent }))),
                    selectedLink && (React.createElement("div", null,
                        React.createElement("h2", null, "Link Attributes"),
                        React.createElement(LinkDetail, { link: selectedLink, onEvent: onEvent }))),
                    selectedAnnotation && (React.createElement("div", null,
                        React.createElement("h2", null, "Annotation Attributes"),
                        React.createElement(AnnotationDetail, { parentAnnotations: selectedAnnotationParents, childAnnotations: selectedAnnotationChildren, annotation: selectedAnnotation, onEvent: onEvent })))));
            }
        }
        return customRender(areaName);
    }
    function ToolBar() {
        var scopeCount = 0;
        var isFullText = selectedScopeId === null && documents !== null;
        var paginationIndex = selectedScopeIndex;
        if (isFullText) {
            scopeCount = documents.documents.length;
            paginationIndex = documents.documents.findIndex(function (x) { return x.id === parseInt(doc_id); });
        }
        else if (textPack) {
            scopeCount = textPack.annotations.filter(function (ann) { return ann.legendId === selectedScopeId; }).length;
        }
        var handlePageChange = function (event, value) {
            if (value - 1 === paginationIndex) {
                return;
            }
            else {
                if (isFullText) {
                    // The scope selected is set to Full Text, so paginate through project's documents
                    window.location.href = "/documents/" + documents.documents[value - 1].id;
                }
                else {
                    // Scope selector was set to a scope other than Full text
                    dispatch({ type: 'set-scope-index', scopeIndex: value - 1 });
                }
            }
        };
        if (typeof projectConfig['layoutConfigs']['center-middle'] === 'undefined' ||
            projectConfig['layoutConfigs']['center-middle'] === 'default-nlp') {
            if (textPack && ontology && projectConfig) {
                return (React.createElement("div", { className: style$a.tool_bar_container },
                    React.createElement("div", { className: style$a.scope_selector_container },
                        React.createElement(ScopeSelector, { ontology: ontology, selectedScopeId: selectedScopeId, scopeConfig: projectConfig.scopeConfigs }),
                        (selectedScopeId !== null ||
                            (selectedScopeId === null &&
                                documents &&
                                documents.documents.length > 1)) && (React.createElement("div", { className: style$a.scope_nav_container },
                            React.createElement(Pagination, { page: paginationIndex + 1, onChange: handlePageChange, count: scopeCount, defaultPage: 1, variant: "outlined", shape: "rounded" }))))));
            }
        }
        if (projectConfig['layoutConfigs']['center-middle'] === 'example') {
            return React.createElement("span", null, "Example component");
        }
        return React.createElement("div", null);
    }
    return (React.createElement("div", { className: style$a.text_viewer },
        React.createElement("main", { className: style$a.layout_container },
            LeftArea(),
            React.createElement("div", { className: style$a.center_area_container + "\n              " + (annoEditIsCreating && style$a.is_adding_annotation) },
                ((options && options.enableScopeSelector) && (React.createElement(ToolBar, null))),
                React.createElement("div", { className: "" + style$a.text_area_container }, MiddleCenterArea()),
                MiddleBottomArea()),
            RightArea())));
}

var labels = {};
var colorIterator = createColorIterator();
window.ll = ll;
function ll(label) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var color = '';
    if (labels[label]) {
        color = labels[label];
    }
    else {
        labels[label] = colorIterator.next();
        color = labels[label];
    }
    console.log.apply(console, __spreadArray(["%c " + label + " ", "background: " + color + "; color: white;"], __read(values)));
}
function createColorIterator() {
    var colorIndex = -1;
    return {
        next: function () {
            colorIndex++;
            return colorPalettes[colorIndex % colorPalettes.length];
        },
    };
}

var css_248z$1 = "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n     ========================================================================== */\n\n/**\n   * Remove the margin in all browsers.\n   */\n\nbody {\n  margin: 0;\n}\n\n/**\n   * Render the `main` element consistently in IE.\n   */\n\nmain {\n  display: block;\n}\n\n/**\n   * Correct the font size and margin on `h1` elements within `section` and\n   * `article` contexts in Chrome, Firefox, and Safari.\n   */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n     ========================================================================== */\n\n/**\n   * 1. Add the correct box sizing in Firefox.\n   * 2. Show the overflow in Edge and IE.\n   */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n   * 1. Correct the inheritance and scaling of font size in all browsers.\n   * 2. Correct the odd `em` font sizing in all browsers.\n   */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n     ========================================================================== */\n\n/**\n   * Remove the gray background on active links in IE 10.\n   */\n\na {\n  background-color: transparent;\n}\n\n/**\n   * 1. Remove the bottom border in Chrome 57-\n   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n   */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n   * Add the correct font weight in Chrome, Edge, and Safari.\n   */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n   * 1. Correct the inheritance and scaling of font size in all browsers.\n   * 2. Correct the odd `em` font sizing in all browsers.\n   */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n   * Add the correct font size in all browsers.\n   */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n   * Prevent `sub` and `sup` elements from affecting the line height in\n   * all browsers.\n   */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n     ========================================================================== */\n\n/**\n   * Remove the border on images inside links in IE 10.\n   */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n     ========================================================================== */\n\n/**\n   * 1. Change the font styles in all browsers.\n   * 2. Remove the margin in Firefox and Safari.\n   */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n   * Show the overflow in IE.\n   * 1. Show the overflow in Edge.\n   */\n\nbutton,\ninput {\n  /* 1 */\n  overflow: visible;\n}\n\n/**\n   * Remove the inheritance of text transform in Edge, Firefox, and IE.\n   * 1. Remove the inheritance of text transform in Firefox.\n   */\n\nbutton,\nselect {\n  /* 1 */\n  text-transform: none;\n}\n\n/**\n   * Correct the inability to style clickable types in iOS and Safari.\n   */\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button;\n}\n\n/**\n   * Remove the inner border and padding in Firefox.\n   */\n\nbutton::-moz-focus-inner,\n[type='button']::-moz-focus-inner,\n[type='reset']::-moz-focus-inner,\n[type='submit']::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n   * Restore the focus styles unset by the previous rule.\n   */\n\nbutton:-moz-focusring,\n[type='button']:-moz-focusring,\n[type='reset']:-moz-focusring,\n[type='submit']:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n   * Correct the padding in Firefox.\n   */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n   * 1. Correct the text wrapping in Edge and IE.\n   * 2. Correct the color inheritance from `fieldset` elements in IE.\n   * 3. Remove the padding so developers are not caught out when they zero out\n   *    `fieldset` elements in all browsers.\n   */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n   * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n   */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n   * Remove the default vertical scrollbar in IE 10+.\n   */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n   * 1. Add the correct box sizing in IE 10.\n   * 2. Remove the padding in IE 10.\n   */\n\n[type='checkbox'],\n[type='radio'] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n   * Correct the cursor style of increment and decrement buttons in Chrome.\n   */\n\n[type='number']::-webkit-inner-spin-button,\n[type='number']::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n   * 1. Correct the odd appearance in Chrome and Safari.\n   * 2. Correct the outline style in Safari.\n   */\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n   * Remove the inner padding in Chrome and Safari on macOS.\n   */\n\n[type='search']::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n   * 1. Correct the inability to style clickable types in iOS and Safari.\n   * 2. Change font properties to `inherit` in Safari.\n   */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n     ========================================================================== */\n\n/*\n   * Add the correct display in Edge, IE 10+, and Firefox.\n   */\n\ndetails {\n  display: block;\n}\n\n/*\n   * Add the correct display in all browsers.\n   */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n     ========================================================================== */\n\n/**\n   * Add the correct display in IE 10+.\n   */\n\ntemplate {\n  display: none;\n}\n\n/**\n   * Add the correct display in IE 10.\n   */\n\n[hidden] {\n  display: none;\n}\n";
styleInject(css_248z$1);

var css_248z = "* {\n  box-sizing: border-box;\n}\n\ndiv,\np {\n  font-size: 13px;\n}\n";
styleInject(css_248z);

function transformPack(rawPack, rawOntology) {
    var data = JSON.parse(rawPack);
    var config = JSON.parse(rawOntology);
    var packData = data['py/state'];
    var annotations = packData.annotations.filter(function (a) { return !!a['py/state']; });
    var configTransformed = __assign({ constraints: [] }, camelCaseDeep(config));
    var formatedAnnotations = annotations
        .map(function (a) {
        var legendName = getLegendName(a);
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
    var links = packData.links
        .map(function (link) {
        var legendName = getLegendName(link);
        return {
            id: link['py/state']._tid + '',
            fromEntryId: link['py/state']._parent + '',
            toEntryId: link['py/state']._child + '',
            legendId: legendName,
            attributes: getAttrs(configTransformed, link),
        };
    })
        .filter(Boolean);
    var groups = packData.groups.map(function (group) {
        var legendName = getLegendName(group);
        return {
            id: group['py/state']._tid + '',
            members: group['py/state']['_members']['py/set'].map(function (i) { return i + ''; }),
            memberType: getGroupType(legendName, configTransformed),
            legendId: legendName,
            attributes: getAttrs(configTransformed, group),
        };
    });
    var pack = {
        text: packData._text,
        annotations: formatedAnnotations,
        links: links,
        groups: groups,
        attributes: 
        // Backward compatibility with Forte formats.
        'meta' in packData
            ? packData.meta['py/state']
            : packData._meta['py/state'],
    };
    return [pack, configTransformed];
}
function getLegendName(a) {
    return a['py/object'];
}
function getAttrs(config, a) {
    var legendName = getLegendName(a);
    var legend = config['definitions'].find(function (entry) { return entry.entryName === legendName; });
    if (!legend || !legend.attributes) {
        return {};
    }
    var attrNames = legend.attributes.map(function (a) { return a.name; });
    var attrs = {};
    Object.keys(a['py/state']).forEach(function (key) {
        if (attrNames.includes(key)) {
            attrs[key] = a['py/state'][key];
        }
    });
    return attrs;
}
function getGroupType(groupEntryName, config) {
    var entry = config.definitions.find(function (ent) { return ent.entryName === groupEntryName; });
    if (isEntryAnnotation(config, entry.memberType)) {
        return 'annotation';
    }
    else if (isEntryLink(config, entry.memberType)) {
        return 'link';
    }
    else {
        throw new Error('unknown group entry ' + groupEntryName);
    }
}
function transformBackAnnotation(annotation) {
    return {
        'py/object': annotation.legendId,
        'py/state': __assign({ _span: {
                begin: annotation.span.begin,
                end: annotation.span.end,
                'py/object': 'forte.data.span.Span',
            }, _tid: annotation.id }, annotation.attributes),
    };
}
function transformBackLink(link) {
    return {
        'py/object': link.legendId,
        'py/state': __assign({ _child: link.toEntryId, _parent: link.toEntryId, _tid: link.id }, link.attributes),
    };
}
function transformProjectConfig(rawConfig) {
    var config = JSON.parse(rawConfig);
    return {
        legendConfigs: config ? config.legendConfigs : {},
        scopeConfigs: config ? config.scopeConfigs : {},
        layoutConfigs: config ? config.layoutConfigs : {},
    };
}
function transformDocs(docs) {
    return {
        documents: docs.map(function (doc) {
            return {
                id: doc.id,
                name: doc.name,
            };
        }),
    };
}

function NLPViewer(props) {
    return (React.createElement(TextViewerProvider, null,
        React.createElement(TextViewerFetchContainer, __assign({}, props)),
        ";"));
}
function TextViewerFetchContainer(props) {
    var dispatch = useTextViewerDispatch();
    useEffect(function () {
        dispatch({
            type: 'set-text-pack',
            textPack: props.textPack,
        });
        dispatch({
            type: 'set-ontology',
            ontology: props.ontology,
        });
    }, [dispatch, props.textPack, props.ontology]);
    return (React.createElement(TextViewer, { plugins: props.plugins, onEvent: props.onEvent, projectConfig: props.projectConfig, documents: props.documents, options: props.options }));
}

export default NLPViewer;
export { TextViewerProvider, getState, transformBackAnnotation, transformBackLink, transformDocs, transformPack, transformProjectConfig, useTextViewerDispatch, useTextViewerState };
//# sourceMappingURL=index.es.js.map
