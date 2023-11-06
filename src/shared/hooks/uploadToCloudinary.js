// const b = {
//   asset_id: '0445f18b33d3f3b3db7951120acfcf64',
//   bytes: 20224,
//   created_at: '2023-07-24T21:14:47Z',
//   etag: '8ad873cc744ba83786ab6a9d2394266e',
//   folder: '',
//   format: 'jpg',
//   height: 500,
//   placeholder: false,
//   public_id: 'cvucr9ehphrbcxbrtnxs',
//   resource_type: 'image',
//   secure_url:
//     'https://res.cloudinary.com/dgeomdylr/image/upload/v1690233287/cvucr9ehphrbcxbrtnxs.jpg',
//   signature: '63e5196f75b2e2180d19c756739fac3767657ee7',
//   tags: [],
//   type: 'upload',
//   url: 'http://res.cloudinary.com/dgeomdylr/image/upload/v1690233287/cvucr9ehphrbcxbrtnxs.jpg',
//   version: 1690233287,
//   version_id: 'e5e78fcced84e320b806922846503e4c',
//   width: 225,
// };

export const uploadImageToCloudinary = async base64 => {
  return new Promise(async (resolve, reject) => {
    const cloudinaryUrl =
      'https://api.cloudinary.com/v1_1/drztds1wo/image/upload';
    // const cloudinaryUrl =
    //   'https://api.cloudinary.com/v1_1/dgeomdylr/image/upload';

    const base64Img = `data:image/jpg;base64,${base64}`;
    const payload = {
      file: base64Img,
      // api_key: '429666253376774',
      // upload_preset: 'saeefvr3',
      // api_secret: 'sMaoWoJCHm-iBOGXkmgKYmZGi1c',
      upload_preset: 'xmcmqnmc',
      api_key: '766441145546982',
      api_secret: 'UwJliBpNqHvsC3ed4jd42X-c00Y',
    };
    // upload_preset: 'xmcmqnmc',
    // api_key: '766441145546982',
    // api_secret: 'UwJliBpNqHvsC3ed4jd42X-c00Y',
    // upload_preset: 'ml_default',

    fetch(cloudinaryUrl, {
      body: JSON.stringify(payload),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
      .then(async response => {
        // console.log('response from cloudinary');
        const data = await response.json();
        // console.log(data);

        if (!response?.ok) {
          // handle error uploading image
          // const data = await response.json();
          // console.log('Error from cloudinary');
          // console.log(data);

          reject({message: data?.error?.message, status: false});
        } else {
          // Proceed
          // const data = await response.json();
          // console.log('Success from cloudinary');
          // console.log(data);

          resolve({url: data?.url, status: true});
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};
