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

window.onload = () => {
  const posts = $("#user-posts");
  let i;
  for (i = 1; i <= 4; i++) {
    const image = `<img src='assets/post${i}.jpg'/>`;
    posts.insertAdjacentHTML("beforeend", image);
  }

  $("#posts-number").innerText = i - 1;

  if (i != 0) $("#first-post").style.display = "none";

  $("#friends-number").innerText = Math.floor(Math.random() * 1000);

  const userImage = $("#user-image");
  userImage.src = "assets/user_logged_in.jpg";
};
