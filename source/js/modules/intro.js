import {createTextAnimation} from "./animation-text";

export default () => {
  createTextAnimation({selector: `.intro__title`});
  createTextAnimation({selector: `.intro__date`, animationDelay: 1});
};
