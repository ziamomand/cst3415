var showCart = false;
var cartJSON = localStorage.getItem("cart");
if(cartJSON != null){
    var cart = JSON.parse(cartJSON);
    if(cart.length > 0){
        showCart = true;
    }
}

var app = new Vue({
    el: '#app',
    data: {
        lessons: lessons,
        sortBy: "",
        order: "asc",
        showCart: showCart,
    },
    methods: {
        order: function () {
            app.lessons.sort((a, b) => {
                return a.price - b.price;
            });
        },
        addToCart: function(lesson) {
            this.showCart = true;
            var JSONcurrentCart = localStorage.getItem("cart");
            var currentCart = []
            if(JSONcurrentCart != null){
                currentCart = JSON.parse(JSONcurrentCart);
            }
            currentCart.push(lesson);
            var newCart = JSON.stringify(currentCart)
            localStorage.setItem("cart", newCart);
        }
    },
    computed: {
        sortedLessons() {
            return this.lessons.sort((a, b) => {
                if(this.order == "asc"){
                    return compare(a, b, this.sortBy)
                } else {
                    return 0 - compare(a, b, this.sortBy)
                }
            });
        }
    }
})

function compare( a, b, fields ) {
    if ( a[fields] < b[fields] ){
        return -1;
    }
    if ( a[fields] > b[fields] ){
        return 1;
    }
    return 0;
}