import { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Navigation from './components/Navigation/Navigation'
import NotFound from "./pages/NotFound";
import { useHouseStore } from '@/stores/useHouseStore';
import { HOUSES } from '@/constants/houses';

const Characters = lazy(() => import('./pages/Characters'));
const Students = lazy(() => import('./pages/Students'));
const Staff = lazy(() => import('./pages/Staff'));
const Character = lazy(() => import('./pages/Character'));

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
   */
  return (
    <div className='wrapper-content min-h-screen bg-magic-parchment p-2'>      
      <Navigation />
      <main className='main-content'>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Characters />} />
            <Route path="/characters/" element={<Characters />} />
            <Route path="/students/" element={<Students />} />
            <Route path="/staff/" element={<Staff />} />
            <Route path="/character/:id" element={<Character />} />          
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
