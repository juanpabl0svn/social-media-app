const STYLES = {
  good: "linear-gradient(to right, #00b09b, #96c93d)",
  bad: "linear-gradient(to right, #ff5f6d, #ffc371)",
};

$("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const form = e.target;

  const { username, password } = Object.fromEntries(new FormData(form));

  if (!username || !password) {
    Toastify({
      text: "Algo salió mal",
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: STYLES.bad,
      },
      onClick: function () {}, // Callback after click
    }).showToast();
    return;
  }
  Toastify({
    text: "Bienvenido",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: STYLES.good,
    },
    onClick: function () {}, // Callback after click
  }).showToast();
});
