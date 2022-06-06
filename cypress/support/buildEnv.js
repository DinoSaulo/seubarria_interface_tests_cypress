const buildEnv = () => {
    cy.server()//iniciando o servidor que irá simular a API
    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id: 1,
            nome: "User Fake",
            token: "String muito grande, que não eh um token valido"
        }
    }).as('signin')

    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [
            {
                "conta_id": 1226453,
                "conta": "Conta para movimentacoes",
                "saldo": "-1500.00"
            },
            {
                "conta_id": 1226454,
                "conta": "Conta com movimentacao",
                "saldo": "-1500.00"
            },
            {
                "conta_id": 1226455,
                "conta": "Conta para saldo",
                "saldo": "534.00"
            },
            {
                "conta_id": 1226456,
                "conta": "Conta para extrato",
                "saldo": "-220.00"
            },
        ]
    }).as('saldo')

    cy.route({
        method: 'GET',
        url: '/contas',
        response: [
            { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
            { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 }
        ]
    }).as('contas')
}

export default buildEnv