import {S3} from 'aws-sdk';
// import fs from 'react-native-fs';
import {Buffer} from 'buffer';

import {
  MOOSBU_AWS_BUCKET,
  MOOSBU_AWS_SECRET_ACCESS_KEY,
  MOOSBU_AWS_ACCESS_KEY_ID,
  MOOSBU_AWS_DEFAULT_REGION,
} from '@env';

// const r = {
//   Bucket: 'moosbu-os',
//   ETag: '"7505f1790a49ba8b2557b889b50b963c"',
//   Key: '1680785989446',
//   Location: 'https://moosbu-os.s3.amazonaws.com/1680785989446',
//   ServerSideEncryption: 'AES256',
//   key: '1680785989446',
// };

export const uploadImageToS3 = async file => {
  return new Promise(async (resolve, reject) => {
    // console.log(file);
    const client = new S3({
      region: MOOSBU_AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: MOOSBU_AWS_ACCESS_KEY_ID,
        secretAccessKey: MOOSBU_AWS_SECRET_ACCESS_KEY,
      },
      // signatureVersion: 'v4',
    });

    // const base64 = await fs.readFile(file?.uri, 'base64');
    const base64Data = Buffer.from(
      file?.base64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    // const buff = base64Util.encode(base64);
    // console.log('buffer array');
    // console.log(buff);

    client.createBucket(() => {
      client.upload(
        {
          Bucket: MOOSBU_AWS_BUCKET,
          Key: String(Date.now()),
          // Key: file?.fileName,
          // Body: file?.base64 /** object body */,
          Body: base64Data /** object body */,
          ContentType: file?.type,
          // ContentEncoding: 'base64',
          // ACL: 'public-read'
        },
        (err, data) => {
          if (err) {
            console.log('Upload error');
            console.log(err);
            reject(err);
          }

          if (data) {
            console.log('Upload success');
            console.log(data);
            resolve(data);
          }
        },
      );
    });
  });
};
