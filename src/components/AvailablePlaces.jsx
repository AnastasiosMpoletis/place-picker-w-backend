import { useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // TODO ANBOL this creates an infinite loop. Render -> fetch -> setState -> render -> fetch -> setState -> [...].
  fetch('http://localhost:3000/places')
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      setAvailablePlaces(responseData.places);
    });

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
