import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleModulePage from './singlemodule';

const StudentInfo = () => {

    const { studentId } = useParams();
    const [students, setStudent] = useState([]);
    const [grades, setGrades] = useState([])


    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchModule = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/student/${studentId}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }
                const data = await response.json();
                console.log('Fetched student data:', data);
                setStudent(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setIsLoading(false);
            }
        };

        fetchModule();
    }, [studentId]);

    useEffect(() => {
        const fetchModule = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/grade/?student=${studentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }
                const data = await response.json();
                console.log('Fetched student data:', data);
                setGrades(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setIsLoading(false);
            }
        };

        fetchModule();
    }, [studentId]);


    const extractCACODE = (moduleUrl) => {
        const parts = moduleUrl.split('/')
        return parts[parts.length -2 ];
    }



    if (isLoading) {
        return <p>Loading student data...</p>;
    }
    

    return (
        <div>
            <h2>Student Details</h2>
                <div>
                {students &&(
                <div>
                    <p><strong>Student ID:</strong> {students.student_id}</p>
                    <p><strong>Student Name:</strong> {students.first_name} {students.last_name}</p>
                    <p><strong>Student Email:</strong> {students.email}</p>
                </div>
            )}
            <h2> Grades:</h2>
            <ul>
                {grades.map(grade => (
                        <li key={grade.id}>
                            <strong>Module:</strong> {extractCACODE(grade.module)}
                            <p><strong>Ca Mark: </strong>{grade.ca_mark}</p>
                            <strong>Exam Mark:</strong> {grade.exam_mark} 
                            <p><strong>Total Grade: </strong>{grade.total_grade}</p>
                            

                            
                                
                        </li>
                        ))}
            </ul>
                </div>
        </div>
    );



};

export default StudentInfo;