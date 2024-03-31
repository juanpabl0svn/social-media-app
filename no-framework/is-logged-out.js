const user = localStorage.getItem("user");
if (!user) {
  sendTo("/login/login.html");
}
