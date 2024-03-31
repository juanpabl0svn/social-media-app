const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const sendTo = (url) => {
  const domain = window.location.pathname
    .split("/")
    .slice(0, this.length - 2)
    .join("/");
  window.location.href = domain + url;
};
