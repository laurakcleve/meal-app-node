import styled from 'styled-components'

export const Container = styled.div`
  margin-bottom: 20px;

  span {
    margin-right: 7px;
    font-size: 13px;
    text-transform: uppercase;
  }
`

export const Button = styled.button`
  height: 35px;
  width: 35px;
  color: ${({ theme }) => theme.colors.darkGrey};
  border: none;
  background-color: transparent;
  cursor: pointer;
`
