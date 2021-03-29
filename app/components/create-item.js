import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CreateItemComponent extends Component {
  @service shoppingCart;

  @action
  createItem() {
    this.shoppingCart.createItem();
  }

  @action
  hideCreateItem() {
    this.shoppingCart.hideCreateItem();
  }
}
