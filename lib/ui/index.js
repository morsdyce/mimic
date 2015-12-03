import { API } from 'api';
import { App } from 'ui/app';

class UI {

  constructor() {
    App.bootstrap();
  }

}

export default function bootstrapUI() {
  return new UI();
}
