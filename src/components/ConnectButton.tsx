import { useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";

export default () => {
	const { switchChain } = useSwitchChain();
	const { chainId, address } = useAccount();

	useEffect(() => {
		if (chainId !== 42161) {
			switchChain({
				chainId: 42161,
			});
		}
	}, []);

	return (
		<>
			{chainId !== 42161 ? (
				<p className="text-right">
					Смените сеть на{" "}
					<span
						className="underline cursor-pointer"
						onClick={() => switchChain({ chainId: 42161 })}
					>
						Arbitrum
					</span>
				</p>
			) : (
				<w3m-button />
			)}
		</>
	);
};
