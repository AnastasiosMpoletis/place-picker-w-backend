import { useState, useEffect } from 'react';

/**
 * Custom hook function MUST start with prefix: use for React to handle them properly.
 * Any state that is managed by useFetch, will also belong to App. If the state is updated here, App will re-render.
 * Every component that uses this hook will have its own independent instance. 
 * Changing a state in App will not affect a state from another component.
 */
export function useFetch(fetchFunction, initialValue) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);

            try {
                const data = await fetchFunction();
                setFetchedData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data.' });
            }
            setIsFetching(false);
        }

        fetchData();
    }, [fetchFunction]);

    return {
        isFetching,
        fetchedData,
        setFetchedData,
        error,
    };
}