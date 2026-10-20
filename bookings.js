const {R}=require('./_db');
module.exports=async(req,res)=>{
if(!process.env.ADMIN_PASSWORD||req.headers['x-admin']!==process.env.ADMIN_PASSWORD)return res.status(401).json({error:'unauthorized'});
try{
if(req.method==='GET'){const a=await R(['HGETALL','bookings'])||[];const list=[];for(let i=1;i<a.length;i+=2)list.push(JSON.parse(a[i]));
list.sort((x,y)=>y.at.localeCompare(x.at));return res.json({bookings:list})}
if(req.method==='PATCH'){const b=typeof req.body==='string'?JSON.parse(req.body):req.body;const raw=await R(['HGET','bookings',b.id]);if(!raw)return res.status(404).json({error:'not found'});
const o=JSON.parse(raw);if(['Unpaid','Submitted','Verified'].includes(b.pay))o.pay=b.pay;if(['New','Confirmed','Cancelled'].includes(b.state))o.state=b.state;
await R(['HSET','bookings',o.id,JSON.stringify(o)]);return res.json({ok:1})}
if(req.method==='DELETE'){await R(['HDEL','bookings',String(req.query.id||'')]);return res.json({ok:1})}
res.status(405).json({error:'method'})}catch(e){res.status(500).json({error:'server'})}};
