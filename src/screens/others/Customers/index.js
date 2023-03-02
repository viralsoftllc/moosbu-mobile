import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FormButton from '../../../shared/components/FormButton';
import routes from '../../../shared/constants/routes';

export default function Customers() {
  const {navigate} = useNavigation();

  return (
    <View>
      <Text>Customers</Text>
      <FormButton
        title={'Nav'}
        onPress={() => navigate(routes.CUSTOMER_ORDER)}
      />
    </View>
  );
}
const styles = StyleSheet.create({});
