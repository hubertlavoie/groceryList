import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CheckoutComponent extends Component {
  @service shoppingCart;

  get subtotal() {
    return this.shoppingCart.cartList.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  get tax() {
    return +(this.subtotal * 0.14975).toFixed(2);
  }

  get total() {
    return this.subtotal + this.tax;
  }

  @action
  finishShopping() {
    this.shoppingCart.finishShopping();
  }
}
