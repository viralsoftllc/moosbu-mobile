import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import Search from '../../../shared/components/Search';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import UseIcon from '../../../shared/utils/UseIcon';
import EditTax from './EditTax';
import NewTax from './NewTax';
import TaxCard from './renderer/TaxCard';

export default function Tax() {
  const {setOptions} = useNavigation();
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];

  const [showNewTaxForm, setShowNewTaxForm] = useState(false);
  const [showEditTaxForm, setShowEditTaxForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleNewItem() {
    setShowNewTaxForm(true);
  }

  function handleEditItem() {
    setShowEditTaxForm(true);
  }

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  function handleSuccessfulResponse() {
    setShowEditTaxForm(false);
    setShowNewTaxForm(false);
    setShowSuccessModal(true);
  }

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Tax'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Search
          items={items}
          filteredItems={filteredItems}
          handleNewItem={handleNewItem}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <TaxCard
            title={'VAT'}
            subtitle="Value added tax charge on items purchased"
            amount={'7%'}
            icon={
              <UseIcon
                name="ticket-percent-outline"
                type={'MaterialCommunityIcons'}
                color={COLORS.textPrimary}
              />
            }
            handleEditItem={handleEditItem}
            handleDeleteItem={handleDeleteItem}
          />
        </ScrollView>
      </View>

      <Modal visible={showNewTaxForm} animationType="slide" transparent={true}>
        <NewTax
          setShowNewTaxForm={setShowNewTaxForm}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal visible={showEditTaxForm} animationType="slide" transparent={true}>
        <EditTax
          setShowEditTaxForm={setShowEditTaxForm}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem setShowDeleteModal={setShowDeleteModal} title={'tax'} />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          title={'tax update'}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});
