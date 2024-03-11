import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SEPOLIA_SUBGRAPH_API_URL } from '@src/constants'
import { handleHyperbridgeFeesEarned } from '../src/graphQl/hyperbridgeFeesEarned'

const client = new ApolloClient({
  uri: SEPOLIA_SUBGRAPH_API_URL,
  cache: new InMemoryCache(),
})

describe('Hyperbridge fees earned', async () => {
  it('should get the accurate amount of fees earned by hyperbridge', async () => {
    const hostAddress = '0xe4226c474A6f4BF285eA80c2f01c0942B04323e5'

    const hyperbridgeFeesEarned = await handleHyperbridgeFeesEarned(client, hostAddress)

    console.log(`Amount earned by Hyperbridge ::`, hyperbridgeFeesEarned)
  })
})
