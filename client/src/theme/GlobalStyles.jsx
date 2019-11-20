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
    background-color: ${({ theme }) => theme.colors.lightGrey}; 
    color: ${({ theme }) => theme.colors.darkGrey};
    border: none;
    border-radius: 4px;
    font-family: 'Roboto'
  }
`

export default GlobalStyles
