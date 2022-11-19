import React from "react";
import { render } from "react-dom";
import * as C from "./styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            semestre: 's1',
            bk: []
        }
    }
    handleChange = idx => e => {
        const { name, value } = e.target;
        const myStorage = JSON.parse(localStorage.getItem(this.state.semestre)) || [];

        const rowsInput = [...myStorage];

        rowsInput[idx][name] = value;

        var av1 = parseFloat((rowsInput[idx].av1 !== "") ? rowsInput[idx].av1 : 0)
        var ava1 = parseFloat((rowsInput[idx].ava1 !== "") ? rowsInput[idx].ava1 : 0)
        var av2 = parseFloat((rowsInput[idx].av2 !== "") ? rowsInput[idx].av2 : 0)
        var ava2 = parseFloat((rowsInput[idx].ava2 !== "") ? rowsInput[idx].ava2 : 0)
        var avd = parseFloat((rowsInput[idx].avd !== "") ? rowsInput[idx].avd : 0)

        var media = ((av1 + ava1) + (av2 + ava2) + avd)/3

        if (name !== 'materia') {
            if (media >= 6.0) {
                rowsInput[idx]['status'] = "Aprovado";
            } else {
                rowsInput[idx]['status'] = "Reprovado";
            }
        }

        myStorage.splice(idx, 1);
        localStorage.setItem(this.state.semestre, JSON.stringify(rowsInput));
        this.setState({})
    };
    handleAddRow = (props) => () => {
        const myStorage = JSON.parse(localStorage.getItem(props)) || [];
        const item = {
            semestre: props,
            materia: "",
            av1: "",
            ava1: "",
            av2: "",
            ava2: "",
            avd: "",
            status: "Aguardando"
        };

        let newRow = [...myStorage, item];

        localStorage.setItem(props, JSON.stringify(newRow));
        this.setState({})
    };
    handleRemoveSpecificRow = (idx) => () => {
        const myStorage = JSON.parse(localStorage.getItem(this.state.semestre)) || [];
        myStorage.splice(idx, 1);
        localStorage.setItem(this.state.semestre, JSON.stringify(myStorage));
        this.setState({})
    };
    selectSemestre = (e) => {
        this.setState({ semestre: e.value })
    }
    render() {
        const options = [
            { value: 's1', label: '1º Semestre' },
            { value: 's2', label: '2º Semestre' },
            { value: 's3', label: '3º Semestre' },
            { value: 's4', label: '4º Semestre' },
            { value: 's5', label: '5º Semestre' },
            { value: 's6', label: '6º Semestre' },
            { value: 's7', label: '7º Semestre' },
            { value: 's8', label: '8º Semestre' }
        ];

        var myStorage = JSON.parse(localStorage.getItem(this.state.semestre)) || []
        return (
            <C.Container>
                <Select
                    value={this.state.semestre.label}
                    defaultValue={options[0]}
                    onChange={(e) => this.selectSemestre(e)}
                    options={options}
                />
                <div className="container">
                    <div className="row clearfix">
                        <div className="col-md-12 column">
                            <table
                                className="table table-bordered table-hover"
                                id="tab_logic"
                            >
                                <thead>
                                    <tr>
                                        <th className="text-center"> Matéria </th>
                                        <th className="text-center"> AV1 </th>
                                        <th className="text-center"> AVA1 </th>
                                        <th className="text-center"> AV2 </th>
                                        <th className="text-center"> AVA2 </th>
                                        <th className="text-center"> AVD </th>
                                        <th className="text-center"> Status </th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {myStorage.map((x) => (
                                        <tr id="addr0" key={myStorage.indexOf(x)}>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="materia"
                                                    value={myStorage[myStorage.indexOf(x)].materia}
                                                    onChange={this.handleChange(myStorage.indexOf(x))}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="av1"
                                                    min="0.0"
                                                    max="10.0"
                                                    pattern="[0-9]{2}"
                                                    value={myStorage[myStorage.indexOf(x)].av1}
                                                    onChange={this.handleChange(myStorage.indexOf(x))}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="ava1"
                                                    min="0.0"
                                                    max="1.0"
                                                    pattern="[0-9]{1}"
                                                    value={myStorage[myStorage.indexOf(x)].ava1}
                                                    onChange={this.handleChange(myStorage.indexOf(x))}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="av2"
                                                    min="0.0"
                                                    max="10.0"
                                                    pattern="[0-9]{2}"
                                                    value={myStorage[myStorage.indexOf(x)].av2}
                                                    onChange={this.handleChange(myStorage.indexOf(x))}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="ava2"
                                                    min="0.0"
                                                    max="1.0"
                                                    pattern="[0-9]{1}"
                                                    value={myStorage[myStorage.indexOf(x)].ava2}
                                                    onChange={this.handleChange(myStorage.indexOf(x))}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="avd"
                                                    min="0.0"
                                                    max="10.0"
                                                    pattern="[0-9]{2}"
                                                    value={myStorage[myStorage.indexOf(x)].avd}
                                                    onChange={this.handleChange(myStorage.indexOf(x))}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                {(() => {
                                                    if (myStorage[myStorage.indexOf(x)].status === 'Aguardando') {
                                                        return (
                                                            <h4><span className="badge text-light text-bg-info">Aguardando</span></h4>
                                                        )
                                                    } else if (myStorage[myStorage.indexOf(x)].status === 'Aprovado') {
                                                        return (
                                                            <h4><span className="badge text-light text-bg-success">Aprovado</span></h4>
                                                        )
                                                    } else if (myStorage[myStorage.indexOf(x)].status === 'Reprovado') {
                                                        return (
                                                            <h4><span className="badge text-light text-bg-danger">Reprovado</span></h4>
                                                        )
                                                    } else {
                                                        return (
                                                            <h4><span className="badge text-light text-bg-warning">Erro</span></h4>
                                                        )
                                                    }
                                                })()}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={this.handleRemoveSpecificRow(myStorage.indexOf(x))}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={this.handleAddRow(this.state.semestre)} className="btn btn-primary">
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </C.Container>
        );
    }
}

render(<Table />, document.getElementById("root"));

export default Table;