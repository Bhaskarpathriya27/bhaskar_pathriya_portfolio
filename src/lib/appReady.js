// Intro animations wait for the page loader to finish — otherwise they play
// out hidden behind it. Anything that subscribes after the loader is gone
// (e.g. the hero planet arriving late on a slow connection) runs immediately.
let ready = false;
const listeners = new Set();

export function markAppReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((cb) => cb());
  listeners.clear();
}

export function onAppReady(cb) {
  if (ready) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
