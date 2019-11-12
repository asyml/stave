import React from 'react';
import { Dispatch, State } from '../contexts/text-viewer.context';
import style from './Group.module.css';

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
          //   dispatch({ type: 'toggle-all-group' });
        }}
        className={style.group_legend_toggle_button}
      >
        ✓
      </button>
      <span className={style.group_legend_label}>Groups:</span>

      {visibleGroups.map(group => {
        // const isSelected = selectedGroupIds.includes(group.id);

        return (
          <span
            key={group.id}
            style={{
              background: 'red',
            }}
            className={`${style.group_name}`}
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
            {group.id}
            <span>({group.members.length})</span>
          </span>
        );
      })}
    </div>
  );
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
