import React from 'react';
import styled from 'styled-components';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import format from 'date-fns/format';
import { Sheet } from '../Sheet';
import { PantryItem } from '../../schema/pantry';
import { IconFreshness } from '../IconFreshness';
import { Button } from '../Button';
import { useUser } from '../../auth/UserContext';
import { IconImg, ItemName, Subtext } from './styles';
import { addQuantityToItem, useQuantityItem } from '../../gateway';

const Input = styled.input`
  font-size: 1em;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xs}`};
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ebebeb;
`;

function Detail(props: {
  item: PantryItem;
  onUpdate: () => Promise<boolean>;
  revalidate: () => Promise<boolean>;
}) {
  const [count, setCount] = React.useState('');
  const [status, setStatus] = React.useState('');
  const user = useUser();
  const { item } = props;

  const quant = React.useMemo(() => {
    return props.item.quantities.filter((q) => !q.is_deleted);
  }, [props.item.quantities]);

  const hasNone = quant.reduce((s, q) => s + q.quantity, 0) === 0;

  async function handleAddQuantity() {
    const num = Number(count);

    if (!user) return;
    if (isNaN(num)) return;

    setStatus('pending');
    try {
      const response = await addQuantityToItem(user, item.id, num);
      if (response.ok) {
        // revalidate
        setCount('');
        await props.onUpdate();
      } else {
        alert(
          `Failed to add quantity: ${response.status}, ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(error);
      alert(`Failed to add quantity: ${error.message}`);
    }

    // reset form status no matter what
    setStatus('');
  }

  async function handleUseQuantity() {
    if (!user) return;

    setStatus('pending');
    try {
      const response = await useQuantityItem(user, item.id);
      if (response.ok) {
        props.revalidate();
      }

      if (!response.ok) {
        const { status, message } = await response.json();
        alert(`Not-ok response: (${response.status}), ${status} ${message}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Failed to use item: ${error.message}`);
    }

    setStatus('');
  }

  return (
    <div>
      <div className="horizontal vertical-next-to">
        <div className="horizontal side-by-side">
          <IconImg
            className="next-to"
            src={item.icon_url}
            alt={item.name.charAt(0)}
          />
          <div>
            <ItemName className="vertical-right-next-to">{item.name}</ItemName>
            <Subtext>Fresh for {item.expires_in}</Subtext>
          </div>
        </div>
        <div>
          <Button
            disabled={!user || hasNone || status === 'pending'}
            onClick={handleUseQuantity}
          >
            use
          </Button>
          <Button disabled={!user} variant="danger">
            <i className="fas fa-trash" />
          </Button>
        </div>
      </div>
      <div className="vertical-next-to">
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
                Stocked{' '}
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
              <div className="vertical-right-next-to">
                {q.quantity}
                {item.quantity_type === 'unit' ? 'pcs' : 'pct'}
              </div>
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
      <div className={!user ? 'disabled' : ''}>
        <p className="vertical-next-to">Add quantity</p>
        <div className="vertical-next-to">
          <Input
            inputMode="decimal"
            pattern="\d*"
            placeholder="Number of items"
            type="number"
            value={count}
            onChange={(ev) => {
              const val = ev.target.value;
              if (!isNaN(Number(val))) {
                setCount(val);
              }
            }}
          />
        </div>
        <div className="horizontal">
          <div>
            <Button
              onClick={() =>
                setCount((c) =>
                  isNaN(Number(c)) ? '1' : `${Math.max(Number(c) - 1, 1)}`
                )
              }
            >
              <i className="fas fa-minus" />
            </Button>
            <Button
              onClick={() =>
                setCount((c) => (isNaN(Number(c)) ? '1' : `${Number(c) + 1}`))
              }
            >
              <i className="fas fa-plus" />
            </Button>
          </div>
          <div className="flex horizontal end">
            <Button
              variant="danger"
              onClick={() => setCount('')}
              disabled={status === 'pending'}
            >
              clear
            </Button>
            <Button
              disabled={
                !user ||
                Number(count) === 0 ||
                isNaN(Number(count)) ||
                status === 'pending'
              }
              onClick={handleAddQuantity}
            >
              add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  item?: PantryItem;
  onClose: () => void;
  revalidate: () => Promise<boolean>;
};

export function ItemDetailDialog(props: Props) {
  const isOpen = !!props.item;

  async function handleUpdate() {
    const out = await props.revalidate();
    props.onClose();
    return out;
  }

  return (
    <Sheet isOpen={isOpen} onClose={props.onClose}>
      {props.item && (
        <Detail
          item={props.item}
          onUpdate={handleUpdate}
          revalidate={props.revalidate}
        />
      )}
    </Sheet>
  );
}
