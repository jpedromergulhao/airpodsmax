import createAlert from "./alert.js";

document.addEventListener('DOMContentLoaded', () => {
    const bagElement = document.querySelector('.bag');
    const closeBtn = document.querySelector('.close');
    const baglist = document.querySelector('.bagList');
    const quantityElement = document.querySelector('.bag .quantity');
    let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];
    const productsContainer = document.querySelector('.productsContainer');
    const returnBtn = document.querySelector('.shoppingCta');
    const checkoutBtn = document.querySelector('.buyBtn');
    const showTotoal = document.querySelector('.totalSpan');

    const availableProducts = [
        { id: 1, name: "AirPod Max Black", image1: "airpods-black.png", image2: "airpods_max_black_payment_page.png", price: 0, quantity: 0 },
        { id: 2, name: "AirPod Max White", image1: "airpods-white.png", image2: "airpods_max_white_payment_page.png", price: 0, quantity: 0 },
        { id: 3, name: "AirPod Max Green", image1: "airpods-green.png", image2: "airpods_max_green_payment_page.png", price: 0, quantity: 0 },
        { id: 4, name: "AirPod Max Blue", image1: "airpods-blue.png", image2: "airpods_max_blue_payment_page.png", price: 0, quantity: 0 },
        { id: 5, name: "AirPod Max Pink", image1: "airpods-pink.png", image2: "airpods_max_pink_payment_page.png", price: 0, quantity: 0 }
    ]

    // close and open the bag
    bagElement.addEventListener("click", (event) => {
        event.stopPropagation();
        baglist.style.transform = "translateX(0)";
    });

    closeBtn.addEventListener("click", () => {
        baglist.style.transform = "translateX(100%)";
    });

    baglist.addEventListener("click", (event) => {
        event.stopPropagation();
    })

    document.addEventListener("click", (event) => {
        if (baglist.style.transform === "translateX(0px)") {
            baglist.style.transform = "translateX(100%)";
        }
    })

    returnBtn.addEventListener("click", () => {
        baglist.style.transform = "translateX(100%)";
    });

    // Quantity of items in the bag
    const calculateTotalQuantity = () => {
        return bagItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Calculate the total grant
    const calculateTotalPrice = () => {
        return bagItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    // Formating the price to USD
    const formatPrice = (price) => {
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    // Function to update the bag
    const updateCartUI = () => {

        productsContainer.innerHTML = '';

        bagItems.forEach(item => {
            const productElement = createProductElement(item);
            productsContainer.appendChild(productElement);
        });

        quantityElement.textContent = calculateTotalQuantity();
        showTotoal.textContent = formatPrice(calculateTotalPrice());
        localStorage.setItem("bagItems", JSON.stringify(bagItems));
    }

    // Update the cart to see if there is any product saved before
    if (bagItems.length > 0) updateCartUI();

    // Increment product quantity in the bag
    const handleIncrement = (itemId) => {
        bagItems = bagItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCartUI();
    };

    // Decrement product quantity in the bag
    const handleDecrement = (itemId) => {
        bagItems = bagItems.map(item =>
            item.id === itemId
                ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
                : item
        ).filter(item => item.quantity > 0);
        updateCartUI();
    };

    // Remove product from the bag
    const handleRemove = (itemId) => {
        bagItems = bagItems.filter(item => item.id !== itemId);
        updateCartUI();
    };

    // Redirect the user to checkout page and save products info in the local storage
    checkoutBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (bagItems.length === 0) {
            createAlert('The bag is empty, please add a product');
            return;
        }

        localStorage.setItem("bagItems", JSON.stringify(bagItems));
        localStorage.setItem("totalPrice", calculateTotalPrice());
        localStorage.setItem("totalQuantity", calculateTotalQuantity());

        setTimeout(() => {
            window.location.href = "./checkout.html";
        }, 100);
    })

    const handleAddToBag = (event) => {
        const { color, price } = event.detail;

        try {
            // Find the respective color of the item
            const productToAdd = availableProducts.find(
                item => item.name.includes(color.charAt(0).toUpperCase() + color.slice(1))
            );

            if (!productToAdd) {
                throw new Error("Product not found for the given color.");
            }

            const updatedCartItems = bagItems.map(item => {
                // If the product is already in the cart, simply increase its quantity
                if (item.id === productToAdd.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });

            // If the product is not in the cart, add it to the cart
            if (!updatedCartItems.find(item => item.id === productToAdd.id)) {
                updatedCartItems.push({ ...productToAdd, price: price, quantity: 1 });
            }

            bagItems = updatedCartItems;
            updateCartUI();
        } catch (error) {
            console.error("An error occurred while adding the product to the cart: ", error);
        }
    }

    function createProductElement(item) {
        // Creating all the HTML tags
        const productInfo = document.createElement('li');
        const divImg = document.createElement('div');
        const divProdInf = document.createElement('div');
        const divBtns = document.createElement('div');
        const img = document.createElement('img');
        const h6 = document.createElement('h6');
        const span = document.createElement('span');
        const btn1 = document.createElement('button');
        const btn2 = document.createElement('div');
        const btn3 = document.createElement('div');
        const divBtns2 = document.createElement('div');
        const divNum = document.createElement('div');

        // Setting up the li element
        productInfo.classList.add('products');
        productInfo.setAttribute('key', item.id);

        // Setting up the image div
        img.src = `./assets/${item.image1}`;
        img.alt = item.name;
        divImg.classList.add('bagImg');

        // Setting up the product info div
        h6.textContent = item.name;
        span.textContent = formatPrice(item.price);
        divProdInf.classList.add('producInf');

        // Setting up the buttons div
        divBtns.classList.add('buttons');
        btn1.classList.add('delete');
        btn1.addEventListener('click', () => handleRemove(item.id));
        btn1.textContent = 'x';
        divBtns2.classList.add('number');
        btn2.classList.add('remove');
        btn2.addEventListener('click', () => handleDecrement(item.id));
        btn2.textContent = '-';
        btn3.classList.add('add');
        btn3.addEventListener('click', () => handleIncrement(item.id));
        btn3.textContent = '+';
        divNum.classList.add('displayNumber');
        divNum.textContent = item.quantity;

        // Appending child elements
        divImg.appendChild(img);
        divProdInf.appendChild(h6);
        divProdInf.appendChild(span);
        divBtns.appendChild(btn1);
        divBtns2.appendChild(btn2);
        divBtns2.appendChild(divNum);
        divBtns2.appendChild(btn3);
        divBtns.appendChild(divBtns2);

        productInfo.appendChild(divImg);
        productInfo.appendChild(divProdInf);
        productInfo.appendChild(divBtns);

        return productInfo;
    }

    // this custon event was created in the script.js
    window.addEventListener('addToBag', handleAddToBag);
})