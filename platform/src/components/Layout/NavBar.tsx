import {Link} from "react-router-dom";
import "../../style/layout.css"

const NavBar = () => {
    return (
        <nav className="navbar navbar-light pzsp2-navbar">
            <Link className="navbar-brand pzsp2-navbar-link" to="/">PZSP2</Link>
        </nav>)
}
export default NavBar