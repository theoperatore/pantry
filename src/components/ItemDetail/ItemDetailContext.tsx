import React from 'react';
import { PantryItem } from '../../schema/pantry';

const DialogContext = React.createContext<
  [DialogState, React.Dispatch<DialogStateAction>]
>([{ isOpen: false }, () => {}]);

export function useItemDetailContext() {
  return React.useContext(DialogContext);
}

type DialogState = {
  isOpen: boolean;
  item?: PantryItem;
};

type DialogStateClearAction = {
  type: 'dialogStateClearAction';
};
type DialogStateSetAction = {
  type: 'dialogStateSetAction';
  pantryItem: PantryItem;
};

type DialogStateAction = DialogStateClearAction | DialogStateSetAction;

function dialogReducer(state: DialogState, action: DialogStateAction) {
  switch (action.type) {
    case 'dialogStateClearAction':
      return {
        ...state,
        isOpen: false,
      };
    case 'dialogStateSetAction':
      return {
        ...state,
        item: action.pantryItem,
        isOpen: true,
      };
    default:
      return state;
  }
}

type Props = {
  children: React.ReactNode;
};

export function ItemDetailProvider(props: Props) {
  const stateActions = React.useReducer(dialogReducer, { isOpen: false });

  return (
    <DialogContext.Provider value={stateActions}>
      {props.children}
    </DialogContext.Provider>
  );
}
