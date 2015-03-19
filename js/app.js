	(function() {
	    'use strict';
	    angular.module('martians', ['ngRoute']);
	})();


    // TODO: Add routes and partials for about,contact

	(function() {
		//This is where we add routes
		///partials is where we put our templates

	    angular.module('martians').config(['$routeProvider',
	        function($routeProvider) {
	            $routeProvider.
	            when('/', {
	                templateUrl: 'partials/index.html',
	                controller: 'mainController as main'
	            });
	        }
	    ]);
	})();

	(function() {
	    'use strict';

	    angular
	        .module('martians')
	        .factory('cartService', cartService);

	    /* @ngInject */
	    function cartService($http, productService) {
	    	//This service will keep track of our shopping cart.
	    	var cart = [];
	        var service = {
	            addToCart: addToCart,
	            getCart: getCart
	        };

	        return service;

	        ////////////////

	        function addToCart(product) {
	          //If product is in the cart then add qunatity else add qty of 1
	          var productInCart = 0;
	          if(cart.length){
	          	angular.forEach(cart, function(item){
                    if(item.id == product.id){
                    	item.qty++;
                    	item.total = (item.price*item.qty);
                    	item.total = item.total.toFixed(2);
                    	productInCart++;
                    }
	          	});
	          }

              if(!productInCart){
              	product.qty = 1;
              	product.total = (product.price*product.qty);
                product.total = product.total.toFixed(2);
              	cart.push(product);
              }
	        }

	        function getCart(){
               return cart;
	        }
	    }
	})();



	(function() {
	    'use strict';

	    angular
	        .module('martians')
	        .factory('productService', productService);

	    /* @ngInject */
	    function productService() {
	    	//This service will hold our products
	        var service = {
	            getProducts: getProducts
	        };
	        return service;

	        ////////////////

	        function getProducts() {
               var products = [];

               //Use this format for products
               //Just copy and paste it until all products are added.


               // SCOTT TODO:
               // Find the product images and then push that ontt the products array just like the one below.
               // You just need to change the image,title,id,and, price. ID should be in order.
               // Add as many as you would like
               

               products.push({
                  title: "P1",
                  image: "http://placehold.it/800x500",
                  description: "This product is the greatest thing ever",
                  id: 0, 
                  price: 19.99
               });

               return products;
	        }
	    }
	})();

	(function() {
	    'use strict';

	    angular
	        .module('martians')
	        .controller('mainController', mainController);

	    /* @ngInject */
	    function mainController(cartService, productService) {
	        /*jshint validthis: true */
	        var vm = this;
	        vm.title = 'mainController';
	        vm.addToCart = addToCart;

	        activate();

	        function activate() {
	        	//Lets get the products and partials/index.html will have access to them.
	        	vm.products = productService.getProducts();
	        }

	        function addToCart(product){
                 cartService.addToCart(product);
                 console.log(cartService.getCart());
	        }
	    }
	})();

	// TODO: Build out cart controller

	(function() {
	    'use strict';
	
	    angular
	        .module('martians')
	        .controller('cartController', cartController);
	
	    /* @ngInject */
	    function cartController(cartService, $interval) {
	        /*jshint validthis: true */
	        var vm = this;
	        vm.title = 'cartController';
	        vm.items = cartService.cart;
	
	        activate();

            //Keep an eye on the cart
	        $interval(function(){
               vm.items = cartService.getCart();
	        },1000);
	
	        function activate() {

	        }
	    }
	})();