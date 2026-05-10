import { Link } from "react-router-dom";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "40px" }}>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "50px",
          padding: "10px 20px",
          borderBottom: "1px solid #ddd"
        }}
      >
        <h2>Welcome Home</h2>

        <div>
            <Link to="/signin">
                <button
                    style={{
                    marginRight: "10px",
                    padding: "10px 18px",
                    border: "1px solid #007bff",
                    backgroundColor: "white",
                    color: "#007bff",
                    borderRadius: "6px",
                    cursor: "pointer"
                    }}
                >
                    Sign In
                </button>
            </Link>
            <Link to="/signup">
                <button
                    style={{
                    padding: "10px 18px",
                    border: "none",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "6px",
                    cursor: "pointer"
                    }}
                >
                    Sign Up
                </button>
            </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Welcome to My Website 🚀</h1>
        <p>Your journey starts here.</p>
      </header>

      {/* Main Button */}
      <section style={{ textAlign: "center", marginBottom: "30px" }}>
        <button
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "220px",
            textAlign: "center"
          }}
        >
          <h3>Fast</h3>
          <p>Lightning fast performance.</p>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "220px",
            textAlign: "center"
          }}
        >
          <h3>Modern</h3>
          <p>Built with React.js technology.</p>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            width: "220px",
            textAlign: "center"
          }}
        >
          <h3>Responsive</h3>
          <p>Looks great on all devices.</p>
        </div>
      </section>
    </div>
  );
}

export default App;