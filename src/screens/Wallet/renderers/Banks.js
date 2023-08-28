import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PAYSTACK_SECRET_KEY} from '@env';
import client from '../../../shared/api/client';
import Cache from '../../../shared/utils/Cache';
import handleApiError from '../../../shared/components/handleApiError';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {verticalScale} from 'react-native-size-matters';
import BankRowCard from './BankRowCard';
import SearchBar2 from 'react-native-platform-searchbar';
import UseIcon from '../../../shared/utils/UseIcon';

export default function Banks({setShowBanks, setSelectedBank, selectedBank}) {
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [banks, setBanks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredBanks, setFilteredBanks] = useState([]);

  const fetchBanks = useCallback(async () => {
    setLoadingBanks(true);
    try {
      console.log('Fetching banks');

      const {data} = await client.get('https://api.paystack.co/bank', {
        headers: {
          Authorization: PAYSTACK_SECRET_KEY,
        },
      });

      console.log('response from paystack');
      console.log(data?.data);
      setBanks(data?.data);
      setFilteredBanks(data?.data);
      await Cache.storeObject('@banks', {
        banks: data?.data,
        lastFetched: new Date(),
      });
      setLoadingBanks(false);
    } catch (error) {
      setLoadingBanks(false);
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    Cache?.getObject('@banks').then(data => {
      console.log('@banks');
      console.log(data);
      if (data?.banks) {
        setBanks(data?.banks);
        setFilteredBanks(data?.banks);
      } else {
        fetchBanks();
      }
    });
  }, [fetchBanks]);

  const searchFilterFunction = text => {
    if (text) {
      const newdata = banks?.filter(bank => {
        const itemData = bank?.name
          ? bank?.name.toLowerCase()
          : ''.toLowerCase();

        const textData = text.toLowerCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredBanks(newdata);
      setSearchText(text);
    } else {
      setFilteredBanks(banks);
      setSearchText(text);
    }
  };

  function handleSelectBankModal(param) {
    setSelectedBank(param);
    setShowBanks(false);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.header}>
        <Pressable style={styles.closeIcon} onPress={() => setShowBanks(false)}>
          <UseIcon
            type="Ionicons"
            name="close-outline"
            size={verticalScale(25)}
          />
        </Pressable>

        <Text style={[FONTS.h5, styles.headerText]}>Choose Bank</Text>
      </View>

      <View
        style={{
          paddingHorizontal: SIZES.paddingHorizontal,
        }}>
        <SearchBar2
          theme="light"
          placeholder="Search for bank"
          searchIcon={{size: verticalScale(20), color: COLORS.black}}
          style={{marginVertical: SIZES.base}}
          inputStyle={styles.search}
          value={searchText}
          onChangeText={text => searchFilterFunction(text.trim())}
          onClear={text => searchFilterFunction('')}
        />
      </View>

      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.containerStyle}>
          {loadingBanks ? (
            <ActivityIndicator size={'large'} color={COLORS.primary} />
          ) : null}

          {filteredBanks?.length > 0 ? (
            filteredBanks?.map((bank, i) => (
              <BankRowCard
                key={i}
                label={bank?.name}
                selectedItem={selectedBank?.name}
                onPress={() => handleSelectBankModal(bank)}
              />
            ))
          ) : (
            <Text style={styles.emptyBank}>No Banks to display</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: {
    paddingTop: verticalScale(10),
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: verticalScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: SIZES.base * 3,
    color: COLORS.black,
  },
  containerStyle: {
    padding: 0,
    marginVertical: 20,
    backgroundColor: COLORS.white,
    borderWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainerStyle: {
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    backgroundColor: COLORS.white,
    marginBottom: 5,
  },
  search: {
    color: COLORS.black,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    borderWidth: 0.3,
    borderColor: COLORS.grey2,
  },
  closeIcon: {
    padding: 10,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyBank: {
    textAlign: 'center',
    ...FONTS.regular,
    color: COLORS.textGray,
  },
});
