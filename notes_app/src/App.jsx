import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { Note } from './components/Note';

export default function App(props) {
  // if (typeof notes === 'undefined' && notes.length === 0) {
  //   return 'No tenemos notas que mostrar';
  // }
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  // const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log('useEffect');
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setNotes(json));
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteToAddToState = {
      id: notes.length + 1,
      // content: newNote,
      title: newNote,
      body: newNote,
      // date: new Date().toISOString(),
      // important: Math.random() < 0.5,
    };

    console.log(noteToAddToState);

    // setNotes(notes.concat(noteToAddToState));
    setNotes([...notes, noteToAddToState]);
    setNewNote('');
  };

  // const handleShowAll = () => {
  //   setShowAll(() => !showAll);
  // };

  return (
    <div>
      <h1>Notes</h1>
      {/* <button onClick={handleShowAll}>
        {showAll ? 'Show only important' : 'Show all'}
      </button> */}
      <ol>
        {notes
          // .filter((note) => {
          //   if (showAll === true) return true;
          //   return note.important === true;
          // })
          .map((note) => (
            <Note key={note.id} {...note} />
          ))}
      </ol>

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Crear nota</button>
      </form>
    </div>
  );
}
