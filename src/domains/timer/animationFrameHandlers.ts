export function runEachAnimationFrame(callback: () => void): () => void {
  let id = 0;
  run();
  return () => cancelAnimationFrame(id);

  function run() {
    callback();
    id = requestAnimationFrame(() => run());
  }
}