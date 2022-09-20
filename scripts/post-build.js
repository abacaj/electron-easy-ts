const path = require('path');
const fs = require('fs-extra');

function copyFiles(source, dest) {
  fs.copy(source, dest, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log('Finished copying frontend');
  });
}

copyFiles(
  path.resolve('packages/react-frontend/build'),
  path.resolve('packages/electron-backend/build/frontend'),
);
