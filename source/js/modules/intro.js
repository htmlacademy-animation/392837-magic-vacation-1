import {createTextAnimation} from "./animation-text";

export default () => {
  createTextAnimation({selector: `.intro__title`, symbolMaxAnimationDuration: 1});
  createTextAnimation({selector: `.intro__date`, animationDelay: 1});
};
