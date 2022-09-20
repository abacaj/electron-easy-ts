import * as isDev from 'electron-is-dev';

if (isDev) {
  import('./app/dev').then((dev) => {
    dev.startDev();
  });
} else {
  import('./app/prod').then((dev) => {
    dev.startProd();
  });
}
