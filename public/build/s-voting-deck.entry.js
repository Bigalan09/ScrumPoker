import { r as registerInstance, h, f as Host } from './index-7303f0d4.js';

const sVotingDeckCss = "";

const SVotingDeck = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._sequence = [
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
      { key: '☕', checked: false }
    ];
  }
  selectedHandler(data) {
    this._sequence.forEach((_, index, theArray) => {
      let card = theArray[index];
      card.checked = false;
      if (data.detail.value == card.key) {
        card.checked = true;
        this.value = card.key;
      }
      theArray[index] = card;
    });
  }
  render() {
    return (h(Host, { value: this.value }, h("form", null, h("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-2 mb-3" }, this._sequence.map((val) => h("s-voting-card", { key: val.key, value: val.key, onSelected: this.selectedHandler.bind(this), checked: val.checked }))))));
  }
};
SVotingDeck.style = sVotingDeckCss;

export { SVotingDeck as s_voting_deck };
