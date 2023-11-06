import ___ft8jsDecodeModule___ from "../wasm/decode.js";

const Decoder = await ___ft8jsDecodeModule___();

const _initDecode = Decoder.cwrap("init_decode", "number", [], []);
const _execDecode = Decoder.cwrap(
  "exec_decode",
  "number",
  ["number", "number"],
  { async: true }
);

const RESULT_SIZE = 2048;
const resultPtr = Decoder._malloc(RESULT_SIZE);
const decoderPtr = _initDecode();

type FTReceivedMessage = {
  db: number;
  dt: number;
  df: number;
  text: string;
};

export const decode = async (
  input: Float32Array
): Promise<FTReceivedMessage[]> => {
  const inputPtr = Decoder._malloc(input.length * input.BYTES_PER_ELEMENT);
  Decoder.HEAPF32.set(input, inputPtr / input.BYTES_PER_ELEMENT);
  await _execDecode(decoderPtr, inputPtr, resultPtr);
  const rawResult = new Uint8Array(
    Decoder.HEAPU8.buffer,
    resultPtr,
    RESULT_SIZE
  );
  const decoder = new TextDecoder("utf8");
  const result = decoder
    .decode(rawResult)
    .replaceAll("\x00", "")
    .trim()
    .split("\n")
    .filter((row) => row.length > 0)
    .map((row) => {
      const splitted = row.split(",");
      return {
        db: Number(splitted[0]),
        dt: Number(splitted[1]),
        df: Number(splitted[2]),
        text: splitted[3],
      };
    });
  return result;
};
