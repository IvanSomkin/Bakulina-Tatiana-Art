var first_image_id = $(".item__mini-image-choice")[0].getElementsByClassName("item__mini-image-choice__mini-image")[0].id
localStorage.setItem('product-big-image-id', first_image_id);
$("#" + first_image_id)[0].style.borderStyle = "solid";

function switchBigImage(image_id)
{
  var prev_image_id = localStorage.getItem('product-big-image-id');
  $("#big-image")[0].src = $("#" + image_id)[0].getElementsByTagName("img")[0].src;
  $("#" + prev_image_id)[0].style.borderStyle = "double";
  $("#" + image_id)[0].style.borderStyle = "solid";
  localStorage.setItem('product-big-image-id', image_id);
}