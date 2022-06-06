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

    it.only('Should get ballance', () => {

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
})