export function Summary(props: {score: number, outOf: number}) {

    return <div className="App pzsp2-login-page-cont">
        <div className="row pzsp2-login-row">
            <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="card text-black bg-light pzsp2-login-card">
                    <h2 className="pzsp2-cardlist-title">Ukończono test!</h2>
                    <h3>Twój wynik to {props.score} / {props.outOf}</h3>
                    <h3>Brawo!</h3>
                </div>
            </div>
        </div>
    </div>
}