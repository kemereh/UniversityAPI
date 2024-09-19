
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleDegreePage = () => {
    const { degreeId } = useParams();
    const [cohorts, setCohorts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/?degree=${degreeId}`)
            .then(response => response.json())
            .then(data => {
                setCohorts(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error fetching cohorts:', error));
    }, [degreeId]);

    return (
        <div className="SingleDegreePage">
            <h1>Single Degree Page</h1>
            <h2>Cohorts for Degree: {degreeId}</h2>
            {isLoading ? (
                <p>Loading cohorts...</p>
            ) : (
                <ul>
                    {cohorts.map(cohort => (
                        <li key={cohort.id}><p><strong>Name: </strong>{cohort.name}</p> <p><strong>Code: </strong>{cohort.id}</p> <p><strong>Year: </strong>{cohort.year}</p></li>


                    ))}

                    
                </ul>
            )}
        </div>
    );
};

export default SingleDegreePage;

