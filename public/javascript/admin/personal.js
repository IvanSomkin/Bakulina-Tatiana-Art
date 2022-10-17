const socket = io('http://localhost:3000')

/* Rename */

function renameAdmin() {
  let admin_uuid = document.querySelector('meta[name="admin_uuid"]').content

  let renameAdminDto = {
    admin_uuid: admin_uuid,
    form_data: {
      new_name: $('#new_name')[0].value
    }
  }

  console.log(renameAdminDto)
  socket.emit('renameAdmin', renameAdminDto)
}

$('#rename-admin-form').on("submit", function (e) {
  e.preventDefault()
  renameAdmin()
})

socket.on('renameSuccess', (renameSuccess) => {
  $('#admin-name').text(renameSuccess.new_name)
  toastr.info("Пользователь '" + renameSuccess.old_name + "' переименовался в '" + renameSuccess.new_name + "'")
})

/* Sign up */

function signUpAdmin() {
  let signer_uuid = document.querySelector('meta[name="admin_uuid"]').content

  let signUpAdminDto = {
    signer_uuid: signer_uuid,
    form_data: {
      signed_email: $('#signed_email')[0].value,
      signed_password: $('#signed_password')[0].value,
      signed_name: $('#signed_name')[0].value,
    }
  }
  socket.emit('signUpAdmin', signUpAdminDto)
}

$('#sign-up-admin-form').on("submit", function (e) {
  e.preventDefault()
  signUpAdmin()
})

socket.on('signUpSuccess', (signUpSuccess) => {
  toastr.info("Администратор '" + signUpSuccess.creator_name +
    "' успешно создал администратора с именем '" + signUpSuccess.created_name + "'")
})

/* Delete */

function deleteAdmin() {
  let deleter_uuid = document.querySelector('meta[name="admin_uuid"]').content
  let form_data = new FormData($('#delete-admin-form')[0])

  let deleteAdminDto = {
    deleter_uuid: deleter_uuid,
    form_data: {
      deleted_uuid: $('#deleted_uuid')[0].value
    }
  }
  socket.emit('deleteAdmin', deleteAdminDto)
}

$('#delete-admin-form').on("submit", function (e) {
  e.preventDefault()
  deleteAdmin()
})

socket.on('deleteSuccess', (deleteSuccess) => {
  toastr.info("Администратор '" + deleteSuccess.deleter_name +
    "' успешно удалил администратора с именем '" + deleteSuccess.deleted_name + "'")
})