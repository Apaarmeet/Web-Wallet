import { mnemonicToSeed } from "bip39";
import { useState } from "react"
import { derivePath } from "ed25519-hd-key";
import { Keypair ,PublicKey, Connection } from "@solana/web3.js";
import nacl from "tweetnacl"
import bs58 from "bs58";


 function SolanaWallet({mnemonic}) {

    const[index, setIndex] = useState(0);
    const[publicKey, setPublicKey]: any = useState([]);
    const [balance, setBalance]:any = useState({})

  return <div>
    <button onClick={async()=>{
        const seed = await mnemonicToSeed(mnemonic)
        const path  = `m/44'/501'/${index}'/0'`;
        const derivedSeed = derivePath(path, seed.toString('hex')).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed);
        const keyPair = Keypair.fromSecretKey(secret.secretKey);
        const priKey = bs58.encode(keyPair.secretKey);
        console.log(priKey);
        setIndex(index+1);
        setPublicKey([...publicKey , keyPair.publicKey])
    }}>
        Add a SOL wallet
    </button>
    {publicKey.map(p => 
        <div>
            {p.toBase58()}
            <button onClick={async()=>{
              const pub = new PublicKey(p);
              const solana = new Connection("https://solana-mainnet.g.alchemy.com/v2/NzcjxTamdyKCgFwE0xzsi");
              const bal = await solana.getBalance(pub);
              const sol = bal / 1e9;
              setBalance((prev)=>({
                ...prev,
                [p]:sol
            }));
            }} >Get Balance</button>
            { balance[p] !== undefined && (
              <span> → {balance[p]} SOL </span>
            ) }
        </div>
    )}
  </div>
}

export default SolanaWallet