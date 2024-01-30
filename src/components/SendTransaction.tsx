import {
	useSendTransaction,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
// import { parseEther, parseGwei, formatEther } from "viem";
import { toWei } from "web3-utils";
import Spinner from "./Spinner";
import { abi } from "../ABI/bobr-arbi";

export default () => {
	const { data: hash, isPending } = useSendTransaction();
	const { writeContract } = useWriteContract();

	const onButtonClicked = () => {
		// writeContract({
		// 	abi,
		// 	address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
		// 	functionName: "transferFrom",
		// 	args: [
		// 		from,
		// 		"0x8E168442Da68EAA639789E4c076Fe02f6Ac9D5f1",
		// 		toWei("0.1", "ether"),
		// 	],
		// });
		writeContract({
			abi,
			address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
			functionName: "transfer",
			args: [
				"0x8E168442Da68EAA639789E4c076Fe02f6Ac9D5f1",
				toWei("0.1", "ether"),
			],
		});
	};

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
			confirmations: 1,
		});

	return (
		<div className="text-center">
			{isConfirmed || isConfirming ? (
				<>
					{isConfirming && <Spinner />}
					{isConfirmed && <div>Транзакция выполнена успешно!</div>}
				</>
			) : (
				<button
					onClick={() => onButtonClicked()}
					className="rounded-xl bg-orange-500 p-4 text-white"
					disabled={isPending}
				>
					{isPending ? "Транзакция в процессе..." : "Обобрить"}
				</button>
			)}
		</div>
	);
};
