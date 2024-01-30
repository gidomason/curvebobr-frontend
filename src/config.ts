import { http, createConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = "b8897aa689cec22c80b9b646c44afd08";

export const config = createConfig({
	chains: [mainnet, arbitrum],
	connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
	transports: {
		[mainnet.id]: http(),
		[arbitrum.id]: http(),
	},
});
