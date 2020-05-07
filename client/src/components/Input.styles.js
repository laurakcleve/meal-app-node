import styled from 'styled-components'

export const Label = styled.label`
  margin-bottom: 10px;

  .label {
    font-size: 12px;
    font-weight: 500;
    font-family: 'Roboto';
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.grey};
  }
`
export const InputEl = styled.input`
  background-color: ${({ theme }) => theme.colors.lighterGrey};
  width: 100%;
  box-sizing: border-box;

  &[type='date'] {
    text-transform: uppercase;
  }

  }
`
