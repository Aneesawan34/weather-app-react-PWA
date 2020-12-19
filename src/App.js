import React,{useEffect, useState} from 'react';
import {fetchWeather} from "./api/fetchWeather";
import LoaderComp from './Loader';
import {ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
//   import 'react-toastify/dist/ReactToastify.minimal.css';
import './App.css';

const App=()=>{
    const [query,setQuery]=useState('');
    const [load,setLoad]=useState(false);
    const [weather,setWeather]=useState({});
    const [getDate, setGetDate] = useState("");

    const search=async(e)=>{
        setLoad(true);
        // if(e.key==='Enter')
        // {
            const data=await fetchWeather(query);
            !data.main && notify();
            setWeather(data);
            setLoad(false);
            setQuery('');
        // }
    }

    const resetWeatherInfo = async()=>{
        await setWeather({})
    }
    const notify = () => toast.error("City Not Found");
    // useEffect(()=>{
    //     const currentDate = new Date().toLocaleTimeString();
    //     setGetDate(currentDate);
    //     // console.log("date: ", currentDate);
    // },[]);
    useEffect(()=>{
        setTimeout(() => {
            const currentDate = new Date().toLocaleTimeString();
        setGetDate(currentDate);
        // console.log("date: ", getDate);
        }, 1000);
    },[getDate])
    return(
        <div className="main-container">
                <h1 className="date-heading">{getDate}</h1>
            <div className="search">
            <input
                type="text"
                className="search-input"
                placeholder="City..."
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                // onKeyPress={search}
                />
                {
                    weather.main ? 
                    <button className="search-submit" onClick={resetWeatherInfo}>Reset</button>
                    :
                    <button disabled={query.length > 3 ? false : true} className="search-submit" onClick={search}>Submit</button>
                }
            </div>
            <LoaderComp load={load} />
            <ToastContainer
            position="top-left"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
            closeButton={false}
            // toastClassName={'danger'}
            />
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {weather.main.temp}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <p><strong>Feels Like :</strong> {weather.main.feels_like}<sup>&deg;C</sup></p>
                        <p><strong>Humidity :</strong> {weather.main.humidity}%</p>
                        <p><strong>Wind : </strong>{weather.wind.speed} km/hr, at {weather.wind.deg}&deg;</p>
                        <img className="city-icon" alt={weather.weather[0].description} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
        
    );
}

export default App;