import styled from 'styled-components';

export const Button = styled.button`
  border: 0;
  border-radius: 5px;
  background-color: rgba(51, 51, 51, 0.05);
  color: ${(props) => props.theme.colors.primary};
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75em;
  padding: ${(props) => props.theme.spacing.sm};
  letter-spacing: 1px;

  &:disabled {
    cursor: not-allowed;
  }

  & + & {
    margin-left: ${(props) => props.theme.spacing.xs};
  }
`;
