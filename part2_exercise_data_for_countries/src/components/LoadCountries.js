import React from 'react'
import ReactDOM from 'react-dom';




const LoadCountryInfo= ({country})=>{
    const weather_base_url = 'http://api.weatherstack.com/'
    const api_key = process.env.REACT_APP_API_KEY;
    return(
      <div>
        <li>
        <h1>{country.name}</h1>
        <br/>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map((language)=>{
            return <LoadLang 
              key={language.iso639_1+language.name} 
              language={language}/>
          })}
        </ul>
  
        <img src={country.flag} alt={country.name} border='5px solid #555'/>
        </li>
      </div>
    );
  }
  
  const LoadCountry= ({country})=>{
    const handleShowCountry = (event)=>{
      ReactDOM.render(<LoadCountryInfo country={country}/>, document.getElementById('country'));
    }
    const handleHideCountry = (event)=>{
      ReactDOM.render(<LoadCountry country={country}/>, document.getElementById('country'));
    }
  
    return(<li>
      <p>
      {country.name}
      <button onClick={handleShowCountry}>show</button>
      <button onClick={handleHideCountry}>hide</button></p>
      <div id='country'/>
    </li>);
  }
  
  const LoadLang = ({language})=>{
    return(<p>{language.name}</p>)
  }
  
  const LoadCountries=({countries})=>{
    
  
    if(countries.length > 10)
      return(
        <div><p>Too many matches, specify another filter</p></div>
      )
    else if(countries.length === 1){
      return(
        <div>
          <ul>
          {countries.map(country=>{
            return <LoadCountryInfo 
                    key = {country.name + country.alpha3Code} 
                    country = {country}/>
          })}
          </ul>
        </div>
      )
    }
    else
        return(
          <div>
            <ul>
            {countries.map(country=>{
              return(
                <LoadCountry 
                      key = {country.name+country.alpha3Code} 
                      country = {country}/>
            )})}
            </ul>
             
          </div>
        )
  }



export default LoadCountries