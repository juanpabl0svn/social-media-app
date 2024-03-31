const user = localStorage.getItem("user");
if (user) {
  const domain = window.location.pathname
    .split("/")
    .slice(0, this.length - 2)
    .join("/");
  window.location.href = domain + "/home/home.html";
}
