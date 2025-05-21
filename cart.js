$(document).ready(function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        $("#cart-count").text(cart.length);
    }

    function updateCartDisplay() {
        let cartPage = $("#cart-items");
        cartPage.empty();

        cart.forEach((item, index) => {
            cartPage.append(`
                <tr>
                    <td>${item.name}</td>
                    <td>₹${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price * item.quantity}</td>
                    <td><button class="btn btn-danger remove-item" data-index="${index}">Remove</button></td>
                </tr>
            `);
        });

        let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        $("#cart-total").text("Total: ₹" + total);
        updateCartCount();
    }

    $(".add-to-cart").click(function () {
        let name = $(this).data("name");
        let price = $(this).data("price");

        let product = cart.find(p => p.name === name);
        if (product) {
            product.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(name + " added to cart!");
    });

    $(document).on("click", ".remove-item", function () {
        let index = $(this).data("index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    });

    updateCartDisplay();
});