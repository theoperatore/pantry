import React from 'react';
import styled from 'styled-components';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { PantryItem, Quantity } from '../../graphql/__generated__';
import { Freshness } from '../Freshness';

const ItemContainer = styled.div<{ empty?: boolean }>`
  border-radius: 10px;
  padding: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  box-shadow: ${(props) =>
    props.empty ? null : '0px 5px 10px 0px rgba(0, 0, 0, 0.1)'};
  transition: box-shadow 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.125);

  &:active {
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  }
`;

const IconImg = styled.img<{ empty?: boolean }>`
  height: 48px;
  width: 48px;
  opacity: ${(props) => (props.empty ? 0.25 : 1)};
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
  onItemSelect: (itemId: string) => void;
};

export function Item(props: Props) {
  function handleClick() {
    props.onItemSelect(props.item.id);
  }

  const { icon_url, name, quantity_type } = props.item;

  const quant = React.useMemo(() => {
    return props.item.quantities.filter((q) => !q.is_deleted);
  }, [props.item.quantities]);

  const total = quant.reduce((sum, q) => sum + q.quantity, 0);

  // need to manually add the type here to reduce because some
  // items don't have any members inside quantities, so that
  // is defaulted to null
  const earliest = quant
    .filter((q) => q.quantity > 0 && !q.is_deleted)
    .reduce<Quantity | null>(
      (e, q) => (e && e.added_date_ts < q.added_date_ts ? e : q),
      null
    );

  return (
    <ItemContainer
      onClick={handleClick}
      className={total === 0 ? 'disabled' : ''}
      empty={total === 0}
    >
      <div className="horizontal">
        <div className="center right-next-to">
          <IconImg src={icon_url} alt={name.charAt(0)} empty={total === 0} />
        </div>
        <div className="flex vertical center-vertical">
          <IconLabel bold>{name}</IconLabel>
          <IconSubLabel>
            {earliest &&
              `Stocked ${formatDistanceToNowStrict(
                new Date(earliest.added_date_ts),
                {
                  addSuffix: true,
                }
              )}`}
          </IconSubLabel>
        </div>
        <div className="flex vertical center-vertical end-vertical">
          <IconLabel>
            {total}
            {quantity_type === 'unit' ? 'pcs' : 'pct'}
          </IconLabel>
          {earliest && (
            <Freshness quantity={earliest} expiresIn={props.item.expires_in} />
          )}
        </div>
      </div>
    </ItemContainer>
  );
}
