import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PitchDecks from './pages/PitchDecks';
import PitchDeck from './pages/PitchDeck';
import NotFound from './pages/NotFound';

const App = () => (
  <div className="max-w-screen-md mx-auto my-4">
    <BrowserRouter>
      <Routes>
        <Route index element={<PitchDecks />} />
        <Route path=":id" element={<PitchDeck />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
