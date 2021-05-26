import { Component, h, Host, Prop } from '@stencil/core';
import { InputChangeEventDetail } from '../s-voting-card/s-voting-card'

@Component({
  tag: 's-voting-deck',
  styleUrl: 's-voting-deck.css',
  shadow: false,
})
export class SVotingDeck {

  _sequence: any[] = [
    { key: '0', checked: false },
    { key: '0.5', checked: false },
    { key: '1', checked: false },
    { key: '2', checked: false },
    { key: '3', checked: false },
    { key: '5', checked: false },
    { key: '8', checked: false },
    { key: '13', checked: false },
    { key: '20', checked: false },
    { key: '40', checked: false },
    { key: '?', checked: false },
    { key: '☕', checked: false }];

  @Prop({ reflect: true, mutable: true }) value?: string;

  selectedHandler(data: CustomEvent<InputChangeEventDetail>) {
    this._sequence.forEach((_, index, theArray) => {
      let card = theArray[index];
      card.checked = false;
      if (data.detail.value == card.key) {
        card.checked = true;
        this.value = card.key
      }
      theArray[index] = card;
    });
  }

  render() {
    return (
      <Host value={this.value}>
        <form>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
            {this._sequence.map((val) =>
              <s-voting-card key={val.key} value={val.key} onSelected={this.selectedHandler.bind(this)} checked={val.checked}></s-voting-card>
            )}
          </div>
        </form>
      </Host>
    );
  }

}
