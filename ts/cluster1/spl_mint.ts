import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "./wallet/wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("HWkiywmVgVmVzg3JtHivLrTrQrrKjMaP7mR8QKk84F7b");

(async () => {
  try {
    // Create an ATA
    // const ata = ???
    // console.log(`Your ata is: ${ata.address.toBase58()}`);
    // Mint to ATA
    // const mintTx = ???
    // console.log(`Your mint txid: ${mintTx}`);
    //
    //

    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey,
    );
    console.log(`Ur ATA is: ${ata.address.toBase58()}`);

    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair,
      100n * token_decimals,
    );
    console.log(
      `Ur mint tx id: https://explorer.solana.com/tx/${mintTx}?cluster=devnet`,
    );
  } catch (error) {
    console.log(`404, something went wrong: ${error}`);
  }
})();
