let menubtn = document.querySelector(".menu");
menubtn.addEventListener("click", () => {
  document.querySelector(".lang").classList.toggle("show");
});

let cartbtn = document.querySelector(".fa-basket-shopping");
cartbtn.addEventListener("click", () => {
  document.querySelector(".shopping-cart").classList.toggle("right");
});

document.querySelector(".closebtn").addEventListener("click", () => {
  document.querySelector(".shopping-cart").classList.remove("right");
});

document.querySelector(".fa-user").addEventListener("click", () => {
  document.querySelector(".sign").classList.toggle("show");
});

document.querySelector(".formbtn").addEventListener("click", (e) => {
  e.preventDefault();
});

document.querySelector(".category-btn").addEventListener("click", () => {
  document.querySelector(".categories").classList.toggle("show");
  document.querySelector(".mobile-content").classList.remove("flex");
});

document.querySelector(".mobiles").addEventListener("mouseover", () => {
  document.querySelector(".mobile-content").classList.toggle("flex");
  // document.querySelector(".mobiles").classList.toggle("act-bg");
});

let eles = document.querySelectorAll(".head h3");
eles.forEach((e) => {
  e.addEventListener("click", () => {
    eles.forEach((e) => e.classList.remove("active"));
    e.classList.add("active");
  });
});
// btns
let mainmenu = document.querySelector(".mainmenu");
let shopby = document.querySelector(".shopby");
// divs
let main = document.querySelector(".main");
let shopbycategories = document.querySelector(".shopbycategories");

mainmenu.addEventListener("click", () => {
  main.style.display = "block";
  shopbycategories.style.display = "none";
});
shopby.addEventListener("click", () => {
  main.style.display = "none";
  shopbycategories.style.display = "block";
});

document.querySelector(".openmenu").addEventListener("click", () => {
  document.querySelector(".leftmenu").classList.toggle("show");
});

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".leftmenu").classList.remove("show");
});

document.querySelector(".down").addEventListener("click", () => {
  document.querySelector(".submenu").classList.toggle("showsubmenu");
});

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

document.querySelectorAll(".item .icons i").forEach((e) => {
  e.addEventListener("mouseover", () => {
    e.classList.add("active");
  });
  e.addEventListener("mouseleave", () => {
    e.classList.remove("active");
  });
});

// shopping cart script

document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  AddToCart();
});

function AddToCart() {
  // shopping cart
  // get the ul item
  let arr = [];
  let ul = document.querySelector(".shopping-cart-items");
  let btns = document.getElementsByClassName("itembtn");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", (e) => {
      let itemClicked = e.target;
      // get the img , name and price
      let img =
        itemClicked.parentElement.parentElement.querySelector("img").src;
      let name =
        itemClicked.parentElement.querySelector(".item-header").innerText;
      let price = itemClicked.parentElement.querySelector(".price").innerText;
      // create a new li item
      let li = document.createElement("li");
      li.classList.add("cart-item");
      let existingItem = Array.from(
        ul.getElementsByClassName("cart-item")
      ).find((item) => {
        return item.querySelector("h4").innerText === name;
      });
      if (existingItem) {
        let quantityElement = existingItem.querySelector(".quantity");
        let quantity = parseInt(quantityElement.innerText.split(" x")[0]);
        quantityElement.innerText = `${quantity + 1} x`;
      } else {
        li.innerHTML += `
        <img src=${img} alt="" />
        <div class="text">
          <h4>${name}</h4>
          <div class="prod-details">
            <span class="quantity">1 x</span>
            <span class="price">${price}</span>
          </div>
        </div>
        <i class="fa-solid fa-xmark"></i>
      `;
        ul.appendChild(li);
        arr.push(name);
      }
      deleteItem();
      updateCount();
      updateTotal();
      saveCart();
    });
  }
}

function updateTotal() {
  let ul = document.querySelector(".shopping-cart-items");
  let items = ul.getElementsByClassName("cart-item");
  let total = document.querySelector(".total-price");
  let totalPrice = 0; // Initialize total price to 0
  for (let i = 0; i < items.length; i++) {
    let priceElement = items[i].querySelector(".price");
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantityElement = items[i].querySelector(".quantity");
    let quantity = parseInt(quantityElement.innerText.split(" x")[0]);
    totalPrice += price * quantity;
  }
  total.innerText = totalPrice + " " + "$";
}

function deleteItem() {
  let xbtns = document.querySelectorAll(".shopping-cart-items .fa-xmark");
  for (let i = 0; i < xbtns.length; i++) {
    xbtns[i].addEventListener("click", () => {
      xbtns[i].parentElement.remove();
      updateCount();
      updateTotal();
      saveCart();
    });
  }
}

function updateCount() {
  let ul = document.querySelector(".shopping-cart-items");
  let count = ul.childElementCount;
  document.querySelector(".itemscount").innerHTML = count;
}

// for the loacl storage
function saveCart() {
  let cartItems = document.querySelectorAll(".cart-item");
  let cart = [];

  cartItems.forEach((item) => {
    let img = item.querySelector("img").src;
    let name = item.querySelector("h4").innerText;
    let price = item.querySelector(".price").innerText;
    let quantity = item.querySelector(".quantity").innerText;

    cart.push({ img, name, price, quantity });
  });

  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    let ul = document.querySelector(".shopping-cart-items");

    cart.forEach((item) => {
      let li = document.createElement("li");
      li.classList.add("cart-item");
      li.innerHTML = `
              <img src="${item.img}" alt="" />
              <div class="text">
                  <h4>${item.name}</h4>
                  <div class="prod-details">
                      <span class="quantity">${item.quantity}</span>
                      <span class="price">${item.price}</span>
                  </div>
              </div>
              <i class="fa-solid fa-xmark"></i>
          `;
      ul.appendChild(li);
    });

    updateCount();
    updateTotal();
    deleteItem();
  }
}

// end of local storage

// the next 24 hour with mileseconds
// const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000;
// this is the right now time with ms
// const newww = new Date().getTime();
const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000;

setInterval(() => {
  let time = document.querySelector(".time");
  let all = document.querySelector(".all");
  const now = new Date().getTime();
  const remainingTime = targetTime - now;
  // Calculate hours, minutes, and seconds
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingTime / 1000) % 60);

  // Display the result
  time.innerHTML = `${hours}h ${minutes}m ${seconds}s`;

  // If the countdown is over, display a message
  if (remainingTime < 0) {
    clearInterval();
    all.innerHTML = "The Offer Finshed";
  }
}, 1000);

let text = document.querySelectorAll(".top-selling .items .item .item-text h3");
console.log(text);

text.forEach((ele) => {
  if (ele) {
    // Ensure text is not null
    if (ele.textContent.length > 20) {
      ele.innerHTML = ele.textContent.trim().substring(0, 38) + "...";
    }
  }
});

document.querySelector(".scroll-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.onscroll = function () {
  if (document.documentElement.scrollTop >= 400) {
    document.querySelector(".scroll-top").style.display = "block";
  } else {
    document.querySelector(".scroll-top").style.display = "none";
  }
};


