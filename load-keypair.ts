import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import bs58 from "bs58";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`secret key`, bs58.encode(keypair.secretKey));

console.log(
  `✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`
);
