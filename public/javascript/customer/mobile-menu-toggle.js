function toggleMobileMenu() {
  $(".mobile-header").toggleClass("temporary-fixed-position")
  $(".mobile-menu-background").toggleClass("display-none")
  if ($(".mobile-menu-background").hasClass("display-none")) {
    $(".mobile-header__menu-button").text("☰ Меню")
  }
  else {
    $(".mobile-header__menu-button").text("✕ Меню")
  }
}

