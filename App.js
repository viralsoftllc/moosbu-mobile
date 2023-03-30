import React, {useEffect} from 'react';
import {Provider} from 'react-redux';

import store from './src/redux/store';
import Instance from './src/instance';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar hidden={true} />
      <Instance />
    </Provider>
  );
};

export default App;
