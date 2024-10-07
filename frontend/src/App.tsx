import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import { useWallet } from './hooks/use-wallet'






export const App = () => {
  const wallet = useWallet()
  return (
    <div className={styles.body}>
      <h1>Welcome to Pokémon TCG</h1>
    </div>
  )
}
