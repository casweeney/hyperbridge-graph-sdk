import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SEPOLIA_SUBGRAPH_API_URL } from '@src/constants'
import { handlePostRequestHandledCount } from '../src/graphQl/postRequestHandledCount'

const client = new ApolloClient({
  uri: SEPOLIA_SUBGRAPH_API_URL,
  cache: new InMemoryCache(),
})

describe('Post requests handled count', async () => {
  it('should get the accurate number of post requests handled', async () => {
    const subgraphData = await handlePostRequestHandledCount(client)

    console.log('Total post requests handled ::   ', subgraphData.data.postRequestHandledCounts[0].value)
  })
})
