import React from "react";
import {Link} from "react-router-dom";
import '../style/card.css';
import '../style/mainMenu.css';

export function MainMenu() {
    return(<>
    <link
        //pzsp2 -> zrobić ładny import bootstrapa
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
    />
    <div className="container-fluid pzsp2-mainmenu-cont">
        <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 p-3">
                <div className="card h-100 text-white pzsp2-mainmenu-card">
                    <Link className="stretched-link pzsp2-mainmenu-card-link" to={"cards/new"}>
                        <i className="bi bi-plus-square text-white"> </i> Dodaj fiszkę
                    </Link>
                </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 p-3">
                <div className="card h-100 text-white pzsp2-mainmenu-card">
                    <Link className="stretched-link pzsp2-mainmenu-card-link" to={"groups/new"}>
                        <i className="bi bi-plus-square text-white"> </i> Dodaj grupę
                    </Link>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 p-3">
                <div className="card h-100 text-white pzsp2-mainmenu-card">
                    <Link className="stretched-link pzsp2-mainmenu-card-link" to={"cards"}>
                        <i className="bi bi-list text-white"> </i> Moje fiszki
                    </Link>
                </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 p-3">
                <div className="card h-100 text-white pzsp2-mainmenu-card">
                    <Link className="stretched-link pzsp2-mainmenu-card-link" to={"groups"}>
                        <i className="bi bi-list text-white"> </i> Moje grupy
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </>)
}