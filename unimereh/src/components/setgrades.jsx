import React, { useState, useEffect } from 'react';

const SetGradePage = () => {

    const [studentId, setStudentId] = useState('');
    const [moduleId, setModuleId] = useState('');
    const [caMark, setCaMark] = useState('');
    const [examMark, setExamMark] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isValidStudentId, setIsValidStudentId] = useState(true);
    const [isValidModuleId, setIsValidModuleId] = useState(true);

    useEffect(() => {
        const validateStudentId = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/student/${studentId}/`);
                const data = await response.json();
                setIsValidStudentId(response.ok && !!data);
            } catch (error) {
                console.error('Error validating student ID:', error);
                setIsValidStudentId(false);
            }
        };

        const validateModuleId = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/module/${moduleId}/`);
                const data = await response.json();
                setIsValidModuleId(response.ok && !!data);
            } catch (error) {
                console.error('Error validating module ID:', error);
                setIsValidModuleId(false);
            }
        };

        if (studentId) {
            validateStudentId();
        }

        if (moduleId) {
            validateModuleId();
        }
    }, [studentId, moduleId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const studentResponse = await fetch(`http://127.0.0.1:8000/api/student/${studentId}/`);
            const studentData = await studentResponse.json();
            const cohort = studentData.cohort;

            const existingGradeResponse = await fetch(`http://127.0.0.1:8000/api/grade/?student=${studentId}&module=${moduleId}`);
            const existingGradeData = await existingGradeResponse.json();
            const existingGrade = existingGradeData[0];

            if (existingGrade) {
                await fetch(`http://127.0.0.1:8000/api/grade/${existingGrade.id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        student: existingGrade.student,
                        module: existingGrade.module,
                        ca_mark: parseInt(caMark),
                        exam_mark: parseInt(examMark),
                        cohort: cohort
                    }),
                });
                setMessage('Grade updated');
            } else {
                await fetch('http://127.0.0.1:8000/api/grade/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        student: `http://127.0.0.1:8000/api/student/${studentId}/`,
                        module: `http://127.0.0.1:8000/api/module/${moduleId}/`,
                        ca_mark: parseInt(caMark),
                        exam_mark: parseInt(examMark),
                        cohort: cohort
                    }),
                });
                setMessage('New grade created');
            }

            setStudentId('');
            setModuleId('');
            setCaMark('');
            setExamMark('');
        } catch (error) {
            console.error('Error updating/creating grade:', error);
            setMessage('Error occurred while updating/creating grade.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="normal">
            <h2>Update Grade</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Student ID:
                    <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} maxLength={8} required />
                    {!isValidStudentId && <span style={{ color: 'red' }}>Invalid student ID</span>}
                </label>
                <br />
                <label>
                    Module ID:
                    <input type="text" value={moduleId} onChange={(e) => setModuleId(e.target.value)} required />
                    {!isValidModuleId && <span style={{ color: 'red' }}>Invalid module ID</span>}
                </label>
                <br />
                <label>
                    CA Mark:
                    <input type="number" value={caMark} onChange={(e) => setCaMark(e.target.value)} required />
                </label>
                <br />
                <label>
                    Exam Mark:
                    <input type="number" value={examMark} onChange={(e) => setExamMark(e.target.value)} required />
                </label>
                <br />
                <button type="submit" disabled={isLoading}>Submit</button>
            </form>
            {message && <p>{message}</p>}
            {isLoading && <p>Loading...</p>}
        </div>
    );
}

export default SetGradePage;
