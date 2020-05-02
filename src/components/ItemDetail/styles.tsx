import styled from 'styled-components';

export const IconImg = styled.img`
  width: 75px;
  height: 75px;
`;

export const ItemName = styled.h3`
  font-size: 1em;
  font-weight: bold;
`;

export const Subtext = styled.p`
  font-size: 0.75em;
  color: ${(props) => props.theme.colors.neutral};
`;
