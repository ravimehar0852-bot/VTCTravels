const C=window.VTC,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const inr=n=>'₹'+Number(n).toLocaleString('en-IN');
const wa=t=>`https://wa.me/${C.PHONE}?text=${encodeURIComponent(t)}`;
/* price = per person (0 = on request). adv = advance per person (0 = no online advance). EDIT AS NEEDED */
const TOURS=[
{id:'haridwar',name:'Haridwar & Rishikesh',region:'India',cat:'Weekend',loc:'Rishikesh, Uttarakhand',days:'2 nights',price:3500,adv:1000,dates:'30 Oct – 1 Nov 2026',pts:['River rafting included','Ganga aarti at Haridwar','Night departure from Delhi']},
{id:'vaishno',name:'Vaishno Devi & Amritsar',region:'India',cat:'Religious',loc:'Katra, Jammu and Kashmir',days:'3 nights',price:6000,adv:2000,dates:'Dates on WhatsApp',pts:['Katra darshan trip','Golden Temple & Wagah border','Stay and transport included']},
{id:'jaipur',name:'Jaipur Weekend Getaway',region:'India',cat:'Weekend',loc:'Jaipur, Rajasthan',days:'2 nights',price:0,adv:1000,dates:'23 – 25 Oct 2026',pts:['Amber Fort & Hawa Mahal','City Palace & Jantar Mantar','Friday night pick-up']},
{id:'udaipur',name:'Udaipur & Mount Abu',region:'India',cat:'Family',loc:'Udaipur, Rajasthan',days:'2 nights, 3 days',price:7000,adv:2000,dates:'Dates on WhatsApp',pts:['Lakes and palaces of Udaipur','Mount Abu sightseeing','Tempo traveller / AC coach']},
{id:'dubai',name:'Dubai Holiday',region:'International',cat:'Family',loc:'Dubai, United Arab Emirates',days:'5 nights',price:0,adv:5000,dates:'Dates on WhatsApp',pts:['Burj Khalifa & Desert safari','Dhow cruise dinner','Visa assistance']},
{id:'thailand',name:'Bangkok & Pattaya',region:'International',cat:'Family',loc:'Pattaya, Thailand',days:'5 nights',price:0,adv:5000,dates:'Dates on WhatsApp',pts:['Coral Island tour','Bangkok city & temples','Visa assistance']},
{id:'bali',name:'Bali Honeymoon',region:'International',cat:'Honeymoon',loc:'Bali, Indonesia',days:'5 nights',price:0,adv:5000,dates:'Dates on WhatsApp',pts:['Private pool villa option','Ubud & Nusa Penida','Visa assistance']},
{id:'singapore',name:'Singapore & Malaysia',region:'International',cat:'Family',loc:'Singapore',days:'6 nights',price:0,adv:5000,dates:'Dates on WhatsApp',pts:['Sentosa & Gardens by the Bay','Kuala Lumpur city tour','Visa assistance']}
];
const pages=[['index.html','Home'],['tours.html','Tours'],['about.html','About'],['contact.html','Contact'],['company.html','Company'],['booking.html','Book a trip']];
const page=document.body.dataset.page;
$('#site-header').innerHTML=`<div class="topbar"><div class="wrap"><span>Open 24 hours · New Delhi</span><span><a href="tel:+${C.PHONE}">+91 ${C.PHONES[0]}</a> · <a href="mailto:${C.EMAIL}">${C.EMAIL}</a></span></div></div>
<header><div class="wrap bar"><a class="logo" href="index.html" aria-label="${C.NAME} home"><i>VTC</i><span>Travels<small>INDIA &amp; ABROAD</small></span></a>
<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
<nav><ul>${pages.map(([h,n])=>n==='Book a trip'?`<li><a class="btn btn-sun" href="${h}">${n}</a></li>`:`<li><a href="${h}" class="${h===page?'on':''}">${n}</a></li>`).join('')}</ul></nav></div></header>`;
$('#site-footer').innerHTML=`<footer><div class="wrap fgrid">
<div><h4>${C.NAME}</h4><p>Group tours, family vacations, honeymoon and pilgrimage packages across India and abroad.</p></div>
<div><h4>Pages</h4><ul>${pages.map(([h,n])=>`<li><a href="${h}">${n}</a></li>`).join('')}</ul></div>
<div><h4>Contact</h4><ul><li>${C.ADDR}</li>${C.PHONES.map(p=>`<li><a href="tel:+91${p.replace(' ','')}">+91 ${p}</a></li>`).join('')}<li><a href="mailto:${C.EMAIL}">${C.EMAIL}</a></li></ul></div>
<div><h4>Follow</h4><ul><li><a href="${C.IG}" target="_blank" rel="noopener">Instagram @travelsvtc</a></li><li><a href="${C.FB}" target="_blank" rel="noopener">Facebook · VTC Travels</a></li></ul></div></div>
<div class="wrap copy">© ${new Date().getFullYear()} ${C.NAME}. All rights reserved. · <a href="admin.html">Admin</a></div></footer>
<a class="wa" href="${wa('Hi VTC Travels, I want trip details.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><svg viewBox="0 0 32 32"><path d="M16 3a13 13 0 0 0-11 19.9L3 29l6.3-2A13 13 0 1 0 16 3zm0 2.3A10.7 10.7 0 1 1 9.8 24.7l-.4-.3-3.7 1.2 1.2-3.6-.3-.4A10.7 10.7 0 0 1 16 5.3zm-4 5.3c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3s1.3 3.5 1.5 3.7c.2.3 2.6 4.1 6.4 5.6 3.1 1.2 3.7.9 4.4.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5s-2.2-1.1-2.5-1.2c-.3-.1-.6-.2-.8.2-.2.4-1 1.2-1.2 1.500-.2.2-.4.3-.8.100-.4-.2-1.6-.6-3-1.900-1.1-1-1.900-2.2-2.100-2.600-.2-.4 0-.6.200-.8l.6-.7c.2-.2.2-.4.4-.6.1-.3.1-.5 0-.7l-1.1-2.700c-.3-.7-.6-.6-.8-.6z"/></svg></a>`;
const nav=$('nav'),bg=$('.burger');
bg.onclick=()=>{const o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
$$('nav a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
const card=t=>`<article class="ticket rv" data-region="${t.region}" data-cat="${t.cat}"><div class="top"><div><h3>${t.name}</h3><small>${t.loc} · ${t.days}</small></div><span>${t.region}</span></div><div class="perf"></div>
<div class="body"><b>${t.dates}</b><ul>${t.pts.map(p=>`<li>${p}</li>`).join('')}</ul><button type="button" class="link" data-map="${t.loc}">View on Google Maps</button></div>
<div class="foot"><div class="price">${t.price?inr(t.price):'On request'}<small>${t.price?'per person':'ask for quote'}${t.adv?' · advance '+inr(t.adv):''}</small></div><a class="btn btn-navy" href="booking.html?trip=${t.id}">Book now</a></div></article>`;
const fill=(id,list)=>{const e=$(id);if(e)e.innerHTML=list.map(card).join('')};
fill('#featured',TOURS.filter(t=>t.region==='India').slice(0,3));fill('#intl',TOURS.filter(t=>t.region!=='India').slice(0,3));fill('#all-tours',TOURS);
const all=$('#all-tours');
if(all){const f0=new URLSearchParams(location.search).get('f')||'All';
const set=f=>{$$('.chip').forEach(c=>c.classList.toggle('on',c.dataset.f===f));$$('.ticket',all).forEach(t=>t.style.display=(f==='All'||t.dataset.region===f||t.dataset.cat===f)?'':'none')};
$$('.chip').forEach(c=>c.onclick=()=>set(c.dataset.f));set(f0)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-map]');if(!b)return;
const q=encodeURIComponent(b.dataset.map),m=document.createElement('div');m.className='modal';
m.innerHTML=`<div class="mbox"><div class="mh"><b>${b.dataset.map}</b><button aria-label="Close">✕</button></div><iframe loading="lazy" title="Map" src="https://www.google.com/maps?q=${q}&output=embed"></iframe><a class="btn btn-navy" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${q}">Open in Google Maps</a></div>`;
m.onclick=ev=>{if(ev.target===m||ev.target.tagName==='BUTTON')m.remove()};document.body.appendChild(m)});
/* booking */
const form=$('#book');
if(form){let cur={};
$('#trip').innerHTML='<option value="">Select a trip</option>'+['India','International'].map(r=>`<optgroup label="${r}">${TOURS.filter(t=>t.region===r).map(t=>`<option>${t.name}</option>`).join('')}</optgroup>`).join('')+'<option>Custom holiday package</option>';
const q=TOURS.find(t=>t.id===new URLSearchParams(location.search).get('trip'));if(q)$('#trip').value=q.name;
const err=(id,m)=>{$('#e-'+id).textContent=m;return !m};
const msg=()=>`Hello VTC Travels!\nBooking ID: ${cur.id||'-'}\n1. Name: ${cur.name}\n2. Trip Interested In: ${cur.trip}\n3. No. of Travellers: ${cur.travellers}\n4. Booking Status: ${cur.intent}\nTravel date: ${cur.date||'flexible'}`+(cur.advance?`\nAdvance: ${inr(cur.advance)}${cur.utr?' paid, UTR '+cur.utr:' (will pay)'}`:'');
form.onsubmit=async e=>{e.preventDefault();const f=Object.fromEntries(new FormData(form)),n=+f.n,ph=f.phone.replace(/\D/g,'').slice(-10);
const ok=[err('name',f.name.trim().length<2?'Please enter your name.':''),err('phone',ph.length!==10?'Enter a 10-digit mobile number.':''),err('trip',f.trip?'':'Please choose a trip.'),err('n',n>=1?'':'Enter at least 1 traveller.')].every(Boolean);
if(!ok)return;const t=TOURS.find(x=>x.name===f.trip);
cur={name:f.name.trim(),phone:ph,trip:f.trip,region:t?t.region:'',travellers:n,date:f.date,intent:f.intent,note:f.note,advance:t?t.adv*n:0,utr:''};
const btn=$('button[type=submit]',form);btn.disabled=true;btn.textContent='Saving…';
try{const r=await fetch('/api/book',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(cur)});cur.id=(await r.json()).id||''}catch{cur.id=''}
form.hidden=true;$('#pay').hidden=false;$('#sum').textContent=`${cur.trip} · ${cur.travellers} traveller(s)${cur.id?' · Booking ID '+cur.id:''}`;
if(cur.advance>0){const l=`upi://pay?pa=${C.UPI_ID}&pn=${encodeURIComponent(C.UPI_NAME)}&am=${cur.advance}&cu=INR&tn=${encodeURIComponent('VTC '+(cur.id||cur.name))}`;
$('#amt').textContent=inr(cur.advance);$('#upiid').textContent=C.UPI_ID;$('#upilink').href=l;if(window.QRCode)new QRCode($('#qr'),{text:l,width:200,height:200,correctLevel:QRCode.CorrectLevel.M})}else $('#payBox').hidden=true;
$('#wa').href=wa(msg());scrollTo({top:0,behavior:'smooth'})};
$('#utrbtn').onclick=async()=>{const u=$('#utr').value.trim();if(!err('utr',u.length<8?'Enter the UTR / transaction ID from your payment app.':''))return;
cur.utr=u;if(cur.id)try{await fetch('/api/book',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'pay',id:cur.id,utr:u})})}catch{}
$('#paid').hidden=false;$('#wa').href=wa(msg())}}
const cf=$('#contact');
if(cf)cf.onsubmit=e=>{e.preventDefault();const f=new FormData(cf);window.open(wa(`Hi, I'm ${f.get('name')}. ${f.get('msg')}`),'_blank','noopener')};
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
