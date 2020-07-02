import React, { useState ,useEffect} from 'react'
import axios from 'axios';


const LoadNames= ({person})=>{
    return(
    <>
    <p>{person.name}  {person.number}</p>
    </>)
}

const App = () => {
    const [persons, setPersons] = useState([
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


    const hook= () =>{
        axios
            .get('http://localhost:3001/persons')
            .then(response=>{
                setPersons(response.data);
            })
    }

    useEffect(hook,[]);
    
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
