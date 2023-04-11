import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState('');
  
  const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer setBalance={setBalance} address={address} privateKey={privateKey} messageHash={ messageHash }/>
    </div>
  );
}

export default App;
