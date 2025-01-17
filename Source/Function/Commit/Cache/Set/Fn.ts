export const CACHE_FILE = ".cache/Commit/Cache.json";

export default async (Where: string, _Set: []) => {
	try {
		await (
			await import("fs/promises")
		).writeFile(
			(await import("path")).join(process.cwd(), CACHE_FILE),
			JSON.stringify(
				{
					...(await (
						await import("@Function/Commit/Cache/Set/Get/Fn.js")
					).default(Where)),
					[Where]: { Set: _Set, TimeStamp: Date.now() },
				},
				null,
				"\t",
			),
			"utf-8",
		);
	} catch (_Error) {
		console.error("Error writing cache:", _Error);
	}
};
