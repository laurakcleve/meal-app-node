import { createGlobalStyle } from 'styled-components'
import 'typeface-mukta'
import 'typeface-roboto'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    font-family: 'Mukta'
  }

  a {
    text-decoration: none;
  }
`

export default GlobalStyles
