import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';

const TitleCards = ({title,category}) => {
  const cardsRef = useRef();
  const [apiData,setApiData] = useState([]);

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzhlNGIzOWM3MzNkY2FjYjVjNDY5NDU4ZWVhNWRhNCIsIm5iZiI6MTc1OTQxNzU1Mi44NjcsInN1YiI6IjY4ZGU5NGQwNWY2Y2M3ODUyZTZhNzliZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u_WvJGfdKifUJzwSdBYQZFJZacYz2EhWoQG9i3YJC4M'
  }
};

useEffect(() =>{
  fetch(`https://api.themoviedb.org/3/movie/${category? category : "now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

},[category])
  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  return (
  <div className='titlecards'>
    <h2>{title ? title : "Popular on Netflix"}</h2>
    <div className="card-list" ref={cardsRef} onWheel={handleWheel}>
      {category 
        ? (
          apiData.map((card, index) => (
            <div className="card" key={index}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} 
                alt={card.original_title || card.name} 
              />
              <p>{card.original_title || card.name}</p>
            </div>
          ))
        ) : (
          cards_data.map((card, index) => (
            <div className="card" key={index}>
              <img src={card.image} alt={card.name} />
              <p>{card.name}</p>
            </div>
          ))
        )
      }
    </div>
  </div>
);

};

export default TitleCards;
