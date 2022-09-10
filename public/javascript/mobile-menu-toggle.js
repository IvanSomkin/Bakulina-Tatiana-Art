function toggleMobileMenu()
{
  $("#mobile-header").toggleClass("menu-fixed-header")
  $("#mobile-menu-background").toggleClass("display-none-default")
  if ($("#mobile-menu-background").hasClass("display-none-default"))
  {
    $("#mobile-header__menu-button").text("☰ Меню")
  }
  else
  {
    $("#mobile-header__menu-button").text("✕ Меню")
  }
}
  
  