import React from 'react';
import styled from 'styled-components';

export const AppBarComp = styled.div<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: ${(props) => props.theme.spacing.sm};
  box-shadow: ${(props) =>
    props.isScrolled ? '0 0 10px 4px rgba(0, 0, 0, 0.12)' : null};
  background-color: white;
  transition: box-shadow 300ms ease-in-out;
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
