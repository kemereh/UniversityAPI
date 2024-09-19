
import React, { useState, useEffect } from 'react';
import '../App.css'

function fetchAllDegrees() {
    return fetch('http://127.0.0.1:8000/api/module/')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching modules:', error);
            throw error;
        });
}

const AllModulesPage = () => {
    const [modules, setModules] = useState([]);
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
        <div className="normal">
            {isLoaded ? (
                <div>
                    <h1>All modules</h1>
                    <ul>
                        {modules.map(module => (
                            <li key={module.code}><p><strong>Code: </strong>{module.code}</p>
                            <p><strong>Name: </strong>{module.full_name}</p></li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};



export default AllModulesPage;