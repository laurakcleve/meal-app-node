import { createGlobalStyle } from 'styled-components'
import 'typeface-mukta'
import 'typeface-roboto'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.darkGrey};
    font-family: 'Mukta'
  }

  a {
    text-decoration: none;
  }

  input {
    padding: 10px 12px;
    background-color: ${({ theme }) => theme.colors.inputBackground}; 
    color: ${({ theme }) => theme.colors.darkGrey};
    border: none;
    border-radius: 4px;
    font-family: 'Roboto'
  }

  button {
    padding: 5px 7px;
    color: ${({ theme }) => theme.colors.darkGrey};
    font-family: 'Roboto';
    border-radius: 4px;
    border: ${({ theme }) => `1px solid ${theme.colors.grey}`};
  }
`

export default GlobalStyles
