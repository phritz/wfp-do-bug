#!/bin/bash
set -x

account_id=<REPLACE ME>
api_token=<REPLACE ME>

namespace=wfp-do-bug
script_name=wfp_worker

curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/dispatch/namespaces/$namespace/scripts/$script_name" \
     -H "Authorization: Bearer $api_token" \
     -H "Content-Type: multipart/form-data" \
     --form 'metadata={"main_module": "wfp_worker.js"}' \
     --form '"wfp_worker.js"=@./wfp_worker.js;type=application/javascript+module'
