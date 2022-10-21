let initialTime = new Date().getTime()

$(window).on("load", function () {
  let writeElement = $(".client-load-time")[0]

  let fullLoadTime = new Date().getTime()

  let clientLoadTime = (fullLoadTime - initialTime)

  writeElement.innerHTML += clientLoadTime + " ms"
})
