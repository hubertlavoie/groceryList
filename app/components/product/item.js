import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ProductItemComponent extends Component {
  @service shoppingCart;

  get quantity() {
    const shoppingCartItemExist = this.shoppingCart.cartList.find((element) => {
      return element.id == this.args.product.id;
    });
    if (shoppingCartItemExist) {
      return shoppingCartItemExist.quantity;
    }
    return this.args.product.quantity;
  }

  get total() {
    const shoppingCartItemExist = this.shoppingCart.cartList.find((element) => {
      return element.id == this.args.product.id;
    });
    if (shoppingCartItemExist) {
      return (
        shoppingCartItemExist.quantity * shoppingCartItemExist.price
      ).toFixed(2);
    }
    return (this.args.product.quantity * this.args.product.price).toFixed(2);
  }

  @action
  addItem(itemIndex) {
    this.shoppingCart.addItemToCart(itemIndex);
  }

  @action
  increaseCountOfItemInCart(itemIndex) {
    this.shoppingCart.increaseCountOfItemInCart(itemIndex);
  }
  @action
  decreaseCountOfItemInCart(itemIndex) {
    this.shoppingCart.decreaseCountOfItemInCart(itemIndex);
  }
  @action
  deleteItemFromCart(itemIndex) {
    this.shoppingCart.deleteItemFromCart(itemIndex);
  }
  @action
  deleteItemFromShoppingList(itemIndex) {
    this.shoppingCart.deleteItemFromShoppingList(itemIndex);
  }
}
