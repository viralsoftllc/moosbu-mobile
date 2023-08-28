import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import client from '../../../../shared/api/client';
import handleApiError from '../../../../shared/components/handleApiError';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import NewProductForm from './renderer/NewProductForm';
import routes from '../../../../shared/constants/routes';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImageToCloudinary} from '../../../../shared/hooks/uploadToCloudinary';

export default function NewProduct() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {setOptions, navigate} = useNavigation();

  const [fileResponse, setFileResponse] = useState([]);
  const [coverImgFileResponse, setCoverImgFileResponse] = useState(null);

  const [product, setProduct] = useState({enable_product_variant: 'off'});
  const [submitting, setSubmitting] = useState(false);

  function handleDeleteImage(img) {
    const filtered = fileResponse?.filter(el => el?.fileName !== img?.fileName);
    setFileResponse(filtered);
  }

  const handleDocumentSelection = useCallback(async () => {
    launchImageLibrary(
      {
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.4,
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
        selectionLimit: 8,
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
  }, []);

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
        // console.log('res from image picker - cover image');
        // console.log(res);
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

  async function uploadToGetUrl(base64) {
    try {
      const data = await uploadImageToCloudinary(base64);

      return data?.url;
    } catch (error) {
      console.log('error');
      console.log(error);
      return error;
    }
  }

  async function createProduct() {
    console.log('product payload');
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

    if (!product?.description) {
      setSubmitting(false);
      return notifyMessage('Product description is required');
    }

    // Uploade cover image
    const coverImage = await uploadToGetUrl(coverImgFileResponse?.base64);
    console.log('coverImage url');
    console.log(coverImage);
    if (coverImage?.message) {
      // handle error
      setSubmitting(false);
      return notifyMessage(coverImage?.message);
    }

    // Upload product images
    const response = await Promise.all(
      fileResponse?.map(async (file, i) => {
        const img = await uploadToGetUrl(file?.base64);
        console.log('index ' + i + ': - upload response');
        console.log(img);
        return img;
      }),
    );

    // check if All promise response was fulfilled
    const hasError = e => e?.message?.length;

    console.log('Product images response');
    console.log(response);
    if (response?.some(hasError)) {
      setSubmitting(false);
      return notifyMessage('Error uploading product image');
    }

    // if (!response?.length) {
    //   setSubmitting(false);
    //   return notifyMessage('Please Choose product images');
    // }

    // if (!coverImage) {
    //   setSubmitting(false);
    //   return notifyMessage('Please Choose Cover image');
    // }

    try {
      console.log('Creating product...');
      setSubmitting(true);

      product.multiple_files = response;
      product.is_cover = coverImage;

      console.log('Payload');
      console.log(product);

      const res = await client.post('/api/product', product);
      console.log('response from creating product...');
      console.log(res);
      console.log(res.data);
      setSubmitting(false);
      handleSuccessfulResponse();
    } catch (error) {
      console.log('error creating product');
      setSubmitting(false);
      handleApiError(error);
    }
  }

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'New Product'} />,
    });
  }, [setOptions]);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <NewProductForm
            handleSuccessfulResponse={handleSuccessfulResponse}
            product={product}
            setProduct={setProduct}
            submitting={submitting}
            coverImgFileResponse={coverImgFileResponse}
            fileResponse={fileResponse}
            handleCoverImageSelection={handleCoverImageSelection}
            handleDocumentSelection={handleDocumentSelection}
            handleUpload={createProduct}
            handleDeleteImage={handleDeleteImage}
          />
        </ScrollView>
      </View>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Product has been created'}
          subtitle={'Your Products will be updated'}
          onPress={() => {
            setProduct({enable_product_variant: 'off'});
            navigate(routes.PRODUCTS_STACK);
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
