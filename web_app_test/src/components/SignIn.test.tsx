import { render, screen, fireEvent, act } from '@testing-library/react';
import SignIn from './SignIn';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Test SignIn component', () => {
  it('verifica la presenza dei campi di input email e password', () => {
    render(
    <Router>
      <SignIn />
    </Router>);
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByTestId('password');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('verifica il messaggio di errore al submit con campi vuoti', async () => {
    render( 
    <Router>
      <SignIn />
    </Router>);
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);
    await act(async () => {
      const emailError = await screen.findByText(/Email obbligatoria!/);
      const passwordError = await screen.findByText(/Password obbligatoria!/);
      expect(emailError).toBeInTheDocument();
      expect(passwordError).toBeInTheDocument();
    });
  });

  it('verifica il messaggio di errore in caso di email malformata', async () => {
    render( 
      <Router>
        <SignIn />
      </Router>);
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    await act(async () => {
      const emailError = await screen.findByText(/Email non valida!/);
      expect(emailError).toBeInTheDocument();
    });
  });

});
