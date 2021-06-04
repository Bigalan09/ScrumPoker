import { Component, h, Host, Prop, Element, getAssetPath } from '@stencil/core';

@Component({
  tag: 's-avatar',
  styleUrl: 's-avatar.css',
  assetsDirs: ['assets'],
  shadow: true,
})
export class SAvatar {
  @Element() hostElement: HTMLElement;
  
  private avatars: string[] = [
    'bear-1358183.svg',
    'bird-1358182.svg',
    'buffalo-1358181.svg',
    'cat-1358180.svg',
    'cow-1358179.svg',
    'deer-1358178.svg',
    'dog-1358177.svg',
    'elepant-1358164.svg',
    'fox-1358176.svg',
    'giraffe-1358175.svg',
    'goat-1358174.svg',
    'gorilla-1358173.svg',
    'hippopotamus-1358172.svg',
    'horse-1358171.svg',
    'husky-dog-1358170.svg',
    'koala-1358169.svg',
    'lion-1358163.svg',
    'monkey-1358168.svg',
    'panda-1358167.svg',
    'pig-1358162.svg',
    'rabbit-1358161.svg',
    'rhino-1358166.svg',
    'snake-1358165.svg',
    'tiger-1358160.svg',
    'walrus-1358159.svg'
  ];

  @Prop() online: boolean = false;
  @Prop() avatar?: number = 0;
  @Prop() random?: boolean = null;

  render() {
    if (this.random == true) {
      this.avatar = this.getRandomAvatar();
    }
    let avatarPath = getAssetPath(`./assets/svg/${this.getAvatarPath(this.avatar)}`);

    return (
        <Host>
        <div class='icon-container'>
            <img src={avatarPath} />
            <div class={this.getCssClassMap()}>
            </div>
        </div>
        </Host>
    );
  }

  getAvatarPath(id: number) {
    return this.avatars[id];
  }

  getCssClassMap() {
    const classes = ['status-circle'];
    if (this.online == true) {
      classes.push('status-circle--online');
    }
    return classes.join(' ');
  }

  getRandomAvatar() {
    const max = this.avatars.length;
    return Math.floor(Math.random() * max);
  }
}