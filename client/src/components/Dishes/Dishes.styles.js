import styled from 'styled-components'

export const Name = styled.div`
  flex: 1;
`

export const Date = styled.div``

export const CheckboxLabel = styled.label`
  display: block;
  margin: 10px 0 20px;
  line-height: 1.6;
  cursor: pointer;

  .labelText:before {
    top: 4px;
  }

  .labelText:after {
    top: 8px;
  }
`

export const TopBar = styled.div`
  display: flex;
`

export const AddButton = styled.button`
  width: 30px;
  height: 30px;
  background: ${({ theme, open }) =>
    open ? theme.colors.grey : theme.colors.green};
  border: none;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  line-height: 0;

  &:focus {
    outline: none;
  }

  div {
    transform: ${({ open }) => (open ? 'rotate(45deg)' : 'none')};
  }
`
