import React from "react";
import ethereum  from "@/lib/ethereum";
import { useWallet } from "@/hooks/use-wallet";
import * as main from "@/lib/main"
import { useWalletStore } from "@/state/use-wallet-store";
function ConnectWalletButton({  }) {
    const {set_details,set_contract} = useWalletStore();
    const connectWallet = async () => {
        const details_ = await ethereum.connect('metamask')
        if (!details_) 
            return
        set_details(details_)
        const contract_ = await main.init(details_)
        if (!contract_) 
            return
        set_contract(contract_)
    };

  return <button onClick={connectWallet}>Connect Web3 Wallet</button>;
}

export default ConnectWalletButton;