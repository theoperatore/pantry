import React from 'react';
import styled from 'styled-components';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { useItemDetailContext } from '../ItemDetail/ItemDetailContext';
import { PantryItem } from '../../schema/pantry';
import { IconFreshness } from '../IconFreshness';

const ItemContainer = styled.div`
  border-radius: 10px;
  padding: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.125);

  &:active {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  }
`;

const IconImg = styled.img`
  height: 48px;
  width: 48px;
`;

const IconLabel = styled.p<{ bold?: boolean }>`
  margin-bottom: ${(props) => props.theme.spacing.xs};
  font-weight: ${(props) => (props.bold ? 'bold' : null)};
`;

const IconSubLabel = styled.p`
  font-size: 0.75em;
  color: ${(props) => props.theme.colors.neutral};
`;

type Props = {
  item: PantryItem;
};

export function Item(props: Props) {
  const [, dispatch] = useItemDetailContext();

  function handleClick() {
    dispatch({ type: 'dialogStateSetAction', pantryItem: props.item });
  }

  const { icon_url, name } = props.item;

  const quant = React.useMemo(() => {
    return props.item.quantities.filter((q) => !q.is_deleted);
  }, [props.item.quantities]);

  const total = quant.reduce((sum, q) => sum + q.quantity, 0);

  const earliest = quant.reduce(
    (e, q) => (e < q.added_date_ts ? e : q.added_date_ts),
    Infinity
  );

  return (
    <ItemContainer onClick={handleClick}>
      <div className="horizontal">
        <div className="center right-next-to">
          <IconImg src={icon_url} alt={name.charAt(0)} />
        </div>
        <div className="flex vertical center-vertical">
          <IconLabel bold>{name}</IconLabel>
          <IconSubLabel>
            {earliest !== Infinity &&
              `stocked ${formatDistanceToNowStrict(new Date(earliest), {
                addSuffix: true,
              })}`}
          </IconSubLabel>
        </div>
        <div className="flex vertical center-vertical end-vertical">
          <IconLabel>{total}pcs</IconLabel>
          <div className="horizontal side-by-side">
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
    </ItemContainer>
  );
}
