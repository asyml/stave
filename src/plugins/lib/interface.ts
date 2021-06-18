import {Dispatch, IRemoteConfigs, State} from '../../nlpviewer';

export interface PluginComponentProp {
  dispatch: Dispatch;
  appState: State;
  remoteConfigs?: IRemoteConfigs;
}
