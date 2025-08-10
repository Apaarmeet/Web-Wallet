import { mnemonicToSeed } from "bip39";
import { useState } from "react"
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

 function SolanaWallet({mnemonic}) {

    const[index, setIndex] = useState(0);
    const[publicKey, setPublicKey]: any = useState([]);

  return <div>
    <button onClick={async()=>{
        const seed = await mnemonicToSeed(mnemonic)
        const path  = `m/44'/501'/${index}'/0'`;
        const derivedSeed = derivePath(path, seed.toString('hex')).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed);
        const keyPair = Keypair.fromSecretKey(secret.secretKey)
        setIndex(index+1);
        setPublicKey([...publicKey , keyPair.publicKey])
    }}>
        Add a sol wallet
    </button>
    {publicKey.map(p => 
        <div>
            {p.toBase58()}
        </div>
    )}
  </div>
}

export default SolanaWallet