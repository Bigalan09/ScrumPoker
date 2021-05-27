import { r as registerInstance, h, e as Host, g as getElement } from './index-9c17f99b.js';

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
const hasShadowDom = (el) => {
  return !!el.shadowRoot && !!el.attachShadow;
};

const sButtonCss = ".button{border-radius:0.25rem;border-width:0px;font-weight:700;margin-top:0.25rem;margin-bottom:0.25rem;padding-top:0.5rem;padding-bottom:0.5rem;padding-left:1rem;padding-right:1rem;--tw-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);text-transform:uppercase;width:100%}.button--primary{--tw-bg-opacity:1;background-color:rgba(239, 68, 68, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.button--primary:hover{--tw-bg-opacity:1;background-color:rgba(185, 28, 28, var(--tw-bg-opacity))}.button--secondary{--tw-bg-opacity:1;background-color:rgba(16, 185, 129, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.button--secondary:hover{--tw-bg-opacity:1;background-color:rgba(4, 120, 87, var(--tw-bg-opacity))}.button--tertiary{--tw-bg-opacity:1;background-color:rgba(99, 102, 241, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.button--tertiary:hover{--tw-bg-opacity:1;background-color:rgba(67, 56, 202, var(--tw-bg-opacity))}.button--disabled{--tw-bg-opacity:1;background-color:rgba(107, 114, 128, var(--tw-bg-opacity))}.button--disabled:hover{--tw-bg-opacity:1;background-color:rgba(75, 85, 99, var(--tw-bg-opacity))}";

const SButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'large';
    this.variant = 'primary';
    this.disabled = false;
    /**
     * Hack to make the button behave has expected when inside forms.
     * @see https://github.com/ionic-team/ionic-framework/blob/master/core/src/components/button/button.tsx#L155-L175
     */
    this.handleClick = (ev) => {
      // No need to check for `disabled` because disabled buttons won't emit clicks
      if (hasShadowDom(this.hostElement)) {
        const form = this.hostElement.closest('form');
        if (form) {
          ev.preventDefault();
          const fakeButton = document.createElement('button');
          if (this.type) {
            fakeButton.type = this.type;
          }
          fakeButton.style.display = 'none';
          form.appendChild(fakeButton);
          fakeButton.click();
          fakeButton.remove();
        }
      }
    };
  }
  handleHostClick(event) {
    if (this.disabled === true) {
      event.stopImmediatePropagation();
    }
  }
  render() {
    return (h(Host, null, h("button", { class: this.getCssClassMap(), onClick: this.handleClick, disabled: this.disabled, type: this.type, "aria-label": this.ariaLabel }, h("slot", null))));
  }
  getCssClassMap() {
    const classes = ['button'];
    if (this.disabled == true) {
      classes.push('button--disabled');
    }
    if (this.variant) {
      classes.push(`button--${this.variant}`);
    }
    if (this.size) {
      classes.push(`button--${this.size}`);
    }
    return classes.join(' ');
  }
  get hostElement() { return getElement(this); }
};
SButton.style = sButtonCss;

export { SButton as s_button };
