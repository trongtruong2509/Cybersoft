const productRow = document.getElementById("products");

let productList = [];

function Product(
   name,
   price,
   type,
   img,
   desc,
   screen = "",
   backCamera = "",
   frontCamera = ""
) {
   return { name, price, type, img, desc, screen, backCamera, frontCamera };
}

function getProducts() {
   axios({
      url: "https://62c4598b7d83a75e39f79c96.mockapi.io/products",
      method: "GET",
   })
      .then((res) => {
         console.log("afhlwwbr");
         mapProduct(res.data);
         renderProducts();
      })
      .catch((err) => console.log(err));
}

const mapProduct = (data) => {
   data.forEach((p) => {
      console.log(p);
      productList.push(
         new Product(
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
   });

   console.log(productList);
};

const renderProducts = () => {
   let content = "";
   productList.forEach((p) => {
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
                           <button class="btn btn-outline-primary d-inline-block">
                              Add
                           </button>
                        </div>
                     </div>
                  </div>`;
   });

   productRow.innerHTML = content;
};

getProducts();
