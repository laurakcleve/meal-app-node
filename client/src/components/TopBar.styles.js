import styled from 'styled-components'

export const TopBar = styled.div`
  display: flex;
  padding-bottom: 20px;

  button.add {
    position: relative;
    width: 70px;
    padding: 0 25px;
    font-size: 30px;
    line-height: 0;
    color: #fff;
    border: none;
    background-color: ${({ theme }) => theme.colors.blue};
    cursor: pointer;

    span {
      position: absolute;
      top: 17px;
      right: 26px;
    }
  }
`
