import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import Items from './renderer/Items';
import ShippingDetails from './renderer/ShippingDetails';
import BillingAddress from './renderer/BillingAddress';
import OrderSummary from './renderer/OrderSummary';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import {Modal, RadioButton, IconButton, Button} from 'react-native-paper';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function OrderDetails() {
  const {params} = useRoute();
  console.log('orders');
  console.log(params?.order);
  console.log(params?.order?.product);
  // console.log(Object.values(JSON.parse(params?.order?.product)?.products));

  const [statutes, setStatuses] = useState(false);
  const showStatuses = () => setStatuses(true);
  const hideStatuses = () => setStatuses(false);

  const [value, setValue] = useState('');

  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Order Details'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS == 'ios' ? 20 : 0,
        }}>
        {/* {params?.order?.product?.length ? (
          <Items products={params?.order?.product} />
        ) : null} */}

        {/* <Items
          products={Object.values(JSON.parse(params?.order?.product)?.products)}
        /> */}

        <ShippingDetails
          name={params?.order?.name}
          phone={params?.order?.phone}
        />

        <BillingAddress
          name={params?.order?.name}
          phone={params?.order?.phone}
        />

        <Items products={params?.order?.product} />

        <OrderSummary
          showStatuses={showStatuses}
          createdAt={new Date(params?.order?.created_at).toDateString()}
          orderTime={new Date(params?.order?.created_at).toLocaleTimeString()}
          subtotal={params?.order?.price}
          status={params?.order?.status}
        />

        <Modal
          visible={statutes}
          onDismiss={hideStatuses}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
          }}>
          <View>
            <IconButton
              icon="close"
              mode="outlined"
              rippleColor={COLORS.secondary}
              onPress={hideStatuses}
              size={16}
              style={{alignSelf: 'flex-end', borderRadius: 8}}
            />

            <View style={{marginVertical: 30}}>
              <RadioButton.Group
                onValueChange={newValue => setValue(newValue)}
                value={value}>
                <Pressable
                  onPress={() => setValue('Processing')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <RadioButton value="Processing" color={COLORS.primary} />
                  <Text style={FONTS.h5}>Processing</Text>
                  <UseIcon
                    name="clock-time-nine"
                    type={'MaterialCommunityIcons'}
                    color={COLORS.pending}
                  />
                </Pressable>
                <Pressable
                  onPress={() => setValue('Completed')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <RadioButton value="Completed" color={COLORS.primary} />
                  <Text style={FONTS.h5}>Completed</Text>
                  <UseIcon
                    name="check-circle"
                    type={'MaterialCommunityIcons'}
                    color={COLORS.credit}
                  />
                </Pressable>
                <Pressable
                  onPress={() => setValue('Failed')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <RadioButton value="Failed" color={COLORS.primary} />
                  <Text style={FONTS.h5}>Failed</Text>
                  <UseIcon
                    name="closecircle"
                    type={'AntDesign'}
                    color={COLORS.debit}
                  />
                </Pressable>
              </RadioButton.Group>
            </View>

            <Button
              onPress={() => {
                hideStatuses();
                // showEnterPin();
              }}
              labelStyle={{fontFamily: 'Lato-Bold'}}
              style={{
                backgroundColor: COLORS.primary,
                borderRadius: 8,
                width: '80%',
                alignSelf: 'center',
              }}
              mode="contained">
              Update Status
            </Button>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  orderText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  orderNum: {
    color: COLORS.textSecondary,
  },
});
