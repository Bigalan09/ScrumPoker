import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 's-voting-card',
  styleUrl: 's-voting-card.css',
  shadow: false,
})
export class SVotingCard {

  @Prop() value: string;

  render() {
    return (
      <div class="card">
        <input type="radio" name="card" id={this.value} /><label htmlFor={this.value}>{this.value}</label>
      </div>
    );
  }

}
