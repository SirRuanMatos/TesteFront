import React, { Component } from 'react';
import Requisicao from "../utils/Requisicao";
import GetInfos from "../utils/GetInfos";
import DivTituloeDescricao from "./DivTituloeDescricao";
import PopUp from "../utils/PopUp";

class Repositorios extends Component {
    constructor(props) {
        super(props);

        this.state = { divsInformacoes: '', repositoriosArray: [], renderDiv: '', paginacao: '' };

        this.alteraAbaRepositorio = this.alteraAbaRepositorio.bind(this);
    }

    componentDidMount() {
        document.querySelector("#preloader").classList.toggle("hide");
        Requisicao.requisicao(this.props.urlRepo, { method: 'GET', })
            .then(res => {

                this.setState({ repositoriosArray: res });
            })
            .then(() => {
                var divs;
                var paginas;

                paginas = this.state.repositoriosArray.map((informacoes, indice) => {
                    return <li key={"paginacao" + indice} className="bota_paginacao" ><button className="btn-floating btn-small waves-effect waves-light red" onClick={() => this.alteraAbaRepositorio(indice)}>{indice + 1}</button></li>;
                });

                console.log(this.state.repositoriosArray);


                this.state.repositoriosArray.map((informacoes, indice) => {

                    var titulos = GetInfos.getTitulos(informacoes);
                    divs = titulos.map((info, ind) => {
                        if (info === "owner") {
                            return (
                                <DivTituloeDescricao key={indice + "id" + ind} titulo={info} descricao={informacoes[info].login} />
                            );
                        }
                        if (info === "license" && informacoes[info] != null) {
                            return (
                                <div className="col s6 ">
                                    <h4>license: </h4>
                                    <p><b>key: </b>{informacoes[info].key}</p>
                                    <p><b>name: </b>{informacoes[info].name}</p>
                                    <p><b>node_id: </b>{informacoes[info].node_id}</p>
                                    <p><b>spdx_id: </b>{informacoes[info].spdx_id}</p>
                                    <p><b>url: </b>{informacoes[info].url}</p>

                                </div>

                            );
                        }
                        return (
                            <DivTituloeDescricao key={indice + "id" + ind} titulo={info} descricao={informacoes[info]} />
                        );
                    });

                    this.setState({ divsInformacoes: [...this.state.divsInformacoes, divs], renderDiv: this.state.divsInformacoes[0] });

                });

                var paginacao = (
                    <ul className="pagination">
                        {paginas}
                    </ul>
                );

                this.setState({ paginacao: paginacao });
                document.querySelector("#preloader").classList.toggle("hide");

            })
            .catch((error) => {
                console.log(error);
                PopUp.exibeMensagem('error', 'Erro repositórios não encontrados');
                document.querySelector("#preloader").classList.toggle("hide");
            });
    }

    alteraAbaRepositorio(idBtn) {
        this.setState({ renderDiv: this.state.divsInformacoes[idBtn] });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s10">
                        {this.state.paginacao}
                    </div>
                    <div className="col s2">
                        <button className="waves-effect waves-light btn-small" onClick={this.props.retornar}><i className="material-icons">arrow_back</i></button>
                    </div>

                </div>
                <div className="row">
                    {this.state.renderDiv}
                </div>
                <div className="row">
                    <button className="waves-effect waves-light btn-small" onClick={this.props.retornar}><i className="material-icons">arrow_back</i></button>
                </div>
            </div>

        );
    }
}

export default Repositorios;