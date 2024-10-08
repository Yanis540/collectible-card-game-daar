import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import { useWallet } from './hooks/use-wallet'
import { useWalletStore } from './state/use-wallet-store'
import ConnectWalletButton from './components/ConnectWalletButton'






export const App = () => {
  const wallet = useWallet()
  const {details,contract} = useWalletStore();
  return (
    <div className={styles.body}>
      { 
        details?.account?(

          <h1>Welcome to Pokémon TCG</h1>
        ): (
          <ConnectWalletButton /> 
        )

      }
    </div>
  )
}
