import React from 'react';
import styled from 'styled-components';

export const AppBarComp = styled.div<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: calc(
    env(safe-area-inset-top) + ${(props) => props.theme.spacing.sm}
  );
  padding-left: ${(props) => props.theme.spacing.sm};
  padding-right: ${(props) => props.theme.spacing.sm};
  padding-bottom: ${(props) => props.theme.spacing.sm};
  box-shadow: ${(props) =>
    props.isScrolled ? '0 0 10px 4px rgba(0, 0, 0, 0.12)' : null};
  background-color: white;
  transition: box-shadow 300ms ease-in-out;

  /* provide as many hints to the browser as possible
   * that this fixed item should be rendered correctly and not jitter.
   * It'll never be enough though... :(
   */
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  will-change: scroll-position contents;
  z-index: 1;
`;

type Props = {
  children: React.ReactNode;
};

export function AppBar(props: Props) {
  const [isScrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const val = window.pageYOffset || document.documentElement.scrollTop;
      if (val > 0) {
        setScrolled(true);
      }

      if (val === 0) {
        setScrolled(false);
      }
    }

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [setScrolled]);

  return (
    <AppBarComp isScrolled={isScrolled} className="horizontal center">
      {props.children}
    </AppBarComp>
  );
}
