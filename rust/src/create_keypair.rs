use solana_sdk::{signature::Keypair, signer::Signer};

pub fn generate_keypair() {
    let keypair = Keypair::new();
    let public_key = keypair.pubkey();
    let secret_key = keypair.secret_bytes();

    let kp = Keypair::new_from_array(*secret_key).to_base58_string();
    let kp2 = Keypair::from_base58_string(&kp);

    println!("keypair string: {kp}");
    println!("public key: {public_key}");
    println!("public key: {}", kp2.pubkey());
}
