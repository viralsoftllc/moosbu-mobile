import React from 'react';
import {ActivityIndicator, Modal, SafeAreaView, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../assets/themes';

export default function Loader({loading, message}) {
  return (
    <Modal visible={loading} animationType="slide" transparent={true}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
          }}>
          <View>
            {loading ? (
              <ActivityIndicator color={COLORS.primary} size="large" />
            ) : null}
            {message ? (
              <Text style={{marginTop: SIZES.base, ...FONTS.small}}>
                {message}
              </Text>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
