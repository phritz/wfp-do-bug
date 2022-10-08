export default {
	fetch: async (req, env) => {
		return new Response("hello from the wfp worker!")
	}
}