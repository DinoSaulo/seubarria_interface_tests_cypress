import loc from './locators'

Cypress.Commands.add('closeAllToasts', () => {
    cy.get(loc.TOAST.BTN_CLOSE).each(($el, index, $list) => {
        try {
            cy.wrap($el).should('be.visible').click()
        }
        catch (e) {
        }
    })
})

Cypress.Commands.add('inserirConta', (nome_conta) => {
    cy.get(loc.CONTAS.NOME).type(nome_conta)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})
