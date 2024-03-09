import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { SUBGRAPH_API_URL } from '../constants'
import { QueryOptions } from '../types'

const client = new ApolloClient({
  uri: SUBGRAPH_API_URL,
  cache: new InMemoryCache(),
})

export async function handleRelayerPostRequestHandledCount(relayerAddress: string) {
  const operationName = QueryOptions.RelayerPostRequestHandledCount

  const response = await client.query({
    query: gql`
      query ${operationName}($relayerId: ID!) {
        relayerPostRequestHandledCount(id: $relayerId) {
          id
          value
        }
      }
    `,
    variables: {
      relayerId: relayerAddress,
    },
  })

  return response
}
