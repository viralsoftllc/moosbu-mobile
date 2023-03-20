import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider, useSelector} from 'react-redux';

import AuthNavigator from '../navigation/auth';
import MainNavigator from '../navigation/main';
import {selectToken} from '../redux/slices/auth/selectors';
import store from '../redux/store';

export default function Instance() {
  const token = useSelector(selectToken);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {token ? <MainNavigator /> : <AuthNavigator />}
        {/* <MainNavigator /> */}
      </NavigationContainer>
    </Provider>
  );
}
