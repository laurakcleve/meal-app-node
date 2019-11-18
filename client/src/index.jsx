import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { render } from 'react-dom'

const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' })

const App = () => (
  <ApolloProvider client={client}>
    <div>woof</div>
  </ApolloProvider>
)

render(<App />, document.getElementById('root'))
