import React from 'react';
import style from '../styles/TextViewer.module.css';
import { ISinglePack, IOntology, IAnnotation } from '../lib/interfaces';
import { applyColorToLegend } from '../lib/utils';
import AnnotationDetail from './AnnotationDetail';
import LinkDetail from './LinkDetail';
import TextDetail from './TextDetail';
import TextArea from './TextArea';
import {
  useTextViewerState,
  useTextViewerDispatch,
} from '../contexts/text-viewer.context';
import LinkCreateBox from './LinkCreateBox';
import AnnotationCreateBox from './AnnotationCreateBox';
import GroupCreateBox from './GroupCreateBox';

export interface TextViewerProp {
  textPack: ISinglePack;
  ontology: IOntology;
}

function TextViewer({ textPack, ontology }: TextViewerProp) {
  const { annotations, legends, links, attributes, groups } = textPack;

  const annotationLegendsWithColor = applyColorToLegend(legends.annotations);
  const linksLegendsWithColor = applyColorToLegend(legends.links);
  const groupsLegendsWithColor = applyColorToLegend(legends.groups);
  const {
    selectedLegendIds,

    selectedAnnotationId,
    selectedLinkId,

    linkEditFromEntryId,
    linkEditToEntryId,
    linkEditIsCreating,

    annoEditIsCreating,
    annoEditCursorBegin,
    annoEditCursorEnd,

    groupEditIsCreating,
    groupEditAnnotationIds,
    groupEditLinkIds,

    selectedGroupIds,
  } = useTextViewerState();
  const dispatch = useTextViewerDispatch();

  const selectedAnnotation =
    annotations.find(ann => ann.id === selectedAnnotationId) || null;
  const selectedAnnotaionParents: IAnnotation[] = [];
  const selectedAnnotaionChildren: IAnnotation[] = [];

  links.forEach(link => {
    if (link.fromEntryId === selectedAnnotationId) {
      selectedAnnotaionChildren.push(annotations.find(
        ann => ann.id === link.toEntryId
      ) as IAnnotation);
    } else if (link.toEntryId === selectedAnnotationId) {
      selectedAnnotaionParents.push(annotations.find(
        ann => ann.id === link.fromEntryId
      ) as IAnnotation);
    }
  });

  const selectedLink = links.find(link => link.id === selectedLinkId) || null;

  function renderGroups() {
    const visibleGroups = groups.filter(group =>
      selectedLegendIds.includes(group.legendId)
    );

    if (!visibleGroups.length) {
      return null;
    }

    return (
      <div className={style.group_name_container}>
        <button
          onClick={() => {
            dispatch({ type: 'toggle-all-group' });
          }}
          className={style.group_legend_toggle_button}
        >
          ✓
        </button>
        <span className={style.group_legend_label}>Groups:</span>

        {visibleGroups.map(group => {
          const isSelected = selectedGroupIds.includes(group.id);
          const groupLegendsWithColor = groupsLegendsWithColor.find(
            g => g.id === group.legendId
          );
          const color = groupLegendsWithColor
            ? groupLegendsWithColor.color
            : undefined;

          return (
            <span
              key={group.id}
              style={{
                background: color,
              }}
              className={`${style.group_name}
                  ${isSelected && style.group_name_selected}`}
              onClick={() => {
                if (isSelected) {
                  dispatch({
                    type: 'deselect-group',
                    groupId: group.id,
                  });
                } else {
                  dispatch({
                    type: 'select-group',
                    groupId: group.id,
                  });
                }
              }}
            >
              {group.id}
              <span>({group.members.length})</span>
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div className={style.text_viewer}>
      <header className={style.layout_header}>NLP Viewer</header>

      <main className={style.layout_container}>
        <div className={style.metadata_side_container}>
          <TextDetail
            annotationLegends={annotationLegendsWithColor}
            linkLegends={linksLegendsWithColor}
            groupLegends={groupsLegendsWithColor}
            attributes={attributes}
            ontology={ontology}
          />
        </div>

        <div
          className={`${style.center_area_container} 
            ${annoEditIsCreating && style.is_adding_annotation}
            ${groupEditIsCreating && style.is_grouping_annotation}
            `}
        >
          <div className={style.tool_bar_container}>
            <button
              className={style.add_annotation_button}
              onClick={() => {
                dispatch({
                  type: annoEditIsCreating
                    ? 'exit-annotation-edit'
                    : 'start-annotation-edit',
                });
              }}
            >
              {annoEditIsCreating ? `Cancel add annotation` : `Add annotation`}
            </button>

            <button
              onClick={() => {
                if (groupEditIsCreating) {
                  dispatch({
                    type: 'cancel-add-group',
                  });
                } else {
                  dispatch({
                    type: 'start-add-group',
                  });
                }
              }}
            >
              {groupEditIsCreating ? 'Cancel add group' : 'Add group'}
            </button>

            {annoEditIsCreating && (
              <div className={style.button_action_description}>
                select text to add annotation
              </div>
            )}

            {groupEditIsCreating && (
              <div className={style.button_action_description}>
                click annotation or link to add to group
              </div>
            )}
          </div>

          <div className={`${style.text_area_container}`}>
            <TextArea
              textPack={textPack}
              annotationLegendsColored={annotationLegendsWithColor}
              groupLegendsColored={groupsLegendsWithColor}
            />
          </div>

          {renderGroups()}
        </div>

        <div className={style.attributes_side_container}>
          {groupEditIsCreating && (
            <GroupCreateBox
              groupEditAnnotationIds={groupEditAnnotationIds}
              groupEditLinkIds={groupEditLinkIds}
              ontology={ontology}
            />
          )}
          {linkEditIsCreating && (
            <div>
              <h2>Create Link</h2>
              <LinkCreateBox
                fromEntryId={linkEditFromEntryId}
                toEntryId={linkEditToEntryId}
                ontology={ontology}
              />
            </div>
          )}

          {annoEditIsCreating && annoEditCursorBegin !== null && (
            <div className={style.link_edit_container}>
              <AnnotationCreateBox
                cursorBegin={annoEditCursorBegin}
                cursorEnd={annoEditCursorEnd}
                ontology={ontology}
              />
            </div>
          )}

          {selectedLink && (
            <div>
              <h2>Link Attributes</h2>
              <LinkDetail link={selectedLink} />
            </div>
          )}

          {selectedAnnotation && (
            <div>
              <h2>Annotation Attributes</h2>
              <AnnotationDetail
                parentAnnotations={selectedAnnotaionParents}
                childAnnotations={selectedAnnotaionChildren}
                annotation={selectedAnnotation}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TextViewer;
