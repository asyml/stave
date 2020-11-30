import React, {useReducer, createContext, useContext} from 'react';

export type ContextProviderProps = {children: React.ReactNode};

export function createContextProvider<StateT, ActionT>(
  reducer: (state: StateT, action: ActionT) => StateT,
  initialState: StateT
) {
  type Dispatch = (action: ActionT) => void;

  const StateContext = createContext<StateT | undefined>(undefined);
  const DispatchContext = createContext<Dispatch | undefined>(undefined);

  function ContextProvider({children}: ContextProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  }

  function useContextState() {
    const context = useContext(StateContext);
    if (context === undefined) {
      throw new Error('useContextState must be used with a ContextProvider');
    }
    return context;
  }

  function useContextDispatch() {
    const context = useContext(DispatchContext);
    if (context === undefined) {
      throw new Error('useContextDispatch must be used with a ContextProvider');
    }
    return context;
  }

  return [ContextProvider, useContextState, useContextDispatch] as [
    typeof ContextProvider,
    typeof useContextState,
    typeof useContextDispatch
  ];
}
