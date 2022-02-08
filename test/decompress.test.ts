import { expect } from "chai";
import { readFileSync } from "fs";
import { resolve } from "path";
import { deflateSync } from "zlib";
import { decompressBuffer, CompressionType } from "../dst/api";

describe("decompressBuffer", () => {
  it("should return the original buffer if type == Uncompressed", () => {
    const buffer = Buffer.from("hello world");
    const decompressed = decompressBuffer(buffer, CompressionType.Uncompressed);
    expect(buffer).to.equal(decompressed);
  });

  it("should return the original buffer if type == DeletedRecord", () => {
    const buffer = Buffer.from("hello world");
    const decompressed = decompressBuffer(buffer, CompressionType.DeletedRecord);
    expect(buffer).to.equal(decompressed);
  });

  it("should decompress ZLIB if type == ZLIB", () => {
    const compressed = deflateSync(Buffer.from("hello world"));
    const decompressed = decompressBuffer(compressed, CompressionType.ZLIB);
    expect(decompressed.toString()).to.equal("hello world");
  });

  it("should decompress internal compression if type == InternalCompression", () => {
    const compressed = readFileSync(resolve(__dirname, "./data/InternalCompression.binary"));
    expect(compressed.toString().startsWith("STBL")).to.be.false;
    const decompressed = decompressBuffer(compressed, CompressionType.InternalCompression, 8169);
    expect(decompressed.toString().startsWith("STBL")).to.be.true;
  });

  it("should throw for internal compression if byte length not given", () => {
    const compressed = readFileSync(resolve(__dirname, "./data/InternalCompression.binary"));
    expect(compressed.toString().startsWith("STBL")).to.be.false;
    expect(() => decompressBuffer(compressed, CompressionType.InternalCompression)).to.throw();
  });

  it("should throw if type == StreamableCompresssion", () => {
    const buffer = Buffer.from("hello world");
    expect(() => decompressBuffer(buffer, CompressionType.StreamableCompresssion)).to.throw();
  });
});
