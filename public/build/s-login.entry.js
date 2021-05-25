import { r as registerInstance, e as createEvent, h } from './index-6f8e20e2.js';

const sLoginCss = ":host{display:block}";

const SLogin = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.joinCompleted = createEvent(this, "joinCompleted", 7);
  }
  join() {
    this.joinCompleted.emit(true);
  }
  render() {
    return (h("s-button", { onClick: this.join.bind(this) }, "Join"));
  }
};
SLogin.style = sLoginCss;

export { SLogin as s_login };
