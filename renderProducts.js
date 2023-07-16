class Products {
  constructor() {
    this.classNameActive = "active";
  }

  countPrice() {
    document.querySelectorAll(".cart-item");
  }

  formatSumm(summ) {
    var point = "";
    //Пока удаляю, но сохраняю целую часть...
    var x = String(summ).replace(/(\.|,)\d+/, function (m) {
      point = m;
      return "";
    });

    x = x
      .split("")
      .reverse()
      .join("")
      .replace(/(\d{3})/g, "$1 ")
      .split("")
      .reverse()
      .join("");
    //Разбил в массив, перевернул, расставил пробелы, перевернул обратно.
    return x + point;
  }

  calcAmountTax() {
    let summ = document
      .querySelector(".cart-btn span")
      .innerText.replace(/\s+/g, "");

    let tax = summ * 0.05 + Number(summ);

    document.querySelector(".sum").innerText = this.formatSumm(summ);

    document.querySelector(".sum-tax").innerText = this.formatSumm(tax);
  }

  handleSetLocationStorage(element, id, price) {
    const { pushProducts, products } = localStorageUtil.putProducts(id);

    let cardPrice = JSON.parse(price.replace(/\s+/g, ""));

    let priceCart = JSON.parse(
      document.querySelector(".cart-btn span").innerText.replace(/\s+/g, "")
    );

    if (pushProducts) {
      element.classList.add(this.classNameActive);
      let sum = (priceCart += cardPrice);
      document.querySelector(".cart-btn span").innerText = this.formatSumm(sum);

      this.calcAmountTax();
    } else {
      element.classList.remove(this.classNameActive);
      let sum = (priceCart -= cardPrice);
      document.querySelector(".cart-btn span").innerText = this.formatSumm(sum);

      this.calcAmountTax();
    }

    localStorageUtil.putPriceProducts(priceCart);

    if (element.closest(".block-btn")) {
      this.render();
    }
  }

  favoriteLocationStorage(element, id) {
    const { pushFavorites, favorites } = localStorageUtil.putFavorites(id);

    if (pushFavorites) {
      element.classList.add(this.classNameActive);
    } else {
      element.classList.remove(this.classNameActive);
    }
  }

  render() {
    const productsStore = localStorageUtil.getProducts();
    const favoritesStore = localStorageUtil.getFavorites();
    let htmlCatalog = "";

    CATALOG.forEach(({ id, title, price, img }) => {
      let activeClass = "";

      let activeClassF = "";

      if (productsStore.indexOf(id) === -1) {
      } else {
        activeClass = "" + this.classNameActive;
      }

      if (favoritesStore.indexOf(id) === -1) {
      } else {
        activeClassF = "" + this.classNameActive;
      }

      htmlCatalog += `
      <div class="card" id="${id}">
        <div class="card-image">
          <a class="add-favorite ${activeClassF}" onclick="productsPage.favoriteLocationStorage(this, '${id}')">
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#71CCCC">
              <path d="M14.5849 3.22311C14.3615 2.7098 14.0394 2.24464 13.6365 1.85368C13.2333 1.46155 12.758 1.14993 12.2363 0.935761C11.6954 0.712803 11.1152 0.59868 10.5295 0.600018C9.70772 0.600018 8.90596 0.823295 8.20921 1.24504C8.04253 1.34593 7.88418 1.45674 7.73416 1.57748C7.58414 1.45674 7.42579 1.34593 7.2591 1.24504C6.56236 0.823295 5.7606 0.600018 4.93884 0.600018C4.3471 0.600018 3.7737 0.712483 3.23198 0.935761C2.70858 1.15077 2.23686 1.46005 1.83181 1.85368C1.42843 2.2442 1.10619 2.70947 0.883373 3.22311C0.65168 3.75732 0.533333 4.32461 0.533333 4.90844C0.533333 5.45919 0.646679 6.0331 0.871705 6.61693C1.06006 7.10483 1.33009 7.61092 1.67513 8.12198C2.22186 8.93074 2.97361 9.77423 3.90705 10.6293C5.4539 12.0467 6.98574 13.0258 7.05075 13.0655L7.44579 13.3169C7.62081 13.4277 7.84584 13.4277 8.02086 13.3169L8.4159 13.0655C8.48091 13.0242 10.0111 12.0467 11.5596 10.6293C12.493 9.77423 13.2448 8.93074 13.7915 8.12198C14.1366 7.61092 14.4083 7.10483 14.5949 6.61693C14.82 6.0331 14.9333 5.45919 14.9333 4.90844C14.935 4.32461 14.8166 3.75732 14.5849 3.22311Z" fill="white"/>
            </svg>
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
            <img src="image/icons/plus.svg" alt="cart" />
            <img src="image/icons/checked.svg" alt="cart" />
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

class CartAndFavorite {
  returnBack() {
    document.querySelector("body").style.paddingRight = "0px";
    document.querySelector(".opacity").classList.remove("active");
    document.querySelector("body").classList.remove("lock");
    document.querySelector(".cart-block").classList.remove("active") ||
      document.querySelector(".favorite-block").classList.remove("active");
    document.querySelector(".cart-btn").classList.remove("active") ||
      document.querySelector(".favorite-btn").classList.remove("active");
    document.querySelector(".close-cart").classList.remove("active") ||
      document.querySelector(".close-favorite").classList.remove("active");
  }

  ClickOnRemoveBtn(el, id) {
    const { pushProducts, products } = localStorageUtil.putProducts(id);

    this.render();

    let price = el.parentElement.children[1].children[1].innerText;

    let cardPrice = JSON.parse(price.replace(/\s+/g, ""));

    let priceCart = JSON.parse(
      document.querySelector(".cart-btn span").innerText.replace(/\s+/g, "")
    );

    let sum = (priceCart -= cardPrice);

    document.querySelector(".cart-btn span").innerText =
      productsPage.formatSumm(sum);
    productsPage.calcAmountTax();

    if (!pushProducts) {
      productsPage.render();

      if (!document.querySelector(".cart-menu").children.length) {
        document.querySelector(".cart").classList.add("__empty");
        document.querySelector(".cart-sum").classList.remove("active");
      }
    }

    localStorageUtil.putPriceProducts(priceCart);
  }

  ClickOnRemoveBtnOnFavorite(id) {
    const { pushFavorites, favorites } = localStorageUtil.putFavorites(id);

    this.renderFavorites();

    if (!pushFavorites) {
      productsPage.render();

      if (!document.querySelector(".favorite-menu").children.length) {
        document.querySelector(".favorite").classList.add("__empty");
      }
    }
  }

  ClickOnCart() {
    cartPage.render();

    if (!document.querySelector(".cart-menu").children.length) {
      document.querySelector(".cart").classList.add("__empty");
      document.querySelector(".cart-sum").classList.remove("active");
    } else {
      document.querySelector(".cart").classList.remove("__empty");
      document.querySelector(".cart-sum").classList.add("active");
    }
  }

  ClickOnFavorite() {
    cartPage.renderFavorites();

    if (!document.querySelector(".favorite-menu").children.length) {
      document.querySelector(".favorite").classList.add("__empty");
    } else {
      document.querySelector(".favorite").classList.remove("__empty");
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
                   <img src="image/icons/plus.svg"/>
                 </a>
               </div>
        `;
      }
    });

    document.querySelector(".cart-menu").innerHTML = htmlCatalog;
  }

  renderFavorites() {
    const favoritesStore = localStorageUtil.getFavorites();
    const CartStore = localStorageUtil.getProducts();
    let htmlCatalog = "";

    CATALOG.forEach(({ id, title, price, img }) => {
      if (favoritesStore.indexOf(id) !== -1) {
        let activeClass = "";

        if (CartStore.indexOf(id) === -1) {
        } else {
          activeClass = "" + "active";
        }

        htmlCatalog += `
        <div class="cart-item" id="${id}">
                 <img class="cart-img" src="${img}" />
                 <div class="cart-item-info">
                   <p>${title}</p>
                   <p class="price">${price}</p>
                 </div>
                <div class="block-btn">
                  <a class="cart-item__remove" onclick="cartPage.ClickOnRemoveBtnOnFavorite('${id}')">
                    <img src="image/icons/plus.svg"/>
                  </a>
                  <a class="add-cart ${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}','${price}', '${title}', '${img}')">
                    <img src="image/icons/plus.svg" alt="cart" />
                    <img src="image/icons/checked.svg" alt="cart" />
                  </a>
                </div>
                 
               </div>
        `;
      }
    });

    document.querySelector(".favorite-menu").innerHTML = htmlCatalog;
  }
}

const cartPage = new CartAndFavorite();

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
  document.querySelector(".cart-btn span").innerText = productsPage.formatSumm(
    localStorageUtil.getPriceProducts()
  );
  productsPage.calcAmountTax();
});
