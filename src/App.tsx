import React from 'react';
import Tetris from './components/tetris';
import './App.css';
import { FIELD_HEIGHT, FIELD_WIDTH } from './constants';

const App: React.FC = () => {
  return (
    <main className='app'>
      <Tetris
        fieldHeight={FIELD_HEIGHT}
        fieldWidth={FIELD_WIDTH}
        startLevel={0}
      />
    </main>
  );
}

export default App;
