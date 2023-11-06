import { encode } from "../../dist/index.js";

(async () => {
  // get the encoded 12kHz samplerate 15sec wave data
  const wave = await encode("CQ JK1IFA PM95", 1000);
})();
