import { IParams } from "../interfaces/IParams";

export default (url: string): IParams => {
	let urlArr = url.slice(url.indexOf("?") + 1).split("&");
	return urlArr.reduce(
		(a, v) => ({
			...a,
			[v.slice(0, v.indexOf("="))]: v.slice(v.indexOf("=") + 1),
		}),
		{}
	) as IParams;
};
