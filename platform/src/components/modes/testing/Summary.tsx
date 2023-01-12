export function Summary(props: {score: number, outOf: number}) {

    return <div className="App pzsp2-login-page-cont">
        <h2 className="pzsp2-cardlist-title">Ukończono test!</h2>
        <h3>Twój wynik to {props.score} / {props.outOf}</h3>
        <h3>Brawo!</h3>
    </div>
}