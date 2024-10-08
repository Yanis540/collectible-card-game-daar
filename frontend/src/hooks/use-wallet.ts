import { useEffect, useMemo, useRef, useState } from "react"
import * as main from '@/lib/main'
import { useWalletStore } from "@/state/use-wallet-store"
import ethereum from "@/lib/ethereum"

type Canceler = () => void

const useAffect = (
    asyncEffect: () => Promise<Canceler | void>,
    dependencies: any[] = []
  ) => {
    const cancelerRef = useRef<Canceler | void>()
    useEffect(() => {
      asyncEffect()
        .then(canceler => (cancelerRef.current = canceler))
        .catch(error => {console.log("Some error : "); console.warn('Uncatched error', error)})
      return () => {
        if (cancelerRef.current) {
          cancelerRef.current()
          cancelerRef.current = undefined
        }
      }
    }, dependencies)
}
export const useWallet = () => {
    const {details,contract,set_details,set_contract} = useWalletStore();
    const auth = async()=>{
        const details_ = await ethereum.connect('metamask')
        if (!details_) 
            return 
        set_details(details_);
        console.log(await details_.provider.getBlockNumber())
        console.log((await details_.provider.getNetwork()).name)
        const contract_ = await main.init(details_)
        console.log("contract>>>> : ",contract_)
        if (!contract_) 
            return
        set_contract(contract_)
    }
    useAffect(async()=>{
        await auth()
    }, [])
    const wallet = useMemo(() => {
        if (!details || !contract) 
            return
        return { 
            details, 
            contract 
        }
    }, [details, contract])
    return  {
        ...wallet, 
        methods : {
            auth
        }
    }
}