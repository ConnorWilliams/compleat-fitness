// Function to initialise the instagram section of the site.
function instafeeder() {
    var feed = new Instafeed({
        clientId: 'e0347429fc5548d48ddb0b92cbfbfcbb',
        accessToken: '233584328.e034742.88db8c1704d14b11856e3382dba76ad9',
        get: 'user',
        userId: '233584328',
        template: '<img src="{{model.images.standard_resolution.url}}"/>',
        after: function() {
            runSlick();
        },
    });
    feed.run();
}

// Function to run the image slider on the pictures brought from instagram.
function runSlick() {
    $('.instafeed').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        fade: true,
        arrows: false,
    });
}
