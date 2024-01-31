import ConnectButton from "./ConnectButton";
import Logo from "../assets/logo.png";

export default () => {
	return (
		<header className="mb-20 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<span>
					<img className="w-10 hidden md:block" src={Logo} alt="logo" />
				</span>
				<h2 className="text-2xl font-bold">CURVEBOBR</h2>
			</div>
			<div>
				<ConnectButton />
			</div>
		</header>
	);
};
