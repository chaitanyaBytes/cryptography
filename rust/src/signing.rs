use solana_sdk::{signature::Keypair, signer::Signer};

pub fn sign_and_verify() {
    let kp = Keypair::new();

    let message = "I am gonna create history";

    let signature = kp.sign_message(message.as_bytes());

    let is_valid_sign = signature.verify(&kp.pubkey().to_bytes(), message.as_bytes());
    println!("verified: {:?}", is_valid_sign);
}
