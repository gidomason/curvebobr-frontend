export default ({ status }: { status: "success" | "failed" }) => {
	return (
		<>
			<div className="text-center font-bold text-lg mb-5 flex items-center">
				<span className="text-2xl mr-2">
					{status === "success" && "✅"}
					{status === "failed" && "🚨"}
				</span>

				<h2 className="text-xl">
					{status === "success" && "Сообщение успешно подписано"}
					{status === "failed" && "Не удалось подписать сообщение"}
				</h2>
			</div>
			{status === "failed" && (
				<h2 className="text-lg text-center">
					Пожалуйста, вернитесь к боту и попробуйте еще раз
				</h2>
			)}
		</>
	);
};
