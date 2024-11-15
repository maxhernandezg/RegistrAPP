describe('Inicio de Sesión', () => {
    it('Debería mostrar los campos de usuario y contraseña', () => {
      cy.visit('/login'); // Navega a la página de inicio de sesión
  
      // Verifica que los campos estén presentes
      cy.get('ion-input[placeholder="Ingresa tu usuario"]').should('exist');
      cy.get('ion-input[placeholder="Ingresa tu contraseña"]').should('exist');
      cy.contains('ion-button', 'Iniciar Sesión').should('exist');
    });
  
    // it('Debería fallar al ingresar credenciales inválidas', () => {
    //   cy.visit('/login');
  
    //   // Ingresa credenciales inválidas
    //   cy.get('ion-input[placeholder="Ingresa tu usuario"] input').type('usuario_invalido');
    //   cy.get('ion-input[placeholder="Ingresa tu contraseña"] input').type('contraseña_invalida');
    //   cy.contains('ion-button', 'Iniciar Sesión').click();
  
    //   // Verifica el mensaje de error
    //   cy.contains('Credenciales inválidas').should('be.visible');
    // });
  
    it('Debería iniciar sesión con credenciales válidas de alumno', () => {
      cy.visit('/login');
  
      // Ingresa credenciales válidas
      cy.get('ion-input[placeholder="Ingresa tu usuario"] input').type('alumno');
      cy.get('ion-input[placeholder="Ingresa tu contraseña"] input').type('1234');
      cy.contains('ion-button', 'Iniciar Sesión').click();
  
      // Verifica que redireccione a la página esperada
      cy.url().should('include', '/student-home/asistencia'); // Cambia '/home' según la ruta esperada
      cy.contains('Bienvenido').should('be.visible');
    });

    it('Debería iniciar sesión con credenciales válidas de docente', () => {
        cy.visit('/login');
    
        // Ingresa credenciales válidas
        cy.get('ion-input[placeholder="Ingresa tu usuario"] input').type('docente');
        cy.get('ion-input[placeholder="Ingresa tu contraseña"] input').type('1234');
        cy.contains('ion-button', 'Iniciar Sesión').click();
    
        // Verifica que redireccione a la página esperada
        cy.url().should('include', '/docente-home'); // Cambia '/home' según la ruta esperada
        cy.contains('Bienvenido').should('be.visible');
      });
  });
  