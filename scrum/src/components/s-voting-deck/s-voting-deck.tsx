import { Component, h } from '@stencil/core';

@Component({
  tag: 's-voting-deck',
  styleUrl: 's-voting-deck.css',
  shadow: false,
})
export class SVotingDeck {

  private _sequence: string[] = ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40'];

  render() {
    return (
      <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
        {this._sequence.map((val) =>
          <s-voting-card key={val} value={val}></s-voting-card>
        )}
      </div>
    );
  }

}
