1. upload the wfp worker
   1. `wrangler dispatch-namespace create wfp-do-bug`
   1. set `account_id` and `api_token` in `wfp/upload.sh`
   1. `cd wfp && ./upload.sh` 
1. upload the regular worker and DO:
   1. `cd ..`
   1. set `account_id` in `wrangler.toml`  
   1. `wrangler publish`
1. notice that we can call into the WfP worker from our worker: `curl <URL>/worker` shows:
```
hello from the wpf worker!
```
1. notice that we CANNOT call into the WfP worker from our DO: `curl <URL>/do` shows:
```
wpf fetch from within the DO threw: internal error
```

Expected behavior: it does not throw and instead shows `hellow from the wpf worker!`
