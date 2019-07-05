"use strict";

import {useEffect, useRef} from 'react';

export default function useTimeout(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let timeout = setTimeout(tick, delay);
    return () => clearTimeout(timeout);
  }, [delay]);
}
