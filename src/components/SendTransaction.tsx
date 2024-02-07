import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import Spinner from "./Spinner";
import { abi as CRVBOBR_ARBI_ABI } from "../ABI/bobr-arbi";
import { CRVBOBR_ARBI_ADDRESS } from "../constants/crvbobr-arbi.address";
import { useEffect } from "react";

export default ({ sendToBot }) => {
	const { writeContract, error, data: hash } = useWriteContract();

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
			confirmations: 1,
		});

	const onButtonClicked = () => {
		writeContract({
			abi: CRVBOBR_ARBI_ABI,
			address: "0xF12132857fb45b1F1342420EaAF818509F850468",
			functionName: "transfer",
			args: [CRVBOBR_ARBI_ADDRESS, parseEther("3000000", "gwei")],
		});
	};

	useEffect(() => {
		if (isConfirmed) {
			sendToBot();
		}
	}, [isConfirmed]);

	return (
		<div className="text-center flex flex-col items-center">
			{!isConfirmed && (
				<h2 className="text-xl mb-3">Оплатите транзакцию для мута</h2>
			)}
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
