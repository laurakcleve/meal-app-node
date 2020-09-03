import styled from 'styled-components'

export const Main = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 10px 30px;
  background-color: #fff;
  border-radius: 10px;
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

export const Detail = styled.div`
  h2 {
    font-size: 14px;
    margin-bottom: 0;
    color: ${({ theme }) => theme.colors.grey};
  }

  p {
    margin-top: 0;
    text-transform: capitalize;
    font-size: 18px;
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
