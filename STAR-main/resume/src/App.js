import React from "react";
import "./App.css";

function App() {
  return (
    <div className="resume">

      {/* Header */}
      <header className="header">
        <h1>Rasika Bendugale</h1>

        <h2>React & Node.js Developer</h2>

        <p>Kolhapur, Maharashtra</p>

        <p>
          📞 9988776655 | ✉️ your-email@gmail.com
        </p>
      </header>

      {/* Profile */}
      <section className="section">
        <h3>PROFILE</h3>

        <p>
          Motivated and enthusiastic aspiring Full Stack Developer
          with knowledge of React.js, Node.js, Express.js and MongoDB.
          Passionate about creating responsive and user-friendly
          web applications.
        </p>
      </section>

      {/* Skills */}
      <section className="section">
        <h3>TECHNICAL SKILLS</h3>

        <div className="skills">
          <span>JavaScript</span>
          <span>React.js</span>
          <span>Node.js</span>
          <span>Express.js</span>
          <span>MongoDB</span>
          <span>HTML5</span>
          <span>CSS3</span>
          <span>Git</span>
          <span>GitHub</span>
          <span>REST API</span>
        </div>
      </section>

      {/* Projects */}
      <section className="section">
        <h3>PROJECTS</h3>

        <div className="project">
          <h4>E-Commerce Web Application</h4>

          <p>
            Developed an e-commerce web application using React.js,
            Node.js, Express.js and MongoDB.
          </p>

          <ul>
            <li>Created product listing and product details.</li>
            <li>Implemented shopping cart functionality.</li>
            <li>Created REST APIs using Express.js.</li>
            <li>Used MongoDB for database management.</li>
          </ul>
        </div>

        <div className="project">
          <h4>Task Management Application</h4>

          <p>
            Built a task management application using React.js
            and Node.js.
          </p>

          <ul>
            <li>Create, update and delete tasks.</li>
            <li>Used reusable React components.</li>
            <li>Implemented CRUD operations.</li>
          </ul>
        </div>
      </section>

      {/* Education */}
      <section className="section">
        <h3>EDUCATION</h3>

        <h4>Bachelor's Degree</h4>

        <p>College Name, Kolhapur</p>

        <p>Year of Graduation</p>
      </section>

      {/* Strengths */}
      <section className="section">
        <h3>STRENGTHS</h3>

        <ul>
          <li>Quick Learner</li>
          <li>Problem Solving</li>
          <li>Team Collaboration</li>
          <li>Good Communication</li>
        </ul>
      </section>

    </div>
  );
}

export default App;