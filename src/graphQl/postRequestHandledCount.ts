import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { SUBGRAPH_API_URL } from '../constants'
import { QueryOptions } from '../types'

const client = new ApolloClient({
  uri: SUBGRAPH_API_URL,
  cache: new InMemoryCache(),
})

export async function handlePostRequestHandledCount() {
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
