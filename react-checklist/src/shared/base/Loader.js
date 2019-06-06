import React, {useEffect, useState} from 'react';

const Loader = () => {
  const [periods, setPeriods] = useState('');
  let timeout;

  useEffect(() => {
    timeout = setTimeout(
      () => setPeriods(periods.length === 3 ? '' : periods + '.'),
      250
    );
    return () => clearTimeout(timeout);
  }, [periods]);

  return (
    <div>Loading{periods}</div>
  );
}

export default Loader;
