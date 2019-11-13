import React, { useState } from 'react';
import { Dispatch, State } from '../contexts/text-viewer.context';
import style from './Group.module.css';
import { IGroup, ISinglePack } from '../lib/interfaces';

interface PluginComponenProp {
  dispatch: Dispatch;
  appState: State;
}

// function Foo(props: any) {
//   console.log('render foo');
//   const [num, setNum] = useState(0);
//   return (
//     <div className="App">
//       <h1>{num}</h1>
//       <button onClick={() => setNum(num + 1)}>+</button>
//     </div>
//   );
// }

function Group(props: PluginComponenProp) {
  const [dropGroupId, setDropGroupId] = useState<string | null>(null);

  if (!props.appState.textPack) {
    return null;
  }

  const dispatch = props.dispatch;
  const { textPack, selectedLegendIds } = props.appState;
  const { groups } = textPack;
  //   const visibleGroups = groups.filter(group =>
  //     selectedLegendIds.includes(group.legendId)
  //   );

  //   if (!visibleGroups.length) {
  //     return null;
  //   }

  return (
    <div key={'plugin-group'} className={style.group_name_container}>
      {groups.map(group => {
        // const isSelected = selectedGroupIds.includes(group.id);

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
            onClick={() => {
              //   if (isSelected) {
              //     dispatch({
              //       type: 'deselect-group',
              //       groupId: group.id,
              //     });
              //   } else {
              //     dispatch({
              //       type: 'select-group',
              //       groupId: group.id,
              //     });
              //   }
            }}
          >
            {/* {group.id} */}
            {/* <span>({group.members.length})</span> */}
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
