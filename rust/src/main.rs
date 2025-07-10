mod hashing;
use hashing::Sha1;
use sha1::Sha1 as Sha11;
use sha2::{Digest, Sha256};

fn main() {
    let input = b"hello";

    let hash1 = Sha1::new().digest(input);

    let hash2 = Sha256::digest(input);

    println!("SHA-256: {}", hex::encode(hash2));

    let hash3 = Sha11::digest(input);

    println!("SHA-1: {}", hex::encode(hash1));
    println!("SHA-1: {}", hex::encode(hash3));
}
