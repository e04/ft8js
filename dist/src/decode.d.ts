type FTReceivedMessage = {
    db: number;
    dt: number;
    df: number;
    text: string;
};
export declare const decode: (input: Float32Array) => Promise<FTReceivedMessage[]>;
export {};
