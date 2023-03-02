import React from 'react';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FAIcon5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {verticalScale} from 'react-native-size-matters';

// AntDesign.loadFont().then()

const getIconFont = type => {
  switch (type) {
    case 'Fontisto':
      return Fontisto;
    case 'MaterialIcons':
      return MaterialIcons;
    case 'EvilIcons':
      return EvilIcons;
    case 'Feather':
      return Feather;
    case 'AntDesign':
      return AntDesign;
    case 'SimpleLineIcons':
      return SimpleLineIcons;
    case 'ZocialIcon':
      return ZocialIcon;
    case 'FoundationIcon':
      return FoundationIcon;
    case 'FAIcon5':
      return FAIcon5;
    case 'FAIcon':
      return FAIcon;
    case 'Ionicons':
      return Ionicons;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    case 'EntypoIcon':
      return EntypoIcon;
    case 'OcticonIcons':
      return OcticonIcons;
    default:
      return FAIcon;
  }
};

const UseIcon = ({type, size, ...props}) => {
  const FontICon = getIconFont(type);

  return <FontICon size={size || verticalScale(16)} {...props} />;
};

export default UseIcon;
