import {Link} from "react-router-dom";
import "../../style/layout.css"
import Cookies from "universal-cookie";

const NavBar = () => {
    const logOut = () => {
        const cookies = new Cookies();
        cookies.remove('JWTTOKEN');
    }

    return (
        <nav className="navbar navbar-light pzsp2-navbar">
            <Link className="navbar-brand pzsp2-navbar-link" to="/">PZSP2</Link>
            <Link className="navbar-brand pzsp2-navbar-link" to="/login">Zaloguj</Link>
            <Link onClick={logOut} className="navbar-brand pzsp2-navbar-link" to="/login">Wyloguj się</Link>
        </nav>)
}
export default NavBar