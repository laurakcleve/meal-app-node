import React from 'react'
import { withRouter } from 'react-router-dom'

import * as Styled from './Header.styles'

const Header = ({ location }) => (
  <Styled.Header>
    <Styled.Container>
      <Styled.CustomLink to="/items" pathname={location.pathname}>
        Items
      </Styled.CustomLink>
    </Styled.Container>
  </Styled.Header>
)

export default withRouter(Header)
