import React from 'react';
import styled from 'styled-components';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import format from 'date-fns/format';
import { useItemDetailContext } from './ItemDetailContext';
import { Sheet } from '../Sheet';
import { PantryItem } from '../../schema/pantry';
import { IconFreshness } from '../IconFreshness';
import { Button } from '../Button';
import { useUser } from '../../auth/UserContext';
import { IconImg, ItemName, Subtext } from './styles';

function Detail(props: { item: PantryItem }) {
  const user = useUser();
  const { item } = props;

  const quant = React.useMemo(() => {
    return props.item.quantities.filter((q) => !q.is_deleted);
  }, [props.item.quantities]);

  return (
    <div>
      <div className="horizontal vertical-next-to">
        <div className="horizontal side-by-side">
          <IconImg
            className="next-to"
            src={item.icon_url}
            alt={item.name.charAt(0)}
          />
          <ItemName>{item.name}</ItemName>
        </div>
        <div>
          <Button disabled={!user}>use</Button>
          <Button disabled={!user} variant="danger">
            <i className="fas fa-trash" />
          </Button>
        </div>
      </div>
      <div>
        {quant.map((q) => (
          <div
            key={q.added_date_ts}
            className="horizontal"
            style={{
              marginBottom: 'var(--spacing-nm)',
              paddingBottom: 'var(--spacing-sm)',
              borderBottom: '1px solid #ebebeb',
            }}
          >
            <div>
              <div className="vertical-right-next-to">
                {formatDistanceToNowStrict(new Date(q.added_date_ts), {
                  addSuffix: true,
                })}
              </div>
              <Subtext>
                {format(
                  new Date(q.last_modified_ts),
                  "'Last modified' LLL d, yyyy (EEEEEE)"
                )}
              </Subtext>
            </div>
            <div className="vertical end-vertical">
              <div className="vertical-right-next-to">{q.quantity}pcs</div>
              <div className="flex horizontal side-by-side center-content">
                <IconFreshness
                  className="fas fa-seedling right-next-to"
                  isFresh={true}
                />
                <IconFreshness
                  className="fas fa-seedling right-next-to"
                  isFresh={true}
                />
                <IconFreshness
                  className="fas fa-seedling right-next-to"
                  isFresh={true}
                />
                <IconFreshness
                  className="fas fa-seedling right-next-to"
                  isFresh={false}
                />
                <IconFreshness className="fas fa-seedling " isFresh={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ItemDetailDialog() {
  const [state, dispatch] = useItemDetailContext();

  function handleClose() {
    dispatch({ type: 'dialogStateClearAction' });
  }

  return (
    <Sheet isOpen={state.isOpen} onClose={handleClose}>
      {state.item && <Detail item={state.item} />}
    </Sheet>
  );
}
