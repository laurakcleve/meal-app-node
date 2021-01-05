import styled from 'styled-components'

export const ListHeader = styled.div`
  display: flex;

  .name {
    flex: 1;
  }

  .location {
    flex: 1;
  }

  button {
    padding: 15px;
    border: none;
    background: transparent;
    text-transform: uppercase;
    font-size: 12px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`
