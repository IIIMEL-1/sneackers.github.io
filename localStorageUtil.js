class LocalStorageUtil {
  constructor() {
    this.keyNameProducts = "products";
    this.keyNamePrice = "priceCart";
    this.keyNameFavorites = "favorite";
  }

  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.keyNameProducts);

    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }

    return [];
  }

  putProducts(id) {
    let products = this.getProducts();
    let pushProducts = false;
    const index = products.indexOf(id);

    if (index === -1) {
      products.push(id);
      pushProducts = true;
    } else {
      products.splice(index, 1);
    }

    localStorage.setItem(this.keyNameProducts, JSON.stringify(products));

    return { pushProducts, products }; /// если у объекта ключ и значение совпадают то их можно сократить (просто написать один ключ)
  }

  getFavorites() {
    const favoritesLocalStorage = localStorage.getItem(this.keyNameFavorites);

    if (favoritesLocalStorage !== null) {
      return JSON.parse(favoritesLocalStorage);
    }

    return [];
  }

  putFavorites(id) {
    let favorites = this.getFavorites();
    let pushFavorites = false;
    const index = favorites.indexOf(id);

    if (index === -1) {
      favorites.push(id);
      pushFavorites = true;
    } else {
      favorites.splice(index, 1);
    }

    localStorage.setItem(this.keyNameFavorites, JSON.stringify(favorites));

    return { pushFavorites, favorites }; /// если у объекта ключ и значение совпадают то их можно сократить (просто написать один ключ)
  }

  getPriceProducts() {
    const priceLocalStorage = localStorage.getItem(this.keyNamePrice);

    if (priceLocalStorage !== null) {
      return JSON.parse(priceLocalStorage);
    }

    return [];
  }

  putPriceProducts(price) {
    let totalPrice = this.getPriceProducts();

    totalPrice.splice(0);
    totalPrice.push(price);

    localStorage.setItem(this.keyNamePrice, JSON.stringify(totalPrice));
  }
}

const localStorageUtil = new LocalStorageUtil();

const selectorsArray = [
  document.querySelector(".favorite-btn"),
  document.querySelector(".cart-btn"),
  document.querySelector(".close-cart"),
  document.querySelector(".close-favorite"),
  document.querySelector(".opacity"),
];

selectorsArray.forEach((el) => {
  el.addEventListener("click", function () {
    if (el == document.querySelector(".cart-btn")) {
      if (document.querySelector(".cart-btn").classList.toggle("active")) {
        document.querySelector(".opacity").classList.add("active");
        document.querySelector("body").classList.add("lock");
        document.querySelector("body").style.paddingRight = "15px";
        document.querySelector(".cart-block").classList.add("active");
        document.querySelector(".close-cart").classList.add("active");
      }
    } else if (el == document.querySelector(".favorite-btn")) {
      if (document.querySelector(".favorite-btn").classList.toggle("active")) {
        document.querySelector(".opacity").classList.add("active");
        document.querySelector("body").classList.add("lock");
        document.querySelector("body").style.paddingRight = "15px";
        document.querySelector(".favorite-block").classList.add("active");
        document.querySelector(".close-favorite").classList.add("active");
      }
    } else if (
      document.querySelector(".close-cart") ||
      document.querySelector(".close-favorite") ||
      document.querySelector(".opacity")
    ) {
      document.querySelector(".cart-btn").classList.remove("active") ||
        document.querySelector(".favorite-btn").classList.remove("active");
      document.querySelector(".opacity").classList.remove("active");
      document.querySelector("body").classList.remove("lock");
      document.querySelector("body").style.paddingRight = "0px";
      document.querySelector(".cart-block").classList.remove("active") ||
        document.querySelector(".favorite-block").classList.remove("active");
      document.querySelector(".close-cart").classList.remove("active") ||
        document.querySelector(".close-favorite").classList.remove("active");
    }
  });
});
