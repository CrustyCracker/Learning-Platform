import {Link, useNavigate,} from "react-router-dom";
import "../../style/layout.css"
import {TokenHelper} from "../../helpers/TokenHelper";

const NavBar = () => {
    const navigate = useNavigate();

    return <div>
        <nav className="navbar navbar-dark pzsp2-navbar">
            <ul className="navbar-nav pzsp2-navbar-nav">
                <li className="nav-item pzsp2-nav-item">
                    <Link className="nav-link pzsp2-navbar-link-main" to="/">IWT</Link>
                </li>
            </ul>
            <ul className="navbar-nav pzsp2-navbar-nav ms-auto">
                {TokenHelper.amILogged() && <li className="nav-item pzsp2-nav-item">
                    <Link className="nav-link pzsp2-navbar-link" to="/account">
                        <i className="bi bi-person"/> Konto
                    </Link>
                </li>}

                {TokenHelper.amILogged() && <li className="nav-item pzsp2-nav-item">
                    <Link onClick={() => {
                        TokenHelper.deleteToken();
                        navigate("/login")
                    }} className="nav-link pzsp2-navbar-link" to="/login">
                        <i className="bi bi-box-arrow-right"/> Wyloguj się
                    </Link>
                </li>}

            </ul>
        </nav>
    </div>
}

export default NavBar
