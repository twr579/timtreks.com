// Move to the top of the page and prevent scrolling or clicking the "Read My Blog" button until the fadeIn animation is complete
function disableScroll() {
    $('html, body').animate({
        scrollTop: 0
    }, 1000);
    $('body').addClass('overflow-hidden');
    $('.to-blog').addClass('disabled');
    setTimeout(function() {
        $('body').removeClass('overflow-hidden');
        $('.to-blog').removeClass('disabled');
    }, 4000);
}

// Move the top of the window to the blog section
function scrollToBlog() {
    $('.to-blog').click(function() {
        $('html, body').animate({
            scrollTop: $('.blog').offset().top
        }, 1000);
    });
}

// Reveal the blockquotes once the user scrolls past them
function slideIn($el) {
    $scrollBottom = $(this).scrollTop() + $(this).height();
    $quoteBottom = $el.offset().top + $el.outerHeight(true);
    if($scrollBottom > $quoteBottom) {
        $el.stop().animate({ left: '0px' });
    }
}


$(function() {
    $('.cover-text').delay(2000).fadeIn(2000);
    
    disableScroll();
    
    scrollToBlog();
    
    $(window).scroll(function() {
        slideIn($('.slidein-from-left'));
        slideIn($('.slidein-from-right'));
    });
});