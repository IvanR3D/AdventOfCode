// It takes some minutes to run this code, but it works.
function md5(input) {
    // UTF-8 encode string -> bytes
    function utf8Bytes(str) {
      const out = [];
      for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c < 0x80) {
          out.push(c);
        } else if (c < 0x800) {
          out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
        } else if (c >= 0xd800 && c <= 0xdbff) {
          // surrogate pair
          i++;
          const c2 = str.charCodeAt(i);
          const codePoint = 0x10000 + (((c & 0x3ff) << 10) | (c2 & 0x3ff));
          out.push(
            0xf0 | (codePoint >> 18),
            0x80 | ((codePoint >> 12) & 0x3f),
            0x80 | ((codePoint >> 6) & 0x3f),
            0x80 | (codePoint & 0x3f)
          );
        } else {
          out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
        }
      }
      return out;
    }
  
    function rotl(x, n) {
      return ((x << n) | (x >>> (32 - n))) >>> 0;
    }
  
    function toHexLE(word) {
      // little-endian 32-bit word -> 8 hex chars
      let h = "";
      for (let i = 0; i < 4; i++) {
        h += ((word >>> (i * 8)) & 0xff).toString(16).padStart(2, "0");
      }
      return h;
    }
  
    // constants
    const K = new Array(64);
    for (let i = 0; i < 64; i++) {
      // use floor * 2^32 to get exact 32-bit unsigned int
      K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) >>> 0;
    }
  
    const S = [
      7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
      9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
      16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
      15, 21,
    ];
  
    // initial state
    let A = 0x67452301 >>> 0;
    let B = 0xefcdab89 >>> 0;
    let C = 0x98badcfe >>> 0;
    let D = 0x10325476 >>> 0;
  
    // preprocess
    const bytes = utf8Bytes(String(input));
    const bitLen = bytes.length * 8;
  
    // append 0x80 then zeros until length ≡ 56 (mod 64)
    bytes.push(0x80);
    while (bytes.length % 64 !== 56) bytes.push(0);
  
    // append 64-bit little-endian length (low 32 then high 32)
    const low = bitLen >>> 0;
    const high = Math.floor(bitLen / 4294967296) >>> 0;
    for (let i = 0; i < 4; i++) bytes.push((low >>> (8 * i)) & 0xff);
    for (let i = 0; i < 4; i++) bytes.push((high >>> (8 * i)) & 0xff);
  
    // process each 512-bit block
    for (let i = 0; i < bytes.length; i += 64) {
      const M = new Array(16);
      for (let j = 0; j < 16; j++) {
        const k = i + j * 4;
        M[j] =
          bytes[k] |
          (bytes[k + 1] << 8) |
          (bytes[k + 2] << 16) |
          (bytes[k + 3] << 24);
      }
  
      let a = A,
        b = B,
        c = C,
        d = D;
  
      for (let t = 0; t < 64; t++) {
        let F, g;
        if (t < 16) {
          F = (b & c) | (~b & d);
          g = t;
        } else if (t < 32) {
          F = (d & b) | (~d & c);
          g = (5 * t + 1) % 16;
        } else if (t < 48) {
          F = b ^ c ^ d;
          g = (3 * t + 5) % 16;
        } else {
          F = c ^ (b | ~d);
          g = (7 * t) % 16;
        }
  
        const temp = d;
        d = c;
        c = b;
        const sum = (a + (F >>> 0) + K[t] + (M[g] >>> 0)) >>> 0;
        b = (b + rotl(sum, S[t])) >>> 0;
        a = temp;
      }
  
      A = (A + a) >>> 0;
      B = (B + b) >>> 0;
      C = (C + c) >>> 0;
      D = (D + d) >>> 0;
    }
  
    return toHexLE(A) + toHexLE(B) + toHexLE(C) + toHexLE(D);
  }
  
  const id = "wtnhxymk";
  const limit = 100000000; // long arbitrary number
  let pass = "";
  let pass2 = [null,null,null,null,null,null,null,null];
  let counter = 0;
  let counter2 = 0;
  for (let i = 0; i < limit; i++) {
    const hash = md5(id + i);
    const areZeroes = hash.slice(0, 5) === "00000";
    if (areZeroes) {
      if (counter < 8) {
          pass += hash[5];
          counter++;
      }
      const pos = Number(hash[5]);
      if (pos >= 0 && pos < 8 && pass2[pos] === null) {
          pass2[pos] = hash[6];
          counter2++;
      }
    }
    if (counter === 8 && counter2 === 8) break;
  }
  console.log("Part 1 ->", pass);
  console.log("Part 2 ->", pass2.join(''));