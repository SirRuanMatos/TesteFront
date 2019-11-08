import React, { Component } from 'react';

class DivTituloeDescricao extends Component {

    render() {
        return (
            <div className="col s6 ">
                <h5>{this.props.titulo}: </h5>
                <p className="mt-0 desc_info_perfil">
                    {this.props.descricao}
                </p>
            </div>
        );
    }
}

export default DivTituloeDescricao;