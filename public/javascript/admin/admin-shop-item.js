$(function () {
  $(".admin-shop-item-form__image-choice").sortable()
})

shopItemData = new FormData($('.admin-shop-item-form')[0])

$(".admin-shop-item-form").on("submit", function (e) {
  e.preventDefault()
})