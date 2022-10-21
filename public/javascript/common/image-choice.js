function switchBigImage(imageId) {
  let prevImageId = localStorage.getItem("shop-item-big-image-id")
  $("#big-image").attr("src", $("#" + imageId).children("img").attr("src"))
  $("#" + prevImageId).css("border-style", "double")
  $("#" + imageId).css("border-style", "solid")
  localStorage.setItem("shop-item-big-image-id", imageId)
}

function enableImageChoice(imageChoiceClassName, imageChoiceElementClassName) {
  let firstImageId = $("." + imageChoiceClassName).children("." + imageChoiceElementClassName)[0].id
  localStorage.setItem("shop-item-big-image-id", firstImageId)
  $("#" + firstImageId).css("border-style", "solid")
}