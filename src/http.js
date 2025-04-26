export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');
    const responseData = await response.json();

    /**
     * ok = 200 or 300 codes.
     * !ok = 400 or 500 codes.
     */
    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }

    return responseData.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({ places }), // places = places: places shortcut
        headers: {
            'Content-Type': 'application/json', // inform requestthat  data attached to this request (body) is in JSON format
        }
    });

    const responseData = await response.json();

    if (!ok) {
        throw new Error('Failed to update user data.');
    }

    return responseData.message;
}