import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'danger';

type ButtonProps = {
  variant?: ButtonVariant;
};

function getColor(variant: ButtonVariant, theme: any) {
  switch (variant) {
    case 'primary':
      return theme.colors.primary;
    case 'danger':
      return theme.colors.danger;
    default:
      return theme.colors.primary;
  }
}

export const Button = styled.button<ButtonProps>`
  border: 0;
  border-radius: 5px;
  background-color: rgba(51, 51, 51, 0.05);
  color: ${(props) => getColor(props.variant || 'primary', props.theme)};
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
