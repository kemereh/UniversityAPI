
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StudentNames = () => {
    const { degreeId } = useParams();
    const [cohorts, setCohorts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/?cohort=${degreeId}`)
            .then(response => response.json())
            .then(data => {
                setCohorts(data);
                setIsLoading(false);
            })
            .catch(error => console.error('Error fetching cohorts:', error));
    }, [degreeId]);

    return (
        <div className="Cohort Page">
            <h1>Cohort Names</h1>
            <h2>Students for Cohort: {degreeId}</h2>
            {isLoading ? (
                <p>Loading cohorts...</p>
            ) : (
                <ul>
                    {cohorts.map(cohort => (
                        <li key={cohort.student_id}><p><strong>Name: </strong>{cohort.first_name} {cohort.last_name}</p></li>


                    ))}

                    
                </ul>
            )}
        </div>
    );
};

export default StudentNames;

