/// <reference types="cypress"/>

import loc from '../../support/locators'
import requests from '../../support/requests'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test at an interface level', () => {

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
        cy.route(requests.POST.CRIAR_CONTA).as('saveConta')

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()

        cy.closeAllToasts()

        cy.route(requests.GET.CONTAS_ATUAIS).as('contas')

        cy.inserirConta('Conta de teste')
        cy.get(loc.TOAST.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should edit an acount', () => {

        cy.route(requests.GET.CONTAS_PARA_EDITAR).as('contas')

        cy.route(requests.PUT.CONTA_ALTERADA).as('contaAlterada')

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')

        cy.route(requests.GET.CONTAS_POS_EDICAO).as('contasSave')

        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.TOAST.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {

        cy.route(requests.POST.CONTA_MESMO_NOME).as('saveContaMesmoNome')

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.closeAllToasts()
        cy.inserirConta('Conta mesmo nome')

        cy.get(loc.TOAST.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {

        cy.route(requests.POST.CRIAR_TRANSACAO).as('novaTransacao')

        cy.route(requests.POST.EXTRATO_COM_FIXTURE).as('extratoFixture')

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
        cy.route(requests.GET.TRANSACAO_MOV_1).as('getMovimentacao1')

        cy.route(requests.PUT.TRANSACAO_MOV_1).as('putMovimentacao1')

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

        cy.route(requests.GET.SALDO_FINAL).as('saldoFinal')

        cy.get(loc.MENU.HOME).click()

        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
    })

    it('Should remove a transaction', () => {
        cy.route(requests.DELETE.TRANSACTIONS).as('del')

        cy.get(loc.MENU.EXTRATO).click()

        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.TOAST.MESSAGE).should('contain', 'sucesso')
    })

    it('Should requequest is made correctly', () => {
        const reqStub = cy.stub()
        cy.route(requests.POST.FN_CONTA_COM_STUB(reqStub)).as('saveConta')

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()

        cy.closeAllToasts()

        cy.route(requests.GET.CONTAS_SAVE).as('contasSave')

        cy.inserirConta('{CONTROL}')
        cy.wait('@saveConta').then(() => {
            console.log(reqStub.args[0][0])
            expect(reqStub.args[0][0].request.body.nome).to.be.empty
            expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
        })
        cy.get(loc.TOAST.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should test colors', () => {
        cy.route(requests.GET.EXTRATOS_DIVERSIFICADOS).as('extratosDiversificados')

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