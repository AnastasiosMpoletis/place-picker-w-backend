import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    /**
     * We can use async, await keywords to make an async function.
     * This way, rendering will wait for the data loading to complete.
     */
    async function fetchPlaces() {
      const response = await fetch('http://localhost:3000/places');
      const responseData = await response.json();
      setAvailablePlaces(responseData.places);
    }

    fetchPlaces();
  }, [])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
