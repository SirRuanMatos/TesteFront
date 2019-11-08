const Requisicao = {
    requisicao: (url, informacoesRequisicao) => {

        return fetch(url, informacoesRequisicao)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                } else {
                    throw new Error('Não foi possí­vel fazer a requisicao');
                }
            })
    }
}


export default Requisicao;