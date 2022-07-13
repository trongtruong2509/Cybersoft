const baseUrl = "https://62c4598b7d83a75e39f79c96.mockapi.io/products";

const tblProducts = document.getElementById("tblProducts");
const addNewBtn = document.getElementById("addBtn");
const addProductBtn = document.getElementById("addProductBtn");
const addModal = document.getElementById("addModal");

const modalName = document.getElementById("pName");
const modalType = document.getElementById("pType");
const modalPrice = document.getElementById("pPrice");
const modalImg = document.getElementById("pImage");
const modalDesc = document.getElementById("pDesc");

let productList = [];

function Product(name, price, type, img, desc, id, screen = "", backCamera = "", frontCamera = "") {
   return { name, price, type, img, desc, id, screen, backCamera, frontCamera };
}

const renderProducts = (data) => {
   if (data) {
      let content = "";
      data.forEach((p, index) => {
         content += `<tr>
                        <td>${index + 1}</td>
                        <td>${p.name}</td>
                        <td>${p.price}</td>
                        <td class="img-wrapper">
                           <img class="thumbnail" src=${p.img} alt=${p.name} />
                        </td>
                        <td>${p.desc}</td>
                        <td>
                           <button class="btn btn-success" data-bs-toggle="modal"
                           data-bs-target="#addModal" onclick="viewProductHandle(${
                              p.id
                           })">View</button>
                           <button class="btn btn-danger" onclick="deleteProduct(${
                              p.id
                           })">Delete</button>
                        </td>
                     </tr>`;
      });

      tblProducts.innerHTML = content;
   }
};

// DOM
window.addEventListener("load", (e) => {
   console.log("Window on load");
   getProducts();
});

const updateModalBtn = (isUpdate, id) => {
   let btnTitle = "Add Product";
   let btnFunc = "addProductHandle()";

   if (isUpdate) {
      btnTitle = "Update Product";
      btnFunc = `updateProduct(${id})`;
   }

   document.querySelector(".modal-footer").innerHTML = `
      <button
         id="btnCloseModal"
         class="btn btn-outline-secondary"
         data-bs-dismiss="modal"
      >
         Cancel
      </button>
      <button onclick=${btnFunc} class="btn btn-primary">${btnTitle}</button>`;
};

addNewBtn.addEventListener("click", () => {
   updateModalBtn(false, 0);
});

const updateDropdownLabel = (target, value) => {
   target.innerHTML = value;
};

// Product CRUD
function getProducts() {
   axios({
      url: baseUrl,
      method: "GET",
   })
      .then((res) => {
         productList = res.data.map(
            (p) =>
               new Product(
                  p.name,
                  parseInt(p.price.replace("$", "")),
                  p.type,
                  p.img,
                  p.desc,
                  p.id,
                  p.screen,
                  p.backCamera,
                  p.frontCamera
               )
         );

         renderProducts(productList);
      })
      .catch((err) => console.log(err));
}

const getProduct = (id) => {
   axios({
      url: `${baseUrl}/${id}`,
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
};

const addProductHandle = () => {
   const name = modalName.value;
   const type = modalType.value;
   const price = modalPrice.value;
   const img = modalImg.value;
   const desc = modalDesc.value;

   const product = new Product(name, price, type, img, desc);

   let valid = isValid(product);

   if (valid) {
      axios({
         url: baseUrl,
         method: "POST",
         data: product,
      })
         .then(() => {
            getProducts();
         })
         .catch((err) => {
            console.log(err);
         });

      document.getElementById("btnCloseModal").click();
   } else {
   }
};

const updateProduct = (id) => {
   const name = modalName.value;
   const type = modalType.value;
   const price = modalPrice.value;
   const img = modalImg.value;
   const desc = modalDesc.value;

   const product = new Product(name, price, type, img, desc);

   let valid = isValid(product);

   if (valid) {
      console.log(product);

      axios({
         url: `${baseUrl}/${id}`,
         method: "PUT",
         data: product,
      })
         .then(() => {
            getProducts();
         })
         .catch((err) => {
            console.log(err);
         });

      document.getElementById("btnCloseModal").click();
   }
};

const viewProductHandle = (id) => {
   const selected = productList[productList.indexOf(productList.find((p) => p.id == id))];

   console.log(selected);
   modalName.value = selected.name;
   modalType.value = selected.type;
   modalPrice.value = selected.price;
   modalImg.value = selected.img;
   modalDesc.value = selected.desc;

   updateModalBtn(true, selected.id);
};

const deleteProduct = (id) => {
   axios({
      url: `${baseUrl}/${id}`,
      method: "DELETE",
   })
      .then(() => {
         getProducts();
      })
      .catch((err) => {
         console.log(err);
      });
};

// Add Event Listener and Handle
addProductBtn.onclick = addProductHandle;

// Validations
const isNullOrEmpty = (str) => {
   return str === "" || str.trim() === "";
};

const isValid = (product) => {
   let valid = true;

   valid &=
      checkRequired(product.name, "nameAlert") && checkLength(product.name, "nameAlert", 4, 20);
   valid &=
      checkRequired(product.type, "typeAlert") && checkLength(product.type, "typeAlert", 4, 10);
   valid &= checkRequired(product.price, "priceAlert") && checkNumner(product.price, "priceAlert");

   valid &=
      checkRequired(product.desc, "descAlert") && checkLength(product.desc, "descAlert", 10, 1000);
   valid &= checkRequired(product.img, "imageAlert") && checkLinkExist(product.img, "imageAlert");

   return valid;
};

function checkRequired(val, spanId) {
   if (val != "" && val.trim().length > 0) {
      document.getElementById(spanId).innerHTML = "";
      return true;
   }

   document.getElementById(spanId).innerHTML = "* This field is required!";
   return false;
}

function checkLength(val, spanId, min, max) {
   if (val.length >= min && val.length <= max) {
      document.getElementById(spanId).innerHTML = "";
      return true;
   }

   document.getElementById(spanId).innerHTML = `* Length must from ${min} to ${max} character`;
   return false;
}

function checkNumner(val, spanId) {
   var letter = /^[0-9]+$/;
   if (val.match(letter)) {
      document.getElementById(spanId).innerHTML = "";
      return true;
   }

   //false
   document.getElementById(spanId).innerHTML = "* Please fill only number";
   return false;
}

const checkLinkExist = (link, spanId) => {
   return true;
};
