$(".shop-item-order__confirmation")[0].style.display = "none"
$(".shop-item-order-form").on("submit", function (e) {
  e.preventDefault()
  $.ajax({
    url: "/shop/order",
    type: "POST",
    data: $(".shop-item-order-form").serialize(),
    success: function () {
      $(".shop-item-order__form-container")[0].style.display = "none"
      $(".shop-item-order__confirmation")[0].style.display = "flex"
    }
  })
})