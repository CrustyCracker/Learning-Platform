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
    }, )

    return <>
        {/*//pzsp2 - dodać paginację*/}
        <table className={"table table-hover table-light pzsp2-grouplist-table"}>
            <thead>
                <tr>
                    <th className="pzsp2-grouplist-table-nam">Nazwa</th>
                    <th className="pzsp2-grouplist-table-des">Opis</th>
                    <th className="pzsp2-grouplist-table-dif hide-on-small">Trudność</th>
                    <th className="pzsp2-grouplist-table-vis hide-on-medium">Widoczność</th>
                    <th className="pzsp2-grouplist-table-lin"> </th>
                </tr>
            </thead>
            <tbody>
                {groups && groups.map(group => {
                    return <tr key={group.id}>
                        <td className="pzsp2-grouplist-td-ellipsis">{group.name}</td>
                        <td className="pzsp2-grouplist-td-ellipsis">{group.description}</td>
                        <td className="pzsp2-grouplist-td-wrap hide-on-small">{group.difficulty}</td>
                        <td className="hide-on-medium">{isPublicToString(group.isPublic)}</td>

                        <td><Link className="pzsp2-link" to={`${group.id}`}>{">"}</Link></td>
                    </tr>
                })}
            </tbody>
        </table>
        </>;
}