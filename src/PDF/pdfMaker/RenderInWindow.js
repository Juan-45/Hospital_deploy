import { useState, useEffect } from 'react';
import React from 'react';
import { createPortal } from 'react-dom';

const RenderInWindow = ({ setState, ...props }, ref) => {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    setContainer(document.createElement('div'));
  }, []);

  useEffect(() => {
    if (container) {
      ref.current = window.open('', '', 'width=1000px,height=1000px');
      ref.current.document.body.appendChild(container);
      ref.current.document.title = 'Planilla Pre-Quirúrgica';
      ref.current.onbeforeunload = () => setState(false);
      const curWindow = ref.current;
      return () => curWindow.close();
    }
  }, [container, ref, setState]);

  return container && createPortal(props.children, container);
};
export default React.forwardRef(RenderInWindow);
