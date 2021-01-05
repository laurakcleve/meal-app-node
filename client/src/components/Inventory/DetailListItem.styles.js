import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const DetailListItem = styled(Link)`
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  border-radius: 4px;

  &::first-letter {
    text-transform: uppercase;
  }
`

export const temp = styled.div``
