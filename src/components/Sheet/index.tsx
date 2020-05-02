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
  const [height, setHeight] = React.useState(1337);
  const [screenHeight, setScreenHeight] = React.useState('100vh');

  const [{ y }, set] = useSpring(() => ({
    y: props.isOpen ? 0 : height,
    config: config.stiff,
    immediate: true,
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

      // if the user drags up too far, then cancel this drag
      // and reset to open
      if (my < -120) {
        cancel && cancel();
      }

      // handle a user swiping down, for closing...
      if (sy === 1) {
        props.onClose();
        return;
      }

      if (last && my > height * 0.75) {
        props.onClose();
        return;
      }

      set({
        immediate: false,
        y: down ? my : 0,
        config: {
          tension: 300,
          friction: 20,
        },
      });
    },
    {
      axis: 'y',
      bounds: {
        top: 0,
      },
      rubberband: true,
      initial: () => [0, y.getValue()],
    }
  );

  React.useEffect(() => {
    if (props.isOpen) {
      set({ y: 0, immediate: false });
    } else {
      set({ y: height, immediate: false });
    }
  }, [props.isOpen, height]);

  React.useEffect(() => {
    const newHeight = window.innerHeight * 0.75;
    setHeight(newHeight);
  }, []);

  React.useEffect(() => {
    const isStandalone = (window.navigator as any).standalone;
    setScreenHeight(isStandalone ? '100vh' : `${window.innerHeight}px`);
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
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: screenHeight,
                touchAction: 'none',
                userSelect: 'none',
                // TODO: this will cause a console warning for setting state on an
                // unmounted component because y.interpolate seems to subscribe
                // to some updates that arae happening...
                // gonna leaave this here until v9 comes out
                // backgroundColor: y.interpolate({
                //   range: [0, height],
                //   output: ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)'],
                // }),

                // TODO: uncomment out the above to enable a dynamic background
                // based on user moving the sheet. That is way cooler but it
                // can potentially cause a memory leak...too nervous to do it.
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}
              onClick={props.onClose}
            />
          )
      )}
      <a.div
        className="sheet"
        {...bind()}
        style={{
          bottom: `calc(-100vh + ${height}px)`,
          touchAction: 'none',
          transform: y.interpolate((val) => `translateY(${val}px)`),
        }}
      >
        <div className="sheet-content" style={{ touchAction: 'none' }}>
          {props.children}
        </div>
      </a.div>
    </>
  );
}
