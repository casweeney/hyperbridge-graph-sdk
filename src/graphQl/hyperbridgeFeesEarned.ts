import { gql } from '@apollo/client'
import { QueryOptions } from '../types'

export async function handleHyperbridgeFeesEarned(client, hostAddress: string): Promise<number> {
  const modifiedHostAddress = hostAddress.toLowerCase()

  const totalAmountTransferredIntoHost = await handleInTransferTotal(client, modifiedHostAddress)
  const totalRelayerFeeEmittedByHost = await handleRequestEventFeeTotal(client)

  const hyperbridgeFeesEarned = totalAmountTransferredIntoHost - totalRelayerFeeEmittedByHost

  return hyperbridgeFeesEarned
}

async function handleInTransferTotal(client, hostAddress: string): Promise<number> {
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

async function handleRequestEventFeeTotal(client): Promise<number> {
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
