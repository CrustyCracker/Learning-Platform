import React, {useEffect, useState} from "react";
import {Requests} from "../requests/Requests";
import {ErrorResponse} from "../types/ErrorResponse";
import '../style/groupList.css';
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

    return <>
        <link
            //pzsp2 -> zrobić ładny import bootstrapa
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
        />

        <h1 className="pzsp2-grouplist-title">Moje grupy</h1>

        {/*//pzsp2 - dodać działanie dla małych okien (patrz cardList)
        paginację i zaokrąglone kąty tabeli*/}
        <table className={"table table-hover table-light pzsp2-grouplist-table"}>
            <thead>
                <tr>
                    <th className="pzsp2-grouplist-table-nam">Nazwa</th>
                    <th className="pzsp2-grouplist-table-des">Opis</th>
                    <th className="pzsp2-grouplist-table-dif">Trudność</th>
                    <th className="pzsp2-grouplist-table-vis">Widoczność</th>
                    <th className="pzsp2-grouplist-table-lin"> </th>
                </tr>
            </thead>
            <tbody>
                {groups && groups.map(group => {
                    return <tr key={group.id}>
                        <td className="pzsp2-grouplist-td-ellipsis">{group.name}</td>
                        <td className="pzsp2-grouplist-td-ellipsis">{group.description}</td>
                        <td className="pzsp2-grouplist-td-wrap">{group.difficulty}</td>
                        <td>{isPublicToString(group.isPublic)}</td>

                        <td><Link className="pzsp2-grouplist-link" to={`${group.id}`}>{">"}</Link></td>
                    </tr>
                })}
            </tbody>
        </table>
        </>;
}