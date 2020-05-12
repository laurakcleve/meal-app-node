import styled from 'styled-components'

import Form from './Form'
import Input from './Input'

export const AddForm = styled(Form)`
  max-width: 512px;
  margin-left: auto;
  margin-right: auto;
`

export const Item = styled(Input)`
  min-width: 350px;
`

export const Price = styled(Input)`
  max-width: 130px;

  label {
    position: relative;
  }

  input {
    padding-left: 27px;
  }

  .label::after {
    content: '$';
    position: absolute;
    top: 40px;
    left: 10px;
    font-size: 16px;
    z-index: 1;
  }
`

export const Label = styled.div`
  display: block;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Roboto';
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.grey};
`

export const Combo = styled.div`
  .input {
    display: inline-block;
  }
`

export const Amount = styled(Input)`
  input {
    width: 60px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: 1px;
  }
`

export const Unit = styled(Input)`
  input {
    width: 99px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

export const Multiple = styled(Input)`
  max-width: 50px;
`
