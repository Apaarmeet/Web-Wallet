import { mnemonicToSeed } from "bip39"
import{Wallet,HDNodeWallet, ethers} from "ethers"
import { useEffect, useState } from "react"


function EthWallet({mnemonic}) {
  
    const [index, setIndex] = useState(0);
    const[addresses, setAddresses]= useState<string[]>([]);
    const provider = new ethers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/NzcjxTamdyKCgFwE0xzsi");
    const [balance, setBalance]  = useState ({})

   

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
    {addresses.map((addr => <div>
        Eth - {addr} <button onClick={async()=>{
            const res = await provider.getBalance(addr,"latest")
            const resInEth = ethers.formatEther(res)
            setBalance((prev)=>({
                ...prev,
                [addr]:resInEth
            }));
        }} > Get Balance</button>
        {balance[addr] && <span> → {balance[addr]} ETH</span>}
    </div> ))}
    </div>
  )
}

export default EthWallet