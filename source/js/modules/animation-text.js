export const createTextAnimation = ({selector, animationDelay = 0, symbolMaxAnimationDuration = 0.6}) => {
  try {
    const element = document.querySelector(selector);
    const content = element.textContent.trim().split(` `).reduce((rootFragment, word) => {
      const wordElement = document.createElement(`span`);
      const wordContent = [...word].reduce((wordFragment, symbol) => {
        const symbolElement = document.createElement(`span`);

        symbolElement.textContent = symbol;
        symbolElement.style.animationDelay = `${animationDelay}s`;
        symbolElement.style.animationDuration = `${Math.random() * symbolMaxAnimationDuration}s`;
        symbolElement.classList.add(`animation-text__symbol`);
        wordFragment.append(symbolElement);
        return wordFragment;
      }, document.createDocumentFragment());

      wordElement.append(wordContent);
      wordElement.classList.add(`animation-text__word`);
      rootFragment.append(wordElement);
      return rootFragment;
    }, document.createDocumentFragment());

    element.style.opacity = `1`;
    element.textContent = ``;
    element.append(content);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`TextAnimation warning: wrong selector`);
  }
};
