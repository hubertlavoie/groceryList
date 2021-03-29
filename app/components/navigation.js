import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NavigationComponent extends Component {
  @service shoppingCart;

  get itemsInCart() {
    return this.shoppingCart.cartList.reduce((acc, val) => {
      return acc + val.quantity;
    }, 0);
  }

  @action
  toggleCart() {
    this.shoppingCart.toggleCart();
  }
  @action
  showCreateItemModal() {
    this.shoppingCart.showCreateItemModal();
  }
}
