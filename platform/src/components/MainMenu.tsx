import React from "react";
import {Link} from "react-router-dom";
import '../style/card.css';
import '../style/mainMenu.css';

export function MainMenu() {
    return(<>
    <div className="container-fluid pzsp2-mainmenu-cont">
        <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 p-3">
                <div className="card h-100 text-white pzsp2-mainmenu-card">
                    <Link className="stretched-link pzsp2-mainmenu-card-link" to={"cards/new"}>
                        <i className="bi bi-plus-square text-white"/> Dodaj fiszkę
                    </Link>
                </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 p-3">
                <div className="card h-100 text-white pzsp2-mainmenu-card">
                    <Link className="stretched-link pzsp2-mainmenu-card-link" to={"groups/new"}>
                        <i className="bi bi-plus-square text-white"/> Dodaj grupę
                    </Link>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 p-3">
                <div className="card h-100 text-white pzsp2-mainmenu-card">
                    <Link className="stretched-link pzsp2-mainmenu-card-link" to={"cards"}>
                        <i className="bi bi-person-lines-fill"/> Moje fiszki
                    </Link>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 p-3">
                <div className="card h-100 text-white pzsp2-mainmenu-card">
                    <Link className="stretched-link pzsp2-mainmenu-card-link" to={"cards/pub"}>
                        <i className="bi bi-list text-white"/> Publiczne fiszki
                    </Link>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 p-3">
                <div className="card h-100 text-white pzsp2-mainmenu-card">
                    <Link className="stretched-link pzsp2-mainmenu-card-link" to={"groups"}>
                        <i className="bi bi-person-lines-fill"/> Moje grupy
                    </Link>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 p-3">
                <div className="card h-100 text-white pzsp2-mainmenu-card">
                    <Link className="stretched-link pzsp2-mainmenu-card-link" to={"groups/pub"}>
                        <i className="bi bi-list text-white"/> Publiczne grupy
                    </Link>
                </div>
            </div>
        </div>
    </div>
    </>)
}