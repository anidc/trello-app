import "@testing-library/jest-dom";

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      media: query,
      matches: false,
      onchange: null,

      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList);
}

if (!window.ResizeObserver) {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
}

import { TextEncoder, TextDecoder } from "util";
if (!globalThis.TextEncoder) {
  Object.assign(globalThis, { TextEncoder, TextDecoder });
}

jest.mock("../utils/axios");
