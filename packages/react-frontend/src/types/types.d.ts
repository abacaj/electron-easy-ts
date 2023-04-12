export {};

declare global {
  interface Window {
    electron: {
      send: <T>(channel: string, args?: T) => void;
      receive: (channel: string, cb: (...args: any[]) => void) => void;
      remove: (channel: string) => void;
    };
  }
}
