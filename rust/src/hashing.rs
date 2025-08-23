use sha1::Sha1 as Sha11;
use sha2::{Digest, Sha256};

pub struct Sha1 {
    h0: u32,
    h1: u32,
    h2: u32,
    h3: u32,
    h4: u32,
}

// implementation of sha1 algorithm from scratch
impl Sha1 {
    pub fn new() -> Self {
        Self {
            h0: 0x67452301,
            h1: 0xEFCDAB89,
            h2: 0x98BADCFE,
            h3: 0x10325476,
            h4: 0xC3D2E1F0,
        }
    }

    fn left_rotate(value: u32, bits: u32) -> u32 {
        value.rotate_left(bits)
    }
}

impl Sha1 {
    pub fn digest(mut self, input: &[u8]) -> [u8; 20] {
        let mut padded = input.to_vec();

        // Padding
        let bit_len = (padded.len() as u64) * 8;
        padded.push(0x80); // Add 1 bit (10000000)

        while (padded.len() % 64) != 56 {
            padded.push(0x00); // Pad with 0s
        }

        padded.extend_from_slice(&bit_len.to_be_bytes()); // Append original length

        for chunk in padded.chunks(64) {
            let mut w = [0u32; 80];

            // Break chunk into 16 u32 words
            for i in 0..16 {
                w[i] = u32::from_be_bytes([
                    chunk[i * 4],
                    chunk[i * 4 + 1],
                    chunk[i * 4 + 2],
                    chunk[i * 4 + 3],
                ]);
            }

            // Extend to 80 words
            for i in 16..80 {
                w[i] = Self::left_rotate(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);
            }

            // Initialize working vars
            let mut a = self.h0;
            let mut b = self.h1;
            let mut c = self.h2;
            let mut d = self.h3;
            let mut e = self.h4;

            for i in 0..80 {
                let (f, k) = match i {
                    0..=19 => ((b & c) | ((!b) & d), 0x5A827999),
                    20..=39 => (b ^ c ^ d, 0x6ED9EBA1),
                    40..=59 => ((b & c) | (b & d) | (c & d), 0x8F1BBCDC),
                    _ => (b ^ c ^ d, 0xCA62C1D6),
                };

                let temp = Self::left_rotate(a, 5)
                    .wrapping_add(f)
                    .wrapping_add(e)
                    .wrapping_add(k)
                    .wrapping_add(w[i]);
                e = d;
                d = c;
                c = Self::left_rotate(b, 30);
                b = a;
                a = temp;
            }

            self.h0 = self.h0.wrapping_add(a);
            self.h1 = self.h1.wrapping_add(b);
            self.h2 = self.h2.wrapping_add(c);
            self.h3 = self.h3.wrapping_add(d);
            self.h4 = self.h4.wrapping_add(e);
        }

        let mut result = [0u8; 20];
        result[..4].copy_from_slice(&self.h0.to_be_bytes());
        result[4..8].copy_from_slice(&self.h1.to_be_bytes());
        result[8..12].copy_from_slice(&self.h2.to_be_bytes());
        result[12..16].copy_from_slice(&self.h3.to_be_bytes());
        result[16..20].copy_from_slice(&self.h4.to_be_bytes());

        result
    }
}

pub fn hashing() {
    let input = b"hello";

    let hash1 = Sha1::new().digest(input);

    let hash2 = Sha256::digest(input);

    println!("SHA-256: {}", hex::encode(hash2));

    let hash3 = Sha11::digest(input);

    println!("SHA-1: {}", hex::encode(hash1));
    println!("SHA-1: {}", hex::encode(hash3));
}
