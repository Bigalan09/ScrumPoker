import { Component, h } from '@stencil/core';

@Component({
  tag: 's-dashboard',
  styleUrl: 's-dashboard.css',
  shadow: false,
})
export class SDashboard {

  render() {
    return (
      <div class="flex flex-wrap mt-4">
        <div class="w-full md:w-1/6 px-1">
          <h2 class="text-xl font-semibold">Players</h2>
          <ul class="list-inside list-disc">
            <li>Alan</li>
          </ul>
        </div>
        <div class="w-full md:flex-1 px-1">
          <s-voting-deck></s-voting-deck>
        </div>
        <div class="w-full md:w-1/5 px-1">
          <s-button appearance="primary">Start Voting</s-button>
          <s-button appearance="secondary">Finish Voting</s-button>
        </div>
      </div>
    );
  }

}
