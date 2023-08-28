import React, {useRef} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Paystack} from 'react-native-paystack-webview';
import {PAYSTACK_PUBLIC_KEY} from '@env';

export default function PaystackDeposit() {
  const paystackWebViewRef = useRef(null);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Paystack
          paystackKey={PAYSTACK_PUBLIC_KEY}
          billingEmail="paystackwebview@something.com"
          amount={'25000.00'}
          onCancel={e => {
            // handle response here
          }}
          onSuccess={res => {
            // handle response here
          }}
          ref={paystackWebViewRef}
        />

        <Pressable
          onPress={() => paystackWebViewRef.current.startTransaction()}>
          <Text>Pay Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
