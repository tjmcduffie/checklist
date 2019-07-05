"use strict";

import React, {useState} from 'react';
import {useTimeout} from 'shared/util/hooks';

const Loader = () => {
  const [periods, setPeriods] = useState('');

  useTimeout(
    () => setPeriods(periods.length === 3 ? '' : periods + '.'),
    250,
  );

  return (
    <div>Loading{periods}</div>
  );
}

export default Loader;
