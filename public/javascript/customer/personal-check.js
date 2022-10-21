button = $(".personal-submit-button")[0]
personalCheck = $(".personal-check")[0]

if (!personalCheck.checked) {
  button.setAttribute("disabled", true)
}

personalCheck.addEventListener("change", function () {
  if (this.checked) {
    button.removeAttribute("disabled")
  }
  else {
    button.setAttribute("disabled", true)
  }
})