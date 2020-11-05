import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';
import { AppTheme } from './theme';
import { Header, EditNoteModal, NewNote, NotesList } from './components';

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <div className="App">
        <Header />
        <NewNote />
        <NotesList />
        <EditNoteModal />
      </div>
    </ThemeProvider>
  );
}

export default App;
