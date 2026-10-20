const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inr=n=>'₹'+Number(n||0).toLocaleString('en-IN');let pw=sessionStorage.getItem('pw')||'',data=[];
const api=(m,body,qs='')=>fetch('/api/bookings'+qs,{method:m,headers:{'Content-Type':'application/json','x-admin':pw},body:body?JSON.stringify(body):undefined});
const show=ok=>{$('#login').hidden=ok;$('#dash').hidden=!ok};
async function load(){try{const r=await api('GET');
if(r.status===401){sessionStorage.removeItem('pw');show(false);$('#lerr').textContent=pw?'Wrong password.':'';return}
if(!r.ok){show(false);$('#lerr').textContent='Server error. Check database and ADMIN_PASSWORD settings.';return}
data=(await r.json()).bookings;show(true);render()}catch{show(false);$('#lerr').textContent='Could not reach the server.'}}
$('#lf').onsubmit=e=>{e.preventDefault();pw=$('#pw').value;sessionStorage.setItem('pw',pw);load()};
$('#lo').onclick=()=>{sessionStorage.removeItem('pw');pw='';show(false)};$('#rf').onclick=load;
['q','fs','fp'].forEach(i=>$('#'+i).oninput=render);
function render(){const live=data.filter(b=>b.state!=='Cancelled'),q=$('#q').value.toLowerCase();
const S=[['Total bookings',data.length],['New',data.filter(b=>b.state==='New').length],['Confirmed',data.filter(b=>b.state==='Confirmed').length],['Travellers',live.reduce((a,b)=>a+(+b.travellers||0),0)],['Advance expected',inr(live.reduce((a,b)=>a+(+b.advance||0),0))],['Advance received',inr(data.filter(b=>b.pay==='Verified').reduce((a,b)=>a+(+b.advance||0),0))],['Payments to verify',data.filter(b=>b.pay==='Submitted').length]];
$('#stats').innerHTML=S.map(([l,v])=>`<div class="stat"><b>${v}</b><span>${l}</span></div>`).join('');
const list=data.filter(b=>(!$('#fs').value||b.state===$('#fs').value)&&(!$('#fp').value||b.pay===$('#fp').value)&&(!q||[b.name,b.phone,b.trip,b.id].join(' ').toLowerCase().includes(q)));
const sel=(id,k,opts,v)=>`<select data-id="${esc(id)}" data-k="${k}">${opts.map(o=>`<option${o===v?' selected':''}>${o}</option>`).join('')}</select>`;
$('#rows').innerHTML=list.map(b=>`<tr><td>${new Date(b.at).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})}</td><td><b>${esc(b.id)}</b><br>${esc(b.intent)}</td>
<td>${esc(b.name)}<br><a href="https://wa.me/91${esc(b.phone)}" target="_blank" rel="noopener">${esc(b.phone)}</a>${b.note?`<br><small>${esc(b.note)}</small>`:''}</td><td>${esc(b.trip)}<br><small>${esc(b.region)}</small></td><td>${esc(b.travellers)}</td><td>${esc(b.date||'-')}</td><td>${inr(b.advance)}</td><td>${esc(b.utr||'-')}</td>
<td>${sel(b.id,'pay',['Unpaid','Submitted','Verified'],b.pay)}</td><td>${sel(b.id,'state',['New','Confirmed','Cancelled'],b.state)}</td><td><button class="xs" data-del="${esc(b.id)}">Delete</button></td></tr>`).join('')||'<tr><td colspan="11">No bookings yet.</td></tr>';
const c={};live.forEach(b=>c[b.trip]=(c[b.trip]||0)+1);const mx=Math.max(1,...Object.values(c));
$('#tops').innerHTML=Object.entries(c).sort((a,b)=>b[1]-a[1]).map(([t,n])=>`<p>${esc(t)} · <b>${n}</b></p><div class="bar2" style="width:${n/mx*100}%"></div>`).join('')||'<p>No data yet.</p>'}
$('#rows').onchange=async e=>{const s=e.target;if(!s.dataset.k)return;const r=await api('PATCH',{id:s.dataset.id,[s.dataset.k]:s.value});if(r.ok)load();else alert('Update failed')};
$('#rows').onclick=async e=>{const id=e.target.dataset.del;if(!id||!confirm('Delete booking '+id+'?'))return;await api('DELETE',null,'?id='+encodeURIComponent(id));load()};
$('#csv').onclick=()=>{const k=['id','at','name','phone','trip','region','travellers','date','intent','advance','utr','pay','state','note'];
const t=[k.join(',')].concat(data.map(b=>k.map(x=>'"'+String(b[x]??'').replace(/"/g,'""')+'"').join(','))).join('\n');
const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download='vtc-bookings.csv';a.click()};
if(pw)load();
