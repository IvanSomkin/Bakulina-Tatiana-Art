function signoutAjax() {
  return new Promise(function () {
    $.ajax({
      url: '/auth/signout',
      type: 'POST',
      contentType: 'application/json',
      success: function () {
        location.href = "/administrator/login"
      }
    })
  })
}

async function signout() {
  await signoutAjax()
}