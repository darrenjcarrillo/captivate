/*
    Use the command "npm install" in the theme directory to install these packages
    Make sure to use
    npm run dev
    to start the server
*/

import $ from "jquery";

import "slick-carousel/slick/slick";

// core version + navigation, pagination modules:
import {
  Swiper,
  Navigation,
  Thumbs,
  Pagination,
  Autoplay,
  Scrollbar,
  EffectCoverflow,
} from "swiper/js/swiper.esm.js";
// remove /js/ in wp version

// configure Swiper to use modules
Swiper.use([Navigation, Thumbs, Pagination, Autoplay]);

window.$ = $;
window.jQuery = $;

// slider
// ---------------------------------------------------------------------------------------------------


// Fade in animations
// ---------------------------------------------------------------------------------------------------
var callback = function() {
  // Handler when the DOM is fully loaded
  var t = document.querySelectorAll(".rvl");

  t.forEach(function(n) {
    n.getBoundingClientRect().top < window.innerHeight / 1.3 &&
      n.classList.add("animate");
  });
};

if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}

function aniMate(n) {
  var t = document.querySelectorAll(n);

  window.addEventListener("scroll", function() {
    t.forEach(function(n) {
      n.getBoundingClientRect().top < window.innerHeight / 1.3 &&
        n.classList.add("animate");
    });
  });
}

aniMate(
  ".rvl,.imageanimleft, .fade-up-stop, .fade-right-stop, .fade-left-stop ,.tanbox,.greybox .fade-in , .fade-in-left , .fade-in-right , .scale-down"
);

// Scroll to top button
// ---------------------------------------------------------------------------------------------------
$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() < 100 ) {
      $('#scroll').fadeOut();
    } else {
      $('#scroll').fadeIn();
    }
  });
  // $('#scroll').click(function() {
  //   $('html, body').animate({ scrollTop: 0 }, 600);
  //   return false;
  // });
});

$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header-container').addClass('act');
    } else {
      $('#header-container').removeClass('act');
    }
  });
});
// Menu Functionality
// ---------------------------------------------------------------------------------------------------
$(document).ready(function() {
  let menuopen = false;

  $('.menu-button').click(function(e) {
    if (menuopen == false) {
      $('.hasdropdown').removeClass('activeitem');

      $(this).addClass('activeitem');
      $('.menu-text').text('Close');
      $('.navbaritems,.navdiv,#header-container,.bars').addClass('activemenu');
      if ($(window).width() > 992) {
        $('#hvr').addClass('animamenu');
      }

      menuopen = true;
    } else {
      $('.hasdropdown').addClass('activeitem');
      $('.menu-text').text('Menu');
      $(this).removeClass('activeitem');
      $('.navbaritems,.navdiv,#header-container,.bars').removeClass('activemenu');
      menuopen = false;
    }
  });

  if ($(window).width() > 992) {
    $.fn.accessibleDropDown = function() {
      var el = $(this);

      $('.hasdropdown  a', el)
        .click(function () {
          $('.hasdropdown').removeClass('animamenu');

          $(this)
            .parents('.hasdropdown')
            .addClass('animamenu');
        })


        .blur(function() {
          $(this)
            .parents('.hasdropdown')
            .removeClass('animamenu');
        });
    };

    $('ul.items').accessibleDropDown();
  }

  $('.closemenubutton').click(function(e) {
    $('.hasdropdown').addClass('activeitem');
    $('.menu-text').text('Menu');
    $(this).removeClass('activeitem');
    $('.navbaritems,.navdiv,#header-container').removeClass('activemenu');
    menuopen = false;
  });

  // mobile menu click

  if ($(window).width() < 992) {
    $('ul#menu-main-menu  .hasdropdown > a').click(function(e) {
      e.preventDefault();
    });

    $('.hasdropdown').click(function(e) {
      e.stopPropagation();
      if ($(this).hasClass('animamenu')) {
        $(this).removeClass('animamenu');
      } else {
        $(this).addClass('animamenu');
      }
    });
  }
});

// form submit
// ---------------------------------------------------------------------------------------------------
$("#schedule").submit(function(e) {
  e.preventDefault();
  var form = $(this);
  var form_results = $("#form-results");

  form_results.html(" ");
  form_results.removeClass("alert");
  form_results.removeClass("alert-error");
  form_results.removeClass("alert-success");

  form.find(".btn").prop("disabled", true);

  var errors = [];

  // Validation
  if (form.find("input[name=name]").val() == "") {
    errors.push("The name field is required");
  }
  if (form.find("input[name=email]").val() == "") {
    errors.push("The email field is required");
  }
  if (!form.find('select[name="preferred_day"]').val()) {
    errors.push("The day of the week field is required");
  }
  if (!form.find('select[name="preferred_time"]').val()) {
    errors.push("The time of day field is required");
  }

  if (errors.length > 0) {
    var error_html = '<ul class="mb-0">';
    form_results.addClass("alert");
    form_results.addClass("alert-info");

    $.each(errors, function(index, value) {
      error_html += "<li>" + value + "</li>";
    });
    error_html += "</ul>";

    form_results.html(error_html);
    form.find(".btn").prop("disabled", false);
    return false;
  }

  var data = {
    action: 'do_ajax',
    fn: 'schedule',
    data: form.serializeArray(),
    security: the_theme.ajax_nonce,
    siteurl: the_theme.url,
  };



  $.post(the_theme.url + '/wp-admin/admin-ajax.php', data, function(response) {

    response = JSON.parse(response);
    
    console.log(response);

    $("#form-results").hide(0);

    $(".formpwrap").fadeOut(function(){
      form_results.append( response );
      setTimeout(function(){
        $("#form-results").fadeIn();
      },600);
    });

    $(form).each(function() {
      this.reset();
    });

    form.find('.btn').prop('disabled', false);

    if (response.type == 'success') {
      // window.location.href = the_theme.url + '/thank-you';
    }

  });
});
// form

// Load Images Async switch src attribute with data-lazysrc
// ---------------------------------------------------------------------------------------------------
function ReLoadImages() {
  $("img[data-lazysrc]").each(function() {
    $(this).attr("src", $(this).attr("data-lazysrc"));
  });
}
document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "interactive") {
    //or at "complete" if you want it to execute in the most last state of window.
    ReLoadImages();
  }
});

// scroll to
// ---------------------------------------------------------------------------------------------------
$("[data-scroll-to]").click(function(e) {
  var $this = $(this),
    $toElement = $this.attr("data-scroll-to"),
    $focusElement = $this.attr("data-scroll-focus"),
    $offset = $this.attr("data-scroll-offset") * 1 || 0,
    $speed = $this.attr("data-scroll-speed") * 1 || 500;

  e.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $($toElement).offset().top + $offset,
    },
    $speed
  );

  if ($focusElement) $($focusElement).focus();
});


document.onscroll = function() {
  if (window.innerHeight + window.scrollY > document.body.clientHeight) {
      document.getElementById('#button-hide').style.display='none';
  }
}

// Membership page tabs
function setupTabs () {
  document.querySelectorAll(".tabs__button").forEach(button => {
    button.addEventListener('click', () => {
      const sideBar = button.parentElement;
      const tabsContainer = sideBar.parentElement;
      const tabNumber = button.dataset.forTab;
      const tabToActivate = tabsContainer.querySelector(`.tabs__content[data-tab="${tabNumber}"]`);


      // console.log(sideBar);
      // console.log(tabsContainer);
      // console.log(tabNumber);
      // console.log(tabToActivate);
      sideBar.querySelectorAll(".tabs__button").forEach(button => {
        button.classList.remove("tabs__button--active");
      })

      tabsContainer.querySelectorAll(".tabs__content").forEach(tab => {
        tab.classList.remove("tabs__content--active");
      })

      button.classList.add("tabs__button--active");
      tabToActivate.classList.add("tabs__content--active");

    })
  })
}

document.addEventListener('DOMContentLoaded', () => {
  setupTabs();

  // document.querySelectorAll(".tabs").forEach(tabsContainer => {
  //   tabsContainer.querySelector(".tabs__sidebar .tabs__button").click();
  // })
})
