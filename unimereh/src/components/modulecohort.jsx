
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ModuleCohort = () => {
    
    const { moduleId } = useParams();
    const [modules, setModules] = useState([]);

    const [module, setModule] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${moduleId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch module data');
                }
                const data = await response.json();
                console.log('Fetched module data:', data);
                setModules(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching module data:', error);
                setIsLoading(false);
            }
        };

        fetchModule();
    }, [moduleId]);


    if (isLoading) {
        return <p>Loading module data...</p>;
    }

 
    return (
        <div>
            <h2>Module Details</h2>
                <div>
                    <ul>
                        {modules.map(module => (
                            <li key={module.code}><p><strong>Module Code: </strong>{module.code}</p>
                            <p>{module.full_name}</p></li>
                            
                        ))}
                    </ul>
                </div>
        </div>
    );
};

export default ModuleCohort;