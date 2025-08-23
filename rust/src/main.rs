pub mod create_keypair;
pub mod hashing;
pub mod signing;

fn main() {
    signing::sign_and_verify();
}
