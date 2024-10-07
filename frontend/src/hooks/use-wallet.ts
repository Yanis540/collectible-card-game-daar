import { useEffect, useMemo, useRef, useState } from "react"
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'
import { useWalletStore } from "@/state/use-wallet-store"

type Canceler = () => void

const useAffect = (
    asyncEffect: () => Promise<Canceler | void>,
    dependencies: any[] = []
  ) => {
    const cancelerRef = useRef<Canceler | void>()
    useEffect(() => {
      asyncEffect()
        .then(canceler => (cancelerRef.current = canceler))
        .catch(error => console.warn('Uncatched error', error))
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
    useAffect(async () => {
        const details_ = await ethereum.connect('metamask')
        if (!details_) 
            return
        set_details(details_)
        const contract_ = await main.init(details_)
        if (!contract_) 
            return
        set_contract(contract_)
    }, [])
    return useMemo(() => {
        if (!details || !contract) 
            return
        return { 
            details, 
            contract 
        }
    }, [details, contract])
}