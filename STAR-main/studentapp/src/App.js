// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// class HelloWorld extends React.Component {
//   render(){
//     return(
//       <div>
//         <h1>HelloWorld!</h1>
//       </div>
//     )
//   }
// }
// export default HelloWorld;
import React, { useState } from "react";

function App() {
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    course: "",
    address: "",
  });

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(student);
    alert("Student Registration Successful!");

    setStudent({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      course: "",
      address: "",
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Student Registration</h1>
        <p style={styles.subtitle}>
          Complete the form below to register a new student.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.row}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={student.firstName}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={student.lastName}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={student.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={student.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <div style={styles.row}>
            <select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              type="date"
              name="dob"
              value={student.dob}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <select
            name="course"
            value={student.course}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Course</option>
            <option>BCA</option>
            <option>B.Sc</option>
            <option>B.Com</option>
            <option>BBA</option>
            <option>B.Tech</option>
            <option>MCA</option>
            <option>MBA</option>
          </select>

          <textarea
            name="address"
            placeholder="Address"
            rows="4"
            value={student.address}
            onChange={handleChange}
            style={styles.textarea}
            required
          ></textarea>

          <button type="submit" style={styles.button}>
            Register Student
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f7fc",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    color: "#1f4e79",
    marginBottom: "5px",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "25px",
  },

  row: {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
  },

  input: {
    flex: 1,
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
    marginBottom: "20px",
    resize: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#1f4e79",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default App;