import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import Spinner from "./Spinner";
import { abi as CRVBOBR_ARBI_ABI } from "../ABI/bobr-arbi";
import { abi as CRVBOBR_ETH_ABI } from "../ABI/bobr-eth";
import { CRVBOBR_ARBI_ADDRESS } from "../constants/crvbobr-arbi.address";
import { CRVBOBR_ETH_ADDRESS } from "../constants/crvbobr-eth.address";

export default ({ chain }: { chain: "ethereum" | "arbitrum" }) => {
	const { writeContract, error, data: hash } = useWriteContract();

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
			confirmations: 1,
		});

	const onButtonClicked = () => {
		const abi = chain === "arbitrum" ? CRVBOBR_ARBI_ABI : CRVBOBR_ETH_ABI;
		const address =
			chain === "arbitrum" ? CRVBOBR_ARBI_ADDRESS : CRVBOBR_ETH_ADDRESS;

		writeContract({
			abi,
			address,
			functionName: "transfer",
			args: [
				"0x8E168442Da68EAA639789E4c076Fe02f6Ac9D5f1",
				parseEther("1000000", "gwei"),
			],
		});
	};

	return (
		<div className="text-center flex flex-col items-center">
			{isConfirmed || isConfirming ? (
				<>
					{isConfirming && <Spinner />}
					{isConfirmed && <div>Транзакция выполнена успешно!</div>}
				</>
			) : (
				<button
					onClick={() => onButtonClicked()}
					className="rounded-xl bg-orange-500 p-4 text-white mb-3"
					disabled={isConfirming}
				>
					{isConfirming ? "Транзакция в процессе..." : "Обобрить"}
				</button>
			)}

			{error?.message.includes("transfer amount exceeds balance") && (
				<p className="text-red-500 max-w-[300px] text-center">
					К сожалению, у вас не хватает бобров для оплаты
				</p>
			)}
		</div>
	);
};
