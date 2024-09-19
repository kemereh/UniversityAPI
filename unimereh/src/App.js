import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllDegreesPage from './components/degree';
import SingleDegreePage from './components/SingleDegreePage';
import StudentNames from './components/students';
import NewDegreePage from './components/createdegree';
import AllModulesPage from './components/modules';
import SingleModulePage from './components/singlemodule';
import ModuleCohort from './components/modulecohort';
import StudentInfo from './components/studentinfo';
import NewStudentPage from './components/newstudentpage';
import NewCohortPage from './components/newcohortpage';
import NewModulePage from './components/newmodulepage';
import SetGradePage from './components/setgrades';

import AllCohortPage from './components/cohorts';

import Navbar from './Navbar';
const App = () => {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<AllDegreesPage />} />
                <Route path="/degree/:degreeId" element={<SingleDegreePage />} />
                <Route path="/cohort/:degreeId" element={<StudentNames />} />
                <Route path="/create" element={<NewDegreePage />} />
                <Route path="/module" element={<AllModulesPage />} />
                <Route path="/module/:moduleId" element={<SingleModulePage />} />
                <Route path="/module/cohort/:moduleId" element={< ModuleCohort />} />
                <Route path="/student/:studentId" element={< StudentInfo />} />
                <Route path="/student/create" element={< NewStudentPage />} />
                <Route path="/cohort/create" element={< NewCohortPage />} />
                <Route path="/module/create" element={< NewModulePage />} />
                <Route path="/grade/set" element={< SetGradePage />} />
                <Route path="/cohort" element={< AllCohortPage />} />
            </Routes>
        </Router>
    );
};

export default App;

