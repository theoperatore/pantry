import styled from 'styled-components';
import { AppBarComp } from '../AppBar';

export const ContentLayout = styled.div`
  padding-top: ${(props) => props.theme.spacing.sm};
  padding-left: ${(props) => props.theme.spacing.sm};
  padding-right: ${(props) => props.theme.spacing.sm};
  padding-bottom: env(safe-area-inset-bottom);

  /* 63px is the height of the AppBar as of writing */
  ${AppBarComp} + & {
    padding-top: calc(
      env(safe-area-inset-top) + 63px + ${(props) => props.theme.spacing.sm}
    );
  }
`;
