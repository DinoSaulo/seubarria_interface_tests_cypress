/// <reference types="cypress"/>

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test at an interface level', () => {

    let token

    before( () => {
    })

    beforeEach(() => {
        buildEnv()
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.login('a@a', 'senha erradaaaaaaaaaa')
    })

    after(() => {
        cy.clearLocalStorage()
    })

    it('Should create an acount', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id:3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
        }).as('saveConta')

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()

        cy.closeAllToasts()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
                { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 },
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
            ]
        }).as('contas')


        cy.inserirConta('Conta de teste')
        cy.get(loc.TOAST.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should edit an acount', () => {

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
                { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 }
            ]
        }).as('contas')

        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: { "id": 1, "nome": 'Conta alterada', "visivel": true, "usuario_id": 1 }
        })

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { "id": 1, "nome": "Conta alterada", "visivel": true, "usuario_id": 1 },
                { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 }
            ]
        }).as('contasSave')

        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.TOAST.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {

        cy.route({
            method: 'POST',
            url: '/contas',
            status: 400,
            response: { "error": "Já existe uma conta com esse nome!" }
        }).as('saveContaMesmoNome')

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.closeAllToasts()
        cy.inserirConta('Conta mesmo nome')

        cy.get(loc.TOAST.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {

        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {
                "id": 1143427,
                "descricao": "Desc",
                "envolvido": "Inter",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2022-06-06T03:00:00.000Z",
                "data_pagamento": "2022-06-06T03:00:00.000Z",
                "valor": "123.00",
                "status": false,
                "conta_id": 1,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        })

        cy.get(loc.MENU.MOVIENTACAO).click()

        cy.get(loc.MOVIENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIENTACAO.VALOR).type('123')
        cy.get(loc.MOVIENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIENTACAO.CONTA).select('Carteira')
        cy.get(loc.MOVIENTACAO.STATUS).click()
        cy.get(loc.MOVIENTACAO.BTN_SALVAR).click()

        cy.get(loc.TOAST.MESSAGE).should('contain', 'sucesso')
        //cy.url().should('contain', '/extrato')
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get ballance', () => {

        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response: {
                "conta": "Conta para saldo",
                "id": 1143427,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2022-06-06T03:00:00.000Z",
                "data_pagamento": "2022-06-06T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 1226452,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            },
        })

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response: {
                "conta": "Conta para saldo",
                "id": 1143427,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2022-06-06T03:00:00.000Z",
                "data_pagamento": "2022-06-06T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 1226452,
                "usuario_id": 1,
                "transferencia_id": null,
                "parcelamento_id": null
            },
        })

        cy.get(loc.MENU.HOME).click()
        //cy.xpath(loc.HOME.XP_TABLE_DATA).should('contain', 'Carteira')
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 2, calculo saldo')).click()
        //cy.wait(1000)
        //cy.get(loc.MOVIENTACAO.DESCRICAO).should('have.value', 'Movimentacao 2, calculo saldo') //verificação para manter o sincronismo
        cy.get(loc.MOVIENTACAO.STATUS).click()
        cy.get(loc.MOVIENTACAO.BTN_SALVAR).click()

        cy.get(loc.TOAST.MESSAGE).should('contain', 'sucesso')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [
                {
                    "conta_id": 1226453,
                    "conta": "Carteira",
                    "saldo": "4034.00"
                },
                {
                    "conta_id": 1226454,
                    "conta": "Vanco",
                    "saldo": "10000000.00"
                },
            ]
        }).as('saldoFinal')

        cy.get(loc.MENU.HOME).click()

        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
    })

    it('Should remove a transaction', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            status: 204,
            response: {},
        }).as('del')

        cy.get(loc.MENU.EXTRATO).click()

        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.TOAST.MESSAGE).should('contain', 'sucesso')
    })

    it('Should requequest is made correctly', () => {
        const reqStub = cy.stub()
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id:3, nome: 'Conta de teste', visivel: true, usuario_id: 1},
            /*onRequest: req => {
                console.log(req)
                expect(req.request.body.nome).to.be.empty
                expect(req.request.headers).to.have.property('Authorization')
            }*/
            onRequest: reqStub
        }).as('saveConta')

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()

        cy.closeAllToasts()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { "id": 1, "nome": "Carteira", "visivel": true, "usuario_id": 1 },
                { "id": 2, "nome": "Banco", "visivel": true, "usuario_id": 1 },
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1}
            ]
        }).as('contasSave')

        cy.inserirConta('{CONTROL}')
        cy.wait('@saveConta').then(() => {
            console.log(reqStub.args[0][0])
            expect(reqStub.args[0][0].request.body.nome).to.be.empty
            expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
        })
        cy.get(loc.TOAST.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should test colors', () => {
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                {
                    "conta": "Conta para movimentacoes",
                    "id": 1143427,
                    "descricao": "Receita paga",
                    "envolvido": "AAA",
                    "observacao": null,
                    "tipo": "REC",
                    "data_transacao": "2022-06-06T03:00:00.000Z",
                    "data_pagamento": "2022-06-06T03:00:00.000Z",
                    "valor": "123.00",
                    "status": true,
                    "conta_id": 1226452,
                    "usuario_id": 1,
                    "transferencia_id": null,
                    "parcelamento_id": null
                },
                {
                    "conta": "Conta para movimentacoes",
                    "id": 1143300,
                    "descricao": "Receita pendente",
                    "envolvido": "BBB",
                    "observacao": null,
                    "tipo": "REC",
                    "data_transacao": "2022-06-06T03:00:00.000Z",
                    "data_pagamento": "2022-06-06T03:00:00.000Z",
                    "valor": "-1500.00",
                    "status": false,
                    "conta_id": 1226453,
                    "usuario_id": 1,
                    "transferencia_id": null,
                    "parcelamento_id": null
                },
                {
                    "conta": "Conta para saldo",
                    "id": 1143301,
                    "descricao": "Despesa paga",
                    "envolvido": "CCC",
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
                    "descricao": "Despesa pendente",
                    "envolvido": "DDD",
                    "observacao": null,
                    "tipo": "DESP",
                    "data_transacao": "2022-06-06T03:00:00.000Z",
                    "data_pagamento": "2022-06-06T03:00:00.000Z",
                    "valor": "-1000.00",
                    "status": false,
                    "conta_id": 1226455,
                    "usuario_id": 1,
                    "transferencia_id": null,
                    "parcelamento_id": null
                }
            ]
        })

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA("Receita paga")).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA("Receita pendente")).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA("Despesa paga")).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA("Despesa pendente")).should('have.class', 'despesaPendente')
    })

    it('Should test the responsiveness', () => {
        cy.get(loc.MENU.HOME).should('exist').and('be.visible')
        cy.viewport(500, 700)
        cy.get(loc.MENU.HOME).should('exist').and('be.not.visible')
        cy.viewport('iphone-5')
        cy.get(loc.MENU.HOME).should('exist').and('be.not.visible')
        cy.viewport('ipad-2')
        cy.get(loc.MENU.HOME).should('exist').and('be.visible')
        cy.viewport(1000, 600)
    })
})