import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'


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
        const places = await fetchAvailablePlaces();

        // Function will be executed once the position is loaded.
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          /**
           * Move setIsFetching from previous position because JavaScript does not wait for the code to execute before this callback function is done.
           * Also notice setIsFetching is catch.
           */
          setIsFetching(false);
        });

      } catch (error) {
        setError({ message: error.message || 'Could not fetch places, please try again later.' });
        setIsFetching(false);
      }
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
