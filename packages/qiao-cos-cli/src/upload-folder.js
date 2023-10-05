// qiao
import { path, lsdir } from 'qiao-file';
import { progress } from 'qiao-cli';

// upload file
import { uploadFileWithCallback } from './upload-file.js';

/**
 * upload folder
 * @param {*} app
 * @param {*} destFolder
 * @param {*} sourceFolder
 * @returns
 */
export const uploadFolder = async (app, destFolder, sourceFolder) => {
  // check
  if (!app || !app.client || !app.config) {
    return Promise.reject(new Error('need app, app.client, app.config'));
  }

  // is absolute
  if (!path.isAbsolute(sourceFolder)) {
    return Promise.reject(new Error('source file path must be absolute'));
  }

  // time
  console.time('total use');

  // files
  const paths = await lsdir(sourceFolder);
  const files = paths.files;
  const bar = new progress('uploading files... :current/:total', {
    total: files.length,
  });

  // vars
  const allFiles = [];
  const sucFiles = [];
  const failFiles = [];

  // upload
  return new Promise((resolve, reject) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i].path;
      const dest = destFolder + file.split(sourceFolder)[1];
      uploadFileWithCallback(app, dest, file, (err, data) => {
        allFiles.push(data);
        if (err || !data || data.statusCode != 200) {
          failFiles.push(err || data);
        } else {
          sucFiles.push(data);
        }

        bar.tick();

        if (bar.complete) {
          const obj = {};
          obj.paths = paths;
          obj.all = allFiles;
          obj.suc = sucFiles;
          obj.fail = failFiles;

          console.log();
          console.timeEnd('total use');
          console.log('all files:', allFiles.length);
          console.log('fail files:', failFiles.length);
          console.log('success files:', sucFiles.length);
          console.log();

          if (allFiles.length === sucFiles.length) {
            resolve(obj);
          } else {
            reject(new Error('some files upload failed'));
          }
        }
      });
    }
  });
};
