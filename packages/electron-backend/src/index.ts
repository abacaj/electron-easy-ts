import * as isDev from 'electron-is-dev';
import { startDev } from './app/dev';
import { startProd } from './app/prod';

if (isDev) {
  startDev().catch(console.error);
} else {
  startProd().catch(console.error);
}
