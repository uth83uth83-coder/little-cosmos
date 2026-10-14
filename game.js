'use strict';
const STAGES = [
  {name:'소행성',min:10,color:'#9c9086',fact:'주로 암석과 금속으로 되어 있어요. 작은 소행성은 울퉁불퉁해요.',examples:'바위형 · 금속형 · 탄소형'},
  {name:'왜소행성',min:500,color:'#b9a69b',fact:'태양을 도는 둥근 천체예요. 궤도 주변을 중력으로 정리하지 못했어요.',examples:'세레스 · 명왕성 · 에리스'},
  {name:'위성',min:5000,color:'#c4c8ce',fact:'다른 천체를 돌고 있어요. 위성은 행성보다 클 수도 있어요!',examples:'달 · 유로파 · 타이탄'},
  {name:'행성',min:50000,color:'#66b6cd',fact:'태양계 행성은 태양을 돌고, 둥글며, 궤도 주변에서 중력적으로 지배적이에요.',examples:'암석형 · 가스형 · 고리 행성'},
  {name:'항성',min:5000000,color:'#ffb772',fact:'내부의 핵융합으로 스스로 빛나요. 표면 온도에 따라 색이 달라져요.',examples:'적색왜성 · 주황빛 별 · 청색 별 · 적색거성 · 백색왜성(잔해)'},
  {name:'블랙홀',min:500000000,color:'#f6b172',fact:'사건의 지평선 안에서는 빛도 빠져나올 수 없어요. 주변 물질은 밝은 원반을 만들 수 있어요.',examples:'어두운 중심 · 빛나는 강착원반'}
];
const $=id=>document.getElementById(id), canvas=$('space'), ctx=canvas.getContext('2d');
let W=0,H=0,dpr=1,started=false,paused=false,sound=false,last=0,time=0,spawnClock=0,toastClock=0,bounceClock=0;
let player, bodies=[],particles=[],stars=[], input={id:null,x:0,y:0,dx:0,dy:0}, keys=new Set();
const PLAYER_SPEED=180, ABSORB_SECONDS=0.5, ROUND_SECONDS=180;
let remainingTime=ROUND_SECONDS;
const rand=(a,b)=>a+Math.random()*(b-a), clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function formatMass(m){return new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(m);}
function stageFor(m){let i=0;while(i<5&&m>=STAGES[i+1].min)i++;return i;}
function gravityReach(){return 100*(player.r/radius(10));}
function gravityRadius(){return player.r+gravityReach();}
function radius(m){return 18+22*Math.pow(Math.max(1,m)/10,.38);}
let currentZoom=1,targetZoom=1;
function cameraZoom(){return currentZoom;}
function cameraSizeLimit(){return W<=600?Math.min(W,H)*.32/(1+100/radius(10)):clamp(Math.min(W,H)*.19,50,85);}
function initialCameraZoom(){return W<=600?Math.min(.65,cameraSizeLimit()/radius(10)*.8):1;}
function animateCamera(dt){
 const limit=cameraSizeLimit();
 while(player.r*targetZoom>limit)targetZoom*=.65;
 currentZoom+=(targetZoom-currentZoom)*(1-Math.exp(-2.5*dt));
 if(Math.abs(currentZoom-targetZoom)<targetZoom*.0001)currentZoom=targetZoom;
}
function animateGrowth(dt){const target=radius(player.m);player.r+=(target-player.r)*(1-Math.exp(-6*dt));if(Math.abs(target-player.r)<.001)player.r=target;}
function movementSpeed(){return PLAYER_SPEED*Math.min(1.65,1+.045*Math.log2(Math.max(1,player.m/10)))/cameraZoom();}
function resize(){W=innerWidth;H=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=W*dpr;canvas.height=H*dpr;stars=Array.from({length:160},()=>({x:Math.random(),y:Math.random(),r:rand(.4,1.6),z:rand(.1,.6)}));}
function bodySpeed(m,factor){const growth=Math.min(1.65,1+.045*Math.log2(Math.max(1,m/10)));return Math.min(PLAYER_SPEED*growth*Math.max(1,radius(m)/radius(10))*factor,movementSpeed()*.4);}
function makeBody(m,x,y){const angle=rand(0,Math.PI*2),speed=PLAYER_SPEED*rand(.2,.45);return {m,x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,r:radius(m),variant:Math.floor(rand(0,5)),seed:rand(0,100),progress:0,stage:stageFor(m)};}
function spawnRingRadius(){return Math.max(gravityRadius()*1.3,Math.hypot(W,H)*.55/cameraZoom());}
function despawnRadius(b){return spawnRingRadius()*1.8+b.r*2;}
function visibleBody(b){const z=cameraZoom(),x=(b.x-player.x)*z+W*.5,y=(b.y-player.y)*z+H*.55;return x>=12&&x<=W-12&&y>=12&&y<=H-12;}
const REGION_WEIGHTS=[.40,.25,.20,.10,.048,.002];
let regions=new Map(),activeRegions=new Set();
function regionSize(tier){return radius(tier===0?100:STAGES[tier].min*2)*10;}
function loadRegion(tier,gx,gy){
 const key=`${tier}:${gx}:${gy}`;if(regions.has(key))return regions.get(key);
 let seed=(Math.imul(gx,73856093)^Math.imul(gy,19349663)^Math.imul(tier+1,83492791))>>>0;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const size=regionSize(tier),items=[];
 for(let i=0;i<24;i++){
  if(random()>REGION_WEIGHTS[tier]*.1)continue;
  let x=(gx+random())*size,y=(gy+random())*size;
  const nearStart=Math.hypot(x,y)<1200;
  if(tier>0&&Math.hypot(x,y)<size*.8)continue;
  const low=tier===0?(nearStart?2:10):STAGES[tier].min;
  const high=tier===0?(nearStart?35:499):tier===5?STAGES[tier].min*5:STAGES[tier+1].min-1;
  const m=Math.round(Math.exp(Math.log(low)+random()*(Math.log(high)-Math.log(low))));
  const b=makeBody(m,x,y);b.variant=Math.floor(random()*5);b.seed=random()*100;
  const angle=random()*Math.PI*2; b.driftFactor=.12+random()*.13;const speed=bodySpeed(m,b.driftFactor);
  b.vx=Math.cos(angle)*speed;b.vy=Math.sin(angle)*speed;b.regionKey=key;b.consumed=false;
  items.push(b);
 }
 regions.set(key,items);return items;
}
function exploreRegions(){
 const next=new Set();const loaded=[];const kept=new Set();const viewReach=Math.hypot(W,H)*.8/cameraZoom();
 for(let tier=0;tier<6;tier++){
  const high=tier===5?Infinity:STAGES[tier+1].min;
  if(high<player.m*.2)continue;
  const size=regionSize(tier),gx=Math.floor(player.x/size),gy=Math.floor(player.y/size);
  const reach=Math.min(8,Math.max(1,Math.ceil(viewReach/size)+1));
  for(let dx=-reach;dx<=reach;dx++)for(let dy=-reach;dy<=reach;dy++){
   const key=`${tier}:${gx+dx}:${gy+dy}`;next.add(key);
   for(const b of loadRegion(tier,gx+dx,gy+dy))if(!b.consumed){loaded.push(b);kept.add(b);}
  }
 }
  for(const b of bodies){
  if(!b.consumed&&!kept.has(b)&&Math.hypot(b.x-player.x,b.y-player.y)<viewReach+collisionRadius(b)){
   loaded.push(b);next.add(b.regionKey);
  }
 }
  const previous=new Set(bodies),existing=loaded.filter(b=>previous.has(b));
 const candidates=loaded.filter(b=>!previous.has(b)).sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y));
 let budget=bodies.length===0?10:2;
 let visibleCount=existing.filter(visibleBody).length;
 for(const b of candidates){
  if(budget<=0||existing.length>=32)break;
  if(visibleBody(b)&&visibleCount>=8)continue;
  if(visibleBody(b))visibleCount++;
  b.appearance=0;existing.push(b);budget--;
 }
 activeRegions=next;bodies=existing;
}
function reset(){currentZoom=targetZoom=initialCameraZoom();remainingTime=ROUND_SECONDS;updateTimer();player={x:0,y:0,m:10,r:radius(10),stage:0,variant:Math.floor(rand(0,5)),seed:rand(0,100),kx:0,ky:0};bodies=[];particles=[];time=0;spawnClock=0;bounceClock=0;regions=new Map();activeRegions=new Set();exploreRegions();updateHUD();}
function updateHUD(){const s=STAGES[player.stage], next=STAGES[player.stage+1];$('stage').textContent=s.name;$('mass').textContent=player.m;$('growth').style.width=next?`${100*(player.m-s.min)/(next.min-s.min)}%`:'100%';$('next').textContent=next?`${formatMass(next.min)}에서 ${next.name}으로 변신 · 질량 포인트`:'블랙홀도 계속 성장해요 · 질량 포인트';}
function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');toastClock=3;}
function speak(msg){if(sound&&'speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(msg);u.lang='ko-KR';u.rate=.85;speechSynthesis.speak(u);}}
function burst(x,y,color,n=22){for(let i=0;i<n;i++){const a=rand(0,Math.PI*2),v=rand(20,110);particles.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,color});}}
function absorb(b){player.m+=b.m;const old=player.stage;player.stage=stageFor(player.m);burst(b.x,b.y,STAGES[b.stage].color);if(old!==player.stage){player.variant=Math.floor(rand(0,5));player.seed=rand(0,100);toast(`${STAGES[player.stage].name}으로 변신했어요!`);speak(`${STAGES[player.stage].name}으로 변신했어요. ${STAGES[player.stage].fact}`);burst(player.x,player.y,'#a9f5df',45);}else{speak(`${b.m}을 모았어요. 이제 ${player.m}!`);}updateHUD();}
function update(dt){animateGrowth(dt);animateCamera(dt);time+=dt;bounceClock=Math.max(0,bounceClock-dt);if(toastClock>0){toastClock-=dt;if(toastClock<=0)$('toast').classList.remove('show');}
 let dx=input.dx,dy=input.dy;if(keys.size){dx=(keys.has('ArrowRight')||keys.has('d')?1:0)-(keys.has('ArrowLeft')||keys.has('a')?1:0);dy=(keys.has('ArrowDown')||keys.has('s')?1:0)-(keys.has('ArrowUp')||keys.has('w')?1:0);const l=Math.hypot(dx,dy);if(l){dx/=l;dy/=l;}}
 player.x+=(dx*movementSpeed()+player.kx)*dt;player.y+=(dy*movementSpeed()+player.ky)*dt;player.kx*=Math.exp(-7*dt);player.ky*=Math.exp(-7*dt);
 let maxProgress=0;
 for(let i=bodies.length-1;i>=0;i--){const b=bodies[i];b.appearance=Math.min(1,(b.appearance??1)+dt/1.2);if(b.driftFactor){const oldSpeed=Math.hypot(b.vx,b.vy);if(oldSpeed>0){const target=bodySpeed(b.m,b.driftFactor),next=oldSpeed+(target-oldSpeed)*(1-Math.exp(-3*dt));b.vx*=next/oldSpeed;b.vy*=next/oldSpeed;}}if(b.inbound){const distance=Math.hypot(player.x-b.x,player.y-b.y);if(distance>player.r*.5){const speed=PLAYER_SPEED*b.inboundRatio/cameraZoom();b.vx=(player.x-b.x)/distance*speed;b.vy=(player.y-b.y)/distance*speed;}}b.x+=b.vx*dt;b.y+=b.vy*dt;
  let ax=b.x-player.x,ay=b.y-player.y,dist=Math.hypot(ax,ay),contact=player.r+b.r;
  if(b.m<player.m){const pullRadius=gravityRadius();if(dist<pullRadius&&dist>contact*.85){const force=(1-dist/pullRadius)*(90+player.stage*20);b.x-=ax/(dist||1)*force*dt;b.y-=ay/(dist||1)*force*dt;dist=Math.hypot(b.x-player.x,b.y-player.y);}
   if(dist<=pullRadius){b.progress+=dt;maxProgress=Math.max(maxProgress,b.progress);if(b.progress>=ABSORB_SECONDS){b.consumed=true;absorb(b);bodies.splice(i,1);continue;}}else b.progress=0;
  }else if(dist<contact){const nx=dist>0?ax/dist:1,ny=dist>0?ay/dist:0,overlap=contact-dist+2;player.x-=nx*overlap;player.y-=ny*overlap;player.kx=-nx*245;player.ky=-ny*245;b.vx=nx*PLAYER_SPEED*.28;b.vy=ny*PLAYER_SPEED*.28;if(bounceClock===0){toast('통통! 더 작은 숫자를 찾아봐요');burst(player.x,player.y,'#ffb59c',12);bounceClock=1.2;}b.progress=0;}
  if(!activeRegions.has(b.regionKey)){bodies.splice(i,1);}
 }
 $('absorb').style.display=maxProgress>0?'block':'none';$('seconds').textContent=`${Math.max(0,ABSORB_SECONDS-maxProgress).toFixed(1)}초`;$('absorbBar').style.width=`${maxProgress/ABSORB_SECONDS*100}%`;
 spawnClock+=dt;if(spawnClock>=.5){exploreRegions();spawnClock=0;}
 separateBodies(dt);
 for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;if(p.life<=0)particles.splice(i,1);}
}
function collisionRadius(b){return b.r*(b.stage===5||b.stage===3&&b.variant===2?1.75:1)+3;}
function separateBodies(dt=1/60){
 for(let pass=0;pass<2;pass++){
  let changed=false;
  for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){
   const a=bodies[i],b=bodies[j],dx=b.x-a.x,dy=b.y-a.y,limit=collisionRadius(a)+collisionRadius(b);
   if(Math.abs(dx)>=limit||Math.abs(dy)>=limit)continue;
   const distance=Math.hypot(dx,dy);if(distance>=limit)continue;
   const nx=distance?dx/distance:1,ny=distance?dy/distance:0;
   const overlap=Math.min(limit-distance+.01,30*dt/cameraZoom()),share=b.r/(a.r+b.r);
   a.x-=nx*overlap*share;a.y-=ny*overlap*share;b.x+=nx*overlap*(1-share);b.y+=ny*overlap*(1-share);
   const closing=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
   if(closing<0){const impulse=-closing*1.3;a.vx-=nx*impulse*share;a.vy-=ny*impulse*share;b.vx+=nx*impulse*(1-share);b.vy+=ny*impulse*(1-share);}
   changed=true;
  }
  if(!changed)break;
 }
}
function circle(c,x,y,r){c.beginPath();c.arc(x,y,r,0,Math.PI*2);}
function drawBody(c,b,r,t){const opacity=c.globalAlpha;const s=b.stage,v=b.variant,axisTime=t;t*=b===player?3.5:1;c.save();const baseTilt=Math.sin(b.seed)*.65;const precession=axisTime*(.025+.015*Math.abs(Math.cos(b.seed)));const sway=Math.sin(axisTime*.18+b.seed)*.16;c.rotate(baseTilt+precession+sway);
 if(s===5){/* Far disk, lensing ring, dark horizon and near disk. */c.shadowColor='#ffad65';c.shadowBlur=r*.5;c.strokeStyle='#f4a468';c.lineWidth=r*.23;c.beginPath();c.ellipse(0,0,r*1.65,r*.42,-.18,0,Math.PI*2);c.stroke();c.shadowBlur=0;for(let j=0;j<22;j++){const orbit=1.12+(j%4)*.16,angle=j*2.399+t*(1.2/Math.pow(orbit,1.5));c.fillStyle=j%2?'#ffe4b3aa':'#ffa16488';circle(c,Math.cos(angle)*r*orbit,Math.sin(angle)*r*.32*orbit,r*.025);c.fill();}circle(c,0,0,r*.78);c.fillStyle='#03040b';c.fill();c.strokeStyle='#ffd9a1';c.lineWidth=2;c.stroke();c.strokeStyle='#ffb867';c.lineWidth=r*.12;c.beginPath();c.ellipse(0,0,r*1.6,r*.4,-.18,0,Math.PI);c.stroke();c.restore();return;}
 let colors;
 if(s===0)colors=[['#ab9a86','#514842'],['#a6a9af','#51555e'],['#706b72','#30313b'],['#b18b72','#544334'],['#9c948d','#4b4545']][v];
 else if(s===1)colors=[['#d1b8a7','#766559'],['#dbc8a9','#70594f'],['#d3dfed','#7a8eab'],['#b7a99a','#686563'],['#d1bab0','#796e77']][v];
 else if(s===2)colors=[['#d2d1cc','#6b727e'],['#ead0a3','#907452'],['#c7e3e8','#7c929c'],['#d3b284','#6d5951'],['#bcb7af','#55596b']][v];
 else if(s===3)colors=[['#61b0ed','#183f71'],['#e7b987','#8c634f'],['#ecdba7','#8b765d'],['#e48761','#793c37'],['#a9dced','#44768d']][v];
 else colors=[['#ff9278','#a82418'],['#ffca7c','#cf601d'],['#ccedff','#487dce'],['#ff8068','#a92d1b'],['#f5fcff','#99b8d8']][v];
 if(s===4){c.shadowColor=colors[0];c.shadowBlur=r*.65;c.globalAlpha=opacity*.2;circle(c,0,0,r*1.25+Math.sin(t*2+b.seed)*3);c.fillStyle=colors[0];c.fill();c.globalAlpha=opacity;}
 if(s===3&&v===2){c.strokeStyle='#ccb98a88';c.lineWidth=r*.3;c.beginPath();c.ellipse(0,0,r*1.7,r*.52,-.32,0,Math.PI*2);c.stroke();}
 const gradient=c.createRadialGradient(-r*.35,-r*.4,0,r*.15,r*.2,r*1.3);gradient.addColorStop(0,colors[0]);gradient.addColorStop(1,colors[1]);c.fillStyle=gradient;
 c.beginPath();if(s===0){for(let i=0;i<14;i++){const a=i/14*Math.PI*2+t*.22,rr=r*(.86+.13*Math.sin(i*4.8+b.seed));if(i===0)c.moveTo(Math.cos(a)*rr,Math.sin(a)*rr);else c.lineTo(Math.cos(a)*rr,Math.sin(a)*rr);}c.closePath();}else c.arc(0,0,r,0,Math.PI*2);c.fill();c.shadowBlur=0;c.save();c.clip();
 const spin=t*([.32,.15,.09,.23,.12][s])*(.75+.5*Math.abs(Math.sin(b.seed)))+b.seed;
 // Project longitude/latitude onto the visible hemisphere. Features narrow at the limb.
 function feature(lon,lat,size,color){const angle=lon+spin*(s===4?1-.25*Math.sin(lat)**2:1),depth=Math.cos(angle)*Math.cos(lat);if(depth<=0)return;const x=r*Math.sin(angle)*Math.cos(lat),y=r*Math.sin(lat);c.fillStyle=color;c.beginPath();c.ellipse(x,y,Math.max(.2,size*depth),size,0,0,Math.PI*2);c.fill();}
 if(s===3&&(v===1||v===2||v===4)){
  for(let i=-7;i<=7;i++){const lat=i/8*Math.PI/2,y=r*Math.sin(lat);c.fillStyle=i%2?'#fff0d536':'#442d3735';c.fillRect(-r,y,r*2,r*.065);}
  for(let i=0;i<14;i++)feature(i*2.4,Math.sin(i*3.7+b.seed)*.95,r*(i===3?.16:.055),i===3?'#a44f4266':'#fff0d54a');
 }else if(s===3&&v===0){
  for(let i=0;i<22;i++)feature(i*2.399,Math.sin(i*5+b.seed)*1.05,r*(.09+(i%4)*.025),'#7fb98dcc');
  for(let i=0;i<12;i++)feature(i*3.4+t*.035,Math.sin(i*4.3)*1.2,r*.075,'#effaff88');
 }else{
  for(let i=0;i<32;i++){const lon=i*2.399,lat=Math.sin(i*7.3+b.seed)*1.3,rr=r*(.035+(i%4)*.022);feature(lon,lat,rr,s===4?'#ffefbc55':'#30324466');if(s<3)feature(lon+.018,lat-.015,rr*.6,'#f4ebd53b');}
  if(s===2&&v===2){for(let i=0;i<32;i++)feature(i*.19,Math.sin(i*.3)*.6,r*.025,'#826a6577');}
 }
 // Keep the light direction fixed while the surface rotates beneath it.
 if(s!==4){const shade=c.createRadialGradient(-r*.4,-r*.45,r*.15,r*.25,r*.2,r*1.2);shade.addColorStop(0,'#ffffff16');shade.addColorStop(.5,'#00000000');shade.addColorStop(1,'#020715b0');c.fillStyle=shade;c.fillRect(-r,-r,r*2,r*2);}
 c.restore();if(s===3&&v===2){c.strokeStyle='#dfc799';c.lineWidth=r*.2;c.beginPath();c.ellipse(0,0,r*1.7,r*.52,-.32,0,Math.PI);c.stroke();}c.restore();}
let spaceBackground=null,backgroundWidth=0,backgroundHeight=0;
function buildSpaceBackground(){
 const layer=document.createElement('canvas');layer.width=Math.round(W*dpr);layer.height=Math.round(H*dpr);const c=layer.getContext('2d');c.scale(dpr,dpr);c.fillStyle='#030610';c.fillRect(0,0,W,H);
 let seed=7319;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 function cloud(x,y,r,color){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(.5,color.slice(0,7)+'0c');g.addColorStop(1,color.slice(0,7)+'00');c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
 // Uneven stellar glow and dark dust lanes along an oblique galactic band.
 c.save();c.translate(W*.52,H*.5);c.rotate(-.48);const span=Math.hypot(W,H);
 for(let i=0;i<95;i++){const x=(random()-.5)*span*1.7,y=(random()-.5)*span*.17,r=span*(.045+random()*.11);cloud(x,y,r,['#727fbc24','#8b709e20','#587d9826'][i%3]);}
 for(let i=0;i<45;i++){const x=(random()-.5)*span*1.6,y=Math.sin(x/span*9)*span*.025+(random()-.5)*span*.03;cloud(x,y,span*(.025+random()*.045),'#01040b85');}
 for(let i=0;i<1200;i++){const x=(random()-.5)*span*1.6,y=(random()+random()+random()-1.5)*span*.065;circle(c,x,y,.25+random()*.65);c.fillStyle='#e8e6ff'+Math.floor(25+random()*75).toString(16).padStart(2,'0');c.fill();}c.restore();
 cloud(W*.8,H*.25,span*.28,'#34516c28');cloud(W*.18,H*.77,span*.22,'#55365220');
 for(let i=0;i<650;i++){const x=random()*W,y=random()*H,r=.2+random()**5*1.5;c.fillStyle=['#e6efff','#ffe2bf','#bfdbff'][i%3];c.globalAlpha=.15+random()*.65;circle(c,x,y,r);c.fill();if(r>1.25){c.globalAlpha=.12;cloud(x,y,10,'#afcfff55');}}c.globalAlpha=1;
 backgroundWidth=W;backgroundHeight=H;spaceBackground=layer;
}
function draw(){ctx.setTransform(dpr,0,0,dpr,0,0);if(!spaceBackground||backgroundWidth!==W||backgroundHeight!==H)buildSpaceBackground();ctx.drawImage(spaceBackground,0,0,W,H);
 for(const s of stars){const x=((s.x*W-player.x*s.z*.08)%W+W)%W,y=((s.y*H-player.y*s.z*.08)%H+H)%H;ctx.globalAlpha=.25+s.z*.7;ctx.fillStyle=s.z>.45?'#f2e5cf':'#d5e9ff';circle(ctx,x,y,s.r);ctx.fill();if(s.r>1.4){ctx.globalAlpha=.15;ctx.strokeStyle='#d5e9ff';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();}}ctx.globalAlpha=1;
 const zoom=cameraZoom(),ox=W/2-player.x*zoom,oy=H*.55-player.y*zoom;
 ctx.save();ctx.translate(ox,oy);ctx.scale(zoom,zoom);
 for(const b of bodies){if((b.x-b.r*2)*zoom+ox>W||(b.x+b.r*2)*zoom+ox<0||(b.y-b.r*2)*zoom+oy>H||(b.y+b.r*2)*zoom+oy<0)continue;const p=b.progress/ABSORB_SECONDS,dx=b.x-player.x,dy=b.y-player.y;ctx.save();ctx.globalAlpha=b.appearance??1;ctx.translate(b.x,b.y);
  if(p>0){ctx.strokeStyle='#a6f4dd';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,b.r+9,-Math.PI/2,-Math.PI/2+Math.PI*2*p);ctx.stroke();ctx.save();ctx.rotate(Math.atan2(-dy,-dx));const stretch=player.stage>=3?1+p*2:1+p*.5;ctx.translate(b.r*p*.6,0);ctx.scale(stretch,1-p*.65);ctx.globalAlpha=1-p*.55;drawBody(ctx,b,b.r*(1-p*.35),time);ctx.restore();}else drawBody(ctx,b,b.r,time);
  ctx.font=`700 ${15/zoom}px system-ui`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=b.m<player.m?'#b8f4d8':'#ffc0ae';ctx.shadowColor='#000';ctx.shadowBlur=5;ctx.fillText(formatMass(b.m),0,-b.r-20/zoom);ctx.shadowBlur=0;ctx.restore();
  if(p>0){ctx.strokeStyle=`rgba(160,245,219,${p*.5})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.quadraticCurveTo((b.x+player.x)/2+Math.sin(time*4)*10,(b.y+player.y)/2,player.x,player.y);ctx.stroke();for(let j=0;j<4;j++){const f=(time*.6+j*.25)%1;circle(ctx,b.x+(player.x-b.x)*f,b.y+(player.y-b.y)*f,1.5);ctx.fillStyle='#baffeb';ctx.fill();}}
 }
 for(const p of particles){ctx.globalAlpha=p.life;ctx.fillStyle=p.color;circle(ctx,p.x,p.y,2*p.life);ctx.fill();}ctx.globalAlpha=1;
 ctx.save();ctx.translate(player.x,player.y);ctx.strokeStyle='#a6f4dd55';ctx.lineWidth=1.5/zoom;circle(ctx,0,0,gravityRadius());ctx.fillStyle='#a6f4dd12';ctx.fill();ctx.stroke();drawBody(ctx,player,player.r,time);ctx.textAlign='center';ctx.font=`700 ${20/zoom}px system-ui`;ctx.shadowColor='#000';ctx.shadowBlur=7;ctx.fillStyle='#fff';ctx.fillText(formatMass(player.m),0,7/zoom);ctx.shadowBlur=0;ctx.fillStyle='#a6f4dd';ctx.font=`${10/zoom}px system-ui`;ctx.fillText('나의 천체',0,player.r+27/zoom);ctx.restore();ctx.restore();}
function updateTimer(){const seconds=Math.ceil(remainingTime);$('remainingTime').textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;}
function advanceRound(dt){if(!started||paused)return;remainingTime=Math.max(0,remainingTime-dt);updateTimer();if(remainingTime===0){started=false;paused=false;clearInput();if('speechSynthesis'in window)speechSynthesis.cancel();$('pause').classList.add('hidden');$('book').classList.add('hidden');$('welcome').classList.remove('hidden');$('absorb').style.display='none';$('toast').classList.remove('show');$('pauseButton').textContent='Ⅱ';$('pauseButton').setAttribute('aria-label','일시 정지');reset();}}
function loop(now){const elapsed=Math.max(0,(now-last)/1000||0),dt=Math.min(elapsed,.04);last=now;if(started&&!paused){advanceRound(elapsed);if(started)update(dt);}draw();requestAnimationFrame(loop);}
function clearInput(){input.id=null;input.dx=input.dy=0;keys.clear();$('joystick').style.display='none';$('joystick').firstElementChild.style.transform='translate(0px,0px)';}
canvas.addEventListener('pointerdown',e=>{if(!started||paused||input.id!==null)return;input.id=e.pointerId;input.x=e.clientX;input.y=e.clientY;canvas.setPointerCapture(e.pointerId);$('joystick').style.display='block';$('joystick').style.left=`${e.clientX-50}px`;$('joystick').style.top=`${e.clientY-50}px`;});
canvas.addEventListener('pointermove',e=>{if(e.pointerId!==input.id)return;const x=e.clientX-input.x,y=e.clientY-input.y,len=Math.hypot(x,y),scale=Math.min(len,42)/(len||1);input.dx=x*scale/42;input.dy=y*scale/42;$('joystick').firstElementChild.style.transform=`translate(${x*scale}px,${y*scale}px)`;});
for(const event of ['pointerup','pointercancel','lostpointercapture'])canvas.addEventListener(event,e=>{if(e.pointerId===input.id)clearInput();});
addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key)&&started&&!paused){e.preventDefault();keys.add(e.key);}if(e.code==='Space'&&started&&$('book').classList.contains('hidden')){e.preventDefault();setPause(!paused);}});
addEventListener('keyup',e=>keys.delete(e.key));addEventListener('blur',()=>{clearInput();if(started)setPause(true);});document.addEventListener('visibilitychange',()=>{if(document.hidden&&started)setPause(true);});
function setPause(value){paused=value;clearInput();$('pause').classList.toggle('hidden',!value);$('pauseButton').textContent=value?'▶':'Ⅱ';$('pauseButton').setAttribute('aria-label',value?'계속하기':'일시 정지');if(value&&'speechSynthesis'in window)speechSynthesis.cancel();}
$('startButton').onclick=()=>{started=true;paused=false;$('welcome').classList.add('hidden');toast('초록 숫자는 모으고, 주황 숫자는 피해요');speak('작은 숫자를 중력 원 안에 영 점 오 초 동안 두면 모을 수 있어요.');};
$('pauseButton').onclick=()=>{if(started)setPause(!paused);};$('resumeButton').onclick=()=>setPause(false);$('resetButton').onclick=()=>{reset();setPause(false);};
$('soundButton').onclick=()=>{sound=!sound;$('soundButton').textContent=sound?'음성 ON':'음성 OFF';$('soundButton').setAttribute('aria-label',sound?'음성 안내 끄기':'음성 안내 켜기');if(sound)speak('우주 탐험을 함께 해요!');else if('speechSynthesis'in window)speechSynthesis.cancel();};
let bookWasPaused=false;$('bookButton').onclick=()=>{bookWasPaused=paused;paused=true;clearInput();$('book').classList.remove('hidden');};$('closeBook').onclick=()=>{$('book').classList.add('hidden');paused=bookWasPaused;};
for(let i=0;i<STAGES.length;i++){const s=STAGES[i],row=document.createElement('div');row.className='entry';row.innerHTML=`<canvas width="128" height="128" aria-label="${s.name} 그림"></canvas><div><b>${s.name}</b><small>${formatMass(s.min)}부터 · ${s.examples}</small><p>${s.fact}</p></div>`;$('entries').append(row);const c=row.firstElementChild.getContext('2d');c.scale(2,2);c.translate(32,32);drawBody(c,{stage:i,variant:i===3?2:0,seed:5},i===5?16:22,0);}
resize();reset();addEventListener('resize',resize);requestAnimationFrame(loop);
