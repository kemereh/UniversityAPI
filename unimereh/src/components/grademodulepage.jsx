import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GradeModulePage = () => {
    const { studentId } = useParams();
    const [grades, setGrades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/grade/?student=${studentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch student grades');
                }
                const data = await response.json();
                setGrades(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching student grades:', error);
                setIsLoading(false);
            }
        };
        fetchGrades();
    }, [studentId]);

    // Function to handle grade submission
    const handleGradeSubmit = async (moduleCode, gradeData) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/grade/?module=${moduleCode}&student=${studentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gradeData),
            });
            if (!response.ok) {
                throw new Error('Failed to set student grade');
            }
            alert('Student grade set successfully!');
        } catch (error) {
            console.error('Error setting student grade:', error);
            alert('Failed to set student grade. Please try again.');
        }
    };

    if (isLoading) {
        return <p>Loading student grades...</p>;
    }

    return (
        <div>
            <h2>Grade Module</h2>
            {grades.map(grade => (
                <div key={grade.id}>
                    <p><strong>Module:</strong> {grade.module}</p>
                    <p><strong>Grade:</strong> {grade.grade}</p>
                    <button onClick={() => handleGradeSubmit(grade.module, { grade: 'A' })}>Set Grade A</button>
                    <button onClick={() => handleGradeSubmit(grade.module, { grade: 'B' })}>Set Grade B</button>
                    {/* Add more options for setting grades */}
                </div>
            ))}
        </div>
    );
};

export default GradeModulePage;
