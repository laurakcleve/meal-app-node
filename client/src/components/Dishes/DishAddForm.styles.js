import styled from 'styled-components'

import Form from '../Form'
import Input from '../Input'

export const AddForm = styled(Form)`
  ul {
    list-style-type: none;
    padding: 0;

    li {
      display: inline;
      margin-right: 10px;
    }
  }

  .tags {
    width: 100%;

    input {
      max-width: 200px;
    }
  }

  .label {
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    font-family: 'Roboto';
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.grey};

    &.ingredients {
      margin-bottom: 16px;
    }
  }

  .ingredient-set {
    display: flex;
    width: 100%;
    margin-bottom: 30px;

    .inputs {
      flex: 1 1 50%;
    }

    .ingredient-input button {
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

    .ingredient-input:first-child input {
      width: 330px;
      display: inline-block;
    }

    .ingredient-input:not(:first-child) {
      margin-left: 40px;
      position: relative;

      input {
        display: inline-block;
      }

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

    .add-substitute {
      align-self: flex-end;
      flex: 1 0 70px;
      padding-bottom: 28px;
    }
  }
`

export const Name = styled(Input)`
  width: 100%;
`

export const Tag = styled.li`
  background-color: ${({ theme }) => theme.colors.lighterGrey};
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 14px;

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

export const TagInput = styled(Input)``

export const IngredientInput = styled.input`
  display: block;
  min-width: 290px;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.colors.lighterGrey};
`

export const Checkbox = styled.label`
  font-size: 14px;
`
