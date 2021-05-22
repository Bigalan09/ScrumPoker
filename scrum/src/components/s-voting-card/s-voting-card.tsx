import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 's-voting-card',
  styleUrl: 's-voting-card.css',
  shadow: true,
})
export class SVotingCard {

  @Prop() value: string;

  render() {
    return (
      <div>{this.value}</div>
    );
  }

}
