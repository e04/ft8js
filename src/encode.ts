import ___ft8jsEncodeModule___ from "../wasm/encode.js";

const SAMPLE_RATE = 12000;
const FT8_DURATION_SECOND = 15;
const FT8_WAVE_LENGTH = SAMPLE_RATE * FT8_DURATION_SECOND;

const Encoder = await ___ft8jsEncodeModule___();

const _encode: (
  input: string,
  frequency: number,
  bufferPointer: number
) => Promise<number> = Encoder.cwrap(
  "exec_encode",
  "number",
  ["string", "number", "number"],
  {
    async: true,
  }
);

export const encode = async (
  input: string,
  frequency: number
): Promise<Float32Array | null> => {
  const ptr = Encoder._malloc(FT8_WAVE_LENGTH * 4); // float contains 4 bytes
  const buffer = new Uint8Array(
    Encoder.HEAPU8.buffer,
    ptr,
    FT8_WAVE_LENGTH * 4
  );
  const result = await _encode(input, frequency, buffer.byteOffset);

  if (result < 0) {
    return null;
  }

  const wave = new Float32Array(
    Encoder.HEAPU8.buffer,
    buffer.byteOffset,
    FT8_WAVE_LENGTH
  );

  Encoder._free(ptr);
  return wave;
};
