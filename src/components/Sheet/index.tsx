import React from 'react';
import { useSpring, useTransition, animated as a, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

// TODO: make this mount at the bottom by default
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
    const newHeight = window.innerHeight * 0.75;
    setHeight(newHeight);
  }, []);

  return (
    <>
      {transitions.map(
        ({ item, key, props: styleProps }) =>
          item && (
            <a.div
              key={key}
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
          )
      )}
      <a.div
        className="sheet"
        {...bind()}
        style={{
          top: '100vh',
          touchAction: 'none',
          transform: y.interpolate((val) => `translateY(-${val}px)`),
        }}
      >
        <div className="sheet-content" style={{ touchAction: 'none' }}>
          {props.children}
        </div>
      </a.div>
    </>
  );
}
