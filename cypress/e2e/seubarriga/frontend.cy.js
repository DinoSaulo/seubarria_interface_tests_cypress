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
})