import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/main';
import AuthNavigator from './src/navigation/auth';

const App = () => {
  return (
    <NavigationContainer>
      {/* <AuthNavigator /> */}
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
