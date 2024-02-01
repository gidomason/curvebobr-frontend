import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Web3Modal } from "./components/Web3Modal.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Web3Modal children={<App />} />
	</React.StrictMode>
);
