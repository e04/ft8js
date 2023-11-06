# ft8js

Thanks to [ft8_lib](https://github.com/kgoba/ft8_lib), we can encode/decode in a variety of environments.

I've compiled it into WebAssembly (WASM) and created experimental JavaScript code for seamless integration.

## Build

1. Clone [ft8_lib](https://github.com/kgoba/ft8_lib)

```
git submodule update --init --recursive
```

2. Build

```
npm run build-wasm:encode
npm run build-wasm:decode
npm run build-js
```
