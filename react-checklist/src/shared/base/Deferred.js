import Loader from 'shared/base/Loader';
import React, {lazy, Suspense} from 'react';

const Deferred = ({importFn, id}) => {
  const LazyComponent = lazy(importFn);
  return (
    <Suspense fallback={<Loader />}>
      <LazyComponent />
    </Suspense>
  );
}

export default Deferred;
