const productRow = document.getElementById("products");
const allBrandFilter = document.getElementById("allBrandFilter");
const appleFilter = document.getElementById("appleFilter");
const samsungFilter = document.getElementById("samsungFilter");
const dropdownMenuBrand = document.getElementById("dropdownMenuBrand");
const cartItems = document.getElementById("cartItems");

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
                  p.price,
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

// const mapProduct = (data) => {
//    data.forEach((p) => {
//       productList.push(
//          new Product(
//             p.name,
//             p.price,
//             p.type,
//             p.img,
//             p.desc,
//             p.screen,
//             p.backCamera,
//             p.frontCamera
//          )
//       );
//    });

//    console.log(productList);
// };

const renderProducts = (data) => {
   if (data) {
      let content = "";
      data.forEach((p) => {
         content += `<div class="col-lg-3 px-3 pt-4">
                     <div class="item p-3 border-1 border">
                        <div class="thumbnail">
                           <img
                              class="img-fluid"
                              src=${p.img}
                              alt="Galaxy S22"
                           />
                        </div>
                        <div
                           class="detail d-flex flex-column justify-content-between"
                        >
                           <h1 class="fs-3 py-3">${p.name}</h1>
                           <div class="desc">
                           ${p.desc}
                           </div>
                           <span class="d-inline-block">${p.price}đ</span>
                           <button class="btn btn-outline-primary d-inline-block" onclick="handleAddCartItem(
                              ${p.id}
                           )">
                              Add
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

   if (items) {
      items.forEach((item) => {
         content += `<div class="row border-bottom my-3 pb-3">
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
                     </div>`;
      });
   } else {
      content = "You don't have any item in cart";
   }

   cartItems.innerHTML = content;
};

getProducts();

// DOM
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
};

const getQuantityNode = (type) => {
   const quantityNode = new Node();

   if (type == "increase") {
      quantityNode = document.querySelector("");
   } else {
   }
};

const increaseItem = (id) => {
   const item = cartItemList.find((p) => p.id === id);
   cartItemList[cartItemList.indexOf(item)].quantity += 1;

   renderCartItems(cartItemList);
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
};

const deleteItem = (id) => {
   const item = cartItemList.find((p) => p.id === id);
   cartItemList.splice(cartItemList.indexOf(item), 1);

   renderCartItems(cartItemList);
};

// Add Event Listener
allBrandFilter.onclick = handleAllBrandFilter;
appleFilter.onclick = handleAppleFilter;
samsungFilter.onclick = handleSamsungFilter;
