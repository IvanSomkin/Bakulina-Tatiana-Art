let initial_time = new Date().getTime()

$(window).on('load', function () {
  let write_element = document.getElementById("client-load-time")

  let full_load_time = new Date().getTime()

  let client_load_time = (full_load_time - initial_time)

  write_element.innerHTML += client_load_time + ' ms'
})
