import React,{useEffect, useState} from 'react';

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL='https://www.omdbapi.com?apikey=65b016c7';


export default function App(){
    const [movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
  
    const searchMovies= async(title)=>{
        const response =  await fetch(`${API_URL}&s=${title}`);
        const data= await response.json();
        setMovies(data.Search);
    }
    
    useEffect(()=>{
        searchMovies('Avengers');
    },[])

    
    return(
        <div>
       <div className='app'>  
        <h1>MoiveOcean</h1>
 
        <div className='search'>
            <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <img src={SearchIcon}
            alt="search"
            onClick={()=>searchMovies(searchTerm)}
            />
        </div>

        {movies?.length>0
            ?(
            <div className='container'>
                {movies.map((movie)=>(
                    <MovieCard movie ={movie}/>
                ))}
            </div>
            ) :
            (
            <div className='empty'>
                <h2>No Movies found</h2>
            </div>
            )
        }

       </div>
        </div>
    );
}