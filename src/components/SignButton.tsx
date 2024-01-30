import { useSignMessage } from "wagmi";
import Spinner from "./Spinner";

export default ({
	address,
	setSigned,
}: {
	address: `0x${string}` | undefined;
	setSigned: (data: `0x${string}`) => void;
}) => {
	const { data, signMessage, isPending } = useSignMessage();

	const message = `Подпишите, чтобы авторизоваться на сайте`;

	if (data) {
		setSigned(data);
	}

	return (
		<div>
			{isPending ? (
				<Spinner />
			) : (
				<button
					className="bg-orange-500 hover:bg-orange-600 transition-all text-white px-5 py-3 rounded-xl font-bold"
					onClick={() =>
						signMessage({
							message: message,
							account: address,
						})
					}
				>
					Подписать
				</button>
			)}
		</div>
	);
};
