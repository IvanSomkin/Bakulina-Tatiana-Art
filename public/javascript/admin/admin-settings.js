const socket = io()

/* Rename */

function renameAdmin() {
  let adminUuid = document.querySelector("meta[name='adminUuid']").content

  let renameAdminDto = {
    adminUuid: adminUuid,
    formData: {
      newName: $(".new-name")[0].value
    }
  }

  socket.emit("renameAdmin", renameAdminDto)
}

$(".rename-admin-form").on("submit", function (e) {
  e.preventDefault()
  renameAdmin()
})

socket.on("renameSuccess", (renameSuccess) => {
  $(".admin__header__name").text(renameSuccess.newName)
  toastr.info("Пользователь '" + renameSuccess.oldName + "' переименовался в '" + renameSuccess.newName + "'")
})

/* Sign up */

function signUpAdmin() {
  let signerUuid = document.querySelector("meta[name='adminUuid']").content

  let signUpAdminDto = {
    signerUuid: signerUuid,
    formData: {
      signedEmail: $(".signed-email")[0].value,
      signedPassword: $(".signed-password")[0].value,
      signedName: $(".signed-name")[0].value,
    }
  }
  socket.emit("signUpAdmin", signUpAdminDto)
}

$(".sign-up-admin-form").on("submit", function (e) {
  e.preventDefault()
  signUpAdmin()
})

socket.on("signUpSuccess", (signUpSuccess) => {
  toastr.success("Администратор '" + signUpSuccess.signerName +
    "' успешно создал администратора с именем '" + signUpSuccess.signedName + "'")
})

socket.on("signUpError", () => {
  toastr.error("Возникла проблема при регистрации администратора")
})

/* Delete */

function deleteAdmin() {
  let deleterUuid = document.querySelector("meta[name='adminUuid']").content
  let formData = new FormData($(".delete-admin-form")[0])

  let deleteAdminDto = {
    deleterUuid: deleterUuid,
    formData: {
      deletedUuid: $(".deleted-uuid")[0].value
    }
  }
  socket.emit("deleteAdmin", deleteAdminDto)
}

$(".delete-admin-form").on("submit", function (e) {
  e.preventDefault()
  deleteAdmin()
})

socket.on("deleteSuccess", (deleteSuccess) => {
  toastr.success("Администратор '" + deleteSuccess.deleterName +
    "' успешно удалил администратора с именем '" + deleteSuccess.deletedName + "'")
})

socket.on("deleteError", () => {
  toastr.error("Возникла проблема при удалении администратора")
})
