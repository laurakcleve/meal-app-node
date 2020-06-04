import styled from 'styled-components'

export const Main = styled.div`
  width: 100%;
  padding: 20px 0;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  h1 {
    flex: 1;
    font-size: 22px;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  button {
    padding: 10px 15px;
    text-transform: uppercase;
    font-size: 12px;
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
