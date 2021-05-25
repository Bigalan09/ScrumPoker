import { r as registerInstance, h } from './index-6f8e20e2.js';

const sDashboardCss = ":host{display:block}";

const SDashboard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.loggedin = false;
  }
  joinCompletedEventHandler(event) {
    this.loggedin = event.detail;
  }
  render() {
    return (h("div", null, this.loggedin ?
      h("div", { class: "flex flex-wrap mt-4" }, h("div", { class: "w-full md:w-1/6 px-1" }, h("h2", { class: "text-xl font-semibold" }, "Players"), h("ul", { class: "list-inside list-disc" }, h("li", null, "Alan"))), h("div", { class: "w-full md:flex-1 px-1" }, h("s-voting-deck", null)), h("div", { class: "w-full md:w-1/5 px-1" }, h("s-button", { appearance: "primary" }, "Start Voting"), h("s-button", { appearance: "secondary" }, "Finish Voting")))
      :
        h("div", { class: "flex flex-wrap mt-4" }, h("div", { class: "w-full md:flex-1 px-1" }, h("s-login", null)))));
  }
};
SDashboard.style = sDashboardCss;

export { SDashboard as s_dashboard };
