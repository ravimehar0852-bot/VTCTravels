const URL_=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL,TOK=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
exports.R=async cmd=>{const r=await fetch(URL_,{method:'POST',headers:{Authorization:'Bearer '+TOK},body:JSON.stringify(cmd)});const j=await r.json();if(j.error)throw new Error(j.error);return j.result};
