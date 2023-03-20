import React from 'react';
import {Provider} from 'react-redux';

import store from './src/redux/store';
import Instance from './src/instance';

const App = () => {
  return (
    <Provider store={store}>
      <Instance />
    </Provider>
  );
};

export default App;
