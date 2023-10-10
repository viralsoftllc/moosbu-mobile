import {scale, verticalScale} from 'react-native-size-matters';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const COLORS = {
  primary: '#0247A6',
  secondary: '#76A3E0',
  white: '#FFFFFF',
  tabBg: '#F1F1F1',
  textPrimary: '#282828',
  textSecondary: '#76A3E0',
  textGray: '#D7D7D7',
  borderGray: '#D7D7D7',
  primaryBackground: '#0247A6',
  lightSecondaryBackground: '#EEEFF9',
  grayText: '#BDBDBD',
  black: '#000',
  red: '#CA2D31',
  debit: '#F84343',
  credit: '#27AE60',
  pending: '#FFA21D',
  label: '#282828',
};

export const SIZES = {
  // global sizes
  base: scale(10),
  paddingHorizontal: scale(14),
  radius: verticalScale(8),

  extraLargeTitle: verticalScale(48),
  largeTitle: verticalScale(36),
  h1: verticalScale(30),
  h2: verticalScale(22),
  h3: verticalScale(20),
  h4: verticalScale(17),
  h5: verticalScale(13),
  h6: verticalScale(12),

  large: verticalScale(17),
  big: verticalScale(15),
  regular: verticalScale(13),
  medium: verticalScale(11),
  small: verticalScale(10),
  tiny: verticalScale(9),

  // app dimension
  width,
  height,
};

export const FONTS = {
  extraLargeTitle: {
    fontFamily: 'Lato-Black',
    fontSize: SIZES.extraLargeTitle,
    fontWeight: '500',
  },
  largeTitle: {
    fontFamily: 'Lato-Black',
    fontSize: SIZES.largeTitle,
    fontWeight: '600',
  },
  h1: {fontFamily: 'Lato-Bold', fontSize: SIZES.h1, fontWeight: '700'},
  h2: {fontFamily: 'Lato-Bold', fontSize: SIZES.h2, fontWeight: '700'},
  h3: {fontFamily: 'Lato-Bold', fontSize: SIZES.h3, fontWeight: '500'},
  h4: {fontFamily: 'Lato-Bold', fontSize: SIZES.h4, fontWeight: '500'},
  h5: {fontFamily: 'Lato-Bold', fontSize: SIZES.h5, fontWeight: '600'},
  h6: {fontFamily: 'Lato-Bold', fontSize: SIZES.h6, fontWeight: '700'},

  large: {fontFamily: 'Lato-Regular', fontSize: SIZES.large},
  big: {fontFamily: 'Lato-Regular', fontSize: SIZES.big},
  regular: {
    fontFamily: 'Lato-Regular',
    fontSize: SIZES.regular,
  },
  medium: {
    fontFamily: 'Lato-Regular',
    fontSize: SIZES.medium,
    fontWeight: '500',
  },
  small: {fontFamily: 'Lato-Regular', fontSize: SIZES.small},
  tiny: {fontFamily: 'Lato-Regular', fontSize: SIZES.tiny},
};

export default {COLORS, SIZES, FONTS};
