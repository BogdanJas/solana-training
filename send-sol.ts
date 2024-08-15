import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import cluster from "cluster";
import "dotenv/config";
import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");
//const sender = "3PqgSamvbgvrEPZn2Asj6YD2SPWwTsBCdm6iXHqToxoy";
// console.log(
//   `✅ Finished! We've loaded our keypair securely, using an env file! Our public key is: ${keypair.publicKey.toBase58()}`
// );

console.log(`clusterApiUrl("devnet"): `, clusterApiUrl("devnet"));

const connection = new Connection(clusterApiUrl("devnet"));

const lamports = 1 * 10 ** 8; //0.7 SOL
const address = new PublicKey("8QKrGYdHpK4pQZR1w8B9wPLHo4Zp8A6tQbD5BVRtY7Zm");

const balance = await connection.getBalance(address);
console.log(`My balance is: ${balance / 10 ** 9} SOL`);
console.log(`Sending from address: ${sender.publicKey}`);
console.log(`Sending to address: ${address}`);

const transaction = new Transaction();

const sendInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: address,
  lamports,
});

transaction.add(sendInstruction);

// const signature = await sendAndConfirmTransaction(connection, transaction, [
//   sender,
// ]);
// console.log(`Transaction sent! Signature: ${signature}`);

const memeTransaction = createMemoInstruction(`Hello from Bogdan!`);
transaction.add(memeTransaction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);
console.log(`Transaction sent! Signature: ${signature}`);
