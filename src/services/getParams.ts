export default (url: string) => {
	let urlArr = url.slice(url.indexOf("?") + 1).split("&");
	return urlArr.reduce(
		(a, v) => ({
			...a,
			[v.slice(0, v.indexOf("="))]: v.slice(v.indexOf("=") + 1),
		}),
		{}
	);
};
