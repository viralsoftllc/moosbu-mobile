import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

export default function More() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>More</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
