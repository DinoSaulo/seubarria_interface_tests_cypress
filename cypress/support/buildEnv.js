import requests from './requests'

const buildEnv = () => {
    cy.server()//iniciando o servidor que irá simular a API
    cy.route(requests.POST.SIGNIN).as('signin')

    cy.route(requests.GET.SALDO_INICIAL).as('saldo')

    cy.route(requests.GET.CONTAS_INICIAIS).as('contas')

    cy.route(requests.GET.EXTRATO_INICIAL).as('extratoInicial')
}

export default buildEnv