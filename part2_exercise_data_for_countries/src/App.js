import React, { useState ,useEffect} from 'react'
import axios from 'axios';

const LoadCountry= ({country})=>{


  return(<li>
    name: {country.name}
  </li>);
}

const LoadCountries=({countries})=>{
  if(countries.length > 10)
    return(
      <div><p>Too many matches, specify another filter</p></div>
    )
  else
      return(
        <div>
          {countries.map(country=>{
            return <LoadCountry 
                    key = {country.name+country.alpha3Code} 
                    country = {country}/>
          })}
        </div>
      )
}
function App() {
  const api_link= 'https://restcountries.eu/rest/v2/all'
  const [countries, setCountries] = useState([]);
  const [filter, setNewFilter] = useState('');

  const hook = ()=>{
    axios
      .get(api_link)
      .then(response=>{
        setCountries(response.data);
        console.log("finished loading data");
      });
  };
  useEffect(hook,[]);


  const  handleFilterChange = (event) =>{
    setNewFilter(event.target.value);
    //console.log("filter changed" , filter)
  }


  const showCountries = countries.filter(country=> country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  console.log(showCountries);

  return (
    <div>
      <p>find countries 
        <input 
        value ={filter}
        onChange={handleFilterChange}/>
      </p>
      <div>
        <LoadCountries countries={showCountries}/>
        </div>
    </div>
  );
}

export default App;
