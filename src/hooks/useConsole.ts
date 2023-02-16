function noop() {}
const _console = window.console;

export function useConsole() {
  const isDebug = window.localStorage.getItem('useDebug') === 'true';
  if (process.env.NODE_ENV === 'production' && !isDebug) {
    window.console = {
      log: noop,
      warn: noop,
      error: noop,
      info: noop,
      debug: noop,
      group: noop,
      groupEnd: noop,
    } as typeof window.console;
  } else {
    window.console = _console;
  }
}
