import React from "react";
import { render } from "react-dom";
import * as C from "./styles";
import Select from 'react-select';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'

class Table extends React.Component {

    handleChange = idx => e => {
        const { name, value } = e.target;
        var mySemestre;

        try {
            mySemestre = JSON.parse(localStorage.getItem('semestre')).value || 's1'
        } catch (error) {
            mySemestre = 's1'
        }

        const myStorage = JSON.parse(localStorage.getItem(mySemestre)) || [];

        const rowsInput = [...myStorage];

        rowsInput[idx][name] = value;

        var av1 = parseFloat((rowsInput[idx].av1 !== "") ? rowsInput[idx].av1 : 0)
        var ava1 = parseFloat((rowsInput[idx].ava1 !== "") ? rowsInput[idx].ava1 : 0)
        var av2 = parseFloat((rowsInput[idx].av2 !== "") ? rowsInput[idx].av2 : 0)
        var ava2 = parseFloat((rowsInput[idx].ava2 !== "") ? rowsInput[idx].ava2 : 0)
        var avd = parseFloat((rowsInput[idx].avd !== "") ? rowsInput[idx].avd : 0)

        var media = ((av1 + ava1) + (av2 + ava2) + avd) / 3

        if (media > 10) {
            rowsInput[idx]['media'] = 10;
        } else {
            rowsInput[idx]['media'] = media.toFixed(1);
        }

        if (name !== 'materia') {
            if (media >= 6.0 && av1 >= 4 && av2 >= 4) {
                rowsInput[idx]['status'] = "Aprovado";
            } else {
                rowsInput[idx]['status'] = "Reprovado";
                if (av1 < 4) {
                    rowsInput[idx]['reasons'][0] = "av1";
                } else {
                    rowsInput[idx]['reasons'][0] = ""
                }
                if (av2 < 4) {
                    rowsInput[idx]['reasons'][1] = "av2";
                } else {
                    rowsInput[idx]['reasons'][1] = ""
                }
                if (media < 6) {
                    rowsInput[idx]['reasons'][2] = "media";
                } else {
                    rowsInput[idx]['reasons'][2] = ""
                }
            }
        }

        myStorage.splice(idx, 1);
        localStorage.setItem(mySemestre, JSON.stringify(rowsInput));
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
            media: "",
            reasons: ["", "", ""],
            status: "Aguardando"
        };

        let newRow = [...myStorage, item];

        localStorage.setItem(props, JSON.stringify(newRow));
        this.setState({})
    };
    handleRemoveSpecificRow = (idx) => () => {
        var mySemestre;

        try {
            mySemestre = JSON.parse(localStorage.getItem('semestre')).value || 's1'
        } catch (error) {
            mySemestre = 's1'
        }

        const myStorage = JSON.parse(localStorage.getItem(mySemestre)) || [];
        myStorage.splice(idx, 1);
        localStorage.setItem(mySemestre, JSON.stringify(myStorage));
        this.setState({})
    };
    selectSemestre = (e) => {
        localStorage.setItem('semestre', JSON.stringify({ value: e.value, label: e.label }));
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

        const reasons = [
            { value: 'av1', label: 'Nota da AV1 menor do que 4.' },
            { value: 'av2', label: 'Nota da AV2 menor do que 4.' },
            { value: 'media', label: 'Média menor do que 6.' },
        ]

        const mySemestre = JSON.parse(localStorage.getItem('semestre')) || options[0]
        var myStorage = JSON.parse(localStorage.getItem(mySemestre.value)) || []

        return (
            <C.Container>
                <Select
                    value={mySemestre}
                    defaultValue={mySemestre}
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
                                        <OverlayTrigger
                                            placement="top"
                                            trigger="hover"
                                            overlay={(
                                                <Popover>
                                                    <Popover.Content>
                                                        Nome da matéria.
                                                    </Popover.Content>
                                                </Popover>
                                            )}>
                                            <th className="text-center"> Matéria </th>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            trigger="hover"
                                            overlay={(
                                                <Popover>
                                                    <Popover.Content>
                                                        Nota da primeira avaliação do semestre.
                                                    </Popover.Content>
                                                </Popover>
                                            )}>
                                            <th className="text-center"> AV1 </th>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            trigger="hover"
                                            overlay={(
                                                <Popover>
                                                    <Popover.Content>
                                                        Nota do primeiro ciclo do Avaliando Aprendizado.
                                                    </Popover.Content>
                                                </Popover>
                                            )}>
                                            <th className="text-center"> AVA1 </th>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            trigger="hover"
                                            overlay={(
                                                <Popover>
                                                    <Popover.Content>
                                                        Nota da segunda avaliação do semestre.
                                                    </Popover.Content>
                                                </Popover>
                                            )}>
                                            <th className="text-center"> AV2 </th>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            trigger="hover"
                                            overlay={(
                                                <Popover>
                                                    <Popover.Content>
                                                        Nota do segundo ciclo do Avaliando Aprendizado.
                                                    </Popover.Content>
                                                </Popover>
                                            )}>
                                            <th className="text-center"> AVA2 </th>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            placement="top"
                                            trigger="hover"
                                            overlay={(
                                                <Popover>
                                                    <Popover.Content>
                                                        Nota da avaliação digital.
                                                    </Popover.Content>
                                                </Popover>
                                            )}>
                                            <th className="text-center"> AVD </th>
                                        </OverlayTrigger>
                                        <th className="text-center"> Média </th>
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
                                                <input
                                                    type="number"
                                                    name="media"
                                                    min="0.0"
                                                    max="10.0"
                                                    disabled="true"
                                                    pattern="[0-9]{2}"
                                                    value={myStorage[myStorage.indexOf(x)].media}
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
                                                            <OverlayTrigger
                                                                placement="bottom"
                                                                trigger="hover"
                                                                overlay={(
                                                                    <Popover>
                                                                        <Popover.Title as="h3">Motivos</Popover.Title>
                                                                        <Popover.Content>
                                                                            {myStorage[myStorage.indexOf(x)].reasons.filter(function (x) {
                                                                                return x !== "";
                                                                            }).map(x => <p>{reasons.find((y) => y.value === x).label}</p>)}
                                                                        </Popover.Content>
                                                                    </Popover>
                                                                )}>
                                                                <h4><span className="badge text-light text-bg-danger">Reprovado</span></h4>
                                                            </OverlayTrigger>
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
                                                    Remover
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                onClick={this.handleAddRow(mySemestre.value)}
                                className="btn btn-primary"
                                disabled={(myStorage.length > 6) ? true : false}>
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