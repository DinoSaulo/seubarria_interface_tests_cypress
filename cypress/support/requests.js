const requests = {
    GET: {
        SALDO_INICIAL: {
            method: 'GET',
            url: '/saldo',
            response: [
                {
                    conta_id: 1226453,
                    conta: "Carteira",
                    saldo: "100.00"
                },
                {
                    conta_id: 1226454,
                    conta: "Vanco",
                    saldo: "1000000.00"
                },
            ]
        },
        CONTAS_INICIAIS: {
            method: 'GET',
            url: '/contas',
            response: [
                { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
                { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 }
            ]
        },
        EXTRATO_INICIAL: {
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
        },
        CONTAS_ATUAIS: {
            method: 'GET',
            url: '/contas',
            response: [
                { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Banco", visivel: true, usuario_id: 1 },
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
            ]
        },
        CONTAS_PARA_EDITAR: {
            method: 'GET',
            url: '/contas',
            response: [
                { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Banco", visivel: true, usuario_id: 1 }
            ]
        },
        CONTAS_POS_EDICAO: {
            method: 'GET',
            url: '/contas',
            response: [
                { id: 1, nome: "Conta alterada", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Banco", visivel: true, usuario_id: 1 }
            ]
        },
        TRANSACAO_MOV_1: {
            method: 'GET',
            url: '/transacoes/**',
            response: {
                conta: "Conta para saldo",
                id: 1143427,
                descricao: "Movimentacao 1, calculo saldo",
                envolvido: "CCC",
                observacao: null,
                tipo: "REC",
                data_transacao: "2022-06-06T03:00:00.000Z",
                data_pagamento: "2022-06-06T03:00:00.000Z",
                valor: "3500.00",
                status: false,
                conta_id: 1226452,
                usuario_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            },
        },
        SALDO_FINAL: {
            method: 'GET',
            url: '/saldo',
            response: [
                {
                    conta_id: 1226453,
                    conta: "Carteira",
                    saldo: "4034.00"
                },
                {
                    conta_id: 1226454,
                    conta: "Vanco",
                    saldo: "10000000.00"
                },
            ]
        },
        CONTAS_SAVE: {
            method: 'GET',
            url: '/contas',
            response: [
                { id: 1, nome: "Carteira", visivel: true, usuario_id: 1 },
                { id: 2, nome: "Banco", visivel: true, usuario_id: 1 },
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
            ]
        },
        EXTRATOS_DIVERSIFICADOS: {
            method: 'GET',
            url: '/extrato/**',
            response: [
                {
                    conta: "Conta para movimentacoes",
                    id: 1143427,
                    descricao: "Receita paga",
                    envolvido: "AAA",
                    observacao: null,
                    tipo: "REC",
                    data_transacao: "2022-06-06T03:00:00.000Z",
                    data_pagamento: "2022-06-06T03:00:00.000Z",
                    valor: "123.00",
                    status: true,
                    conta_id: 1226452,
                    usuario_id: 1,
                    transferencia_id: null,
                    parcelamento_id: null
                },
                {
                    conta: "Conta para movimentacoes",
                    id: 1143300,
                    descricao: "Receita pendente",
                    envolvido: "BBB",
                    observacao: null,
                    tipo: "REC",
                    data_transacao: "2022-06-06T03:00:00.000Z",
                    data_pagamento: "2022-06-06T03:00:00.000Z",
                    valor: "-1500.00",
                    status: false,
                    conta_id: 1226453,
                    usuario_id: 1,
                    transferencia_id: null,
                    parcelamento_id: null
                },
                {
                    conta: "Conta para saldo",
                    id: 1143301,
                    descricao: "Despesa paga",
                    envolvido: "CCC",
                    observacao: null,
                    tipo: "DESP",
                    data_transacao: "2022-06-06T03:00:00.000Z",
                    data_pagamento: "2022-06-06T03:00:00.000Z",
                    valor: "-1500.00",
                    status: true,
                    conta_id: 1226454,
                    usuario_id: 1,
                    transferencia_id: null,
                    parcelamento_id: null
                },
                {
                    conta: "Conta para saldo",
                    id: 1143303,
                    descricao: "Despesa pendente",
                    envolvido: "DDD",
                    observacao: null,
                    tipo: "DESP",
                    data_transacao: "2022-06-06T03:00:00.000Z",
                    data_pagamento: "2022-06-06T03:00:00.000Z",
                    valor: "-1000.00",
                    status: false,
                    conta_id: 1226455,
                    usuario_id: 1,
                    transferencia_id: null,
                    parcelamento_id: null
                }
            ]
        }
    },
    POST: {
        SIGNIN: {
            method: 'POST',
            url: '/signin',
            response: {
                id: 1,
                nome: "User Fake",
                token: "String muito grande, que não eh um token valido"
            }
        },
        CRIAR_CONTA: {
            method: 'POST',
            url: '/contas',
            response: { id:3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
        },
        CONTA_MESMO_NOME: {
            method: 'POST',
            url: '/contas',
            status: 400,
            response: { error: "Já existe uma conta com esse nome!" }
        },
        CRIAR_TRANSACAO: {
            method: 'POST',
            url: '/transacoes',
            response: {
                id: 1143427,
                descricao: "Desc",
                envolvido: "Inter",
                observacao: null,
                tipo: "REC",
                data_transacao: "2022-06-06T03:00:00.000Z",
                data_pagamento: "2022-06-06T03:00:00.000Z",
                valor: "123.00",
                status: false,
                conta_id: 1,
                usuario_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            }
        },
        EXTRATO_COM_FIXTURE: {
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        },
        FN_CONTA_COM_STUB: (reqStub) => ({
            method: 'POST',
            url: '/contas',
            response: { id:3, nome: 'Conta de teste', visivel: true, usuario_id: 1 },
            /*onRequest: req => {
                console.log(req)
                expect(req.request.body.nome).to.be.empty
                expect(req.request.headers).to.have.property('Authorization')
            }*/
            onRequest: reqStub
        })
    },
    PUT: {
        CONTA_ALTERADA: {
            method: 'PUT',
            url: '/contas/**',
            response: { id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1 }
        },
        TRANSACAO_MOV_1: {
            method: 'PUT',
            url: '/transacoes/**',
            response: {
                conta: "Conta para saldo",
                id: 1143427,
                descricao: "Movimentacao 1, calculo saldo",
                envolvido: "CCC",
                observacao: null,
                tipo: "REC",
                data_transacao: "2022-06-06T03:00:00.000Z",
                data_pagamento: "2022-06-06T03:00:00.000Z",
                valor: "3500.00",
                status: false,
                conta_id: 1226452,
                usuario_id: 1,
                transferencia_id: null,
                parcelamento_id: null
            },
        }
    },
    DELETE: {
        TRANSACTIONS: {
            method: 'DELETE',
            url: '/transacoes/**',
            status: 204,
            response: {},
        }
    }
}

export default requests;