import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin-bottom: 20px;
`

export const Tags = styled.div`
  flex: 1;
`

export const Ingredients = styled.div`
  flex: 1;

  h3 {
    margin-top: 0;
  }
`

export const Dates = styled.div`
  flex: 1;
`

export const DateList = styled.div`
  margin-top: 20px;
`

export const DateForm = styled.form`
  label {
    margin-left: 3px;
  }

  input {
    display: block;
    margin: 10px 0;
    box-sizing: border-box;
  }
`

export const Actions = styled.div`
  flex: 0 0;
  display: flex;
  justify-content: flex-end;

  button {
    text-transform: uppercase;
    font-size: 12px;
  }
`
