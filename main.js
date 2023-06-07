// Variables globales
const productosContainer = document.getElementById("productos-container");
const productos = [];
let itemsCarrito = [];


// Función para mostrar los productos
function showProductos() {
  if (!productosContainer) return;

  productosContainer.innerHTML = "";

  // Utilizo Fetch para obtener los productos desde una API 
  fetch("http://localhost:3011/productos")
    .then((response) => response.json())
    .then((data) => {
      productos.push(...data);

      for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        const productoCard = document.createElement("div");
        productoCard.classList.add("producto-card");

        const productoName = document.createElement("h3");
        productoName.textContent = producto.nombre;

        const productoPrice = document.createElement("p");
        productoPrice.textContent = `$${producto.price}`;

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Agregar al carrito";
        addToCartButton.addEventListener("click", () => {
          addToCart(producto);
        });

        productoCard.appendChild(productoName);
        productoCard.appendChild(productoPrice);
        productoCard.appendChild(addToCartButton);

        productosContainer.appendChild(productoCard);

      
    }
    })
    .catch ((error) => {
  console.log("Error al obtener los productos:", error);
});
}

// Función para agregar un producto al carrito
function addToCart(producto) {
  itemsCarrito.push(producto);
  updateItemsCarritoCount();
}

// Función para actualizar la cantidad de productos en el carrito
function updateItemsCarritoCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  cartCount.textContent = itemsCarrito.length;
}

// Función para mostrar el contenido del carrito
function showCart() {
  const cartContainer = document.getElementById("cart-container");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (itemsCarrito.length === 0) {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.textContent = "El carrito está vacío.";
    cartContainer.appendChild(emptyCartMessage);
  } else {
    const cartList = document.createElement("ul");

    let precioTotal = 0;

    for (let i = 0; i < itemsCarrito.length; i++) {
      const cartItem = itemsCarrito[i];
      const producto = productos.find((p) => p.nombre === cartItem.nombre);

      if (producto) {
        const cartItemElement = document.createElement("li");
        cartItemElement.textContent = `${producto.nombre} - $${producto.price}`;
        cartList.appendChild(cartItemElement);

        precioTotal += producto.price;
      }
    }

    const totalElement = document.createElement("p");
    totalElement.textContent = `Total: $${precioTotal.toFixed(2)}`;

    cartContainer.appendChild(cartList);
    cartContainer.appendChild(totalElement);
  }
}

// Función para finalizar la compra
function finishPurchase() {
  const codigoDescuento = document.getElementById("codigo-descuento").value;
  let precioTotal = 0;

  for (let i = 0; i < itemsCarrito.length; i++) {
    const cartItem = itemsCarrito[i];
    precioTotal += cartItem.price;
  }

  let descuento = 0;

  if (codigoDescuento === "1234") {
    descuento = precioTotal * 0.15;
  }

  const iva = precioTotal * 0.21;
  const totalPrice = precioTotal + iva - descuento;

  if (document.getElementById("purchase-summary")) {
    const purchaseSummary = document.getElementById("purchase-summary");
    purchaseSummary.textContent = `Resumen de compra: Total: $${totalPrice.toFixed(
      2
    )}, IVA: $${iva.toFixed(2)}, Descuento: $${descuento.toFixed(2)}`;
  }

  itemsCarrito = [];
  updateItemsCarritoCount();
  showCart();
  
}

// Evento para mostrar los productos al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  showProductos();
  updateItemsCarritoCount();
});

// Evento para mostrar la página de compra
const goToPurchaseButton = document.getElementById("go-to-purchase-button");
if (goToPurchaseButton) {
  goToPurchaseButton.addEventListener("click", () => {
    const productosPage = document.getElementById("productos-page");
    const purchasePage = document.getElementById("purchase-page");

    if (productosPage && purchasePage) {
      productosPage.style.display = "none";
      purchasePage.style.display = "block";

      showCart();
    }
  });
}

// Evento para mostrar la página de productos
const goToProductosButton = document.getElementById("go-to-productos-button");
if (goToProductosButton) {
  goToProductosButton.addEventListener("click", () => {
    const productosPage = document.getElementById("productos-page");
    const purchasePage = document.getElementById("purchase-page");

    if (productosPage && purchasePage) {
      productosPage.style.display = "block";
      purchasePage.style.display = "none";
    }
  });
}

// Evento para finalizar la compra
const purchaseButton = document.getElementById("purchase-button");
if (purchaseButton) {
  purchaseButton.addEventListener("click", () => {
    finishPurchase();
  });
}

//Contacto

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  alert("Nombre: " + name + "\nEmail: " + email + "\nMensaje: " + message);

  document.getElementById("contact-form").reset();
});





