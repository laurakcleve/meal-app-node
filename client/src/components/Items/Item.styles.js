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

export const Details = styled.div`
  display: flex;
  margin-top: 20px;

  .main {
    flex: 1;
  }

  .buttonContainer {
  }
`

export const Detail = styled.div`
  margin-bottom: 36px;

  h2 {
    font-size: 12px;
    text-transform: uppercase;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.grey};
  }

  p {
    margin-top: 0;
    text-transform: capitalize;
    font-size: 18px;
  }

  li {
    margin-bottom: 8px;
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
