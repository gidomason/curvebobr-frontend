import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { abi as UNI_GOERLI_ABI } from "../ABI/uni-goerli";
import Spinner from "./Spinner";

export function WriteContractTest() {
	const { writeContract, error, data: hash } = useWriteContract();

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
			confirmations: 1,
		});

	return (
		<div className="flex flex-col items-center">
			<button
				onClick={() =>
					writeContract({
						abi: UNI_GOERLI_ABI,
						address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
						functionName: "transfer",
						args: [
							"0x8E168442Da68EAA639789E4c076Fe02f6Ac9D5f1",
							parseEther("0.000000001", "gwei"),
						],
					})
				}
				className={`rounded-xl ${
					isConfirming ? "bg-gray-300" : "bg-orange-500"
				} p-4 text-white mb-5`}
				disabled={isConfirming}
			>
				{isConfirming ? "Транзакция в процессе..." : "Обобрить"}
			</button>

			{isConfirming && <Spinner />}
			{isConfirmed && <div>Транзакция выполнена успешно!</div>}

			{error?.message.includes("transfer amount exceeds balance") && (
				<p className="text-red-500 max-w-[300px]">
					К сожалению, у вас не хватает бобров для оплаты
				</p>
			)}
		</div>
	);
}
