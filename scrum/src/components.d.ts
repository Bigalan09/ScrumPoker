/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SButton {
        "appearance": any;
    }
    interface SVotingCard {
        "value": string;
    }
    interface SVotingDeck {
    }
}
declare global {
    interface HTMLSButtonElement extends Components.SButton, HTMLStencilElement {
    }
    var HTMLSButtonElement: {
        prototype: HTMLSButtonElement;
        new (): HTMLSButtonElement;
    };
    interface HTMLSVotingCardElement extends Components.SVotingCard, HTMLStencilElement {
    }
    var HTMLSVotingCardElement: {
        prototype: HTMLSVotingCardElement;
        new (): HTMLSVotingCardElement;
    };
    interface HTMLSVotingDeckElement extends Components.SVotingDeck, HTMLStencilElement {
    }
    var HTMLSVotingDeckElement: {
        prototype: HTMLSVotingDeckElement;
        new (): HTMLSVotingDeckElement;
    };
    interface HTMLElementTagNameMap {
        "s-button": HTMLSButtonElement;
        "s-voting-card": HTMLSVotingCardElement;
        "s-voting-deck": HTMLSVotingDeckElement;
    }
}
declare namespace LocalJSX {
    interface SButton {
        "appearance"?: any;
    }
    interface SVotingCard {
        "value"?: string;
    }
    interface SVotingDeck {
    }
    interface IntrinsicElements {
        "s-button": SButton;
        "s-voting-card": SVotingCard;
        "s-voting-deck": SVotingDeck;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "s-button": LocalJSX.SButton & JSXBase.HTMLAttributes<HTMLSButtonElement>;
            "s-voting-card": LocalJSX.SVotingCard & JSXBase.HTMLAttributes<HTMLSVotingCardElement>;
            "s-voting-deck": LocalJSX.SVotingDeck & JSXBase.HTMLAttributes<HTMLSVotingDeckElement>;
        }
    }
}
