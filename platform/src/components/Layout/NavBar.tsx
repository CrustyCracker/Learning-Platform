import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-light" style={{ minHeight: "5%", margin: "0", paddingLeft: "1%", borderBottom: "2px solid #000", backgroundColor: "#F0EAD2", position: "absolute", top: 0, width: "100%"}}>
            <Link className="navbar-brand" to="/">PZSP2</Link>
        </nav>)
}
export default NavBar