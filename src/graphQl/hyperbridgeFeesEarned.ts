import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { SUBGRAPH_API_URL } from '../constants'
import { QueryOptions } from '../types'

const client = new ApolloClient({
  uri: SUBGRAPH_API_URL,
  cache: new InMemoryCache(),
})

export async function handleHyperbridgeFeesEarned(hostAddress: string) {
  const totalAmountTransferredIntoHost = await handleInTransferTotal(hostAddress)
  const totalRelayerFeeEmittedByHost = await handleRequestEventFeeTotal()

  const hyperbridgeFeesEarned = totalAmountTransferredIntoHost - totalRelayerFeeEmittedByHost

  return hyperbridgeFeesEarned
}

async function handleInTransferTotal(hostAddress: string): Promise<number> {
  const operationName = QueryOptions.InTransferTotal

  const response = await client.query({
    query: gql`
      query ${operationName}($hostId: ID!) {
        inTransferTotal(id: $hostId) {
          id
          totalAmountTransferredIn
        }
      }
    `,
    variables: {
      hostId: hostAddress,
    },
  })

  return response.data.inTransferTotal.totalAmountTransferredIn
}

async function handleRequestEventFeeTotal(): Promise<number> {
  const operationName = QueryOptions.RequestEventFeeTotal

  const response = await client.query({
    query: gql`
        query ${operationName} {
          requestEventFeeTotals {
            id
            totalRequestFee
          }
        }
      `,
  })

  return response.data.requestEventFeeTotals[0].totalRequestFee
}
