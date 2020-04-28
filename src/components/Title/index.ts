import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 1em;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  font-weight: 100;
  letter-spacing: 4px;
  line-height: 1;
  display: inline;
`;
