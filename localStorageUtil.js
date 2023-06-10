class LocalStorageUtil {
  constructor() {
    this.keyName = "products";
  }

  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.keyName);

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

    localStorage.setItem(this.keyName, JSON.stringify(products));

    return { pushProducts, products }; /// если у объекта ключ и значение совпадают то их можно сократить (просто написать один ключ)
  }
}

const localStorageUtil = new LocalStorageUtil();

document.querySelector(".cart-btn").addEventListener("click", function () {
  if (document.querySelector(".cart-btn").classList.toggle("active")) {
    document.querySelector(".opacity").classList.add("active");
    document.querySelector("body").classList.add("lock");
    document.querySelector("body").style.paddingRight = "15px";
    document.querySelector(".cart-block").classList.add("active");
  } else {
    document.querySelector("body").style.paddingRight = "0px";
    document.querySelector(".opacity").classList.remove("active");
    document.querySelector("body").classList.remove("lock");
    document.querySelector(".cart-block").classList.remove("active");
  }
});

function ClickOnOpacity() {
  document.querySelector("body").style.paddingRight = "0px";
  document.querySelector(".opacity").classList.remove("active");
  document.querySelector("body").classList.remove("lock");
  document.querySelector(".cart-block").classList.remove("active");
  document.querySelector(".cart-btn").classList.remove("active");
}
