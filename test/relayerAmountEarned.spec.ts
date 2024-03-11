import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SEPOLIA_SUBGRAPH_API_URL } from '@src/constants'
import { handleRelayerAmountEarned } from '../src/graphQl/relayerAmountEarned'

const client = new ApolloClient({
  uri: SEPOLIA_SUBGRAPH_API_URL,
  cache: new InMemoryCache(),
})

describe('Relayer amount earned', async () => {
  it('should get the accurate amount earned by a relayer', async () => {
    const hostAddress = '0xe4226c474A6f4BF285eA80c2f01c0942B04323e5'
    const relayerAddress = '0x7d72983fedc1f332e55006fea2a2afc148f66142'

    const subgraphData = await handleRelayerAmountEarned(client, hostAddress, relayerAddress)

    console.log('Relayer Amount Earned ::   ', subgraphData.data.transferPairTotals[0].totalAmount)
  })
})
