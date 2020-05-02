export default (cb) => window.addEventListener(`load`, () => {
  document.body.classList.add(`content-ready`);
  if (cb) {
    cb();
  }
});
