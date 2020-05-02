import {SCREEN_ID} from '../constants';

export default () => {
  const lastRulesItem = document.getElementById(`last-rules-item`);
  const rulesLink = document.querySelector(`.rules__link`);

  document.body.addEventListener(`screenChanged`, ({detail}) => {
    if (detail.screenId !== SCREEN_ID.rules) {
      rulesLink.classList.remove(`rules__link-ready`);
    }
  });

  lastRulesItem.addEventListener(`animationend`, () => {
    rulesLink.classList.add(`rules__link-ready`);
  });
};
