import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Header = styled.header`
  height: 100px;
  border-bottom: 2px solid #ccc;
`

export const Container = styled.div`
  max-width: ${({ theme }) => theme.containerWidth};
  margin: 0 auto;
`

export const CustomLink = styled(Link)`
  text-transform: uppercase;
`
