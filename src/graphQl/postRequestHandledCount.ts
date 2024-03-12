import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client'
import { QueryOptions } from '../types'

export async function handlePostRequestHandledCount(client: ApolloClient<NormalizedCacheObject>) {
  const operationName = QueryOptions.PostRequestHandledCount

  const response = await client.query({
    query: gql`
      query ${operationName} {
        postRequestHandledCounts {
          id
          value
        }
      }
    `,
  })

  return response
}
