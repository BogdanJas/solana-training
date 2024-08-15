import {
  addKeypairToEnvFile,
  airdropIfRequired,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import cluster from "cluster";
import "dotenv/config";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
  `✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`
);

console.log(`clusterApiUrl("devnet"): `, clusterApiUrl("devnet"));

const connection = new Connection(clusterApiUrl("devnet"));
const address = keypair.publicKey;

const balance = await connection.getBalance(address);

console.log(
  `Address: `,
  address.toBase58(),
  `\nThe balance of the account is: `,
  balance
);

const lamports = 7 * 10 ** 8; //0.7 SOL

//await airdropIfRequired(connection, keypair.publicKey, lamports, lamports);
console.log(
  `\nAddress: `,
  address.toBase58(),
  `\nThe balance of the account is: `,
  balance,
  `\nBalance in SOL: `,
  balance / 10 ** 9
);
