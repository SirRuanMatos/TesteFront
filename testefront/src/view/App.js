import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import Perfil from '../components/Perfil';
import Requisicao from '../utils/Requisicao';
import Repositorios from '../components/Repositorios';
import Estrelados from '../components/Estrelados';
import PopUp from '../utils/PopUp';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { pesquisaUsuario: this.props.match.params.pesquisaUsuario, telaAtual: '', perfil: '' };

        this.pesquisar = this.pesquisar.bind(this);
        this.setTelaRepo = this.setTelaRepo.bind(this);
        this.setTelaEstre = this.setTelaEstre.bind(this);
        this.retornar = this.retornar.bind(this);

    }

    componentDidMount() {
        if (this.state.pesquisaUsuario) {
            this.inputPesquisa.value = this.state.pesquisaUsuario;
            this.requisicao();
        }
    }

    pesquisar(event) {
        event.preventDefault();
        this.requisicao();
    }

    requisicao() {

        document.querySelector("#preloader").classList.toggle("hide");

        var pesquisarUsuario = this.inputPesquisa.value;
        var component = '';

        Requisicao.requisicao('https://api.github.com/users/' + pesquisarUsuario, { method: 'GET', })
            .then(dadosResposta => {
                component = <Perfil dadosJson={dadosResposta} telaRepo={this.setTelaRepo} telaEstre={this.setTelaEstre} />

                this.setState({ telaAtual: component, dadosJson: dadosResposta, perfil: component });
                document.querySelector("#preloader").classList.toggle("hide");
            })
            .catch(error => {
                console.log(error);
                document.querySelector("#preloader").classList.toggle("hide");
                PopUp.exibeMensagem('error', 'Erro usário não encontrado');
            });


    }

    setTelaRepo(urlRepo) {

        var component = <Repositorios urlRepo={urlRepo} retornar={this.retornar} />

        this.setState({ telaAtual: component });
    }

    setTelaEstre(urlEstre) {

        var component = <Estrelados urlEstre={urlEstre} retornar={this.retornar} />

        this.setState({ telaAtual: component });
    }

    retornar() {
        this.setState({ telaAtual: this.state.perfil });
    }


    render() {
        return (
            <div className="container">
                <header >
                    <nav className="row">
                        <div className="nav-wrapper  light-blue lighten-4">
                            <form name="campoPesquisa" onSubmit={this.pesquisar}>
                                <div className="input-field">
                                    <input id="search" type="search" required ref={(input) => this.inputPesquisa = input} />
                                    <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                                    <i className="material-icons">close</i>
                                </div>

                            </form>
                        </div>
                    </nav>
                </header>
                <div className="hide center-align" id="preloader">
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                                <div className="circle"></div>
                            </div><div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.telaAtual}
                </div>

            </div>
        );
    }
}

export default App;