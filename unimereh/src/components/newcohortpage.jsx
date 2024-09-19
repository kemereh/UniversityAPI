import React, { useState } from 'react';

const NewCohortPage = () => {
    const [id, setId] = useState('');
    const [year, setYear] = useState('');
    const [degree, setDegree] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/cohort/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    year,
                    degree: `http://127.0.0.1:8000/api/degree/${degree}/`,
                    name,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create new cohort');
            }


            setYear('');
            setDegree('');
            setName('');
            setId('');
            setIsLoading(false);
            console.log('Not working buddy')
            alert('Cohort created successfully!');
        } catch (error) {
            console.error('Error creating cohort:', error);
            setIsLoading(false);
            alert('Failed to create cohort. Please try again.');
        }
    };

    return (
        <div className="normal">
            <h1>Create New Cohort</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="year">Year:</label>
                    <input
                        type="number"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="degree">Degree:</label>
                    <input
                        type="text"
                        id="degree"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Cohort'}
                </button>
            </form>
        </div>
    );
};

export default NewCohortPage;
