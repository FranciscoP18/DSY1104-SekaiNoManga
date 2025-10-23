export function mockFetchOk(data, delayMs = 0) {
  global.fetch = jasmine.createSpy("fetch").and.returnValue(
    Promise.resolve({
      ok: true,
      json: () => new Promise(res => setTimeout(() => res(data), delayMs)),
    })
  );
}
export function mockFetchError(status = 500) {
  global.fetch = jasmine.createSpy("fetch").and.returnValue(
    Promise.resolve({ ok: false, status, json: () => Promise.resolve({}) })
  );
}
export function restoreFetch() {
  if (global.fetch) delete global.fetch;
}
