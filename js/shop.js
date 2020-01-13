window.Shop = {
    API_BASE_URL: "http://localhost:8086",

    getProducts: function () {
        $.ajax({
            url: Shop.API_BASE_URL + "/products"
         //default ajax method:"GET"
        }).done(function (response) {
            console.log(response);

            Shop.displayProducts(response.content);
        });

    },

    addProductToCart: function (productId){
        var request ={
            // todo : take customer id dynamically somehow
            customerId: 38,
            productId: productId
        };
        $.ajax({
            url:Shop.API_BASE_URL + "/carts",
            method:"PUT",
            contentType: "application/json",
            data: JSON.stringify(request)
        }).done(function () {
            window.location.replace("cart.html");


        })
    },
    getProductHtml: function (product) {
      return `<div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper">
                            <img src="img/product-1.jpg" alt="">
                        </div>
                        <h2><a href="">${product.name}</a></h2>
                        <div class="product-carousel-price">
                            <ins>$${product.price}</ins> 
                        </div>  
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="${product.id}" rel="nofollow" href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                        </div>                       
                    </div>
                </div>
`

    },
    displayProducts: function (products) {
        var productsHtml = "";

        products.forEach(oneproduct => productsHtml += Shop.getProductHtml(oneproduct));

        $(".single-product-area .row:first-child") .html(productsHtml);
    },
    bindEvents: function () {
        $(".single-product-area").delegate(".add_to_cart_button", "click",
            function (event) {
                event.preventDefault();
               let productId = $(this).data("product_id");
               Shop.addProductToCart(productId);
            })
    }
};

Shop.getProducts();
Shop.bindEvents();
