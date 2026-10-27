// Toggle the mobile navigation menu
$(function () {
    const $toggle = $('#mobile-nav-toggle');
    const $menu = $('#mobile-nav');
    const $icon = $toggle.find('i');

    $toggle.on('click', function () {
        const opening = !$menu.is(':visible');
        $menu.stop(true, true).slideToggle(250);
        $toggle.attr('aria-expanded', String(opening));
        $icon.toggleClass('fa-bars', !opening).toggleClass('fa-times', opening);
    });
});
