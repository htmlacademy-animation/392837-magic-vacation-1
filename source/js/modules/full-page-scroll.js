import throttle from 'lodash/throttle';

const SCREENS = {
  top: 0,
  story: 1,
  prizes: 2,
};

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.storyOverlay = document.querySelector(`.story__overlay`);

    this.activeScreen = SCREENS.top;
    this.previousScreen = null;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);
    this.storyOverlay.addEventListener(`transitionend`, () => {
      this.removeActiveFlgFromScreen();
      this.addActiveFlgToScreen();
      this.storyOverlay.classList.remove(`story__overlay--active`);
    });

    this.onUrlHashChanged();
    this.changePageDisplay();
  }

  onScroll(evt) {
    this.previousScreen = this.activeScreen;
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.previousScreen = this.activeScreen;
    this.activeScreen = (newIndex < SCREENS.top) ? SCREENS.top : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  addActiveFlgToScreen() {
    this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    this.screenElements[this.activeScreen].classList.add(`active`);
  }

  removeActiveFlgFromScreen() {
    this.screenElements.forEach((screen) => {
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
  }

  changeVisibilityDisplay() {
    if (this.previousScreen === SCREENS.story && this.activeScreen === SCREENS.prizes) {
      this.storyOverlay.classList.add(`story__overlay--active`);
    } else {
      this.removeActiveFlgFromScreen();
      this.addActiveFlgToScreen();
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(SCREENS.top, --this.activeScreen);
    }
  }
}
