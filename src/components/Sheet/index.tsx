import React from 'react';
import styled from 'styled-components';
import { useSpring, useTransition, animated as a, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const DragHandle = styled.div`
  background-color: #ebebeb;
  border-radius: 5px;
  width: 48px;
  height: 4px;
  content: ' ';
`;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Sheet(props: Props) {
  const [height, setHeight] = React.useState(0);

  const [{ y }, set] = useSpring(() => ({
    y: props.isOpen ? 0 : height,
    config: config.stiff,
  }));

  const transitions = useTransition(props.isOpen, null, {
    enter: { opacity: 1 },
    from: { opacity: 0 },
    leave: { opacity: 0 },
  });

  const bind = useDrag(
    (state) => {
      const { movement, swipe, cancel, last, down } = state;
      const [, my] = movement;
      const [, sy] = swipe;
      const nextPlace = height + (height - my);

      // if the user drags up too far, then cancel this drag
      // and reset to open
      if (nextPlace > height + 100) {
        cancel && cancel();
      }

      // handle a user swiping down, for closing...
      if (sy === 1) {
        props.onClose();
        return;
      }

      if (last && nextPlace < height * 0.75) {
        props.onClose();
        return;
      }

      set({
        immediate: false,
        y: down ? nextPlace : height,
        config: {
          tension: 300,
          friction: 20,
        },
      });
    },
    {
      axis: 'y',
      bounds: {
        top: height,
      },
      rubberband: true,
      initial: () => [0, y.getValue()],
    }
  );

  React.useEffect(() => {
    if (props.isOpen) {
      set({
        y: height,
        immediate: false,
        config: { ...config.stiff, clamp: false },
      });
    } else {
      set({
        y: 0,
        immediate: false,
        config: { ...config.stiff, clamp: true },
      });
    }
  }, [props.isOpen, height]);

  React.useEffect(() => {
    const newHeight = window.innerHeight * 0.8;
    setHeight(newHeight);
  }, []);

  // All of this to prevent scrolling of the body for standalone.
  React.useEffect(() => {
    const isInWebAppiOS = (window.navigator as any).standalone == true;
    const isInWebAppChrome = window.matchMedia('(display-mode: standalone)')
      .matches;
    const isStandalone = isInWebAppiOS || isInWebAppChrome;

    if (props.isOpen) {
      if (isStandalone) {
        const offsetY = window.pageYOffset;
        document.body.style.position = 'fixed';
        document.body.style.top = `${-offsetY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
      }

      document.body.style.touchAction = 'none';
      document.body.style.overflow = 'hidden';
    } else {
      if (isStandalone) {
        const offsetY = Math.abs(parseInt(document.body.style.top || '0', 10));
        window.scrollTo(0, offsetY || 0);
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('left');
        document.body.style.removeProperty('right');
      }
      document.body.style.touchAction = 'unset';
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
    }
  }, [props.isOpen]);

  return (
    <>
      {transitions.map(
        ({ item, key, props: styleProps }) =>
          item && (
            <React.Fragment key={key}>
              <a.div
                style={{
                  ...styleProps,
                  zIndex: 1,
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  touchAction: props.isOpen ? 'none' : 'auto',
                  userSelect: props.isOpen ? 'none' : 'unset',
                  // NOTE: This subscription to y.interpolate needs to be dynamically
                  // added and removed in order to prevent a "setState on unmounted component".
                  // When the sheet is open, change the background color based on the user dragging
                  // the sheet itself. When the sheet is closed, then rely on the opacity to
                  // cause fading via the useTransition and hard code the background color
                  // to the last interpolated value.
                  backgroundColor: props.isOpen
                    ? y.interpolate({
                        range: [height, 0],
                        output: ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)'],
                      })
                    : y
                        .interpolate({
                          range: [height, 0],
                          output: ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)'],
                        })
                        .getValue(),
                }}
                onClick={props.onClose}
              />
              <a.div
                className="sheet"
                style={{
                  top: '100%',
                  touchAction: 'none',
                  transform: y.interpolate((val) => `translateY(-${val}px)`),
                }}
              >
                <div
                  {...bind()}
                  className="horizontal center-content"
                  style={{
                    userSelect: 'none',
                    touchAction: 'none',
                    height: '48px',
                  }}
                >
                  <DragHandle />
                </div>
                <div className="sheet-content" style={{ touchAction: 'pan-y' }}>
                  {props.children}
                </div>
              </a.div>
            </React.Fragment>
          )
      )}
    </>
  );
}
