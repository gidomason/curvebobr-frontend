import { useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import SignButton from "./components/SignButton";
import img from "./assets/main.jpg";
import Footer from "./components/Footer";
import BotResponseStatus from "./components/BotResponseStatus";
// import SendTransaction from "./components/SendTransaction";
import { WriteContractTest } from "./components/WriteContractTest";
import getParams from "./services/getParams";
import { IParams } from "./interfaces/IParams";
import Header from "./components/Header";
import SendTransaction from "./components/SendTransaction";

function App() {
	const { address } = useAccount();
	const [params, setParams] = useState<IParams>({
		user_id: "",
		chat_id: "",
		target_id: "",
	});
	const [signed, setSigned] = useState<boolean>(false);
	const [botResponse, setBotResponse] = useState<"success" | "failed" | null>(
		null
	);

	const onSignedSuccess = (data: `0x${string}`) => {
		setSigned(!!data);
	};

	const sendToBot = async () => {
		const body = {
			user_id: params.user_id,
			address,
		};
		try {
			const { data } = await axios.post("https://nofomo.world/postapp", body);
			if (data === "OK") {
				setBotResponse("success");
			}
		} catch (err) {
			setBotResponse("failed");
		}
	};

	useEffect(() => {
		const url = window.location.href;
		const params = getParams(url);
		setParams(params);
	}, []);

	useEffect(() => {
		if (signed) {
			sendToBot();
		}
	}, [signed]);

	return (
		<div className="container mx-auto px-5 pt-12">
			<Header />

			<div className="mx-auto flex gap-5 max-w-[850px] items-center justify-between">
				{!params.user_id ? (
					<div className="max-w-[400px] text-center text-red-500">
						<h3 className="text-xl">
							Не найден ваш User ID, вероятно вы не прошли по ссылке в боте
						</h3>
					</div>
				) : (
					<div>
						{!address && (
							<h2 className="text-center text-2xl">
								Пожалуйста, подключите кошелек
							</h2>
						)}

						{address &&
							(signed ? (
								<>
									<BotResponseStatus status={botResponse} />
									{botResponse === "success" && (
										// <SendTransaction chain="arbitrum" />
										<WriteContractTest />
									)}
								</>
							) : (
								<div className="flex flex-col items-center justify-center gap-5">
									<h2 className="text-center text-xl">
										Пожалуйста, подпишите сообщение
									</h2>
									<SignButton address={address} setSigned={onSignedSuccess} />
								</div>
							))}
					</div>
				)}

				<div>
					<img className="w-96 rounded-3xl" src={img} alt="logo" />
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default App;
