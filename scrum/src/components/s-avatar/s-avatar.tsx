import { Component, h, Host, Prop, Element } from '@stencil/core';

@Component({
  tag: 's-avatar',
  styleUrl: 's-avatar.css',
  shadow: true,
})
export class SAvatar {
  @Element() hostElement: HTMLElement;

  @Prop() online: boolean = false;

  render() {
    let onlineClass = 'status-circle';
    if (this.online) {onlineClass += 'status-circle--online'; }
    return (
        <Host>
        <div class='icon-container'>
            <img src="https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png" />
            <div class={onlineClass}>
            </div>
        </div>
        </Host>
    );
  }
}