import React, {useEffect} from 'react';
import RouteApp from './Route';
import {StoresProvider, stores} from './store';
import axios from 'axios';
const App: React.FC = () => {
  axios.defaults.baseURL = 'http://192.168.1.99:2255';
  axios.defaults.timeout = 10000;
  return (
    <StoresProvider value={stores}>
      <RouteApp />
    </StoresProvider>
  );
};

export default App;
