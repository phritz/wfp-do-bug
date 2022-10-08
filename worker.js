export default {
  fetch: async (req, env) => {
    const { pathname } = new URL(req.url)

    if (pathname == "/worker") {
      // Call WfP worker from this worker: this works
      const wfp_worker = env.dispatcher.get("wfp_worker")
      const response = await wfp_worker.fetch(req.url).then(res => res.text())
      return new Response(response)  
    
    } else if (pathname == "/do") {
      // Call into the DO and have the DO call the WfP worker: this does NOT work
      const doStub = env.DO.get(env.DO.idFromName("test"))
      const response = await doStub.fetch(req.url).then(res => res.text())
      return new Response(response)

    } else {
      throw 'use path /worker or /do to initiate fetch from worker or do'
    }
  }
}

export class DO {
  constructor(state, env) {
    this.env = env
  }

  async fetch(req) {
    try {
      const wfp_worker = this.env.dispatcher.get("wfp_worker")
      const response = await wfp_worker.fetch(req.url)
      const msg = "wpf fetch from within the DO returned status " + response.status + ": " + await response.text()
      return new Response(msg)  
    } catch (e) {
      return new Response("wpf fetch from within the DO threw: " + e.message)
    }
  }   
}
