describe('Prueba de realizar publicacion', () => {
    it('Debería permitir al usuario realizar una publicacion correctamente', () => {
      
        cy.visit('https://d373ge575lxvrz.cloudfront.net/');

    
        cy.contains('Iniciar sesión con Google').click();
    
        
        cy.origin('https://accounts.google.com', () => {
          
          
          cy.get('#identifierId').type('mateo_echeverri82201@elpoli.edu.co');
    
          
          cy.contains('Siguiente').click();
    
          
        /*  cy.get('input[type="password"]').type('elpoli201');
    
          
          cy.contains('Siguiente').click(); */ 
        });

        cy.contains('Crear Publicacion').click();

        cy.get('#category').select('Institucional');

        cy.get('#title').type('Calculadora');

        cy.get('#content').type('Venta de calculadora Casio Fx-570 ES plus');

        cy.get('#price').type('20.000');

         //PUBLICACION DE IMAGEN

         cy.contains('Publicar').click();


          
   /*   cy.url().should('include', '/dashboard'); */

    });
});
