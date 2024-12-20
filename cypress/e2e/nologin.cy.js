describe('Prueba de inicio de sesión', () => {
    it('No debería permitir al usuario iniciar sesión con un correo incorrecto', () => {
      
      cy.visit('http://localhost:5173/');

      cy.contains('Iniciar sesión con Google').click();

      cy.get('li')
        .filter((index, element) => {
          return $(element).text().endsWith('@gmail.com'); 
        })
        .first() 
        .click(); 
      
      
    /*  cy.url().should('not.include', '/dashboard'); */

      
    });
});
