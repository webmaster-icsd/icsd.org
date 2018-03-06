$(function () {
  'use strict'

  $('[data-toggle="offcanvas"]').on('click', function () {
    $('.offcanvas-collapse').toggleClass('open');
    $('#offcanvas-collapse-menu-false').toggleClass('d-none');
    $('#offcanvas-collapse-menu-true').toggleClass('d-none');
  })
})
