// NewDegreePage.jsx
import React, { useState } from 'react';
import '../App.css'
const NewDegreePage = () => {
    const [full_name, setName] = useState('');
    const [shortcode, setShortcode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/degree/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name,
                    shortcode,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create degree');
            }

            // Reset form fields and loading state after successful submission
            setName('');
            setShortcode('');
            setIsLoading(false);
            alert('Degree created successfully!');
        } catch (error) {
            console.error('Error creating degree:', error);
            setIsLoading(false);
            alert('Failed to create degree. Please try again.');
        }
    };

    return (
        <div className="normal">
            <h1>Create New Degree</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={full_name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="shortcode">Shortcode:</label>
                    <textarea
                        id="shortcode"
                        value={shortcode}
                        onChange={(e) => setShortcode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Degree'}
                </button>
            </form>
        </div>
    );
};

export default NewDegreePage;
