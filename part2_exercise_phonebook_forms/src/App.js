import React, { useState } from 'react'

const LoadNames= ({person})=>{
    return(
    <>
    <p>{person.name}  {person.number}</p>
    </>)
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setNewFilter ] = useState('');

    const handleNameChange= (event)=>{
        setNewName(event.target.value);
    }

    const handleNumberChange= (event)=>{
        setNewNumber(event.target.value);
    }

    const handleFilterChange= (event)=>{
        setNewFilter(event.target.value);
    }


    const HandleAddName= (event)=>{
        event.preventDefault();
        var found = persons.find(person=>person.name===newName)
        if(found){
            alert(`${newName} is already added to addressbook`);
        }
        const addedName = {
            name: newName,
            number: newNumber
        }
        setPersons(persons.concat(addedName));
        console.log('set persons : ', persons)
        setNewName('');
    };
    
  const ContactsToShow = (filter === '')? persons
        : persons.filter((person)=>{ 
            return person.name.toLowerCase().indexOf(filter.toLowerCase()) !==-1
        })
        console.log(ContactsToShow);
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          <p>filter shown with
          
              <input 
                value={filter}
                onChange={handleFilterChange}/>
          
          </p>
      </div>

      <h2>Add a new</h2>
      <form onSubmit={HandleAddName}>
        <div>
            name: <input value={newName}
                onChange={handleNameChange}/>
            <br/>
            number: <input value= {newNumber}
                onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {ContactsToShow.map((person)=>{
          return <LoadNames key={person.name+person.number} person={person}/>
      })}
    </div>
  )
}

export default App
