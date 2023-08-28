import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import FormButton from '../../../shared/components/FormButton';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function Subscriptions({setShowSubscriptionModal}) {
  const [selected, setSelected] = useState(null);
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.shareModal}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={[styles.flex, styles.header]}>
            <Text style={styles.title}>Choose your plan</Text>

            <Pressable
              onPress={() => {
                setShowSubscriptionModal(false);
              }}
              style={styles.closeBtn}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          {/* Smalll bussiness */}
          <Pressable
            onPress={() => setSelected(1)}
            style={[styles.card, styles.flex]}>
            <UseIcon
              type={'MaterialIcons'}
              name={`radio-button-${selected === 1 ? 'on' : 'off'}`}
              color={selected === 1 ? COLORS.credit : COLORS.borderGray}
            />

            <View style={styles.details}>
              <View style={[styles.flex, styles.detailsHeader]}>
                <View>
                  <Text style={styles.title}>Free/ Month</Text>
                  <Text style={styles.subtitleText}>Smaller Business</Text>
                </View>

                {/* <View>
                  <Text>Active</Text>
                </View> */}
              </View>

              <View style={styles.services}>
                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>Custom Domain</Text>
                </View>

                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>Shipping Domain</Text>
                </View>
              </View>

              <View style={styles.services}>
                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>100 Products</Text>
                </View>

                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>2 Stores</Text>
                </View>
              </View>
            </View>
          </Pressable>

          {/* Medium */}
          <Pressable
            onPress={() => setSelected(2)}
            style={[styles.card, styles.flex]}>
            <UseIcon
              type={'MaterialIcons'}
              name={`radio-button-${selected === 2 ? 'on' : 'off'}`}
              color={selected === 2 ? COLORS.credit : COLORS.borderGray}
            />

            <View style={styles.details}>
              <View style={[styles.flex, styles.detailsHeader]}>
                <View>
                  <Text style={styles.title}>2,500/Month</Text>
                  <Text style={styles.subtitleText}>Medium Business</Text>
                </View>

                {/* <View>
                  <Text>Active</Text>
                </View> */}
              </View>

              <View style={styles.services}>
                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>Custom Domain</Text>
                </View>

                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>Shipping Domain</Text>
                </View>
              </View>

              <View style={styles.services}>
                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>100 Products</Text>
                </View>

                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>2 Stores</Text>
                </View>
              </View>
            </View>
          </Pressable>

          {/* Large scale */}
          <Pressable
            onPress={() => setSelected(3)}
            style={[styles.card, styles.flex]}>
            <UseIcon
              type={'MaterialIcons'}
              name={`radio-button-${selected === 3 ? 'on' : 'off'}`}
              color={selected === 3 ? COLORS.credit : COLORS.borderGray}
            />

            <View style={styles.details}>
              <View style={[styles.flex, styles.detailsHeader]}>
                <View>
                  <Text style={styles.title}>5000/Month</Text>
                  <Text style={styles.subtitleText}>Bigger Business</Text>
                </View>

                <View style={styles.status}>
                  <Text style={styles.statusText}>Active</Text>
                </View>
              </View>

              <View style={styles.services}>
                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>Custom Domain</Text>
                </View>

                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>Shipping Domain</Text>
                </View>
              </View>

              <View style={styles.services}>
                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>100 Products</Text>
                </View>

                <View style={styles.service}>
                  <UseIcon
                    type={'MaterialCommunityIcons'}
                    name={'checkbox-marked-outline'}
                    color={COLORS.textPrimary}
                  />

                  <Text style={styles.serviceText}>2 Stores</Text>
                </View>
              </View>
            </View>
          </Pressable>

          <FormButton
            title={'Continue to pay'}
            onPress={() => {
              setShowSubscriptionModal(false);
              navigate(routes.PAY_SUBSCRIPTION);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    paddingHorizontal: SIZES.paddingHorizontal,
    backgroundColor: COLORS.white,
    paddingBottom: SIZES.base * 2,
  },
  shareModal: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  header: {
    marginVertical: SIZES.base * 1.3,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    marginBottom: SIZES.base / 3,
  },
  subtitleText: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base * 2,
  },
  details: {
    flex: 1,
    marginLeft: SIZES.base * 2,
  },
  detailsHeader: {
    marginBottom: SIZES.base,
  },
  serviceText: {
    color: COLORS.textPrimary,
    marginLeft: SIZES.base,
    ...FONTS.medium,
  },
  services: {
    marginVertical: SIZES.base / 2,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  service: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  statusText: {
    ...FONTS.tiny,
    color: COLORS.credit,
  },
  status: {
    backgroundColor: 'rgba(6, 223, 119, 0.2)',
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base * 1.5,
    borderRadius: SIZES.radius * 5,
  },
  closeBtn: {
    padding: SIZES.base,
  },
});
