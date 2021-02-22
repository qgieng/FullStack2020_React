import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login' 

const App = () => {

  const [notes, setNotes] = useState([]) 

  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null);

  const NoteFormRef = useRef();

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  //the empty array as the parameter of the effect ensurs that the effect is executed only when the compnent is rendered for the first time.
  useEffect(()=>{
    const LoggedUserJson = window.localStorage.getItem('loggedNoteappUser');
    if(LoggedUserJson){
      const user = JSON.parse(LoggedUserJson)
      setUser(user);
      noteService.setToken(user.token);
    }
  }, [])

  const addNote = (noteObject) => {
    NoteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   
      })
  }

  const handleLogin =async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
                      
      ) 

      //user will come back with a token after login.w
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    }catch(exception){
      setErrorMessage('Wrong credentials');
      setTimeout(()=>{
        setErrorMessage(null)
      },5000);
    }
  }

  const notesToShow = showAll? notes : notes.filter(note => note.important)

    const loginForm = () => (
      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )

    const noteForm = () => (
      <Togglable buttonLabel="new note" ref={NoteFormRef}>
        <NoteForm createNote = {addNote}/>
      </Togglable>
    )

    
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user===null?  
        loginForm():
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
          </div> 
        }
    
        <h2>Notes</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map((note, i) => 
          <Note
            key={i}
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      
      <Footer />
    </div>
  )
}

export default App 