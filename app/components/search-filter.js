import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SearchFilterComponent extends Component {
  @service shoppingCart;

  get showSearchResults() {
    return this.shoppingCart.showSearchResults;
  }

  @action
  searchItem(event) {
    this.shoppingCart.searchItem(event);
  }

  @action
  addItemToShoppingList(item) {
    this.shoppingCart.addItemToShoppingList(item);
  }

  @action
  addItemToShoppingCart(item) {
    this.shoppingCart.addItemToShoppingCart(item);
  }
  @action
  disableSearchResult() {
    this.shoppingCart.disableSearchResult();
  }
  @action
  enableSearchResult() {
    this.shoppingCart.enableSearchResult();
  }
}
