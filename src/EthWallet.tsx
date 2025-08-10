import { mnemonicToSeed } from "bip39"
import{Wallet,HDNodeWallet} from "ethers"
import { useState } from "react"


function EthWallet({mnemonic}) {
  
    const [index, setIndex] = useState(0);
    const[addresses, setAddresses]:any = useState([]);


    return (
    <div>
    <button onClick={async()=>{
        const seed = await mnemonicToSeed(mnemonic)
        const derivedPath = `m/44'/60'/${index}'/0'`
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(derivedPath);
        const wallet = new Wallet(child.privateKey);
        setIndex(index+1);
        setAddresses([...addresses, wallet.address])
    }}>
        Add ETH Wallet
    </button>
    {addresses.map((p => <div>
        Eth - {p}
    </div> ))}
    </div>
  )
}

export default EthWallet