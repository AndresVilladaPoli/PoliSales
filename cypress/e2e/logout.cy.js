describe('Prueba de logout', () => {
    it('Debería permitir al usuario cerrar sesión correctamente', () => {
      
        cy.visit('https://d373ge575lxvrz.cloudfront.net/');

    
        cy.contains('Iniciar sesión con Google').click();
    
        
        cy.origin('https://accounts.google.com', () => {
          
          
          cy.get('#identifierId').type('mateo_echeverri82201@elpoli.edu.co');
    
          
          cy.contains('Siguiente').click();
    
          
        /*  cy.get('input[type="password"]').type('elpoli201');
    
          
          cy.contains('Siguiente').click(); */ 
        });

        cy.contains('Cerrar Sesion').click();

          
   /*   cy.url().should('include', '/dashboard'); */

    });
});
