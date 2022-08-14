describe('Login', () => {
  it('deve logar com sucesso', () => {
    const user = {
      name: 'Lucas',
      instagram: '@uaidonato',
      password: 'uaidonato'
    }

    cy.login(user)
    cy.loggedUser(user.name)
  })

  it('nao deve logar com senha invalida', () => {
    const user = {
      instagram: '@uaidonato',
      password: '123456'
    }

    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')
  })

  it('nao deve logar instagram inexistente', () => {
    const user = {
      instagram: '@rockspapito',
      password: '123456'
    }

    cy.login(user)
    cy.modalHaveText('Credenciais inválidas, tente novamente!')
  })

  context('campos obrigatórios', () => {
    const users = {
      empty_pass: {
        instagram: '@uaidonato',
        password: ''
      },
      empty_instagram: {
        instagram: '',
        password: 'uaidonato'
      }
    }

    it('instagram vazio', () => {
      cy.login(users.empty_instagram)
      cy.modalHaveText('Por favor, informe o seu código do Instagram!')
    })

    it('senha vazia', () => {
      cy.login(users.empty_pass)
      cy.modalHaveText('Por favor, informe a sua senha secreta!')
    })

    it('todos campos vazios', () => {
      cy.login({})
      cy.modalHaveText('Por favor, informe suas credenciais!')
    })

  });
})
