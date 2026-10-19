'use strict';
let collectionStorage=null;
try{collectionStorage=window.localStorage;}catch{}
const collection=new CosmosCollection(collectionStorage);
let bookCategory=0,lastReward=null,rewardVisible=false,bookFromReward=false;
const collectionCount=()=>$('collectionCount').textContent=`발견 ${collection.total()} / ${CELESTIAL_CATALOG.length}`;
function catalogVisual(entry,size=160){
 if(!entry.photo)return artCanvas(entry,size);
 const figure=document.createElement('figure');figure.className='catalog-photo';
 const image=document.createElement('img');image.src=entry.photo.path;image.alt=`${entry.name} · ${entry.photo.label}`;image.loading='lazy';image.decoding='async';
 const caption=document.createElement('figcaption');caption.textContent=entry.photo.label;
 image.onerror=()=>{image.replaceWith(artCanvas(entry,size));caption.textContent='사진을 불러오지 못했어요 · 임시 게임 그림';};
 figure.append(image,caption);return figure;
}
function artCanvas(entry,size=160){
 const art=document.createElement('canvas');art.width=art.height=size*2;art.className='catalog-art';
 art.setAttribute('aria-label',`${entry.name} 분류를 표현한 그림`);
 const c=art.getContext('2d');c.scale(2,2);c.translate(size/2,size/2);
 drawBody(c,{stage:entry.category,variant:entry.variant,seed:CELESTIAL_CATALOG.indexOf(entry)*2.73},size*(entry.category===5?.24:.32),0);return art;
}
function renderCollection(){
 collectionCount();$('entries').innerHTML='';$('catalogTabs').innerHTML='';
 $('collectionStorageNote').textContent=collection.storageAvailable?'발견 기록은 이 브라우저에 저장돼요. 다른 기기와 자동으로 공유되지는 않아요.':'저장 공간을 사용할 수 없어요. 발견 기록은 이번 실행 중에만 유지될 수 있어요.';
 CATALOG_CATEGORIES.forEach((name,index)=>{
  const entries=CELESTIAL_CATALOG.filter(entry=>entry.category===index),owned=entries.filter(entry=>collection.owns(entry.id)).length;
  const button=document.createElement('button');button.textContent=`${name} ${owned}/${entries.length}`;button.setAttribute('aria-pressed',String(bookCategory===index));
  button.onclick=()=>{bookCategory=index;$('cardDetail').classList.add('hidden');renderCollection();};$('catalogTabs').append(button);
 });
 const categoryEntries=CELESTIAL_CATALOG.filter(entry=>entry.category===bookCategory);
 categoryEntries.sort((a,b)=>Number(collection.owns(b.id))-Number(collection.owns(a.id)));
 for(const entry of categoryEntries){
  const owned=collection.owns(entry.id),card=document.createElement('button');card.className=`catalog-card ${owned?'discovered':'locked'}`;
  card.setAttribute('aria-label',owned?`${entry.name} 상세 보기`:'아직 발견하지 않은 천체');
  if(owned){card.append(catalogVisual(entry,88));const title=document.createElement('b');title.textContent=entry.name+(entry.status?` · ${entry.status}`:'');card.append(title);const count=document.createElement('small');count.textContent=`발견 ${collection.counts[entry.id]}회`;card.append(count);card.onclick=()=>showCatalogDetail(entry);}
  else{const symbol=document.createElement('span');symbol.className='unknown-card';symbol.textContent='?';const label=document.createElement('b');label.textContent='미발견';card.append(symbol,label);card.disabled=true;}
  $('entries').append(card);
 }
}
function showCatalogDetail(entry){
 if(!collection.owns(entry.id))return;
 $('detailArt').innerHTML='';$('detailArt').append(catalogVisual(entry));$('detailName').textContent=entry.name;
 $('detailCategory').textContent=`${entry.status||CATALOG_CATEGORIES[entry.category]} · ${entry.location}`;
 $('detailFact').textContent=entry.fact;$('detailArtNote').textContent=entry.artLabel;
 if(entry.photo){$('detailArtNote').textContent=`${entry.photo.label} · ${entry.photo.credit} `;const link=document.createElement('a');link.href=entry.photo.source;link.target='_blank';link.rel='noopener';link.textContent='사진 출처 ↗';$('detailArtNote').append(link);}
 $('detailSource').href=entry.source;$('detailSource').textContent=entry.source.includes('esa.int')?'ESA 관측 자료 보기 ↗':'NASA 과학 자료 보기 ↗';$('cardDetail').classList.remove('hidden');
 $('readCard').onclick=()=>{if('speechSynthesis'in window){speechSynthesis.cancel();const voice=new SpeechSynthesisUtterance(`${entry.name}. ${entry.fact}`);voice.lang='ko-KR';voice.rate=.85;speechSynthesis.speak(voice);}else $('detailFact').textContent=entry.fact+' 이 기기는 음성 읽기를 지원하지 않아요.';};
 $('detailName').focus?.();
}
function openCollection(fromReward=false){
 bookFromReward=fromReward;bookWasPaused=paused;paused=true;clearInput();
 if(fromReward){$('reward').classList.add('hidden');bookCategory=lastReward.entry.category;}
 $('cardDetail').classList.add('hidden');renderCollection();$('book').classList.remove('hidden');$('closeBook').focus?.();
 if(fromReward)showCatalogDetail(lastReward.entry);
}
function closeCollection(){
 $('book').classList.add('hidden');$('cardDetail').classList.add('hidden');
 if('speechSynthesis'in window)speechSynthesis.cancel();
 if(bookFromReward){$('reward').classList.remove('hidden');$('rewardHome').focus?.();}else{paused=bookWasPaused;$('bookButton').focus?.();}
 bookFromReward=false;
}
function finishRound(){
 const finalStage=player.stage,finalMass=player.m;
 started=false;paused=false;clearInput();
 if('speechSynthesis'in window)speechSynthesis.cancel();
 $('pause').classList.add('hidden');$('book').classList.add('hidden');$('welcome').classList.add('hidden');$('absorb').style.display='none';$('toast').classList.remove('show');
 $('pauseButton').textContent='Ⅱ';$('pauseButton').setAttribute('aria-label','일시 정지');
 lastReward=collection.award();rewardVisible=true;
 $('rewardTitle').textContent=lastReward.isNew?'새로운 천체 발견!':'다시 만난 천체!';
 $('rewardSummary').textContent=`${CATALOG_CATEGORIES[finalStage]} · 최종 질량 ${formatMass(finalMass)}`;
 $('rewardName').textContent=lastReward.entry.name+(lastReward.entry.status?` · ${lastReward.entry.status}`:'');$('rewardFact').textContent=lastReward.entry.fact;
 $('rewardArt').innerHTML='';$('rewardArt').append(catalogVisual(lastReward.entry,190));
 $('rewardSave').textContent=lastReward.saved?`도감에 저장했어요 · ${collection.total()}/${CELESTIAL_CATALOG.length}`:'기기에 저장하지 못했어요. 창을 닫으면 기록이 사라질 수 있어요.';
 $('reward').classList.remove('hidden');collectionCount();$('rewardHome').focus?.();
}
function leaveReward(){
 if(!rewardVisible)return;
 rewardVisible=false;$('reward').classList.add('hidden');$('book').classList.add('hidden');$('cardDetail').classList.add('hidden');
 lastReward=null;reset();$('welcome').classList.remove('hidden');$('startButton').focus?.();
}
$('bookButton').onclick=()=>openCollection(false);$('closeBook').onclick=closeCollection;
$('closeDetail').onclick=()=>$('cardDetail').classList.add('hidden');
$('rewardHome').onclick=leaveReward;$('rewardBook').onclick=()=>openCollection(true);
renderCollection();
