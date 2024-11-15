describe('Componentes', () => {
    
  
    it('Debería iniciar sesión con credenciales válidas de alumno y mover en los componentes', () => {
      cy.visit('/login');
  
      // Ingresa credenciales válidas
      cy.get('ion-input[placeholder="Ingresa tu usuario"] input').type('alumno');
      cy.wait(1000);
      cy.get('ion-input[placeholder="Ingresa tu contraseña"] input').type('1234');
      cy.wait(1000);
      cy.contains('ion-button', 'Iniciar Sesión').click();
  
      // Verifica que redireccione a la página esperada
      cy.url().should('include', '/student-home/asistencia'); // Cambia '/home' según la ruta esperada
      cy.contains('Bienvenido').should('be.visible');

      // moverse en los componentes
      cy.wait(1000);
      cy.get('ion-segment-button[value="abrircamara"]').click({ for: true });
      cy.wait(1000);
      cy.get('ion-segment-button[value="perfil-alumno"]').click();

    });
  });
