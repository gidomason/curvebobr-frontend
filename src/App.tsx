import { useEffect, useState } from "react";
import axios from "axios";
import ConnectButton from "./components/ConnectButton";
import { useAccount } from "wagmi";
import SignButton from "./components/SignButton";
import img from "./assets/main.jpg";
import Logo from "./assets/logo.png";
import Footer from "./components/Footer";
import BotResponseStatus from "./components/BotResponseStatus";
// import SendTransaction from "./components/SendTransaction";
import { WriteContractTest } from "./components/WriteContractTest";

function App() {
	const { address } = useAccount();
	const [userId, setUserId] = useState<string>("");
	const [signed, setSigned] = useState<boolean>(false);
	const [botResponse, setBotResponse] = useState<"success" | "failed" | null>(
		null
	);

	const onSignedSuccess = (data: `0x${string}`) => {
		setSigned(!!data);
	};

	const sendToBot = async () => {
		const body = {
			user_id: userId,
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
		let url = window.location.href;
		setUserId(url.slice(url.indexOf("user_id")).split("=")[1]);
	}, []);

	useEffect(() => {
		if (signed) {
			sendToBot();
		}
	}, [signed]);

	return (
		<div className="container mx-auto px-5 pt-12">
			<header className="mb-20 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<span className="sm:hidden md:block">
						<img className="w-10" src={Logo} alt="logo" />
					</span>
					<h2 className="text-2xl font-bold">CURVEBOBR</h2>
				</div>
				<div>
					<ConnectButton />
				</div>
			</header>

			<div className="mx-auto flex max-w-[850px] items-center justify-between">
				{!userId ? (
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
										// <SendTransaction from={address} />
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
