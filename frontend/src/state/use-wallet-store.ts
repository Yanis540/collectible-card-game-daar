import { Details } from '@/lib/ethereum'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import * as main from '@/lib/main'
interface WalletState {
  details?:  Details
  contract?:  main.Main
  set_details: (details?:  Details) => void
  set_contract: (contract?:  main.Main) => void
}

const useWalletStore =  create<WalletState>(
        (set:any,get:any)=>({
            details : undefined, 
            set_details : (details?:Details)=>set((prev:WalletState)=>{
                return {...prev,details:details}
            }),
            set_contract : (contract?:  main.Main)=>set((prev:WalletState)=>{
                return {...prev,contract:contract}
            }),
        }), 
)



export {
    useWalletStore
}