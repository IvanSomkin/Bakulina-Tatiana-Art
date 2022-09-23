var initial_time = new Date().getTime();

$(document).ready(function () {
  var write_element = document.getElementById("client-load-time");

  var full_load_time = new Date().getTime();

  var client_load_time = (full_load_time - initial_time)

  write_element.innerHTML += client_load_time + ' ms';
})
