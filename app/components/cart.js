import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CartComponent extends Component {
  @service shoppingCart;

  get showCart() {
    return this.shoppingCart.showCart;
  }
  @action
  clearCart() {
    this.shoppingCart.clearCart();
  }
  @action
  toggleCart() {
    this.shoppingCart.toggleCart();
  }
}
