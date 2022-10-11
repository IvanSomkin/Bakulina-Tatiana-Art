$(function() {
  $("#shop-sortable").sortable();
});

/*
$(window).on('load', function () {
  var items = $(".admin__shop__item");
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', editItem(items[i]), false);
  }

  function editItem(item) {
    $(item).find(".admin__shop__item__show").toggle("display-none");
    $(item).find(".admin__shop__item__edit").toggle("display-none");
    $(item).toggle("flex-basis-100");
    const image_folder = './public/assets/pictures/shop/' + item.id;

    const fs = require('fs');
    const image_paths = fs.readdir(image_folder);
    console.log(image_paths);
  }
});
*/