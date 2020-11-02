import React from 'react';
import { Header, NewNote, NotesList } from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <NewNote />
      <NotesList />
    </div>
  );
}

export default App;
