import React from "react";
import '../style/groupList.css';
import {Link} from "react-router-dom";
import {GroupResponse} from "../types/Groups";
import {isPublicToString} from "../helpers/NameHelpers";
import {GetListItemColor} from "../helpers/StyleHelpers";

interface GroupListProps {
    groups: GroupResponse[],
    pub: boolean
}

export function GroupList(props: GroupListProps) {

    return <>
        <table className={"table table-hover table-light pzsp2-grouplist-table"}>
            <thead>
                <tr>
                    <th className="pzsp2-grouplist-table-nam">Nazwa</th>
                    <th className="pzsp2-grouplist-table-des">Opis</th>
                    <th className="pzsp2-grouplist-table-dif hide-on-small">Trudność</th>
                    <th className="pzsp2-grouplist-table-des">Rozmiar</th>
                    {!props.pub && <th className="pzsp2-grouplist-table-vis hide-on-medium">Widoczność</th>}
                    {props.pub && <th className="pzsp2-grouplist-table-vis hide-on-medium">Właściciel</th>}
                    <th className="pzsp2-grouplist-table-lin"> </th>
                </tr>
            </thead>
            <tbody>
                {props.groups && props.groups.map(group => {
                    return <tr key={group.id} className={GetListItemColor(group.isPublic, false)}>
                        <td className="pzsp2-grouplist-td-ellipsis">{group.name}</td>
                        <td className="pzsp2-grouplist-td-ellipsis">{group.description}</td>
                        <td className="pzsp2-grouplist-td-wrap hide-on-small">{group.difficulty}</td>
                        <td className="pzsp2-grouplist-td-ellipsis">{group.cardIds.length}</td>
                        {!props.pub && <td className="hide-on-medium">{isPublicToString(group.isPublic)}</td>}
                        {props.pub && <td className="hide-on-medium">{group.username}</td>}

                        <td><Link className="pzsp2-link" to={`/groups/${group.id}`}>{">"}</Link></td>
                    </tr>
                })}
            </tbody>
        </table>
        </>;
}