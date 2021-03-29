import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NavigationComponent extends Component {
  @service shoppingCart;

  @action
  toggleCart() {
    this.shoppingCart.toggleCart();
  }
  @action
  showCreateItemModal() {
    this.shoppingCart.showCreateItemModal();
  }
}
