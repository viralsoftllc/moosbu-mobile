import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import EditProductForm from './renderer.js/EditProductForm';
import {launchImageLibrary} from 'react-native-image-picker';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';
import routes from '../../../../shared/constants/routes';
import {setProducts} from '../../../../redux/slices/catalog/slice';
import {useDispatch} from 'react-redux';

export default function EditProduct() {
  const {setOptions, navigate} = useNavigation();
  const {params} = useRoute();
  const dispatch = useDispatch();
  // console.log('Product to edit');
  // console.log(params?.product);

  const [fileResponse, setFileResponse] = useState([]);
  const [coverImgFileResponse, setCoverImgFileResponse] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [product, setProduct] = useState({
    SKU: '',
    description: '',
    enable_product_variant: 'off',
    id: null,
    is_cover: '',
    product_images: [],
    name: '',
    price: '',
    product_tax: '',
    quantity: 0,
    product_categorie: '',
  });

  useEffect(() => {
    setProduct({
      id: params?.product?.id,
      SKU: params?.product?.SKU,
      description: params?.product?.description,
      enable_product_variant: 'off',
      name: params?.product?.name,
      price: String(params?.product?.price),
      product_tax: params?.product?.product_tax,
      quantity: String(params?.product?.quantity),
      product_categorie: params?.product?.product_categorie,
      is_cover: params?.product?.is_cover,
      product_images: params?.product?.product_images,
      cost: params?.product?.cost || 0,
      downloadable_prodcut: null,
      // multiple_files: params?.product?.product_images,
    });
  }, [params]);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Edit Product'} />,
    });
  }, [setOptions]);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  // Select cover image
  const handleCoverImageSelection = useCallback(async () => {
    launchImageLibrary(
      {
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.4,
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
        selectionLimit: 1,
      },
      res => {
        if (res.didCancel) {
          // user cancelled image picker
        } else if (res.error) {
          // error opening image picker
        } else {
          setCoverImgFileResponse(res.assets?.[0]);
        }
      },
    );
  }, []);

  const limit = 8 - product?.product_images?.length;
  // select product images
  const handleDocumentSelection = useCallback(async () => {
    launchImageLibrary(
      {
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.4,
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
        selectionLimit: limit,
      },
      res => {
        if (res.didCancel) {
          // user cancelled image picker
        } else if (res.error) {
          // error opening image picker
        } else {
          setFileResponse(res.assets);
        }
      },
    );
  }, [limit]);

  // remove product image from server
  function handleDeleteImage(img) {
    const filtered = product?.product_images?.filter(el => el?.id !== img?.id);
    setProduct({...product, product_images: filtered});
  }

  async function updateProduct() {
    console.log('Payload');
    console.log(product);
    setSubmitting(true);

    if (!product?.name) {
      setSubmitting(false);
      return notifyMessage('Please enter product name');
    }

    if (!product?.quantity) {
      setSubmitting(false);
      return notifyMessage('Please enter product quantity');
    }

    if (!product?.price) {
      setSubmitting(false);
      return notifyMessage('Please enter product price');
    }

    if (!product?.product_categorie) {
      setSubmitting(false);
      return notifyMessage('Please enter product Category');
    }

    if (!product?.product_images?.length) {
      setSubmitting(false);
      return notifyMessage('Please Choose product images');
    }

    if (!product?.is_cover) {
      setSubmitting(false);
      return notifyMessage('Please Choose Cover image');
    }

    if (!product?.description) {
      setSubmitting(false);
      return notifyMessage('Product description is required');
    }

    try {
      console.log('Updating product...');
      console.log('payload - after validation');
      console.log(product);
      setSubmitting(true);

      // product.multiple_files = images;
      // product.is_cover = coverImage;
      // product.product_images = [];

      const res = await client.post(
        '/api/product/update/' + product?.id,
        product,
      );
      console.log('response from updating product...');
      console.log(res);
      console.log(res.data);
      setSubmitting(false);
      dispatch(setProducts([]));
      handleSuccessfulResponse();
    } catch (error) {
      console.log('error updating product');
      setSubmitting(false);
      handleApiError(error);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: Platform.OS == 'ios' ? 5 : 0,
          }}
          nestedScrollEnabled={true}>
          <EditProductForm
            product={product}
            setProduct={setProduct}
            submitting={submitting}
            coverImgFileResponse={coverImgFileResponse}
            fileResponse={fileResponse}
            handleCoverImageSelection={handleCoverImageSelection}
            handleDocumentSelection={handleDocumentSelection}
            limit={limit}
            handleDeleteImage={handleDeleteImage}
            updateProduct={updateProduct}
          />
        </ScrollView>
      </View>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Product updated successfully'}
          subtitle={'Your Products will be updated'}
          onPress={() => {
            dispatch(setProducts([]));
            navigate(routes.PRODUCTS_STACK, {screen: routes.PRODUCTS_TAB});
          }}
        />
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});
