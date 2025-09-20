import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import MessageForm from './components/MessageForm';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/form" element={<MessageForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
