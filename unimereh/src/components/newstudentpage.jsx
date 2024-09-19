import React, { useState } from 'react';

const NewStudentPage = () => {
    const [studentID, setId] = useState('');
    const [firstName, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [cohort, setCohort] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/student/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_id: studentID,
                    first_name: firstName,
                    cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
                    last_name: lastName,
                    email,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create new student');
            }


            setId('');
            setName('');
            setLastName('');
            setEmail('');
            setCohort('');
            setIsLoading(false);
            alert('Student created successfully!');

            
        } catch (error) {
            console.error('Error creating student:', error);
            setIsLoading(false);
            alert('Failed to create student. Please try again.');
        }
    };

    return (
        <div className="normal">
            <h1>Create New Degree</h1>
            <form onSubmit={handleSubmit}>
            <div>
                    <label htmlFor="Student id">Student ID:</label>
                    <input
                        type="text"
                        id="student_id"
                        value={studentID}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="First name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={firstName}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Last name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Cohort">Cohort:</label>
                    <input
                        type="text"
                        id="cohort"
                        value={cohort}
                        onChange={(e) => setCohort(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Email">Email:</label>
                    <input
                        type="fie"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Student'}
                </button>
            </form>
        </div>
    );
};

export default NewStudentPage;
