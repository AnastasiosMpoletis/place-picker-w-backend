import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  /**
   * Common fetching states practise:
   * 1. Loading state
   * 2. Data state
   * 3. Error state
   */
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    /**
     * We can use async, await keywords to make an async function.
     * This way, rendering will wait for the data loading to complete.
     */
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3000/places');
        const responseData = await response.json();

        /**
         * ok = 200 or 300 codes.
         * !ok = 400 or 500 codes.
         */
        if (!response.ok) {
          throw new Error('Failed to fetch places');
        }

        setAvailablePlaces(responseData.places);
      } catch (error) {
        setError({ message: error.message || 'Could not fetch places, please try again later.' });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [])

  if (error) {
    return (
      <Error
        title="An error occured!"
        message={error.message}
      />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
