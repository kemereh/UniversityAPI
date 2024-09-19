
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleModulePage = () => {


    const [module, setModule] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { moduleId } = useParams();


    useEffect(() => {
        const fetchModule = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/module/${moduleId}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch module data');
                }
                const data = await response.json();
                console.log('Fetched module data:', data);
                setModule(data);
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
            {module && (
                <div>
                    <p><strong>Module Code:</strong> {module.code}</p>
                    <p><strong>Module Name:</strong> {module.full_name}</p>
                    <p><strong>Module CA Split:</strong> {module.ca_split}</p>
                </div>
            )}
        </div>
    );
};

export default SingleModulePage;
