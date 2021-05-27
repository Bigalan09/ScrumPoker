import { r as registerInstance, f as createEvent, h, e as Host } from './index-9c17f99b.js';

const sVotingCardCss = ".card input[type=radio]{height:0;visibility:hidden;width:0}.card input[type=radio]:checked+label:after{transform:scale(4.2)}.card label{align-items:center;background:#fff;border:0.3rem solid #000;border-radius:0.4rem;box-shadow:0 3px 0 0 #000;color:#000;cursor:pointer;display:flex;font-family:\"Lato\", sans-serif;font-size:2.5rem;height:14rem;justify-content:center;letter-spacing:0.04rem;outline:none;overflow:hidden;position:relative;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%}.card label::after{background:radial-gradient(circle at center, #fff 24%, #000 25%, #000 100%);content:\"\";height:100%;left:-1px;right:-1px;mix-blend-mode:difference;position:absolute;top:0;transform:scale(0);transition:transform 0.3s ease-in;width:101%}.card label:active{box-shadow:none;top:2px}";

const SVotingCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selected = createEvent(this, "selected", 7);
    this.checked = false;
    this.value = '?';
    this.handleCheckChange = (event) => {
      this.checked = event.target.checked;
      this.emitChange();
    };
  }
  emitChange() {
    this.selected.emit({ value: this.value, checked: this.checked });
  }
  render() {
    return (h(Host, null, h("div", { class: "card" }, h("input", { type: "radio", name: "vote", id: this.value, onChange: this.handleCheckChange, value: this.value, checked: this.checked, disabled: this.disabled }), h("label", { htmlFor: this.value }, this.value))));
  }
};
SVotingCard.style = sVotingCardCss;

export { SVotingCard as s_voting_card };
