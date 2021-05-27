import { r as registerInstance, e as createEvent, h } from './index-9f98b401.js';

const sLoginCss = ":host{display:block}";

const SLogin = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.joinCompleted = createEvent(this, "joinCompleted", 7);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.joining = true;
    this.firebase.auth().signInAnonymously()
      .then(() => {
      // Signed in..
      this.joinCompleted.emit({
        username: this.username,
        roomid: this.roomid,
      });
    })
      .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      this.joining = false;
      // ...
    });
  }
  handleChange(event) {
    this.username = event.target.value;
    if (event.target.validity.typeMismatch) {
      console.log('this element is not valid');
    }
  }
  render() {
    return (h("form", { class: "flex flex-wrap mt-6 justify-center", onSubmit: (e) => this.handleSubmit(e) }, h("div", { class: "w-full md:w-4/6" }, h("div", { class: "bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col" }, h("div", { class: "mb-4" }, h("label", { class: "block text-grey-darker text-sm font-bold mb-2", htmlFor: "username" }, "Name"), h("input", { class: "shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker", autocomplete: "off", id: "username", type: "text", disabled: this.joining, readOnly: this.joining, value: this.username, required: true, onInput: (e) => this.handleChange(e), placeholder: "Your name" })), h("div", { class: "mb-4" }, h("label", { class: "block text-grey-darker text-sm font-bold mb-2", htmlFor: "roomid" }, "Room ID ", h("span", { class: "italic" }, "(Optional)")), h("input", { class: "shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker", id: "roomid", type: "text", value: this.roomid, disabled: this.joining, readOnly: this.joining, onInput: (e) => this.handleChange(e), placeholder: "------" })), h("div", { class: "mb-6" }, h("s-button", { type: "submit", variant: "tertiary", disabled: this.joining }, "Join"))))));
  }
};
SLogin.style = sLoginCss;

export { SLogin as s_login };
