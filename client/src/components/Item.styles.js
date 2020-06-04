import styled from 'styled-components'

export const Main = styled.div`
  width: 100%;
  padding: 20px 0;

  h1 {
    font-size: 22px;

    &:first-letter {
      text-transform: uppercase;
    }
  }
`

export const Date = styled.div`
  flex: 1;
`

export const Location = styled.div`
  flex: 1;
  text-transform: capitalize;
`

export const Price = styled.div`
  flex: 1;
`

export const Amount = styled.div`
  flex: 1;
`

export const UnitPrice = styled.div`
  flex: 1;
`
