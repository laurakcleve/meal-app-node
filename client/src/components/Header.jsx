import React from 'react'

import * as Styled from './Header.styles'

const Header = () => (
  <Styled.Header>
    <Styled.Container>
      <Styled.CustomLink to="/items">Items</Styled.CustomLink>
    </Styled.Container>
  </Styled.Header>
)

export default Header
