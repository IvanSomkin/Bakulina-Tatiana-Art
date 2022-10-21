async function signInAjax() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "/auth/signin",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        "formFields": [
          {
            "id": "email",
            "value": $("#email").val(),
          },
          {
            "id": "password",
            "value": $("#password").val(),
          }
        ]
      }),
      success: function (response) {
        if (response.status == "FIELD_ERROR") {
          for (let i = 0; i < response.formFields.length; i++) {
            $("#" + response.formFields[i].id + "-error").text(response.formFields[i].error)
          }
          return
        }
        if (response.status == "WRONG_CREDENTIALS_ERROR") {
          $("#password-error").text("Wrong password")
          return
        }
        $("#success").text("Login successful")
        setTimeout(function () {
          location.href = "/administrator"
        }, 500)
      }
    })
  })
}

$(".login-form").on("submit", async function (e) {
  e.preventDefault()
  $("#email-error").text("")
  $("#password-error").text("")
  const result = await signInAjax()
})