import { r as registerInstance, h } from './index-6f8e20e2.js';

const sVotingDeckCss = ":host{display:block}";

const SVotingDeck = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this._sequence = ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '?', '☕'];
  }
  render() {
    return (h("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-2 mb-3" }, this._sequence.map((val) => h("s-voting-card", { key: val, value: val }))));
  }
};
SVotingDeck.style = sVotingDeckCss;

export { SVotingDeck as s_voting_deck };
