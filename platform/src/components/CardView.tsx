import {CardResponse} from "../types/Cards";
import {isPublicToString} from "../helpers/NameHelpers";
import {SecurityHelper} from "../helpers/SecurityHelper";
import React, {FormEvent} from "react";
import {GetListItemColor} from "../helpers/StyleHelpers";

export function CardView(card: CardResponse, onDelete: ((e: FormEvent) => void) | null, onEdit: ((e: FormEvent) => void) | null) {
    return <div className="container-fluid pzsp2-card-cont">
        <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 pzsp2-card-owner-text">
                <h1>
                    Właściciel: {card.username}
                </h1>
                <h4 className={GetListItemColor(card.isPublic, false)} >
                    {isPublicToString(card.isPublic)}
                </h4>
            </div>
        </div>
        <div className="row gy-3">
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card h-100 text-black bg-light pzsp2-card-card" >
                    <div className="card-header">
                        Pytanie
                    </div>
                    <div className="card-body">
                        <small className="card-text pzsp2-card-card-text">
                            {card.question}
                        </small>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card h-100 text-black bg-light pzsp2-card-card" >
                    <div className="card-header">
                        Odpowiedź
                    </div>
                    <div className="card-body">
                        <small className="card-text pzsp2-card-card-text">
                            {card.answer}
                        </small>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="card h-100 text-black bg-light pzsp2-card-card" >
                    <div className="card-header">
                        Źródło
                    </div>
                    <div className="card-body">
                        <small className="card-text pzsp2-card-card-text">
                            {card.source}
                        </small>
                    </div>
                </div>
            </div>
        </div>
        <div className="row pzsp2-card-row-tag">
            <div className="col-lg-6 col-md-6 col-sm-6 pzsp2-card-tag-text">
                {card.tags && <h3>Tagi: {card.tags.join(', ')}</h3>}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 pzsp2-card-buttons">
                {(SecurityHelper.amIAdmin() || card.username === SecurityHelper.getContext()?.username) &&
                    onDelete !== null && onEdit !== null && <>
                    <form className ="pzsp2-card-delete-button" onSubmit={onDelete}>
                        <button type="submit" className="btn btn-outline-danger">
                            Usuń
                        </button>
                    </form>
                    <form className ="pzsp2-card-edit-button" onSubmit={onEdit}>
                        <button type="submit" className="btn btn-outline-success">
                            Edytuj
                        </button>
                    </form>
                </>}
            </div>
        </div>
        <div className="row pzsp2-card-row-grp">
            <div className="col-lg-6 col-md-12 col-sm-12 pzsp2-card-grp-text">
                {card.groups && <h3> Grupy: {card.groups.join(', ')} </h3>}
            </div>
        </div>
    </div>
}