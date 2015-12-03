import { API } from '../api/index';
import { App } from './app';

class UI {

  constructor() {
    App.bootstrap();
  }

}

export default function bootstrapUI() {
  return new UI();
}
