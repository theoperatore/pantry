import React from 'react';
import { useItemDetailContext } from './ItemDetailContext';
import { Sheet } from '../Sheet';

export function ItemDetailDialog() {
  const [state, dispatch] = useItemDetailContext();

  function handleClose() {
    dispatch({ type: 'dialogStateClearAction' });
  }

  return (
    <Sheet isOpen={state.isOpen} onClose={handleClose}>
      {state.item && (
        <div>
          <div className="horizontal side-by-side">
            <img
              className="next-to"
              style={{ width: '75px', height: '75px' }}
              src={state.item.icon_url}
            />
            <p>{state.item.name}</p>
          </div>
          <div>
            <p>{JSON.stringify(state.item)}</p>
          </div>
        </div>
      )}
    </Sheet>
  );
}
