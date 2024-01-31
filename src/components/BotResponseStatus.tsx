export default ({ status }: { status: "success" | "failed" }) => {
	return (
		<>
			<div className="text-center font-bold text-lg mb-5 flex items-center gap-3">
				<span className="text-2xl">
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
