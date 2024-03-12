import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client'
import { QueryOptions } from '../types'

export async function handleRelayerAmountEarned(
  client: ApolloClient<NormalizedCacheObject>,
  hostAddress: string,
  relayerAddress: string
) {
  const operationName = QueryOptions.TransferPairTotal

  const modifiedHostAddress = hostAddress.toLowerCase()
  const modifiedRelayerAddress = relayerAddress.toLowerCase()

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
      hostAddress: modifiedHostAddress,
      relayerAddress: modifiedRelayerAddress,
    },
  })

  return response
}
