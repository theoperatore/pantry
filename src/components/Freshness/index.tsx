import React from 'react';
import add from 'date-fns/add';
import { Quantity } from '../../schema/generated';
import { IconFreshness } from '../IconFreshness';

type Props = {
  expiresIn: string;
  quantity: Quantity;
};

function parseExpiresInToDate(addedTs: number, expiresIn: string): Date {
  const reg = /(\d+)([dwmy])/;
  const match = reg.exec(expiresIn);

  // this shouldn't happen, but since we don't have any
  // validation rules and it's just a string...
  if (!match) return new Date(1970, 0, 1);
  const [, num, unit] = match;
  const start = new Date(Number(addedTs));

  let duration = 'days';
  switch (unit) {
    case 'w':
      duration = 'weeks';
      break;
    case 'm':
      duration = 'months';
      break;
    case 'y':
      duration = 'years';
      break;
    default:
      duration = 'days';
  }

  return add(start, { [duration]: Number(num) });
}

export function Freshness(props: Props) {
  const now = Date.now();
  const startedTs = Number(props.quantity.added_date_ts);
  const expiresTs = React.useMemo(
    () =>
      parseExpiresInToDate(
        props.quantity.added_date_ts,
        props.expiresIn
      ).getTime(),
    [props.quantity.added_date_ts, props.expiresIn]
  );

  const nowToEnd = expiresTs - now;
  const fullTime = expiresTs - startedTs;
  const ratio = nowToEnd / fullTime;

  const is20Fresh = 0 < ratio && ratio >= 0.2;
  const is40Fresh = 0.21 < ratio && ratio >= 0.4;
  const is60Fresh = 0.41 < ratio && ratio >= 0.6;
  const is80Fresh = 0.61 < ratio && ratio >= 0.8;
  const is100Fresh = ratio >= 0.81;

  return (
    <div className="horizontal side-by-side">
      {/* 20% - 1% fresh */}
      <IconFreshness
        className="fas fa-seedling right-next-to"
        isFresh={is20Fresh}
      />
      {/* 40% - 21% fresh */}
      <IconFreshness
        className="fas fa-seedling right-next-to"
        isFresh={is40Fresh}
      />
      {/* 60% - 41% fresh */}
      <IconFreshness
        className="fas fa-seedling right-next-to"
        isFresh={is60Fresh}
      />
      {/* 80% - 61% fresh */}
      <IconFreshness
        className="fas fa-seedling right-next-to"
        isFresh={is80Fresh}
      />
      {/* 100% - 81% fresh */}
      <IconFreshness className="fas fa-seedling " isFresh={is100Fresh} />
    </div>
  );
}
