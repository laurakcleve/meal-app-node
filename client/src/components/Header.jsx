import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = () => (
  <StyledHeader>
    <StyledContainer>
      <StyledLink to="/items">Items</StyledLink>
    </StyledContainer>
  </StyledHeader>
)

const StyledHeader = styled.header`
  height: 100px;
  border-bottom: 2px solid #ccc;
`

const StyledContainer = styled.div`
  max-width: ${({ theme }) => theme.containerWidth};
  margin: 0 auto;
`

const StyledLink = styled(Link)`
  text-transform: uppercase;
`

export default Header
