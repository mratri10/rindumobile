import React from 'react';
import RouteApp from './Route';
import { StoresProvider, stores } from './store';

const App: React.FC = () => {
  return (
    <StoresProvider value={stores}>
      <RouteApp />
    </StoresProvider>
  )
}

export default (App)