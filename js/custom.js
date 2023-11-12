
(function ($) {

  "use strict";

  // NAVBAR
  $('.navbar-collapse a').on('click', function () {
    $(".navbar-collapse").collapse('hide');
  });

  $(function () {
    $('.hero-slides').vegas({
      slides: [
        { src: 'https://media.giphy.com/media/4ayiIWaq2VULC/giphy.gif' },
        { src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2Y4M3A5eWVnODRsaTA1N3B1c3FtZzJ2aGdkbjVlejAwc3lkYmh2biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/uYuNg2J4x9HUY/giphy.gif' },
        { src: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWNjMGQ5NW5ocTF0cjlwanJzeno2dHUwMHlhMDU2ZHIzMmdubXgyNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/114ugL1hv5p8He/giphy.gif' }
      ],
      timer: false,
      animation: 'kenburns',
    });
  });

  // CUSTOM LINK
  $('.smoothscroll').click(function () {
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height() + 60;

    scrollToDiv(elWrapped, header_height);
    return false;

    function scrollToDiv(element, navheight) {
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop - navheight;

      $('body,html').animate({
        scrollTop: totalScroll
      }, 300);
    }
  });

})(window.jQuery);


