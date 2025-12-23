import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Navigation from './components/Navigation/Navigation'
import Characters from "./pages/Characters";
import Character from "./pages/Character";
import { useHouseStore } from '@/stores/useHouseStore';
import { HOUSES } from '@/constants/houses';

import './App.css'

function App() {
  const { selectedHouse } = useHouseStore();

  useEffect(() => {
    const house = HOUSES[selectedHouse];
    if (house) {
      document.documentElement.style.setProperty('--color-primary', house.colors.primary);
      document.documentElement.style.setProperty('--color-secondary', house.colors.secondary);
    } else {
      document.documentElement.style.setProperty('--color-primary', '#374151');
      document.documentElement.style.setProperty('--color-secondary', '#9ca3af');
    }
  }, [selectedHouse]);
  /**@todo
   * Multi language support
   * Add unit and integration tests
   * Improve accessibility
   * Improve responsive design
   */
  return (
    <div className='wrapper-content min-h-screen bg-magic-parchment p-8  font-body'>      
      <Navigation />
      <main className='main-content'>
        <Routes>
          <Route path="/*" element={<div>Home Page</div>} />
          <Route path="/characters/*" element={<Characters />} />
          <Route path="/character/:id" element={<Character />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
