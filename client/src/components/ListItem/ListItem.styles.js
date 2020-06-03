import styled from 'styled-components'

const ListItem = styled.div`
  margin-bottom: 7px;
  background: #fff;
  box-shadow: 0px 1px 3px 2px #e3e3e3;
  border-radius: 3px;
  font-family: 'Roboto';
  font-size: 13px;
  font-weight: 500;
  padding: 15px;
  cursor: pointer;
  display: flex;
  grid-gap: 10px;

  &:first-letter {
    text-transform: uppercase;
  }
`

export default ListItem
