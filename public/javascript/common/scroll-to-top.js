/* function recursiveAccScrollToTop(y, dy) {
  y = y - dy
  if (y < 0) {
    y = 0
  }
  window.scrollTo(0, y)

  let timer = 0
  if (y > 0) {
    if (dy < 30) {
      dy *= 1.1
    }
    console.log(dy)
    timer = setTimeout(function () { recursiveAccScrollToTop(y, dy) }, 50)
  }
  else {
    clearTimeout(timer)
  }
} */

function scrollToTop() {
  window.scrollTo(0, 0)
}    