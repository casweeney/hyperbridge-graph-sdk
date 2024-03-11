import { gql } from '@apollo/client'
import { QueryOptions } from '../types'

export async function handleRelayerPostRequestHandledCount(client, relayerAddress: string) {
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
