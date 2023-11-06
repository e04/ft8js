import { decode } from "../../dist/index.js";
import fs from "fs";
import wavDecoder from "wav-decoder";

(async () => {
  fs.readFile("example/test.wav", (err, buffer) => {
    if (err) {
      console.error(err);
      return;
    }
    wavDecoder
      .decode(buffer)
      .then((audioData) => {
        const float32Array = audioData.channelData[0]; // or [1] for stereo
        return decode(float32Array);
      })
      .then((result) => {
        console.log(result);
      });
  });
})();
