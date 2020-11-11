export function getNotesFromLocalStorage() {
  try {
    const item = window.localStorage.getItem('notes-react');

    return item ? JSON.parse(item) : [];

  } catch (error) {
    console.log('error:', error);
    return [];
  }
}
