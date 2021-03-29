import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ShoppingListComponent extends Component {
  @service shoppingCart;

  @action
  clearShoppingList() {
    this.shoppingCart.clearShoppingList();
  }
}
