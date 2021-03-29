import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import axios from 'axios';
import { get, set } from 'idb-keyval';
import Swal from 'sweetalert2';

export default class ShoppingCartService extends Service {
  @tracked itemList = [];
  @tracked cartList = [];
  @tracked groceryItems = [];
  @tracked filteredGroceryItems = [];
  @tracked searchSelected = false;
  @tracked newItem = {
    title: null,
    description: null,
    filename: null,
    price: null,
    quantity: 1,
  };
  @tracked showSearchResults = false;
  @tracked showCart = false;
  @tracked showCreateItem = false;

  addItemToCart(itemIndex) {
    if (window.innerWidth > 1000) {
      this.showCart = true;
    }
    const addedItem = this.itemList[itemIndex];
    const itemExist = this.cartList.find((el) => addedItem.id == el.id);
    if (itemExist) {
      itemExist.quantity += 1;
      this.cartList = [...this.cartList];
      set('cart', this.cartList);
      return;
    }
    this.cartList = [...this.cartList, { ...addedItem }];
    set('cart', this.cartList);
  }

  createItem() {
    set('list', this.itemList);
    axios
      .post(
        'https://le-site-test-hubert.firebaseio.com/grocery.json',
        this.newItem
      )
      .then((response) => {
        this.getGroceryItems();
        this.showCreateItem = false;
        Swal.fire({
          icon: 'success',
          title: 'Item added!',
          text: 'Do you want to add  item to list or cart?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Add to list`,
          denyButtonText: `Add to cart`,
          confirmButtonColor: '#ff3465',
          denyButtonColor: '#ff3465',
        }).then((result) => {
          if (result.isConfirmed) {
            this.itemList.push({ ...this.newItem, id: response.data.name });
            this.itemList = [...this.itemList];
            set('list', this.itemList);
          } else if (result.isDenied) {
            this.cartList.push({ ...this.newItem, id: response.data.name });
            this.cartList = [...this.cartList];
            set('cart', this.cartList);
          }
        });
      })
      .catch((e) => console.log(e));
  }

  searchItem(event) {
    let searchValue;
    if (event.keyCode > 47 && event.keyCode < 90) {
      searchValue = event.target.value + event.key;
    } else if (event.keyCode == 8) {
      searchValue = event.target.value.slice(0, -1);
    } else {
      searchValue = event.target.value;
    }
    this.filteredGroceryItems = this.groceryItems.filter((element) => {
      return element.title.toUpperCase().includes(searchValue.toUpperCase());
    });
  }

  increaseCountOfItemInCart(itemIndex) {
    this.cartList[itemIndex].quantity++;
    this.cartList = [...this.cartList];
    set('cart', this.cartList);
  }

  decreaseCountOfItemInCart(itemIndex) {
    if (this.cartList[itemIndex].quantity == 1) {
      this.deleteItemFromCart(itemIndex);
      return;
    }
    this.cartList[itemIndex].quantity--;
    this.cartList = [...this.cartList];
    set('cart', this.cartList);
  }

  deleteItemFromCart(itemIndex) {
    this.cartList.splice(itemIndex, 1);
    this.cartList = [...this.cartList];
    set('cart', this.cartList);
  }

  deleteItemFromShoppingList(itemIndex) {
    this.itemList.splice(itemIndex, 1);
    this.itemList = [...this.itemList];
    set('list', this.itemList);
  }

  addItemToShoppingList(item) {
    if (!this.itemList.find((el) => item.id == el.id)) {
      this.itemList.push({ ...item, quantity: 1 });
      this.itemList = [...this.itemList];
      set('list', this.itemList);
    }
  }

  addItemToShoppingCart(item) {
    if (!this.cartList.find((el) => item.id == el.id)) {
      this.cartList.push({ ...item, quantity: 1 });
      this.cartList = [...this.cartList];
      set('cart', this.cartList);
    }
  }

  switchSearchSelected() {
    this.searchSelected = !this.searchSelected;
  }

  enableSearchResult() {
    this.showSearchResults = true;
  }

  disableSearchResult() {
    this.showSearchResults = false;
  }

  finishShopping() {
    Swal.fire({
      title: 'Are you sure you want to finish shopping?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartList.forEach((cartItem) => {
          let index = this.itemList.findIndex((listItem) => {
            return cartItem.id == listItem.id;
          });
          if (index != -1) {
            this.itemList.splice(index, 1);
          }
        });
        this.cartList = [];
        set('cart', []);
        this.itemList = [...this.itemList];
        set('list', this.itemList);
        this.showCart = false;
      }
    });
  }

  clearCart() {
    Swal.fire({
      title: 'Are you sure you want to clear the cart?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartList = [];
        set('cart', []);
        this.showCart = false;
      }
    });
  }

  clearShoppingList() {
    Swal.fire({
      title: 'Are you sure you want to clear the shopping list?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemList = [];
        set('list', []);
      }
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  showCreateItemModal() {
    this.showCreateItem = true;
  }

  hideCreateItem() {
    this.showCreateItem = false;
  }

  initialize() {
    this.getGroceryItems();
    get('cart').then((val) => {
      if (val != undefined && val.length > 0) {
        this.cartList = val;
        this.showCart = true;
      }
    });
    get('list').then((val) => {
      if (val != undefined && val.length > 0) {
        this.itemList = val;
      }
    });
  }

  async getGroceryItems() {
    axios
      .get('https://le-site-test-hubert.firebaseio.com/grocery.json')
      .then((response) => {
        let data = response.data;
        let groceryData = [];
        for (const key in data) {
          groceryData.push({ ...data[key], id: key });
        }
        this.groceryItems = [...groceryData];
        this.filteredGroceryItems = [...groceryData];
      })
      .catch((err) => {
        console.log(err);
        console.log('There was an error getting grocery data');
      });
  }
}
