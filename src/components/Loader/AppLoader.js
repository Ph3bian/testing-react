import React from 'react';
import PrivateLayout from '../Layout/layout';
const AppLoader = () => {
  return (
    <PrivateLayout>
      <div styles={{ display: 'grid', placeItems: 'center' }}>loading....</div>
    </PrivateLayout>
  );
};
export default AppLoader;
