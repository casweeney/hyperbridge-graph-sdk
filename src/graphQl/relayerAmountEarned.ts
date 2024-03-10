import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { SUBGRAPH_API_URL } from '../constants'
import { QueryOptions } from '../types'

const client = new ApolloClient({
  uri: SUBGRAPH_API_URL,
  cache: new InMemoryCache(),
})

export async function handleRelayerAmountEarned(hostAddress: string, relayerAddress: string) {
  const operationName = QueryOptions.RelayerPostRequestHandledCount

  const response = await client.query({
    query: gql`
        query ${operationName}($hostAddress: String!, $relayerAddress: String!) {
          transferPairTotals(
            where: {from: $hostAddress, to: $relayerAddress}
          ) {
            from
            id
            to
            totalAmount
          }
        }
      `,
    variables: {
      hostAddress: hostAddress,
      relayerAddress: relayerAddress,
    },
  })

  return response
}
