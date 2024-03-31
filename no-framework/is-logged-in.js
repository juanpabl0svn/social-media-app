const user = localStorage.getItem("user");
if (user) {
  sendTo("/home/home.html");
}
