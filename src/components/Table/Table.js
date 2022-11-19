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
            bk: [{}]
        }
    }
    handleChange = idx => e => {
        console.log("aaa" + idx)
        const { name, value } = e.target;
        const myStorage = JSON.parse(localStorage.getItem(this.state.semestre));
        /* var media = ((rows[idx].av1 + rows[idx].ava1) + (rows[idx].av2 + rows[idx].ava2) + rows[idx].avd) */
        /* console.log(media) */
        console.log(this.state)
        console.log("rows" + myStorage)
        console.log(myStorage[idx])

        let newData;

        if (myStorage) {
            newData = [...myStorage, myStorage[idx]];
        } else {
            newData = [myStorage[idx]];
        }

        localStorage.removeItem(this.state.semestre[idx]);
        localStorage.setItem(this.state.semestre, JSON.stringify(newData));
        /* this.setState({
            rows
        }); */
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
            avd: ""
        };

        let newRow = [...myStorage, item];

        localStorage.setItem(props, JSON.stringify(newRow));
        this.setState({})
    };
    handleRemoveSpecificRow = (idx) => () => {
        const myStorage = JSON.parse(localStorage.getItem(this.state.semestre))  || [];
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

        var teste;
        teste = JSON.parse(localStorage.getItem(this.state.semestre))
        if (teste == null) {
            teste = this.state.bk
        }

        return (
            <C.Container>
                <Select
                    value={this.state.semestre.label}
                    defaultValue={this.state.semestre.label}
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
                                    {teste.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="materia"
                                                    value={teste[idx].materia}
                                                    onChange={this.handleChange(idx)}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="av1"
                                                    min="0"
                                                    max="10"
                                                    pattern="[0-9]{2}"
                                                    /* value={this.state.rows[idx].av1}
                                                    onChange={this.handleChange(idx)} */
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="ava1"
                                                    min="0"
                                                    max="1"
                                                    /* value={this.state.rows[idx].ava1}
                                                    onChange={this.handleChange(item.id)} */
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="av2"
                                                    min="0"
                                                    max="10"
                                                    /* value={this.state.rows[item.id].av2}
                                                    onChange={this.handleChange(item.id)} */
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="ava2"
                                                    min="0"
                                                    max="1"
                                                    /* value={this.state.rows[item.id].ava2}
                                                    onChange={this.handleChange(item.id)} */
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="avd"
                                                    min="0"
                                                    max="10"
                                                    /* value={this.state.rows[item.id].avd}
                                                    onChange={this.handleChange(item.id)} */
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <h4><span className="badge text-bg-success">Aprovado</span></h4>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={this.handleRemoveSpecificRow(item.id)}
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