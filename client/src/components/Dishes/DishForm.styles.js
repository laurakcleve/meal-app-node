import styled from 'styled-components'

import Form from '../Form'
import Input from '../Input'

export const DishForm = styled(Form)`
  .label {
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    font-family: 'Roboto';
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.grey};
  }
`

export const Name = styled(Input)`
  width: 100%;
`

export const Tags = styled.div`
  width: 100%;

  ul {
    list-style-type: none;
    margin: 16px 0;
    padding: 0;

    li {
      display: inline;
      margin-right: 10px;
    }
  }
`

export const Tag = styled.li`
  background-color: ${({ theme }) => theme.colors.lighterGrey};
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: normal;

  button {
    width: auto;
    height: auto;
    border: none;
    padding: 0;
    margin: 0;
    margin-left: 15px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
`

export const TagInput = styled(Input)`
  max-width: 200px;
`

export const Ingredients = styled.div`
  width: 100%;
`

export const IngredientSet = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;

  .inputs {
    flex: 1 1 50%;
  }
`

export const IngredientInputWrapper = styled.div`
  &:first-child input {
    width: 330px;
    display: inline-block;
  }

  &:not(:first-child) {
    margin-left: 40px;
    position: relative;

    :before {
      content: 'or';
      display: inline-block;
      width: 20px;
      height: 100%;
      position: absolute;
      top: 10px;
      left: -25px;
      text-transform: uppercase;
      font-size: 12px;
    }
  }

  button {
    margin-left: 5px;
    width: auto;
    height: 100%;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    :focus {
      outline: none;
    }
  }
`

export const IngredientInput = styled.input`
  display: inline-block;
  min-width: 290px;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.colors.lighterGrey};
`

export const Checkbox = styled.label`
  font-size: 14px;
`

export const AddSubstitute = styled.div`
  align-self: flex-end;
  flex: 1 0 70px;
  padding-bottom: 28px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  button {
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 15px;
  }
`