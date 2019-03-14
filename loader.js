async function loadWasm(filename, imports = {}) {
  return fetch(filename)
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.compile(bytes))
    .then(module => {
      const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
      const table = new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' });
      imports.env = {
        abortStackOverflow: () => { throw new Error('overflow'); },
        memoryBase: 0,
        tableBase: 0,
        memory: memory,
        table: table,
        STACKTOP: 0,
        STACK_MAX: memory.buffer.byteLength,
      };
      return WebAssembly.instantiate(module, imports || {})
    })
    .then(instance => instance.exports);
}
