import React, { useState, useEffect } from 'react';

const NewModulePage = () => {
    const [code, setCode] = useState('');
    const [fullName, setFullName] = useState('');
    const [selectedCohorts, setSelectedCohorts] = useState([]);
    const [cohortOptions, setCohortOptions] = useState([]);
    const [caSplit, setCaSplit] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCohorts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/cohort/');
                if (!response.ok) {
                    throw new Error('Failed to fetch cohort data');
                }
                const data = await response.json();
                setCohortOptions(data);
            } catch (error) {
                console.error('Error fetching cohort data:', error);
            }
        };

        fetchCohorts();
    }, []);

    const handleCheckboxChange = (cohortId) => {
        if (selectedCohorts.includes(cohortId)) {
            setSelectedCohorts(selectedCohorts.filter(id => id !== cohortId));
        } else {
            setSelectedCohorts([...selectedCohorts, cohortId]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/module/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    full_name: fullName,
                    delivered_to: selectedCohorts.map(cohortId => `http://127.0.0.1:8000/api/cohort/${cohortId}/`),
                    ca_split: caSplit,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create new module');
            }


            setCode('');
            setFullName('');
            setSelectedCohorts([]);
            setCaSplit('');
            setIsLoading(false);
            alert('Module created successfully!');
        } catch (error) {
            console.error('Error creating module:', error);
            setIsLoading(false);
            alert('Failed to create module. Please try again.');
        }
    };

    return (
        <div className="NewModulePage">
            <h1>Create New Module</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="code">Code:</label>
                    <input
                        type="text"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Delivered To:</label>
                    {cohortOptions.map(cohort => (
                        <div key={cohort.id}>
                            <input
                                type="checkbox"
                                value={cohort.id}
                                checked={selectedCohorts.includes(cohort.id)}
                                onChange={() => handleCheckboxChange(cohort.id)}
                            />
                            <label htmlFor={`cohort-${cohort.id}`}>{cohort.name}</label>
                        </div>
                    ))}
                </div>
                <div>
                    <label htmlFor="caSplit">CA Split:</label>
                    <input
                        type="number"
                        id="caSplit"
                        value={caSplit}
                        onChange={(e) => setCaSplit(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Module'}
                </button>
            </form>
        </div>
    );
};

export default NewModulePage;





