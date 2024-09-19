// AllDegreesPage.jsx
import React, { useState, useEffect } from 'react';

function fetchAllDegrees() {
    return fetch('http://127.0.0.1:8000/api/cohort/')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching modules:', error);
            throw error;
        });
}

const AllCohortPage = () => {
    const [cohorts, setModules] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetchAllDegrees()
            .then(data => {
                setModules(data);
                setIsLoaded(true);
            })
            .catch(error => console.error('Error fetching modules:', error));
    }, []);

    return (
        <div className="AllModulesPage">
            {isLoaded ? (
                <div>
                    <h1>All Cohorts</h1>
                    <ul>
                        {cohorts.map(cohort => (
                            <li key={cohort.id}><p><strong>ID:</strong> {cohort.id}</p> <p><strong>Year</strong>: {cohort.year}</p>  <p><strong>Name: </strong>{cohort.name}</p></li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};



export default AllCohortPage;