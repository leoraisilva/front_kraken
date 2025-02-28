import "./header.css"
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <nav className=" container-header navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid ">
                <Link to="/kraken/" className="navbar-brand">Kraken</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/kraken/list" className="nav-link">Category</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/kraken/setting" className="nav-link">Setting</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/kraken/checking" className="nav-link">Checking</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/kraken/register" className="nav-link">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/kraken/historic" className="nav-link">Historico</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" aria-disabled="true">logout</a>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
            </nav>
        </>
    )
}

export default Header;