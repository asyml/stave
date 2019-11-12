import React from 'react';
import { Dispatch, State } from '../contexts/text-viewer.context';
import style from './Group.module.css';
import { IGroup, ISinglePack } from '../lib/interfaces';

interface PluginComponenProp {
  dispatch: Dispatch;
  appState: State;
}

function Group(props: PluginComponenProp) {
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
    <div className={style.group_name_container}>
      {groups.map(group => {
        // const isSelected = selectedGroupIds.includes(group.id);

        return (
          <div
            key={group.id}
            className={`${style.group}`}
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
              <span key={i} className={style.member_item}>
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
