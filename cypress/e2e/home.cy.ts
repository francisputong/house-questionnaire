describe('Home Page Test', () => {
    it('should navigate to /start on button click', () => {
        cy.visit('/');

        cy.contains('Start Now').click();

        cy.url().should('include', '/start');
    });
});
