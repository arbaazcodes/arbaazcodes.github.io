import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          loading?: string;
          "loading-anim-type"?: string;
          unloadable?: string;
          eventsTarget?: string;
        },
        HTMLElement
      >;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          loading?: string;
          "loading-anim-type"?: string;
          unloadable?: string;
          eventsTarget?: string;
        },
        HTMLElement
      >;
    }
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string;
          loading?: string;
          "loading-anim-type"?: string;
          unloadable?: string;
          eventsTarget?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};

