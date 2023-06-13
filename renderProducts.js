class Products {
  constructor() {
    this.classNameActive = "active";
  }

  countPrice() {
    document.querySelectorAll(".cart-item");
  }

  handleSetLocationStorage(element, id, price) {
    const { pushProducts, products } = localStorageUtil.putProducts(id);

    let cardPrice = JSON.parse(price.replace(/\s+/g, ""));

    let priceCart = JSON.parse(
      document.querySelector(".cart-btn span").innerText
    );

    if (pushProducts) {
      element.classList.add(this.classNameActive);
      document.querySelector(".cart-btn span").innerHTML = priceCart +=
        cardPrice;
    } else {
      element.classList.remove(this.classNameActive);
      document.querySelector(".cart-btn span").innerHTML = priceCart -=
        cardPrice;
    }

    localStorageUtil.putPriceProducts(priceCart);
  }

  render() {
    const productsStore = localStorageUtil.getProducts();
    let htmlCatalog = "";

    CATALOG.forEach(({ id, title, price, img }) => {
      let activeClass = "";

      if (productsStore.indexOf(id) === -1) {
      } else {
        activeClass = "" + this.classNameActive;
      }

      htmlCatalog += `
      <div class="card" id="${id}">
        <div class="card-image">
          <a class="add-favorite ">
            <div class="material-symbols-outlined"></div>
          </a>
          <img src="${img}" alt="" />
        </div>
        <div class="card-title">
          <p>${title}</p>
        </div>
        <div class="card-price">
        <div>
          <p>Цена:</p>
          <p>${price} руб.</p>
          </div>
          <a class="add-cart ${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}','${price}', '${title}', '${img}')">
            <img src="image/icons/Add.cart.svg" alt="cart" />
            <img src="image/icons/Add.card.cardS.svg" alt="cart" />
          </a>
        </div>
      </div>
      `;
    });

    document.querySelector("#products-container").innerHTML = htmlCatalog;
  }
}
const productsPage = new Products();
productsPage.render();

class Cart {
  returnBack() {
    document.querySelector("body").style.paddingRight = "0px";
    document.querySelector(".opacity").classList.remove("active");
    document.querySelector("body").classList.remove("lock");
    document.querySelector(".cart-block").classList.remove("active");
    document.querySelector(".cart-btn").classList.remove("active");
  }

  ClickOnRemoveBtn(el, id) {
    const { pushProducts, products } = localStorageUtil.putProducts(id);

    this.render();

    let price = el.parentElement.children[1].children[1].innerText;

    let cardPrice = JSON.parse(price.replace(/\s+/g, ""));

    let priceCart = JSON.parse(
      document.querySelector(".cart-btn span").innerText
    );

    document.querySelector(".cart-btn span").innerHTML = priceCart -= cardPrice;

    if (!pushProducts) {
      productsPage.render();

      if (!document.querySelector(".cart-menu").children.length) {
        document.querySelector(".cart").classList.add("__empty");
      }
    }

    localStorageUtil.putPriceProducts(priceCart);
  }

  ClickOnCart() {
    cartPage.render();

    if (!document.querySelector(".cart-menu").children.length) {
      document.querySelector(".cart").classList.add("__empty");
    } else {
      document.querySelector(".cart").classList.remove("__empty");
    }
  }

  render() {
    const productsStore = localStorageUtil.getProducts();
    let htmlCatalog = "";

    CATALOG.forEach(({ id, title, price, img }) => {
      if (productsStore.indexOf(id) !== -1) {
        htmlCatalog += `
        <div class="cart-item" id="${id}">
                 <img class="cart-img" src="${img}" />
                 <div class="cart-item-info">
                   <p>${title}</p>
                   <p class="price">${price}</p>
                 </div>
                 <a class="cart-item__remove" onclick="cartPage.ClickOnRemoveBtn(this, '${id}')">
                   <img src="image/icons/Add.cart.svg"/>
                 </a>
               </div>
        `;
      }
    });

    document.querySelector(".cart-menu").innerHTML = htmlCatalog;
  }
}

const cartPage = new Cart();

document.querySelector(".search").oninput = function () {
  let val = this.value.trim();
  let cardTitle = document.querySelectorAll(".card-title");

  if (val != "") {
    cardTitle.forEach((el) => {
      if (el.innerText.search(val) == -1) {
        el.closest(".card").classList.add("hidden");
      } else {
        el.closest(".card").classList.remove("hidden");
      }
    });
  } else {
    cardTitle.forEach((el) => {
      el.closest(".card").classList.remove("hidden");
    });
  }

  if (document.querySelector("#products-container").innerText == "") {
    document.querySelector(".not-found").classList.add("active");
  } else {
    document.querySelector(".not-found").classList.remove("active");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorageUtil.getPriceProducts() == "") {
    return;
  }

  document.querySelector(".cart-btn span").innerText =
    localStorageUtil.getPriceProducts();
});
