export default async (Where: string) => {
	try {
		const _Set = JSON.parse(
			await (
				await import("fs/promises")
			).readFile(
				(await import("path")).join(
					process.cwd(),
					(await import("@Function/Commit/Cache/Set/Fn.js"))
						.CACHE_FILE,
				),
				"utf-8",
			),
		);

		if (
			_Set[Where] &&
			Date.now() - _Set[Where].TimeStamp < 30 * 60 * 1000
		) {
			return _Set[Where]["Set"];
		}
	} catch (_Error) {
		console.error("Error reading cache:", _Error);
	}

	return undefined;
};
