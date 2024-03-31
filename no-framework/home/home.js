function logOut() {
  Swal.fire({
    title: "¿Estás seguro que deseas cerrar sesión?",
    showCancelButton: true,
    confirmButtonText: "Si",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      localStorage.removeItem("user");
      sendTo("/login/login.html");
    }
  });
}
