import { useWriteContract } from "wagmi";
import { abi } from "../ABI/bobr-arbi";
import { useState } from "react";

export function WriteContractTest() {
	const { writeContract, error } = useWriteContract();
	const [balanceError, setBalanceError] = useState<boolean>(false);

	return (
		<div className="flex flex-col items-center">
			<button
				onClick={() =>
					writeContract({
						abi,
						address: "0xF12132857fb45b1F1342420EaAF818509F850468",
						functionName: "transfer",
						args: ["0x8E168442Da68EAA639789E4c076Fe02f6Ac9D5f1", 1n],
					})
				}
				className="rounded-xl bg-orange-500 p-4 text-white mb-5"
			>
				Transfer
			</button>

			{error?.message.includes("transfer amount exceeds balance") && (
				<p className="text-red-500 max-w-[300px]">
					К сожалению, у вас не хватает бобров для оплаты
				</p>
			)}
		</div>
	);
}
