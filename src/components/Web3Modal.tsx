import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiProvider } from "wagmi";
import { arbitrum, goerli, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { config } from "../config";

const queryClient = new QueryClient();

const projectId = "b8897aa689cec22c80b9b646c44afd08";

const metadata = {
	name: "CURVEBOBR",
	description: "CURVEBOBR Website",
	url: "https://bobrcrv.com",
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum, goerli];
const wagmiConfig = defaultWagmiConfig({
	//@ts-ignore
	chains,
	projectId,
	//@ts-ignore
	metadata,
	enableWalletConnect: true,
	enableInjected: true,
	enableEIP6963: true,
	enableCoinbase: true,
});

createWeb3Modal({
	themeMode: "light",
	wagmiConfig,
	projectId,
	//@ts-ignore
	chains,
	tokens: {
		1: {
			address: "0x8F22779662Ad253844013D8E99EcCB4d80e31417",
		},
		42161: {
			address: "0xF12132857fb45b1F1342420EaAF818509F850468",
		},
	},
});

export function Web3Modal({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}
