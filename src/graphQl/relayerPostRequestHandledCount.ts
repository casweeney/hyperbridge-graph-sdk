import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client'
import { QueryOptions } from '../types'

export async function handleRelayerPostRequestHandledCount(
  client: ApolloClient<NormalizedCacheObject>,
  relayerAddress: string
) {
  const operationName = QueryOptions.RelayerPostRequestHandledCount
  const modifiedRelayerAddress = relayerAddress.toLowerCase()

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
      relayerId: modifiedRelayerAddress,
    },
  })

  return response
}
