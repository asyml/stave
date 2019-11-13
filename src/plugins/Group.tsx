import React, { useState } from 'react';
import { Dispatch, State } from '../contexts/text-viewer.context';
import style from './Group.module.css';
import { IGroup, ISinglePack } from '../lib/interfaces';

interface PluginComponenProp {
  dispatch: Dispatch;
  appState: State;
}

function Group(props: PluginComponenProp) {
  const [dropGroupId, setDropGroupId] = useState<string | null>(null);

  if (!props.appState.textPack) {
    return null;
  }

  const dispatch = props.dispatch;
  const { textPack } = props.appState;
  const { groups } = textPack;

  return (
    <div key={'plugin-group'} className={style.group_name_container}>
      {groups.map(group => {
        return (
          <div
            key={group.id}
            onDragEnter={event => {
              event.preventDefault();

              if (dropGroupId !== group.id) {
                setDropGroupId(group.id);
              }
            }}
            onDragOver={event => {
              event.preventDefault();
            }}
            onDragLeave={() => {
              setDropGroupId(null);
            }}
            onDrop={event => {
              event.preventDefault();

              const data = JSON.parse(event.dataTransfer.getData('text/plain'));

              if (data.type === 'drag-annotation') {
                dispatch({
                  type: 'add-member-to-group',
                  groupId: group.id,
                  memberId: data.annotationId,
                });
              }

              setDropGroupId(null);
            }}
            className={`${style.group}
                ${dropGroupId === group.id ? style.group_dropped : ''}`}
          >
            {group.members.map((member, i) => (
              <span
                key={i}
                className={style.member_item}
                onClick={() => {
                  if (group.memberType === 'annotation') {
                    dispatch({
                      type: 'jump-to-annotation',
                      annotationId: member,
                    });
                    dispatch({
                      type: 'select-annotation',
                      annotationId: member,
                    });
                  } else {
                    alert('TODO: select member of type other than annotation');
                  }
                }}
              >
                {getMemberDetail(group, member, textPack)}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function getMemberDetail(group: IGroup, member: string, textPack: ISinglePack) {
  if (group.memberType === 'annotation') {
    const annotaion = textPack.annotations.find(ann => ann.id === member);
    if (annotaion) {
      return textPack.text.substring(annotaion.span.begin, annotaion.span.end);
    } else {
      return '';
    }
  } else {
    return 'link';
  }
}

function enabled(state: State) {
  return true;
}

const plugin = {
  name: 'Group',
  component: Group,
  enabled: enabled,
};

export default plugin;
