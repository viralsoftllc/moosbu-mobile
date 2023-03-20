import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import ImageIcon from '../../../../shared/components/ImageIcon';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function ConversationCard() {
  const [isfav, setIsfav] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imageIconView}>
        <ImageIcon
          imageUrl={require('../../../../assets/images/moosbuicon.png')}
          size={verticalScale(20)}
          rounded
          style={styles.imageIcon}
        />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>Learning About Moosbu</Text>
        <Text style={styles.subtitle}>
          Moosbu assist you in growing your business.......
        </Text>
      </View>

      <View style={styles.statusView}>
        <Text style={styles.status}>Viewed</Text>

        <Pressable style={styles.favIcon} onPress={() => setIsfav(!isfav)}>
          <UseIcon
            type={'MaterialIcons'}
            name={isfav ? 'star' : 'star-outline'}
            color={isfav ? '#FFA21D' : COLORS.grayText}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageIconView: {
    borderRadius: 100,
    backgroundColor: '#A3C7F7',
    width: verticalScale(40),
    height: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    margin: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 1.5,
    marginBottom: SIZES.base * 2,
  },
  details: {
    flex: 1,
    marginHorizontal: SIZES.base,
  },
  title: {
    color: COLORS.textPrimary,
    ...FONTS.h6,
    marginBottom: SIZES.base / 2,
  },
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
  status: {
    ...FONTS.medium,
    color: COLORS.credit,
    marginBottom: SIZES.base * 1.2,
  },
  statusView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  favIcon: {
    paddingHorizontal: SIZES.base,
  },
});
