function initOwlCarousel () {

    $(".owl-carousel").owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        autoWidth: true,
        items: 5,
        responsive: {
            1440: {
                mouseDrag: false
            }
        },
    });
}

export { initOwlCarousel };