# ft8js

Thanks to [ft8_lib](https://github.com/kgoba/ft8_lib), we can encode/decode in a variety of environments.

This repository compiled the code into WebAssembly (WASM) and created JavaScript code for seamless integration.
　
## Demo

https://e04.github.io/ft8js/example/browser/index.html

or 

`node example/node/encode`

`node example/node/decode`

## Usage

`npm i ft8js`

For code examples, please refer to the `example` directory.

## Development

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
