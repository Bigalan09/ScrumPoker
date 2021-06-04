import { Component, h, Host, Prop, Element } from '@stencil/core';

@Component({
  tag: 's-avatar',
  styleUrl: 's-avatar.css',
  shadow: false,
})
export class SAvatar {
  @Element() hostElement: HTMLElement;

  @Prop() online: boolean = false;

  render() {
    return (
        <Host>
        <div class='icon-container'>
            <img src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png" />
            <div class={this.getCssClassMap()}>
            </div>
        </div>
        </Host>
    );
  }

  getCssClassMap() {
    const classes = ['status-circle'];
    if (this.online == true) {
      classes.push('status-circle--online');
    }
    return classes.join(' ');
  }
}