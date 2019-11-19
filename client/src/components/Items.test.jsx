import React from 'react'
import renderer from 'react-test-renderer'

import Items from './Items'

it('renders correctly', () => {
  const tree = renderer.create(<Items />).toJSON()
  expect(tree).toMatchSnapshot()
})
