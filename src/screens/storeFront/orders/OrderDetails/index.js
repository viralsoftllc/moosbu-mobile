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

        <View style={{paddingHorizontal: 20}}>
          <ShippingDetails
            name={params?.order?.name}
            phone={params?.order?.phone}
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <BillingAddress
            name={params?.order?.name}
            phone={params?.order?.phone}
          />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <Items products={params?.order?.product} />
        </View>

        <View style={{paddingHorizontal: 20}}>
          <OrderSummary
            showStatuses={showStatuses}
            createdAt={new Date(params?.order?.created_at).toDateString()}
            orderTime={new Date(params?.order?.created_at).toLocaleTimeString()}
            subtotal={params?.order?.price}
            status={params?.order?.status}
            paymentType={params?.order?.payment_type}
          />
        </View>

        <Modal
          visible={statutes}
          onDismiss={hideStatuses}
          style={{flex: 1}}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 8,
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

            <View style={{marginVertical: 20}}>
              <Button
                onPress={() => setValue('pending')}
                labelStyle={{padding: 10}}
                style={{
                  gap: 50,
                  borderColor: COLORS.grayText,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginBottom: 15,
                }}>
                <UseIcon
                  name="clock-time-nine"
                  type={'MaterialCommunityIcons'}
                  color={COLORS.pending}
                />
                <Text style={{...FONTS.regular}}>
                  {' '}
                  {'  '}Processing {'  '}
                </Text>
                {value == 'pending' && (
                  <UseIcon
                    name="check"
                    type={'MaterialCommunityIcons'}
                    color={COLORS.primary}
                    style={{marginLeft: 50}}
                  />
                )}
              </Button>
              <Button
                onPress={() => setValue('completed')}
                labelStyle={{padding: 10}}
                style={{
                  gap: 50,
                  borderColor: COLORS.grayText,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginBottom: 15,
                }}>
                <UseIcon
                  name="check-circle"
                  type={'MaterialCommunityIcons'}
                  color={COLORS.credit}
                />
                <Text style={{...FONTS.regular}}>
                  {' '}
                  {'  '}Completed {'  '}
                </Text>
                {value == 'completed' && (
                  <UseIcon
                    name="check"
                    type={'MaterialCommunityIcons'}
                    color={COLORS.primary}
                    style={{marginLeft: 50}}
                  />
                )}
              </Button>
              <Button
                onPress={() => setValue('failed')}
                labelStyle={{padding: 10}}
                style={{
                  gap: 50,
                  borderColor: COLORS.grayText,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginBottom: 15,
                }}>
                <UseIcon
                  name="closecircle"
                  type={'AntDesign'}
                  color={COLORS.debit}
                />
                <Text style={{...FONTS.regular}}>
                  {' '}
                  {'  '}Failed {'  '}
                </Text>
                {value == 'failed' && (
                  <UseIcon
                    name="check"
                    type={'MaterialCommunityIcons'}
                    color={COLORS.primary}
                    style={{marginLeft: 50}}
                  />
                )}
              </Button>
            </View>

            <Button
              onPress={() => {
                hideStatuses();
                // showEnterPin();
              }}
              labelStyle={{fontFamily: 'Lato-Bold', padding: 10}}
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
