import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const RenderInPortal = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!container.current) {
      container.current = document.createElement('div');
      document.body.appendChild(container.current);
    }
    return () => {
      container.current && document.body.removeChild(container.current);
      container.current = null;
    };
  }, []);
  if (!container.current) return null;
  return createPortal(children, container.current);
};
