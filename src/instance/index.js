import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';

import AuthNavigator from '../navigation/auth';
import MainNavigator from '../navigation/main';
import {selectToken} from '../redux/slices/auth/selectors';

export default function Instance() {
  const token = useSelector(selectToken);

  return (
    <NavigationContainer>
      {token ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
