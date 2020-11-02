import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { AppTheme } from './theme';
import { Header, NewNote, NotesList } from './components';

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <CSSReset />
      <div className="App">
        <Header />
        <NewNote />
        <NotesList />
      </div>
    </ThemeProvider>
  );
}

export default App;
