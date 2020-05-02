import React from 'react';
import { useSpring, a, config } from 'react-spring';
import { useDrag } from 'react-use-gesture';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Sheet(props: Props) {
  const heightRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const [sheetHeight, setSheetHeight] = React.useState('100vh');
  const [{ y }, set] = useSpring(() => ({
    y: props.isOpen ? 0 : height,
    config: config.stiff,
  }));
  const bind = useDrag(
    (state) => {
      const { movement, swipe, cancel, last, down } = state;
      const [, my] = movement;
      const [, sy] = swipe;

      // if the user drags up too far, then cancel this drag
      // and reset to open
      if (my < -80) {
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
      initial: () => [0, y.get()],
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
    setSheetHeight(isStandalone ? '100vh' : `${window.innerHeight}px`);
  }, []);

  return (
    <>
      <a.div
        style={{
          zIndex: y.to([0, height], [1, 0], 'clamp'),
          visibility: props.isOpen ? 'visible' : 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: sheetHeight,
          touchAction: 'none',
          userSelect: 'none',
          opacity: y.to([0, height], [1, 0], 'clamp'),
          backgroundColor: y.to(
            [height, 0],
            ['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)'],
            'clamp'
          ),
        }}
        onClick={props.onClose}
      />
      <a.div
        className="sheet"
        {...bind()}
        style={{
          bottom: `calc(-100vh + ${height}px)`,
          touchAction: 'none',
          transform: y.to((val) => `translateY(${val}px)`),
        }}
      >
        <div
          className="sheet-content"
          style={{ touchAction: 'none' }}
          ref={heightRef}
        >
          {props.children}
        </div>
      </a.div>
    </>
  );
}
