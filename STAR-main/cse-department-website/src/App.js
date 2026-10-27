import React, { useState } from "react";
import "./App.css";

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-box">CSE</div>
        <div>
          <h2>Computer Science & Engineering</h2>
          <p>Department of CSE</p>
        </div>
      </div>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#academics">Academics</a></li>
        <li><a href="#faculty">Faculty</a></li>
        <li><a href="#research">Research</a></li>
        <li><a href="#facilities">Facilities</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="welcome">WELCOME TO</p>

        <h1>
          Department of
          <span> Computer Science & Engineering</span>
        </h1>

        <p className="hero-text">
          Empowering students through quality education,
          innovative research and technology.
        </p>

        <div className="hero-buttons">
          <a href="#about" className="btn primary">
            Explore Department
          </a>

          <a href="#contact" className="btn secondary">
            Contact Us
          </a>
        </div>
      </div>

      <div className="hero-card">
        <div className="computer-icon">💻</div>
        <h3>Innovation</h3>
        <p>Education • Research • Technology</p>
      </div>
    </section>
  );
}

function News() {
  return (
    <section className="news-section">
      <div className="news-box">
        <h2>Latest News</h2>

        <div className="news-item">
          <span>01</span>
          <div>
            <h4>Department Seminar</h4>
            <p>Expert lecture on Artificial Intelligence.</p>
          </div>
        </div>

        <div className="news-item">
          <span>02</span>
          <div>
            <h4>Student Achievement</h4>
            <p>Our students participated in a national hackathon.</p>
          </div>
        </div>

        <div className="news-item">
          <span>03</span>
          <div>
            <h4>Workshop</h4>
            <p>Hands-on workshop on Web Development.</p>
          </div>
        </div>
      </div>

      <div className="notice-box">
        <h2>Announcements</h2>

        <p>📢 Admission information for new students</p>
        <p>📢 Examination timetable published</p>
        <p>📢 Faculty recruitment notification</p>
        <p>📢 Upcoming technical events</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="section-title">
        <p>ABOUT US</p>
        <h2>About the Department</h2>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>
            The Department of Computer Science and Engineering
            is committed to providing quality education and
            creating an environment for innovation and research.
          </p>

          <p>
            The department prepares students with strong technical
            knowledge, problem-solving skills and practical
            experience required to succeed in the technology industry.
          </p>

          <p>
            Our students and faculty work on modern technologies
            and interdisciplinary research to solve real-world problems.
          </p>
        </div>

        <div className="vision-card">
          <h3>Our Vision</h3>
          <p>
            To become a center of excellence in computer science
            education, research and innovation.
          </p>

          <h3>Our Mission</h3>
          <p>
            To provide quality education, promote research and
            develop skilled professionals for society and industry.
          </p>
        </div>
      </div>
    </section>
  );
}

function Academics() {
  const courses = [
    {
      icon: "🎓",
      title: "B.Tech",
      text: "Undergraduate program in Computer Science and Engineering."
    },
    {
      icon: "📚",
      title: "M.Tech",
      text: "Advanced postgraduate education in computer science."
    },
    {
      icon: "🔬",
      title: "Ph.D.",
      text: "Research program for advanced studies and innovation."
    },
    {
      icon: "💡",
      title: "Research",
      text: "Opportunities for research in emerging technologies."
    }
  ];

  return (
    <section id="academics" className="section academics">
      <div className="section-title">
        <p>ACADEMICS</p>
        <h2>Academic Programs</h2>
      </div>

      <div className="course-grid">
        {courses.map((course, index) => (
          <div className="course-card" key={index}>
            <div className="course-icon">{course.icon}</div>
            <h3>{course.title}</h3>
            <p>{course.text}</p>
            <button>Learn More →</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faculty() {
  const faculty = [
    {
      name: "Dr. Anil Sharma",
      role: "Professor & Head",
      area: "Artificial Intelligence"
    },
    {
      name: "Dr. Priya Patil",
      role: "Associate Professor",
      area: "Machine Learning"
    },
    {
      name: "Dr. Rahul Deshmukh",
      role: "Assistant Professor",
      area: "Computer Networks"
    },
    {
      name: "Dr. Sneha Joshi",
      role: "Assistant Professor",
      area: "Data Science"
    }
  ];

  return (
    <section id="faculty" className="section faculty">
      <div className="section-title">
        <p>PEOPLE</p>
        <h2>Our Faculty</h2>
      </div>

      <div className="faculty-grid">
        {faculty.map((person, index) => (
          <div className="faculty-card" key={index}>
            <div className="faculty-photo">
              👨‍🏫
            </div>

            <h3>{person.name}</h3>
            <p className="role">{person.role}</p>
            <p>{person.area}</p>

            <button>View Profile</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Research() {
  const areas = [
    ["🤖", "Artificial Intelligence"],
    ["🧠", "Machine Learning"],
    ["🔐", "Cyber Security"],
    ["🌐", "Computer Networks"],
    ["📊", "Data Science"],
    ["☁️", "Cloud Computing"],
    ["💻", "Software Engineering"],
    ["⚙️", "Computer Systems"]
  ];

  return (
    <section id="research" className="section research">
      <div className="section-title">
        <p>RESEARCH</p>
        <h2>Research Areas</h2>
      </div>

      <div className="research-grid">
        {areas.map((area, index) => (
          <div className="research-card" key={index}>
            <span>{area[0]}</span>
            <h3>{area[1]}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function Facilities() {
  return (
    <section id="facilities" className="section facilities">
      <div className="section-title">
        <p>FACILITIES</p>
        <h2>Department Facilities</h2>
      </div>

      <div className="facility-grid">
        <div>
          <span>🖥️</span>
          <h3>Computer Labs</h3>
          <p>Modern computing facilities for students and researchers.</p>
        </div>

        <div>
          <span>🔬</span>
          <h3>Research Labs</h3>
          <p>Dedicated spaces for research and innovation.</p>
        </div>

        <div>
          <span>📖</span>
          <h3>Library</h3>
          <p>Books, journals and digital learning resources.</p>
        </div>

        <div>
          <span>📡</span>
          <h3>High Speed Internet</h3>
          <p>Reliable internet connectivity across the department.</p>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-title">
        <p>GET IN TOUCH</p>
        <h2>Contact Us</h2>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h3>Department of Computer Science & Engineering</h3>

          <p>📍 CSE Department, University Campus</p>
          <p>📞 +91 12345 67890</p>
          <p>✉️ cse@example.edu</p>
          <p>🌐 www.example.edu</p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Your Message"></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <h2>CSE Department</h2>
        <p>
          Computer Science & Engineering Department
        </p>
      </div>

      <div>
        <h3>Quick Links</h3>
        <p>Academics</p>
        <p>Research</p>
        <p>Faculty</p>
        <p>Contact</p>
      </div>

      <div>
        <h3>Follow Us</h3>
        <p>GitHub</p>
        <p>LinkedIn</p>
        <p>YouTube</p>
      </div>

      <div className="copyright">
        © 2026 CSE Department. All Rights Reserved.
      </div>
    </footer>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">

      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main>
        <Hero />
        <News />
        <About />
        <Academics />
        <Faculty />
        <Research />
        <Facilities />
        <Contact />
      </main>

      <Footer />

    </div>
  );
}

export default App;