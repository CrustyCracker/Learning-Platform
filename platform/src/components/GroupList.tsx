import React, {useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {ErrorResponse} from "../types/ErrorResponse";
import '../style/cardList.css';
import {Link} from "react-router-dom";
import {GroupResponse} from "../types/Groups";
import {isPublicToString} from "../helpers/NameHelpers";

interface GroupListProps {
    onSuccess: (response: GroupResponse[]) => void,
    onError: (err: ErrorResponse) => void
}

export function GroupList(props: GroupListProps) {
    const [groups, setGroups] = useState<GroupResponse[]>([]);


    useEffect(() => {
        Requests.myGroups().then(res => {
            if (res.err) {
                setGroups([]);
                props.onError(res.err);
            }
            else if (res.res){
                setGroups(res.res);
                props.onSuccess(res.res);
            }
        });
    }, [])

    const tableStyle = {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        tableLayout: "fixed" as unknown as undefined
    }

    return <>
    <link
        //pzsp2 -> zrobić ładny import bootstrapa
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
    />
    <h1>Moje grupy</h1>

    <table style={tableStyle} className={"table table-dark center"}>
        <thead>
            <tr>
                <th style={{ width: "40%" }}>Nazwa</th>
                <th style={{ width: "15%" }}>Opis</th>
                <th style={{ width: "10%" }}>Trudność</th>
                <th style={{ width: "10%" }}>Widoczność</th>
                <th style={{ width: "5%" }}> </th>
            </tr>
        </thead>
        <tbody>
            {groups && groups.map(group => {
                return <tr key={group.id}>
                    <td className="pzsp-td-ellipsis">{group.name}</td>
                    <td className="pzsp-td-ellipsis">{group.description}</td>
                    <td className="pzsp-td-wrap">{group.difficulty}</td>
                    <td>{isPublicToString(group.isPublic)}</td>

                    <td><Link to={`${group.id}`} style={{ textDecoration: 'none' }}>{">"}</Link></td>
                </tr>
            })}
        </tbody>
    </table>
    </>;
}