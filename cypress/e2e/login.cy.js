describe('Prueba de inicio de sesión', () => {
    it('Debería permitir al usuario iniciar sesión correctamente', () => {
      
      cy.visit('https://d373ge575lxvrz.cloudfront.net/login');

      cy.contains('Iniciar sesión con Google').click();

      cy.get('li') 
        .filter((index, element) => {
          return $(element).text().endsWith('@elpoli.edu.co');
        }) 
        .first() 
        .click(); 
          
   /*   cy.url().should('include', '/dashboard'); */

    });
});
