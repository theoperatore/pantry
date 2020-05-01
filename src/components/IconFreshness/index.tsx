import styled from 'styled-components';

export const IconFreshness = styled.i<{ isFresh?: boolean }>`
  font-size: 0.75em;
  color: ${(props) =>
    props.isFresh ? props.theme.colors.freshness : 'rgba(0, 0, 0, 0.3)'};
`;
