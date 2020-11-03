import React from 'react';
import { ThemeProvider } from '@chakra-ui/core';
import { AppTheme } from './theme';
import { Header, ResponsiveModal, NewNote, NotesList } from './components';

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <div className="App">
        <Header />
        <NewNote />
        <NotesList />
        <ResponsiveModal />
      </div>
    </ThemeProvider>
  );
}

export default App;
