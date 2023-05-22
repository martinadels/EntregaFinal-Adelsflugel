// Variables globales
const productos = [
    { nombre: "Pantalon", price: 10000 },
    { nombre: "Remera", price: 20000 },
    { nombre: "Zapatilla", price: 30000 },
];

let itemsCarrito = [];

// Función para mostrar los productos
function showProductos() {
    const productosContainer = document.getElementById("productos-container");
    if (!productosContainer) return;

    productosContainer.innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];

        const productoCard = document.createElement("div");
        productoCard.classList.add("producto-card");

        const productoName = document.createElement("h3");
        productoName.textContent = producto.name;

        const productoPrice = document.createElement("p");
        producotPrice.textContent = `$${producto.price}`;

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
}

// Función para agregar un producto al carrito
function addToCart(producto) {
    itemsCarrito.push(producto);
    updateitemsCarritoCount();
}

// Función para actualizar la cantidad de productos en el carrito
function updateitemsCarritoCount() {
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

            const cartItemElement = document.createElement("li");
            cartItemElement.textContent = `${cartItem.name} - $${cartItem.price}`;
            cartList.appendChild(cartItemElement);

            totalPrice += cartItem.price;
        }

        const totalElement = document.createElement("p");
        totalElement.textContent = `Total: $${totalPrice}`;

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
        totalPrice += cartItem.price;
    }

    let descuento = 0;

    if (codigoDescuento === "1234") {
        descuento = precioTotal * 0.15;
    }

    const iva = totalPrice * 0.21;
    totalPrice += iva - discount;

    const purchaseSummary = document.getElementById("purchase-summary");
    if (purchaseSummary) {
        purchaseSummary.textContent = `Resumen de compra: Total: $${totalPrice.toFixed(
            2
        )}, IVA: $${iva.toFixed(2)}, Descuento: $${discount.toFixed(2)}`;
    }

    itemsCarrito = [];
    updateitemsCarritoCount();
    showCart();
}

// Evento para mostrar los productos al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    showProductos();
    updateitemsCarritoCount();
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
