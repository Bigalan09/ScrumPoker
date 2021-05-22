import { Component, h } from '@stencil/core';

@Component({
  tag: 's-voting-deck',
  styleUrl: 's-voting-deck.css',
  shadow: true,
})
export class SVotingDeck {

  private _sequence: string[] = ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40'];

  render() {
    const items = [];
    for (const [index, value] of this._sequence.entries()) {
      items.push(<s-voting-card key={index} value={value}></s-voting-card>);
    }
    return (
      <div class="voting-deck">
        {items}
      </div>
    );
  }

}
