const headerEl = document.getElementById("header");
const footerEl = document.getElementById("footer");
const breadcrumbEl = document.getElementById("breadcrumb");
const paginationEl = document.getElementById("pagination");
const memberDiscountEl = document.getElementById("memberDiscount");
const productListEl = document.getElementById("productList");
const otherProductsEl = document.getElementById("otherProducts");

if (headerEl) {
  fetch("components/header.html")
    .then((res) => res.text())
    .then((html) => {
      headerEl.innerHTML = html;
    });
}

if (footerEl) {
  fetch("components/footer.html")
    .then((res) => res.text())
    .then((html) => {
      footerEl.innerHTML = html;
    });
}

const breadcrumbMap = {
  "products-list.html": [
    { name: "首頁", href: "#" },
    { name: "所有商品", href: "products-list.html" },
  ],
  "products-detail.html": [
    { name: "首頁", href: "#" },
    { name: "女鞋", href: "products-list.html" },
    { name: "滑板鞋", href: "products-detail.html" },
    { name: "Platform 404", href: "#" },
  ],
};

const currentPath = window.location.pathname.split("/").filter(Boolean).pop();
const breadcrumbData = breadcrumbMap[currentPath] || [];

if (breadcrumbEl) {
  fetch("components/breadcrumb.html")
    .then((res) => res.text())
    .then((html) => {
      breadcrumbEl.innerHTML = html;

      const ol = breadcrumbEl.querySelector("ol");
      if (!ol) return;

      breadcrumbData.forEach((item, i) => {
        const li = document.createElement("li");
        li.className = "breadcrumb__item";

        if (i === breadcrumbData.length - 1) {
          li.innerHTML = `<span>${item.name}</span>`;
        } else {
          li.innerHTML = `<a href="${item.href}">${item.name}</a>`;
        }

        ol.appendChild(li);
      });
    });
}

if (paginationEl) {
  fetch("components/pagination.html")
    .then((res) => res.text())
    .then((html) => {
      paginationEl.innerHTML = html;
    });
}

if (memberDiscountEl) {
  fetch("components/memberDiscount.html")
    .then((res) => res.text())
    .then((html) => {
      memberDiscountEl.innerHTML = html;
    });
}

if (productListEl) {
  fetch("assets/js/products.json")
    .then((res) => res.text())
    .then((html) => {
      let productCard = "";
      const data = JSON.parse(html)["product-cards"];
      data.forEach((item, index) => {
        productCard += `
          <li class="col-4">
            <a href="products-detail.html">
              <img src="${item["src"]}" alt="${item["title"]}" class="mb-3">
              <h2 class="h6 mb-1">${item["title"]}</h2>
              <p class="label-md">${item["price"]}</p>
            </a>
          </li>
        `;
      });
      productListEl.innerHTML = `<ul class="product-list row">${productCard}</ul>`;
    });
}

if (otherProductsEl) {
  fetch("assets/js/products.json")
    .then((res) => res.text())
    .then((html) => {
      let productCard = "";
      const data = JSON.parse(html)["product-cards"];
      data.forEach((item, index) => {
        if (item.related !== "PLATFORM 404") {
          return;
        }
        productCard += `
          <li class="col-3">
            <a href="products-detail.html">
              <img src="${item["src"]}" alt="${item["title"]}" class="mb-3">
              <h2 class="h6 mb-1">${item["title"]}</h2>
              <p class="label-md">${item["price"]}</p>
            </a>
          </li>
        `;
      });
      otherProductsEl.innerHTML = `<ul class="product-list row">${productCard}</ul>`;
    });
}
