import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 's-button',
  styleUrl: 's-button.css',
  shadow: false,
})
export class SButton {

  @Prop() appearance: string;
  @Prop() buttontype: string;

  render() {
    return (
      <button class={`btn ${this.appearance}`} type={this.buttontype}>
        <slot></slot>
      </button>
    );
  }

}