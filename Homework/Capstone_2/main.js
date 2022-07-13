const productRow = document.getElementById("products");
const allBrandFilter = document.getElementById("allBrandFilter");
const appleFilter = document.getElementById("appleFilter");
const samsungFilter = document.getElementById("samsungFilter");
const dropdownMenuBrand = document.getElementById("dropdownMenuBrand");
const cartItems = document.getElementById("cartItems");
const paymentItems = document.getElementById("paymentItems");
const cartBtn = document.getElementById("cartBtn");

let productList = [];
let cartItemList = [];

function Product(id, name, price, type, img, desc, screen = "", backCamera = "", frontCamera = "") {
   return { id, name, price, type, img, desc, screen, backCamera, frontCamera };
}

function getProducts() {
   axios({
      url: "https://62c4598b7d83a75e39f79c96.mockapi.io/products",
      method: "GET",
   })
      .then((res) => {
         productList = res.data.map(
            (p, index) =>
               new Product(
                  index,
                  p.name,
                  parseInt(p.price.replace("$", "")),
                  p.type,
                  p.img,
                  p.desc,
                  p.screen,
                  p.backCamera,
                  p.frontCamera
               )
         );
         // mapProduct(res.data);
         renderProducts(productList);
      })
      .catch((err) => console.log(err));
}

const renderProducts = (data) => {
   if (data) {
      let content = "";
      data.forEach((p) => {
         content += `<div class="col-xl-3 col-lg-4 col-md-4 col-6 px-3 pt-4">
                     <div class="item p-3 border-1 border">
                        <div class="thumbnail">
                           <img
                              class="img-fluid"
                              src=${p.img}
                              alt="Galaxy S22"
                           />
                        </div>
                        <div
                           class="detail"
                        >
                           <h1 class="fs-4 py-3">${p.name}</h1>
                           <div class="desc">
                           ${p.desc}
                           </div>
                           <span class="d-inline-block text-danger">&dollar;${p.price}</span>
                           <button class="btn btn-outline-success d-inline-block" onclick="handleAddCartItem(
                              ${p.id}
                           )">
                              Add to Cart
                           </button>
                        </div>
                     </div>
                  </div>`;
      });

      productRow.innerHTML = content;
   }
};

const renderCartItems = (items) => {
   let content = "";
   let totalItem = 0;
   let totalPrice = 0;

   if (items.length) {
      items.forEach((item) => {
         // console.log("typeof quantity " + typeof(item.product.quantity));
         totalItem += item.quantity;
         totalPrice += item.product.price * item.quantity;

         content += `<div class="row cart-items">
                        <div class="row border-bottom my-3 pb-3">
                           <div class="row main align-items-center">
                              <div class="col-2">
                                 <img
                                    class="img-fluid"
                                    src=${item.product.img}
                                 />
                              </div>
                              <div class="col-5">
                                 <h5>${item.product.name}</h5>
                              </div>
                              <div class="col d-flex">
                                 <button class="btn toggle-btn py-1 border border-end-0 rounded-0" onclick="decreaseItem(${item.product.id})">
                                    -
                                 </button>
                                 <button class="btn py-1 px-3 border rounded-0">${item.quantity}</button>
                                 <button class="btn toggle-btn py-1 border border-start-0 rounded-0" onclick="increaseItem(${item.product.id})">
                                    +
                                 </button>
                              </div>
                              <div class="col text-end">&dollar; ${item.product.price}</div>
                              <div class="col-1 text-end">
                                 <button class="border-0 bg-transparent" onclick="deleteItem(${item.product.id})">
                                    <i class="fa-solid fa-trash-can"></i>
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>`;
      });

      content += `<div id="summary" class="col-5 offset-7 summary mt-4">
                     <h5 class="border-bottom border-1">Summary</h5>
                     <div class="row mt-3">
                        <div class="col">Items:</div>
                        <div class="col text-end fw-bold">${totalItem}</div>
                     </div>

                     <div class="row mt-2">
                        <div class="col">TOTAL PRICE:</div>
                        <div class="col text-end fw-bold">&dollar; ${totalPrice}</div>
                     </div>
                     <div class="actions mt-4 mb-2 d-flex justify-content-between">
                        <button class="btn btn-outline-secondary" onclick="resetCartList()">CLEAR ALL</button>
                        <button class="btn btn-outline-success" onclick="openPaymentHandle()">PURCHASE</button>
                     </div>
                  </div>`;
   }

   cartItems.innerHTML = content;
};

const renderPayment = (items) => {
   let content = "";
   let totalItem = 0;
   let totalPrice = 0;

   if (items.length) {
      items.forEach((item) => {
         totalItem += item.quantity;
         totalPrice += item.product.price * item.quantity;

         content += `<div class="row">
                        <div class="row border-bottom my-3 pb-3">
                           <div class="row main align-items-center">
                              <div class="col-8">
                                 <h5>${item.quantity} x ${item.product.name}</h5>
                              </div>
                              <div class="col-4 text-end">&dollar; ${item.product.price}</div>
                           </div>
                        </div>
                     </div>`;
      });

      content += `<div id="paymentSummary" class="row summary mt-4">
                     <div class="col">
                        <p class="py-3 fw-bold">Total ${totalItem} will cost &dollar;${totalPrice}. Do you want to make other?</p>
                     </div>

                     <div class="col-4 offset-8">
                        <div class="actions mt-4 mb-2 text-end d-flex justify-content-between">
                           <button class="btn btn-outline-secondary" onclick="canclePayment()">Cancel</button>
                           <button class="btn btn-success" onclick="orderHandle()">Order Now</button>
                        </div>
                     </div>
                  </div>`;
   }

   paymentItems.innerHTML = content;
};

// DOM
window.addEventListener("load", (e) => {
   console.log("Window on load");
   getProducts();
   getLocalStorage();
   renderCartItems(cartItemList);
});

const updateDropdownLabel = (target, value) => {
   target.innerHTML = value;
};

// Event handler
const handleAllBrandFilter = () => {
   renderProducts(productList);
   updateDropdownLabel(dropdownMenuBrand, "Brand");
};

const handleAppleFilter = () => {
   const filtered = productList.filter((p) => p.type.toLowerCase() == "iphone");
   updateDropdownLabel(dropdownMenuBrand, "Iphone");
   renderProducts(filtered);
};

const handleSamsungFilter = () => {
   const filtered = productList.filter((p) => p.type.toLowerCase() == "samsung");

   updateDropdownLabel(dropdownMenuBrand, "Samsung");
   renderProducts(filtered);
};

const openPaymentHandle = () => {
   renderPayment(cartItemList);
   document.getElementById("openPaymentBtn").click();
};

const orderHandle = () => {
   console.log("orderHandle");
   resetCartList();
   // close modal
   document.getElementById("paymentModelCloseBtn").click();
};

const canclePayment = () => {
   console.log("canclePayment");
   document.getElementById("paymentModelCloseBtn").click();
   cartBtn.click();
};
// cart CRUD
const handleAddCartItem = (id) => {
   console.log("=========== triggered handleAddCartItem with id is " + id);
   const item = cartItemList.find((p) => p.id === id);

   if (item) {
      console.log(id + " is already added to cart");
      cartItemList[cartItemList.indexOf(item)].quantity += 1;
   } else {
      console.log(id + " is new prodcut");

      cartItemList.push({
         id,
         product: productList[productList.indexOf(productList.find((p) => p.id === id))],
         quantity: 1,
      });
   }

   console.log(cartItemList);

   renderCartItems(cartItemList);
   setLocalStorage();
};

const increaseItem = (id) => {
   const item = cartItemList.find((p) => p.id === id);
   cartItemList[cartItemList.indexOf(item)].quantity += 1;

   renderCartItems(cartItemList);
   setLocalStorage();
};

const decreaseItem = (id) => {
   const item = cartItemList.find((p) => p.id === id);
   const quantity = cartItemList[cartItemList.indexOf(item)].quantity;

   if (quantity === 1) {
      cartItemList.splice(cartItemList.indexOf(item), 1);
   } else {
      cartItemList[cartItemList.indexOf(item)].quantity -= 1;
   }

   renderCartItems(cartItemList);
   setLocalStorage();
};

const resetCartList = () => {
   cartItemList = [];
   setLocalStorage();
   renderCartItems(cartItemList);
};

const deleteItem = (id) => {
   const item = cartItemList.find((p) => p.id === id);
   cartItemList.splice(cartItemList.indexOf(item), 1);

   renderCartItems(cartItemList);
   setLocalStorage();
};

// Add Event Listener
allBrandFilter.onclick = handleAllBrandFilter;
appleFilter.onclick = handleAppleFilter;
samsungFilter.onclick = handleSamsungFilter;

// Local storage
function setLocalStorage() {
   localStorage.setItem("cartItems", JSON.stringify({ data: cartItemList }));
}

function getLocalStorage() {
   var _itemJson = localStorage.getItem("cartItems");

   if (_itemJson) {
      var itemLocals = JSON.parse(_itemJson);

      if (itemLocals.data.length) {
         cartItemList = itemLocals.data.map((p) => ({
            id: p.id,
            product: new Product(
               p.product.id,
               p.product.name,
               parseInt(p.product.price),
               p.product.type,
               p.product.img,
               p.product.desc,
               p.product.screen,
               p.product.backCamera,
               p.product.frontCamera
            ),
            quantity: p.quantity,
         }));

         console.log("Assrsr");
      }
   }

   renderCartItems(cartItemList);
}
