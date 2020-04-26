import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

const ItemContainer = styled.div`
  border-radius: 10px;
  padding: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  background-color: #f3f3f3;
`;

export function Item() {
  return (
    <ItemContainer>
      <div className="vertical">
        <div className="horizontal">
          <div>
            <div>Broccoli</div>
          </div>
          <div>
            <Button>remove</Button>
          </div>
        </div>
        <div className="horizontal side-by-side">
          <Button className="next-to">-</Button>
          <Button className="next-to">3</Button>
          <Button>+</Button>
        </div>
      </div>
    </ItemContainer>
  );
}
