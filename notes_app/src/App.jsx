import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { Note } from './components/Note';
import {create as createNote, getAll as getAllNotes} from './services/notes'

export default function App(props) {
  // if (typeof notes === 'undefined' && notes.length === 0) {
  //   return 'No tenemos notas que mostrar';
  // }
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  // const [showAll, setShowAll] = useState(true);
  const [loading, setLoading] = useState(false)

  // *****  useEffect con FETCH
  // useEffect(() => {
  //   console.log('useEffect');
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then((response) => response.json())
  //     .then((json) => setNotes(json));
  // }, []);


  // *****  useEffect con AXIOS
  useEffect(() => {
    console.log('useEffect');
    setLoading(true)
    getAllNotes()
    .then(notes => {
      setNotes(notes)
      setLoading(false)
    })
    // axios.get('https://jsonplaceholder.typicode.com/posts')   YA NO VAMOS A USAR esto si no lo separamos la logica. En services
    //   .then(response => {
    //     const {data} = response
    //     setNotes(data)
    //     setLoading(false)
    //   });
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteToAddToState = {
      // id: notes.length + 1,
      // content: newNote,
      title: newNote,
      body: newNote,
      userId: 1,
      // date: new Date().toISOString(),
      // important: Math.random() < 0.5,
    };

    console.log(noteToAddToState);

    createNote(noteToAddToState)
      .then( newNote => {
        setNotes(prevNotes =>  prevNotes.concat(newNote))
      })
      .catch( e => {
        console.error(e)
      })

    // ***** PARA GUARDAR UNA NOTA        YA NO VAMOS A USAR esto si no lo separamos la logica. En services
    // axios.post('https://jsonplaceholder.typicode.com/posts', noteToAddToState)
    //   .then(response => {
    //     const {data} = response
    //     setNotes(prevNotes =>  prevNotes.concat(data))
    //   })

    // // setNotes(notes.concat(noteToAddToState));
    // // setNotes([...notes, noteToAddToState]);
    
    setNewNote('');
  };

  // const handleShowAll = () => {
  //   setShowAll(() => !showAll);
  // };
  { setLoading ? "Cargando" : ""}

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
