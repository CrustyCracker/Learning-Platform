import React from "react";

interface IProps {
}

interface IState {
  msg?: string;
}

class TestComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            msg: 'empty'
        };
    }
    // pzsp2 obrzydliwy ten komponent jest, trzeba przepisać na funkcyjny i ładniejszy

    componentDidMount(): void {
        debugger;
        fetch("http://localhost:8080/start")
            .then(response => response.json())
            .then(data => this.setState({
                msg: data.msg
            }));
    }

    render(): React.ReactNode {
        return this.state.msg;
    }
}

export default TestComponent;