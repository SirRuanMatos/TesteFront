import React, { Component } from 'react';
import DivTituloeDescricao from './DivTituloeDescricao';
import GetInfos from '../utils/GetInfos';

class Perfil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            divsInformacoes: '',
            jsonRecebidoRequisicao: this.props.dadosJson
        }


        this.repo = this.repo.bind(this);
        this.estre = this.estre.bind(this);

    }

    componentDidMount() {
        this.atualizaComponenteDivInformacoes(this.props);
    }

    componentWillReceiveProps(props) {
        this.atualizaComponenteDivInformacoes(props);
    }

    atualizaComponenteDivInformacoes(props) {
        var titulos = GetInfos.getTitulos(props.dadosJson);

        var divs = titulos.map((info, indice) => {
            return <DivTituloeDescricao key={indice} titulo={info} descricao={props.dadosJson[info]} />
        });

        this.setState({ divsInformacoes: divs, jsonRecebidoRequisicao: props.dadosJson });
    }

    repo() {
        this.props.telaRepo(this.state.jsonRecebidoRequisicao.repos_url);
    }
    estre() {
        this.props.telaEstre("https://api.github.com/users/" + this.state.jsonRecebidoRequisicao.login + "/starred");
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s6">
                        <button className="btn waves-effect waves-light indigo darken-3" onClick={this.repo}>Repositórios
                            <i className="material-icons right">folder</i>
                        </button>
                    </div>
                    <div className="col s6">
                        <button className="btn waves-effect waves-light  brown darken-3" onClick={this.estre}>Starred
                            <i className="material-icons right">star</i>
                        </button>
                    </div>
                </div>
                <div className="row valign-wrapper">
                    <div className="col s2">
                        <img src={this.state.jsonRecebidoRequisicao.avatar_url} title="Imagem de perfil do usuario" alt="Imagem de perfil do usuario" className="responsive-img circle z-depth-5" />
                    </div>
                    <div className="col s10">
                        <h4>Login: </h4>
                        <p className="mt-0 desc_info_perfil_login">
                            {this.state.jsonRecebidoRequisicao.login}
                            <span className="badge">
                                <b>id:</b>{this.state.jsonRecebidoRequisicao.id}
                            </span>
                            <span className="badge">
                                <b>node_id:</b>{this.state.jsonRecebidoRequisicao.node_id}
                            </span>
                        </p>

                    </div>
                </div>
                <div className="row">
                    {this.state.divsInformacoes}
                </div>

            </div>
        );
    }
}

export default Perfil;