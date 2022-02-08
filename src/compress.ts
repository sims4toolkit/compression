import { deflateSync } from "zlib";
import CompressionType from "./compression-type";

/**
 * Compresses the given buffer using the giving algorithm.
 * 
 * @param buffer Buffer to compress
 * @param compression Compression algorithm to use
 */
export default function compressBuffer(buffer: Buffer, compression: CompressionType): Buffer {
  switch (compression) {
    case CompressionType.ZLIB:
      return deflateSync(buffer);
    case CompressionType.Uncompressed:
      // fallthrough
    case CompressionType.DeletedRecord:
      return buffer;
    default:
      throw new Error(`Compressing with "${compression} (${CompressionType[compression]})" is not supported.`);
  }
}
