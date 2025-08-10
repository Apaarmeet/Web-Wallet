import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39';
import SolanaWallet from '../SolanaWallet';
import EthWallet from '../EthWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("");


  return (
    <>
     <button onClick={async()=>{
      const mn = generateMnemonic();
      setMnemonic(mn);
     }}>
      Create Seed Phrase
     </button>

     <input type="text" value={mnemonic} />

     <SolanaWallet mnemonic={mnemonic}/>
     <EthWallet mnemonic={mnemonic}/>
    </>
  )
}

export default App
