import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 's-button',
  styleUrl: 's-button.css',
  shadow: true,
})
export class SButton {

  @Prop() appearance;

  render() {
    return (
      <button class={`btn ${this.appearance}`}>
        <slot></slot>
      </button>
    );
  }

}
