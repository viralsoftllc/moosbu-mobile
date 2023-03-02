import Clipboard from '@react-native-community/clipboard';
import React, {useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function ShareItem({setShowShareModal}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = content => {
    Clipboard.setString(content);
    setCopied(true);
  };

  return (
    <SafeAreaView style={styles.shareModal}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <Text style={styles.primaryText}>Share product as:</Text>

            <Pressable onPress={() => setShowShareModal(false)}>
              <UseIcon type={'MaterialCommunityIcons'} name={'close'} />
            </Pressable>
          </View>

          <View style={styles.flex}>
            <View>
              <View style={styles.shareTypeView}>
                <UseIcon name="file-pdf-o" type={'FaIcons'} />
                <Text style={styles.primaryText}>PDF</Text>
              </View>
            </View>

            <Text style={styles.primaryText}>OR</Text>

            <View>
              <View style={styles.shareTypeView}>
                <UseIcon type={'Ionicons'} name="image-outline" />
                <Text style={styles.primaryText}>Text or Image</Text>
              </View>
            </View>
          </View>

          <View style={[styles.flex, styles.copyView]}>
            <Text style={styles.link}>moosbu.com/retail.store</Text>

            {copied ? (
              <View style={styles.shareTypeView}>
                <UseIcon
                  type={'Ionicons'}
                  name="checkmark-circle"
                  color={COLORS.credit}
                />
                <Text style={{...FONTS.tiny}}>Copied</Text>
              </View>
            ) : (
              <Pressable
                onPress={() => copyToClipboard('moosbu.com/retail.store')}>
                <UseIcon type={'AntDesign'} name="copy1" />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.paddingHorizontal,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.paddingHorizontal,
  },
  copyView: {
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    backgroundColor: COLORS.tabBg,
    borderRadius: SIZES.radius / 2,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: SIZES.base * 1.3,
  },
  primaryText: {
    color: COLORS.textPrimary,
  },
  link: {
    ...FONTS.medium,
  },
  shareTypeView: {
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareModal: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
