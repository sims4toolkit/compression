import { expect } from "chai";
import { deflateSync } from "zlib";
import { compressBuffer, CompressionType } from "../dst/api";

describe("compressBuffer", () => {
  it("should return the original buffer if type == Uncompressed", () => {
    const buffer = Buffer.from("hello world");
    const compressed = compressBuffer(buffer, CompressionType.Uncompressed);
    expect(buffer).to.equal(compressed);
  });

  it("should return the original buffer if type == DeletedRecord", () => {
    const buffer = Buffer.from("hello world");
    const compressed = compressBuffer(buffer, CompressionType.DeletedRecord);
    expect(buffer).to.equal(compressed);
  });

  it("should compress with ZLIB if type == ZLIB", () => {
    const buffer = Buffer.from("hello world");
    const compressed = compressBuffer(buffer, CompressionType.ZLIB);
    const compressedZlib = deflateSync(buffer);
    expect(buffer.toString()).to.not.equal(compressed.toString());
    expect(compressed.toString()).to.equal(compressedZlib.toString());
  });

  it("should throw if type == StreamableCompresssion", () => {
    const buffer = Buffer.from("hello world");
    expect(() => compressBuffer(buffer, CompressionType.StreamableCompresssion)).to.throw();
  });

  it("should throw if type == InternalCompression", () => {
    const buffer = Buffer.from("hello world");
    expect(() => compressBuffer(buffer, CompressionType.InternalCompression)).to.throw();
  });
});
