import styled from 'styled-components'

export const Container = styled.div`
  padding: 15px;
  border-top: 1px solid #ccc;

  h3 {
    text-transform: uppercase;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.grey};
    margin-bottom: 5px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
  }
`
