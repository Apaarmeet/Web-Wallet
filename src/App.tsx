import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39';

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

 
    </>
  )
}

export default App
