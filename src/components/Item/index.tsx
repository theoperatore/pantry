import React from 'react';
import styled from 'styled-components';

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

const IconFreshness = styled.i<{ isFresh?: boolean }>`
  font-size: 0.75em;
  color: ${(props) =>
    props.isFresh ? props.theme.colors.freshness : 'rgba(0, 0, 0, 0.3)'};
`;

type Props = {
  name: string;
  iconUrl: string;
  // quantityType: 'range' | 'unit';

  // nest these fields
  quantity: number;
};

export function Item(props: Props) {
  return (
    <ItemContainer>
      <div className="horizontal">
        <div className="center right-next-to">
          <IconImg src={props.iconUrl} alt={props.name.charAt(0)} />
        </div>
        <div className="flex vertical center-vertical">
          <IconLabel bold>{props.name}</IconLabel>
          <IconSubLabel>3 days ago</IconSubLabel>
        </div>
        <div className="flex vertical center-vertical end-vertical">
          <IconLabel>{props.quantity}pcs</IconLabel>
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
