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
                "conta": "Carteira",
                "saldo": "100.00"
            },
            {
                "conta_id": 1226454,
                "conta": "Vanco",
                "saldo": "1000000.00"
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

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            {
                "conta": "Conta mesmo nome",
                "id": 1143427,
                "descricao": "Desc",
                "envolvido": "Inter",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2022-06-06T03:00:00.000Z",
                "data_pagamento": "2022-06-06T03:00:00.000Z",
                "valor": "123.00",
                "status": false,
                "conta_id": 1226452,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para movimentacoes",
                "id": 1143300,
                "descricao": "Movimentacao para exclusao",
                "envolvido": "AAA",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2022-06-06T03:00:00.000Z",
                "data_pagamento": "2022-06-06T03:00:00.000Z",
                "valor": "-1500.00",
                "status": true,
                "conta_id": 1226453,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta com movimentacao",
                "id": 1143301,
                "descricao": "Movimentacao de conta",
                "envolvido": "BBB",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2022-06-06T03:00:00.000Z",
                "data_pagamento": "2022-06-06T03:00:00.000Z",
                "valor": "-1500.00",
                "status": true,
                "conta_id": 1226454,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para saldo",
                "id": 1143303,
                "descricao": "Movimentacao 2, calculo saldo",
                "envolvido": "DDD",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2022-06-06T03:00:00.000Z",
                "data_pagamento": "2022-06-06T03:00:00.000Z",
                "valor": "-1000.00",
                "status": true,
                "conta_id": 1226455,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para saldo",
                "id": 1143304,
                "descricao": "Movimentacao 3, calculo saldo",
                "envolvido": "EEE",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2022-06-06T03:00:00.000Z",
                "data_pagamento": "2022-06-06T03:00:00.000Z",
                "valor": "1534.00",
                "status": true,
                "conta_id": 1226455,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            },
            {
                "conta": "Conta para extrato",
                "id": 1143305,
                "descricao": "Movimentacao para extrato",
                "envolvido": "FFF",
                "observacao": null,
                "tipo": "DESP",
                "data_transacao": "2022-06-06T03:00:00.000Z",
                "data_pagamento": "2022-06-06T03:00:00.000Z",
                "valor": "-220.00",
                "status": true,
                "conta_id": 1226456,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        ]
    })
}

export default buildEnv