import React, {useLayoutEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';

import routes from '../../../shared/constants/routes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import TopTabBar from '../components/TopTabBar';
import SavedConversations from '../../../screens/marketingSuite/MBot/SavedConversations';
import FavouriteConversations from '../../../screens/marketingSuite/MBot/FavouriteConversations';
import ConversationTemplates from '../../../screens/marketingSuite/MBot/ConversationTemplates';

const Tab = createMaterialTopTabNavigator();

export default function MBotTopTabNavigator() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'mBot Conversations'} />,
    });
  }, [setOptions]);

  return (
    <Tab.Navigator
      initialRouteName={routes.SAVED_CONVERSATIONS}
      tabBar={props => <TopTabBar {...props} />}>
      <Tab.Screen
        name={routes.SAVED_CONVERSATIONS}
        component={SavedConversations}
        options={{
          tabBarLabel: 'Saved',
        }}
      />
      <Tab.Screen
        name={routes.FAVOURITE_CONVERSATIONS}
        component={FavouriteConversations}
        options={{
          tabBarLabel: 'Favourites',
        }}
      />
      <Tab.Screen
        name={routes.CONVERSATION_TEMPLATES}
        component={ConversationTemplates}
        options={{
          tabBarLabel: 'Templates',
        }}
      />
    </Tab.Navigator>
  );
}
