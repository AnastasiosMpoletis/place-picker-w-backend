/**
 * @returns places from backend
 */
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