import React, {useEffect, useState} from 'react';
import '../style/App.css';
import '../style/groupList.css';
import {ErrorAndInfo} from "../components/ErrorAndInfo";
import {GroupList} from "../components/GroupList";
import Layout from "../components/layout/Layout";
import {SecurityHelper} from "../helpers/SecurityHelper";
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {GroupResponse} from "../types/Groups";
import {Requests} from "../requests/Requests";
import {BackButton} from "../components/BackButton";

export default function MyGroupsPage() {
    const [error, setError] = useState("");
    const [groups, setGroups] = useState<GroupResponse[]>([]);

    useEffect(() => {
        Requests.myGroups().then(res => {
            if (res.err) {
                setGroups([]);
                setError(res.err.userMessage);
            }
            else if (res.res){
                setGroups(res.res);
            }
        });
    }, [])

    if(!SecurityHelper.amILogged())
        return <Navigate to="/login" />

    return <>
        <Helmet>
            <title>Inżynierka w tydzień ∙ Moje grupy</title>
        </Helmet>
        <Layout>
            <BackButton/>
            <div className="App container-fluid pzsp2-mygroups-page-cont">
                <ErrorAndInfo errorMsg={error} infoMsg={""} />
                <h1 className="pzsp2-grouplist-title">Moje grupy</h1>
                <GroupList groups={groups} pub={false} />
            </div>
        </Layout>
    </>;
}