import React from "react";
import { render } from "react-dom";
import * as C from "./styles";

class Table extends React.Component {
    state = {
        rows: [{}]
    };
    handleChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        rows[idx] = {
            [name]: value
        };
        this.setState({
            rows
        });
    };
    handleAddRow = () => {
        const item = {
            materia: "",
            av1: "",
            ava1: "",
            av2: "",
            ava2: "",
            avd: ""
        };
        this.setState({
            rows: [...this.state.rows, item]
        });
    };
    handleRemoveSpecificRow = (idx) => () => {
        const rows = [...this.state.rows]
        rows.splice(idx, 1)
        this.setState({ rows })
    }
    render() {
        return (
            <C.Container>
                <div className="container">
                    <div className="row clearfix">
                        <div className="col-md-12 column">
                            <table
                                className="table table-bordered table-hover"
                                id="tab_logic"
                            >
                                <thead>
                                    <tr>
                                        <th className="text-center"> # </th>
                                        <th className="text-center"> Matéria </th>
                                        <th className="text-center"> AV1 </th>
                                        <th className="text-center"> AVA1 </th>
                                        <th className="text-center"> AV2 </th>
                                        <th className="text-center"> AVA2 </th>
                                        <th className="text-center"> AVD </th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.rows.map((item, idx) => (
                                        <tr id="addr0" key={idx}>
                                            <td>{idx+1}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="materia"
                                                    value={this.state.rows[idx].materia}
                                                    onChange={this.handleChange(idx)}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="av1"
                                                    value={this.state.rows[idx].av1}
                                                    onChange={this.handleChange(idx)}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="ava1"
                                                    value={this.state.rows[idx].ava1}
                                                    onChange={this.handleChange(idx)}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="av2"
                                                    value={this.state.rows[idx].av2}
                                                    onChange={this.handleChange(idx)}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="ava2"
                                                    value={this.state.rows[idx].ava2}
                                                    onChange={this.handleChange(idx)}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    name="avd"
                                                    value={this.state.rows[idx].avd}
                                                    onChange={this.handleChange(idx)}
                                                    className="form-control"
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={this.handleRemoveSpecificRow(idx)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={this.handleAddRow} className="btn btn-primary">
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