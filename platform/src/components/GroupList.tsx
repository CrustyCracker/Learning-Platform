import React, {useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {ErrorResponse} from "../types/ErrorResponse";
import '../style/cardList.css';
import {Link} from "react-router-dom";
import {GroupResponse} from "../types/Groups";

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
    }, [props])

    const isPublicToString = (isPublic: boolean) : string => {
        return isPublic ? "Publiczna" : "Prywatna";
    };

    const tableStyle = {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        tableLayout: "fixed" as unknown as undefined
    }

    const tdStyleWrap = {
        wordWrap: "break-word" as unknown as undefined
    }

    return <html>
        <p>
            <h1>Moje grupy</h1>
        </p>

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
                        <td style={tdStyleWrap}>{group.name}</td>
                        <td style={tdStyleWrap}>{group.description}</td>
                        <td style={tdStyleWrap}>{group.difficulty}</td>
                        <td>{isPublicToString(group.isPublic)}</td>

                        <td><Link to={`${group.id}`} style={{ textDecoration: 'none' }}>{">"}</Link></td>
                    </tr>
                })}
            </tbody>
        </table>
    </html>;
}