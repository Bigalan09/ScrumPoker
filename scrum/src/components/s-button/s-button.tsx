import { Component, h, Host, Prop, Listen, Element } from '@stencil/core';
import { hasShadowDom } from '../../utils/utils';

@Component({
  tag: 's-button',
  styleUrl: 's-button.css',
  shadow: true,
})
export class SButton {
  @Element() hostElement: HTMLElement;

  @Prop() size?: 'small' | 'large' = 'large';
  @Prop() variant?: string = 'primary';
  @Prop() disabled?: boolean = false;
  @Prop() type?: 'reset' | 'submit' | 'button';
  @Prop() ariaLabel: string;

  @Listen('click', { capture: true })
  handleHostClick(event: Event) {
    if (this.disabled === true) {
      event.stopImmediatePropagation();
    }
  }

  /**
   * Hack to make the button behave has expected when inside forms.
   * @see https://github.com/ionic-team/ionic-framework/blob/master/core/src/components/button/button.tsx#L155-L175
   */
  handleClick = (ev: Event) => {
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

  render() {
    return (
      <Host>
        <button
          class={this.getCssClassMap()}
          onClick={this.handleClick}
          disabled={this.disabled}
          type={this.type}
          aria-label={this.ariaLabel}
        >
          <slot />
        </button>
      </Host>
    );
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
}