import {StyleSheet, Pressable, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {COLORS} from '../../../../assets/themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LongButton = ({icon, title, label, handlePress}) => {
  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: COLORS.tabBg,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={icon} color={COLORS.primary} size={30} />
        </View>
        <View>
          <Text variant="bodyMedium" style={{fontWeight: '600'}}>
            {title}
          </Text>
          <Text variant="bodySmall" style={{color: COLORS.gray}}>
            {label}
          </Text>
        </View>
      </View>
      <Icon name="chevron-right" size={24} color={COLORS.gray} />
    </Pressable>
  );
};

export default LongButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: COLORS.tabBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
});
