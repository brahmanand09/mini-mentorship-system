import { Link } from "react-router-dom";

export default function Navbar() {

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/";
    };

    const role = localStorage.getItem("role");
    return (

        <nav className="navbar">

            <h2 className="nav-heading">Sarthi Mentorship Portal</h2>

            <div className="nav-links">

                <Link to="/dashboard">Dashboard</Link>

                {role === "mentor" && <Link to="/add-student">Add Student</Link>}
               
                {role === "mentor" && <Link to="/ai-summary">AI Summary</Link>}

                <Link to="/mentorship-program">Mentorship</Link>

                <button onClick={logout}>Logout</button>

            </div>

        </nav>

    );

}