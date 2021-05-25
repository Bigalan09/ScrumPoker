import { r as registerInstance, h } from './index-6f8e20e2.js';

const sButtonCss = ":host{display:block}.btn{border-radius:0.25rem;border-width:0px;font-weight:700;margin-top:0.25rem;margin-bottom:0.25rem;padding-top:0.5rem;padding-bottom:0.5rem;padding-left:1rem;padding-right:1rem;--tw-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);text-transform:uppercase;width:100%}.btn.primary{--tw-bg-opacity:1;background-color:rgba(239, 68, 68, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.btn.primary:hover{--tw-bg-opacity:1;background-color:rgba(185, 28, 28, var(--tw-bg-opacity))}.btn.secondary{--tw-bg-opacity:1;background-color:rgba(16, 185, 129, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.btn.secondary:hover{--tw-bg-opacity:1;background-color:rgba(4, 120, 87, var(--tw-bg-opacity))}";

const SButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("button", { class: `btn ${this.appearance}` }, h("slot", null)));
  }
};
SButton.style = sButtonCss;

export { SButton as s_button };
