import {GroupResponse} from "../types/Groups";
import React from "react";
import {useNavigate} from "react-router-dom";
import {GetListItemColor} from "../helpers/StyleHelpers";

export function RenderGroupNames(groups: GroupResponse[]) {
    const navigate = useNavigate();

    return <p className="pzsp2-cardform-groups-header"> Grupy: {groups && groups.map(group => {
        const style = "pzsp2-cardform-groups " + GetListItemColor(group.isPublic, false);

        return <span onClick={() => navigate('/groups/' + group.id)} key={group.id}
             className={style}> {`${group.name}, `}
        </span>})}
    </p>
}