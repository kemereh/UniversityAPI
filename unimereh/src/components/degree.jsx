// AllDegreesPage.jsx
import React, { useState, useEffect } from 'react';

function fetchAllDegrees() {
    return fetch('http://127.0.0.1:8000/api/degree/')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching degrees:', error);
            throw error;
        });
}

const AllDegreesPage = () => {
    const [degrees, setDegrees] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchAllDegrees()
            .then(data => {
                setDegrees(data);
                setIsLoaded(true);
            })
            .catch(error => console.error('Error fetching degrees:', error));
    }, []);

    return (
        <div className="normal">
            {isLoaded ? (
                <div>
                    <h1>All Degrees</h1>
                    <ul>
                        {degrees.map(degree => (
                            <li key={degree.shortcode}><p><strong>Name: </strong>{degree.full_name}</p>
                            <p><strong>Shortcode: </strong>{degree.shortcode}</p></li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AllDegreesPage;
