import { useWallet } from './hooks/use-wallet'
import { useWalletStore } from './state/use-wallet-store'
import ConnectWalletButton from './components/ConnectWalletButton'

import {Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage'
import PokemonCard from './components/PokemonCard'
import UserCards from './components/UserCards'
import UserPage from './components/UserPage'
import NavBar from './components/NavBar'
import './index.css'

import Sets from './components/Sets';
import Mint from './components/Mint';




export const App = () => {
  const wallet = useWallet()
  console.log("HIIIIIIIIIIIIIIIIIIIII")
  const {details,contract} = useWalletStore();
  return (
    <div className={"flex flex-col min-h-screen bg-gray-900 text-white text-foreground"}>
     
        <>
          <NavBar />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pokemonCards/:setId" element={<PokemonCard />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/userCards/:userId" element={<UserCards />} />
              <Route path="/sets" element={<Sets />} />
              <Route path="/mint" element={<Mint />} />
          </Routes>
        </>
      
    </div>
  )
}
