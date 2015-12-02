import { API } from '../api/index';
import { App } from './app';

class ShredderUI {

  constructor() {
    App.bootstrap();
  }

}

export default function bootstrapUI() {
  return new ShredderUI();
}
