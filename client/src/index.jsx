import ApolloClient, { InMemoryCache } from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'

import theme from './theme/theme'
import GlobalStyles from './theme/GlobalStyles'

import Header from './components/Header'
import Items from './components/Items'
import Dishes from './components/Dishes'
import Inventory from './components/Inventory'

const cache = new InMemoryCache()

cache.writeData({
  data: {
    filteredItems: [],
    filteredDishes: [],
    filteredInventoryItems: [],
  },
})

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  resolvers: {},
  cache,
})

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <Route exact path="/" component={Items} />
        <Route exact path="/items" component={Items} />
        <Route exact path="/dishes" component={Dishes} />
        <Route exact path="/inventory" component={Inventory} />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
)

render(<App />, document.getElementById('root'))
