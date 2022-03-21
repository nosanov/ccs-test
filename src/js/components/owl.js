/*
** TODO: rewrite this with Class
*/

function initOwlCarousel () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 40,
        responsive:{
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 4,
                nav: false,
                loop: false
            }
        }
    });
}

export { initOwlCarousel };