import { useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import SignButton from "./components/SignButton";
import img from "./assets/main.jpg";
import Footer from "./components/Footer";
import BotResponseStatus from "./components/BotResponseStatus";
import getParams from "./services/getParams";
import { IPayParams, IRegisterParams } from "./interfaces/IParams";
import Header from "./components/Header";
import SendTransaction from "./components/SendTransaction";

function App() {
	const { address } = useAccount();
	const [params, setParams] = useState({
		type: "",
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
		let body: IPayParams | IRegisterParams;
		if (params.type === "register") {
			body = {
				user_id: params.user_id,
				address,
			} as IRegisterParams;
		} else if (params.type === "pay") {
			body = {
				chat_id: params.chat_id,
				target_id: params.target_id,
			} as IPayParams;
		}
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
		//@ts-ignore
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
				<div>
					{params.type === "register" && (
						<>
							{!address ? (
								<h2 className="text-center text-2xl">
									Пожалуйста, подключите кошелек
								</h2>
							) : (
								<>
									{signed ? (
										<BotResponseStatus status={botResponse} />
									) : (
										<div className="flex flex-col items-center justify-center gap-5">
											<h2 className="text-center text-xl">
												Пожалуйста, подпишите сообщение
											</h2>
											<SignButton
												address={address}
												setSigned={onSignedSuccess}
											/>
										</div>
									)}
								</>
							)}
						</>
					)}

					{params.type === "pay" && (
						<>
							{!address ? (
								<h2 className="text-center text-2xl">
									Пожалуйста, подключите кошелек
								</h2>
							) : (
								<SendTransaction sendToBot={sendToBot} />
							)}
						</>
					)}
				</div>

				<div>
					<a href="https://bobrcrv.com" target="_blank">
						<img className="w-96 rounded-3xl" src={img} alt="logo" />
					</a>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default App;
