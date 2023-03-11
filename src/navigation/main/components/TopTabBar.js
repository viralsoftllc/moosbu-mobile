/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';

export default function TopTabBar({state, descriptors, navigation, position}) {
  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          //   const inputRange = state.routes.map((_, i) => i);
          //   const opacity = position.interpolate({
          //     inputRange,
          //     outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          //   });

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tab,
                {
                  backgroundColor: isFocused
                    ? COLORS.primaryBackground
                    : COLORS.white,
                },
              ]}>
              <Text
                style={{
                  textAlign: 'center',
                  color: isFocused ? COLORS.white : COLORS.textPrimary,
                  ...FONTS.medium,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base,
    backgroundColor: COLORS.white,
  },
  innerWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  tab: {
    paddingVertical: SIZES.base,
    flex: 1,
    borderColor: COLORS.primary,
  },
});
