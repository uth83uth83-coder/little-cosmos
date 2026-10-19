'use strict';
// Data is separate from game progression. Numeric game mass is never a real-world measurement.
const CATALOG_CATEGORIES=['소행성','왜소행성','위성','행성','항성','블랙홀'];
const CATALOG_SOURCES=[
 'https://science.nasa.gov/solar-system/asteroids/',
 'https://science.nasa.gov/dwarf-planets/',
 'https://science.nasa.gov/solar-system/moons/',
 'https://science.nasa.gov/solar-system/planets/',
 'https://science.nasa.gov/universe/stars/types/',
 'https://science.nasa.gov/universe/black-holes/'
];
const CELESTIAL_CATALOG=[];
function addCatalogGroup(category,rows){
 for(const [key,name,location,fact,variant=0] of rows){
  CELESTIAL_CATALOG.push({id:`${category}-${key}`,category,name,location,fact,variant,source:CATALOG_SOURCES[category],artLabel:'분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요'});
 }
}
addCatalogGroup(0,[
 ['vesta','베스타','소행성대','돈 탐사선이 가까이에서 조사한 소행성이에요.'],
 ['pallas','팔라스','소행성대','태양 주위를 도는 큰 소행성 중 하나예요.',1],
 ['hygiea','히기에이아','소행성대','소행성대에 있는 큰 천체예요.',2],
 ['eros','에로스','근지구 소행성','니어 슈메이커 탐사선이 착륙한 소행성이에요.'],
 ['itokawa','이토카와','근지구 소행성','하야부사 탐사선이 표본을 지구로 가져왔어요.',1],
 ['bennu','베누','근지구 소행성','오시리스렉스 탐사선이 표본을 가져왔어요.',2],
 ['ryugu','류구','근지구 소행성','하야부사 2호가 표본을 가져온 소행성이에요.',2],
 ['psyche','프시케','소행성대','금속이 풍부한 소행성으로 연구되고 있어요.',1],
 ['ida','이다','소행성대','작은 위성 다크틸을 거느리고 있어요.'],
 ['gaspra','가스프라','소행성대','갈릴레오 탐사선이 가까이 지나갔어요.',3],
 ['mathilde','마틸데','소행성대','표면에 커다란 충돌 구덩이들이 있어요.',2],
 ['lutetia','루테티아','소행성대','로제타 탐사선이 가까이에서 관측했어요.',1],
 ['steins','슈테인스','소행성대','로제타 탐사선이 방문한 작은 소행성이에요.',4],
 ['annefrank','안네프랑크','소행성대','스타더스트 탐사선이 지나가며 관측했어요.'],
 ['apophis','아포피스','근지구 소행성','지구 가까이 지나가는 궤도로 연구되는 소행성이에요.',3],
 ['didymos','디디모스','근지구 소행성','작은 동반 천체 디모르포스를 거느려요.',1],
 ['dimorphos','디모르포스','디디모스의 동반 천체','다트 탐사선의 충돌로 궤도 변화가 관측됐어요.'],
 ['dinkinesh','딘키네시','소행성대','루시 탐사선이 가까이에서 관측했어요.',3],
 ['donaldjohanson','도널드조핸슨','소행성대','루시 탐사선의 탐사 대상 소행성이에요.',4],
 ['eurybates','에우리바테스','목성 트로이군','목성과 비슷한 공전 궤도를 공유하는 소행성이에요.',2]
]);
addCatalogGroup(1,[
 ['ceres','세레스','소행성대','소행성대에 있는 왜소행성이에요.'],
 ['pluto','명왕성','해왕성 너머','표면에 하트 모양으로 보이는 지역이 있어요.',1],
 ['eris','에리스','해왕성 너머','위성 디스노미아가 있어요.',2],
 ['haumea','하우메아','해왕성 너머','빠르게 자전하며 길쭉한 모양을 하고 있어요.',3],
 ['makemake','마케마케','카이퍼대','아주 추운 바깥 태양계의 왜소행성이에요.',4]
]);
const MOON_GROUPS=[
 ['earth','지구',[['moon','달']]],
 ['mars','화성',[['phobos','포보스'],['deimos','데이모스']]],
 ['jupiter','목성',[['io','이오'],['europa','유로파'],['ganymede','가니메데'],['callisto','칼리스토'],['amalthea','아말테아'],['himalia','히말리아'],['elara','엘라라'],['pasiphae','파시파에']]],
 ['saturn','토성',[['titan','타이탄'],['enceladus','엔셀라두스'],['mimas','미마스'],['tethys','테티스'],['dione','디오네'],['rhea','레아'],['iapetus','이아페투스'],['hyperion','히페리온'],['phoebe','포이베'],['pan','판']]],
 ['uranus','천왕성',[['miranda','미란다'],['ariel','아리엘'],['umbriel','움브리엘'],['titania','티타니아'],['oberon','오베론']]],
 ['neptune','해왕성',[['triton','트리톤'],['nereid','네레이드'],['proteus','프로테우스'],['larissa','라리사']]],
 ['pluto','명왕성',[['charon','카론'],['nix','닉스'],['hydra','히드라'],['kerberos','케르베로스'],['styx','스틱스']]]
];
for(const [parentKey,parent,moons] of MOON_GROUPS){
 addCatalogGroup(2,moons.map(([key,name],i)=>[key,name,`${parent}의 위성`,`${name}는 ${parent} 주위를 도는 자연 위성이에요.`,i%5]));
}
addCatalogGroup(3,[
 ['mercury','수성','태양계 · 암석 행성','태양에 가장 가까운 행성이에요.',3],
 ['venus','금성','태양계 · 암석 행성','두꺼운 대기로 덮인 아주 뜨거운 행성이에요.',1],
 ['earth','지구','태양계 · 암석 행성','우리가 사는 곳이에요. 표면에 넓은 바다가 있어요.',0],
 ['mars','화성','태양계 · 암석 행성','붉은 표면을 가진 행성이에요.',3],
 ['jupiter','목성','태양계 · 가스 행성','태양계에서 가장 큰 행성이에요.',1],
 ['saturn','토성','태양계 · 가스 행성','얼음과 바위 입자로 된 넓은 고리가 눈에 띄어요.',2],
 ['uranus','천왕성','태양계 · 얼음 거대 행성','자전축이 크게 기울어져 있어요.',4],
 ['neptune','해왕성','태양계 · 얼음 거대 행성','태양계 여덟 행성 중 가장 바깥쪽에 있어요.',4]
]);
addCatalogGroup(4,[
 ['sun','태양','태양계의 항성','지구에 빛과 열을 보내주는 별이에요.',1],
 ['proxima','프록시마 센타우리','센타우루스자리','태양에서 가장 가까운 다른 항성이에요.',0],
 ['alpha-centauri-a','알파 센타우리 A','센타우루스자리','알파 센타우리 항성계의 별이에요.',1],
 ['alpha-centauri-b','알파 센타우리 B','센타우루스자리','알파 센타우리 A와 함께 공전해요.',1],
 ['sirius-a','시리우스 A','큰개자리','지구의 밤하늘에서 아주 밝게 보이는 별이에요.',2],
 ['vega','베가','거문고자리','여름철 대삼각형을 이루는 별 중 하나예요.',2],
 ['altair','알타이르','독수리자리','여름철 대삼각형을 이루는 별 중 하나예요.',2],
 ['deneb','데네브','백조자리','여름철 대삼각형을 이루는 밝은 별이에요.',2],
 ['betelgeuse','베텔게우스','오리온자리','붉은빛을 띠는 초거성이에요.',3],
 ['rigel','리겔','오리온자리','푸른빛이 도는 밝은 초거성이에요.',2],
 ['antares','안타레스','전갈자리','붉게 보이는 초거성이에요.',3],
 ['aldebaran','알데바란','황소자리','주황빛을 띠는 거성이에요.',1],
 ['arcturus','아르크투루스','목동자리','주황빛이 도는 밝은 거성이에요.',1],
 ['spica','스피카','처녀자리','두 별이 가까이 공전하는 쌍성계예요.',2],
 ['regulus','레굴루스','사자자리','사자자리에서 밝게 보이는 별이에요.',2],
 ['polaris','북극성','작은곰자리','현재 북쪽 하늘의 방향을 찾는 데 쓰여요.',1],
 ['capella','카펠라','마차부자리','여러 별로 이루어진 항성계예요.',1],
 ['procyon-a','프로키온 A','작은개자리','작은개자리에서 밝게 보이는 별이에요.',1],
 ['fomalhaut','포말하우트','남쪽물고기자리','주변에 먼지 원반이 있는 별이에요.',2],
 ['achernar','아케르나르','에리다누스자리','빠른 자전 때문에 납작한 모양을 해요.',2],
 ['canopus','카노푸스','용골자리','남쪽 하늘에서 매우 밝게 보이는 별이에요.',1],
 ['barnard','바너드별','뱀주인자리','태양 가까이에 있는 적색왜성이에요.',0],
 ['trappist-1','트라피스트 1','물병자리','여러 지구 크기 행성이 주위를 돌고 있어요.',0],
 ['epsilon-eridani','에리다누스자리 엡실론','에리다누스자리','태양 가까이에 있는 주황빛 별이에요.',1],
 ['tau-ceti','고래자리 타우','고래자리','태양과 비교하며 연구하는 가까운 별이에요.',1]
]);
addCatalogGroup(5,[
 ['sgr-a','궁수자리 A*','우리은하 중심','우리은하 중심에 있는 초대질량 블랙홀이에요.'],
 ['m87','M87*','M87 은하 중심','주변의 빛나는 고리와 그림자가 관측됐어요.'],
 ['cygnus-x1','백조자리 X-1의 블랙홀','백조자리의 쌍성계','동반 항성과 함께 있는 항성질량 블랙홀이에요.'],
 ['v404','V404 백조자리의 블랙홀','백조자리의 항성계','주변 물질을 관측해 연구하는 블랙홀이에요.'],
 ['a0620','A0620-00의 블랙홀','외뿔소자리의 쌍성계','동반 별의 움직임으로 연구하는 블랙홀이에요.'],
 ['gro-j1655','GRO J1655-40의 블랙홀','전갈자리의 쌍성계','가스와 제트 현상으로 연구하는 블랙홀이에요.'],
 ['grs1915','GRS 1915+105의 블랙홀','독수리자리의 쌍성계','주변 가스에서 나오는 엑스선으로 연구해요.']
]);

// Expanded from NASA Exoplanet Archive pscomppars on 2026-10-19. Static data works offline.
for(const entry of CELESTIAL_CATALOG){if(entry.category===1)entry.status='IAU 인정 왜소행성';if(entry.category===3)entry.status='태양계 행성';}
CELESTIAL_CATALOG.push(...[
 {
  "id": "1-gonggong",
  "category": 1,
  "name": "공공",
  "location": "태양계 바깥쪽",
  "fact": "공공는 관측된 태양계 천체로, 왜소행성 후보로 연구되고 있어요. IAU가 인정한 다섯 왜소행성과는 구분해요.",
  "variant": 0,
  "status": "왜소행성 후보",
  "source": "https://spacemath.gsfc.nasa.gov/Pluto/DwarfPlanetsV3.pdf",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "1-quaoar",
  "category": 1,
  "name": "콰오아",
  "location": "태양계 바깥쪽",
  "fact": "콰오아는 관측된 태양계 천체로, 왜소행성 후보로 연구되고 있어요. IAU가 인정한 다섯 왜소행성과는 구분해요.",
  "variant": 1,
  "status": "왜소행성 후보",
  "source": "https://spacemath.gsfc.nasa.gov/Pluto/DwarfPlanetsV3.pdf",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "1-sedna",
  "category": 1,
  "name": "세드나",
  "location": "태양계 바깥쪽",
  "fact": "세드나는 관측된 태양계 천체로, 왜소행성 후보로 연구되고 있어요. IAU가 인정한 다섯 왜소행성과는 구분해요.",
  "variant": 2,
  "status": "왜소행성 후보",
  "source": "https://spacemath.gsfc.nasa.gov/Pluto/DwarfPlanetsV3.pdf",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "1-orcus",
  "category": 1,
  "name": "오르쿠스",
  "location": "태양계 바깥쪽",
  "fact": "오르쿠스는 관측된 태양계 천체로, 왜소행성 후보로 연구되고 있어요. IAU가 인정한 다섯 왜소행성과는 구분해요.",
  "variant": 3,
  "status": "왜소행성 후보",
  "source": "https://spacemath.gsfc.nasa.gov/Pluto/DwarfPlanetsV3.pdf",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "1-2002-ms4",
  "category": 1,
  "name": "2002 MS4",
  "location": "태양계 바깥쪽",
  "fact": "2002 MS4는 관측된 태양계 천체로, 왜소행성 후보로 연구되고 있어요. IAU가 인정한 다섯 왜소행성과는 구분해요.",
  "variant": 0,
  "status": "왜소행성 후보",
  "source": "https://spacemath.gsfc.nasa.gov/Pluto/DwarfPlanetsV3.pdf",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "1-salacia",
  "category": 1,
  "name": "살라시아",
  "location": "태양계 바깥쪽",
  "fact": "살라시아는 관측된 태양계 천체로, 왜소행성 후보로 연구되고 있어요. IAU가 인정한 다섯 왜소행성과는 구분해요.",
  "variant": 1,
  "status": "왜소행성 후보",
  "source": "https://spacemath.gsfc.nasa.gov/Pluto/DwarfPlanetsV3.pdf",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-51-peg-b",
  "category": 3,
  "name": "페가수스자리 51 b",
  "location": "페가수스자리 51 항성계",
  "fact": "페가수스자리 51 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 1995년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/51%20Peg%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-gj-1214-b",
  "category": 3,
  "name": "GJ 1214 b",
  "location": "GJ 1214 항성계",
  "fact": "GJ 1214 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2009년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%201214%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-189733-b",
  "category": 3,
  "name": "HD 189733 b",
  "location": "HD 189733 항성계",
  "fact": "HD 189733 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2005년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%20189733%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-209458-b",
  "category": 3,
  "name": "HD 209458 b",
  "location": "HD 209458 항성계",
  "fact": "HD 209458 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 1999년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%20209458%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-k2-18-b",
  "category": 3,
  "name": "K2-18 b",
  "location": "K2-18 항성계",
  "fact": "K2-18 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2015년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/K2-18%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-k2-18-c",
  "category": 3,
  "name": "K2-18 c",
  "location": "K2-18 항성계",
  "fact": "K2-18 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2017년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/K2-18%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-11-b",
  "category": 3,
  "name": "케플러 11 b",
  "location": "케플러 11 항성계",
  "fact": "케플러 11 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-11%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-11-c",
  "category": 3,
  "name": "케플러 11 c",
  "location": "케플러 11 항성계",
  "fact": "케플러 11 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-11%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-11-d",
  "category": 3,
  "name": "케플러 11 d",
  "location": "케플러 11 항성계",
  "fact": "케플러 11 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-11%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-11-e",
  "category": 3,
  "name": "케플러 11 e",
  "location": "케플러 11 항성계",
  "fact": "케플러 11 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-11%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-11-f",
  "category": 3,
  "name": "케플러 11 f",
  "location": "케플러 11 항성계",
  "fact": "케플러 11 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-11%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-11-g",
  "category": 3,
  "name": "케플러 11 g",
  "location": "케플러 11 항성계",
  "fact": "케플러 11 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-11%20g",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-16-b",
  "category": 3,
  "name": "케플러 16 b",
  "location": "케플러 16 항성계",
  "fact": "케플러 16 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-16%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-186-b",
  "category": 3,
  "name": "케플러 186 b",
  "location": "케플러 186 항성계",
  "fact": "케플러 186 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2014년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-186%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-186-c",
  "category": 3,
  "name": "케플러 186 c",
  "location": "케플러 186 항성계",
  "fact": "케플러 186 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2014년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-186%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-186-d",
  "category": 3,
  "name": "케플러 186 d",
  "location": "케플러 186 항성계",
  "fact": "케플러 186 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2014년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-186%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-186-e",
  "category": 3,
  "name": "케플러 186 e",
  "location": "케플러 186 항성계",
  "fact": "케플러 186 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2014년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-186%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-186-f",
  "category": 3,
  "name": "케플러 186 f",
  "location": "케플러 186 항성계",
  "fact": "케플러 186 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2014년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-186%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-22-b",
  "category": 3,
  "name": "케플러 22 b",
  "location": "케플러 22 항성계",
  "fact": "케플러 22 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-22%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-452-b",
  "category": 3,
  "name": "케플러 452 b",
  "location": "케플러 452 항성계",
  "fact": "케플러 452 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2015년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-452%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-62-b",
  "category": 3,
  "name": "케플러 62 b",
  "location": "케플러 62 항성계",
  "fact": "케플러 62 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2013년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-62%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-62-c",
  "category": 3,
  "name": "케플러 62 c",
  "location": "케플러 62 항성계",
  "fact": "케플러 62 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2013년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-62%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-62-d",
  "category": 3,
  "name": "케플러 62 d",
  "location": "케플러 62 항성계",
  "fact": "케플러 62 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2013년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-62%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-62-e",
  "category": 3,
  "name": "케플러 62 e",
  "location": "케플러 62 항성계",
  "fact": "케플러 62 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2013년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-62%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-62-f",
  "category": 3,
  "name": "케플러 62 f",
  "location": "케플러 62 항성계",
  "fact": "케플러 62 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2013년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-62%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-lhs-1140-b",
  "category": 3,
  "name": "LHS 1140 b",
  "location": "LHS 1140 항성계",
  "fact": "LHS 1140 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2017년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/LHS%201140%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-lhs-1140-c",
  "category": 3,
  "name": "LHS 1140 c",
  "location": "LHS 1140 항성계",
  "fact": "LHS 1140 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2018년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/LHS%201140%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-700-b",
  "category": 3,
  "name": "TOI-700 b",
  "location": "TOI-700 항성계",
  "fact": "TOI-700 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2020년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-700%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-700-c",
  "category": 3,
  "name": "TOI-700 c",
  "location": "TOI-700 항성계",
  "fact": "TOI-700 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2020년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-700%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-700-d",
  "category": 3,
  "name": "TOI-700 d",
  "location": "TOI-700 항성계",
  "fact": "TOI-700 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2020년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-700%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-700-e",
  "category": 3,
  "name": "TOI-700 e",
  "location": "TOI-700 항성계",
  "fact": "TOI-700 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2023년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-700%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-trappist-1-b",
  "category": 3,
  "name": "트라피스트 1 b",
  "location": "트라피스트 1 항성계",
  "fact": "트라피스트 1 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2016년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TRAPPIST-1%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-trappist-1-c",
  "category": 3,
  "name": "트라피스트 1 c",
  "location": "트라피스트 1 항성계",
  "fact": "트라피스트 1 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2016년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TRAPPIST-1%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-trappist-1-d",
  "category": 3,
  "name": "트라피스트 1 d",
  "location": "트라피스트 1 항성계",
  "fact": "트라피스트 1 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2016년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TRAPPIST-1%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-trappist-1-e",
  "category": 3,
  "name": "트라피스트 1 e",
  "location": "트라피스트 1 항성계",
  "fact": "트라피스트 1 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2017년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TRAPPIST-1%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-trappist-1-f",
  "category": 3,
  "name": "트라피스트 1 f",
  "location": "트라피스트 1 항성계",
  "fact": "트라피스트 1 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2017년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TRAPPIST-1%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-trappist-1-g",
  "category": 3,
  "name": "트라피스트 1 g",
  "location": "트라피스트 1 항성계",
  "fact": "트라피스트 1 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2017년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TRAPPIST-1%20g",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-trappist-1-h",
  "category": 3,
  "name": "트라피스트 1 h",
  "location": "트라피스트 1 항성계",
  "fact": "트라피스트 1 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2017년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TRAPPIST-1%20h",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-wasp-107-b",
  "category": 3,
  "name": "WASP-107 b",
  "location": "WASP-107 항성계",
  "fact": "WASP-107 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2017년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-107%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-wasp-107-c",
  "category": 3,
  "name": "WASP-107 c",
  "location": "WASP-107 항성계",
  "fact": "WASP-107 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2020년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-107%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-wasp-39-b",
  "category": 3,
  "name": "WASP-39 b",
  "location": "WASP-39 항성계",
  "fact": "WASP-39 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-39%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-wasp-43-b",
  "category": 3,
  "name": "WASP-43 b",
  "location": "WASP-43 항성계",
  "fact": "WASP-43 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 0,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-43%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-51-peg",
  "category": 4,
  "name": "페가수스자리 51",
  "location": "외계행성이 발견된 항성계",
  "fact": "페가수스자리 51는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/51%20Peg",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-gj-1214",
  "category": 4,
  "name": "GJ 1214",
  "location": "외계행성이 발견된 항성계",
  "fact": "GJ 1214는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%201214",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-hd-189733",
  "category": 4,
  "name": "HD 189733",
  "location": "외계행성이 발견된 항성계",
  "fact": "HD 189733는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%20189733",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-hd-209458",
  "category": 4,
  "name": "HD 209458",
  "location": "외계행성이 발견된 항성계",
  "fact": "HD 209458는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%20209458",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-k2-18",
  "category": 4,
  "name": "K2-18",
  "location": "외계행성이 발견된 항성계",
  "fact": "K2-18는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/K2-18",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-11",
  "category": 4,
  "name": "케플러 11",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 11는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-11",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-16",
  "category": 4,
  "name": "케플러 16",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 16는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-16",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-186",
  "category": 4,
  "name": "케플러 186",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 186는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-186",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-22",
  "category": 4,
  "name": "케플러 22",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 22는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-22",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-452",
  "category": 4,
  "name": "케플러 452",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 452는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-452",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-62",
  "category": 4,
  "name": "케플러 62",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 62는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-62",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-lhs-1140",
  "category": 4,
  "name": "LHS 1140",
  "location": "외계행성이 발견된 항성계",
  "fact": "LHS 1140는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/LHS%201140",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-toi-700",
  "category": 4,
  "name": "TOI-700",
  "location": "외계행성이 발견된 항성계",
  "fact": "TOI-700는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-700",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-wasp-107",
  "category": 4,
  "name": "WASP-107",
  "location": "외계행성이 발견된 항성계",
  "fact": "WASP-107는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-107",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-wasp-39",
  "category": 4,
  "name": "WASP-39",
  "location": "외계행성이 발견된 항성계",
  "fact": "WASP-39는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-39",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-wasp-43",
  "category": 4,
  "name": "WASP-43",
  "location": "외계행성이 발견된 항성계",
  "fact": "WASP-43는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-43",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-gaia-bh1",
  "category": 5,
  "name": "가이아 BH1",
  "location": "뱀주인자리",
  "fact": "가이아 관측과 동반 별의 움직임을 이용해 발견한 블랙홀이에요. 밝은 강착원반이 보이지 않는 휴면 블랙홀이에요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://www.esa.int/ESA_Multimedia/Images/2024/04/Gaia_black_holes",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-gaia-bh2",
  "category": 5,
  "name": "가이아 BH2",
  "location": "센타우루스자리",
  "fact": "가이아 관측과 동반 별의 움직임을 이용해 발견한 블랙홀이에요. 밝은 강착원반이 보이지 않는 휴면 블랙홀이에요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://www.esa.int/ESA_Multimedia/Images/2024/04/Gaia_black_holes",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-gaia-bh3",
  "category": 5,
  "name": "가이아 BH3",
  "location": "독수리자리",
  "fact": "가이아 관측과 동반 별의 움직임을 이용해 발견한 블랙홀이에요. 밝은 강착원반이 보이지 않는 휴면 블랙홀이에요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://www.esa.int/ESA_Multimedia/Images/2024/04/Gaia_black_holes",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 }
]);

// Additional observed objects, sourced 2026-10-19. Existing card IDs remain stable.
CELESTIAL_CATALOG.push(...[
 {
  "id": "3-exo-55-cnc-b",
  "category": 3,
  "name": "게자리 55 b",
  "location": "게자리 55 항성계",
  "fact": "게자리 55 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 1996년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/55%20Cnc%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-55-cnc-c",
  "category": 3,
  "name": "게자리 55 c",
  "location": "게자리 55 항성계",
  "fact": "게자리 55 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2004년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/55%20Cnc%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-55-cnc-d",
  "category": 3,
  "name": "게자리 55 d",
  "location": "게자리 55 항성계",
  "fact": "게자리 55 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2002년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/55%20Cnc%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-55-cnc-e",
  "category": 3,
  "name": "게자리 55 e",
  "location": "게자리 55 항성계",
  "fact": "게자리 55 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2004년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/55%20Cnc%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-55-cnc-f",
  "category": 3,
  "name": "게자리 55 f",
  "location": "게자리 55 항성계",
  "fact": "게자리 55 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2007년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/55%20Cnc%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-gj-581-b",
  "category": 3,
  "name": "GJ 581 b",
  "location": "GJ 581 항성계",
  "fact": "GJ 581 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2005년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20581%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-gj-581-c",
  "category": 3,
  "name": "GJ 581 c",
  "location": "GJ 581 항성계",
  "fact": "GJ 581 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2007년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20581%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-gj-581-e",
  "category": 3,
  "name": "GJ 581 e",
  "location": "GJ 581 항성계",
  "fact": "GJ 581 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2009년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20581%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-gj-876-b",
  "category": 3,
  "name": "GJ 876 b",
  "location": "GJ 876 항성계",
  "fact": "GJ 876 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 1998년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20876%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-gj-876-c",
  "category": 3,
  "name": "GJ 876 c",
  "location": "GJ 876 항성계",
  "fact": "GJ 876 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2000년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20876%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-gj-876-d",
  "category": 3,
  "name": "GJ 876 d",
  "location": "GJ 876 항성계",
  "fact": "GJ 876 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2005년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20876%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-gj-876-e",
  "category": 3,
  "name": "GJ 876 e",
  "location": "GJ 876 항성계",
  "fact": "GJ 876 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20876%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-10180-c",
  "category": 3,
  "name": "HD 10180 c",
  "location": "HD 10180 항성계",
  "fact": "HD 10180 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2010180%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-10180-d",
  "category": 3,
  "name": "HD 10180 d",
  "location": "HD 10180 항성계",
  "fact": "HD 10180 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2010180%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-10180-e",
  "category": 3,
  "name": "HD 10180 e",
  "location": "HD 10180 항성계",
  "fact": "HD 10180 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2010180%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-10180-f",
  "category": 3,
  "name": "HD 10180 f",
  "location": "HD 10180 항성계",
  "fact": "HD 10180 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2010180%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-10180-g",
  "category": 3,
  "name": "HD 10180 g",
  "location": "HD 10180 항성계",
  "fact": "HD 10180 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2010180%20g",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-10180-h",
  "category": 3,
  "name": "HD 10180 h",
  "location": "HD 10180 항성계",
  "fact": "HD 10180 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2010180%20h",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-40307-b",
  "category": 3,
  "name": "HD 40307 b",
  "location": "HD 40307 항성계",
  "fact": "HD 40307 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2009년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2040307%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-40307-c",
  "category": 3,
  "name": "HD 40307 c",
  "location": "HD 40307 항성계",
  "fact": "HD 40307 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2009년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2040307%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-40307-d",
  "category": 3,
  "name": "HD 40307 d",
  "location": "HD 40307 항성계",
  "fact": "HD 40307 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2009년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2040307%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-40307-f",
  "category": 3,
  "name": "HD 40307 f",
  "location": "HD 40307 항성계",
  "fact": "HD 40307 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2013년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2040307%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hd-40307-g",
  "category": 3,
  "name": "HD 40307 g",
  "location": "HD 40307 항성계",
  "fact": "HD 40307 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2013년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2040307%20g",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hip-65426-b",
  "category": 3,
  "name": "HIP 65426 b",
  "location": "HIP 65426 항성계",
  "fact": "HIP 65426 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2017년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HIP%2065426%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hr-8799-b",
  "category": 3,
  "name": "HR 8799 b",
  "location": "HR 8799 항성계",
  "fact": "HR 8799 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2008년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HR%208799%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hr-8799-c",
  "category": 3,
  "name": "HR 8799 c",
  "location": "HR 8799 항성계",
  "fact": "HR 8799 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2008년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HR%208799%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hr-8799-d",
  "category": 3,
  "name": "HR 8799 d",
  "location": "HR 8799 항성계",
  "fact": "HR 8799 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2008년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HR%208799%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-hr-8799-e",
  "category": 3,
  "name": "HR 8799 e",
  "location": "HR 8799 항성계",
  "fact": "HR 8799 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2010년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HR%208799%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-10-b",
  "category": 3,
  "name": "케플러 10 b",
  "location": "케플러 10 항성계",
  "fact": "케플러 10 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-10%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-10-c",
  "category": 3,
  "name": "케플러 10 c",
  "location": "케플러 10 항성계",
  "fact": "케플러 10 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-10%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-10-d",
  "category": 3,
  "name": "케플러 10 d",
  "location": "케플러 10 항성계",
  "fact": "케플러 10 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2023년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-10%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-138-b",
  "category": 3,
  "name": "케플러 138 b",
  "location": "케플러 138 항성계",
  "fact": "케플러 138 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2014년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-138%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-138-c",
  "category": 3,
  "name": "케플러 138 c",
  "location": "케플러 138 항성계",
  "fact": "케플러 138 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2014년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-138%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-138-d",
  "category": 3,
  "name": "케플러 138 d",
  "location": "케플러 138 항성계",
  "fact": "케플러 138 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2014년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-138%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-138-e",
  "category": 3,
  "name": "케플러 138 e",
  "location": "케플러 138 항성계",
  "fact": "케플러 138 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2022년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-138%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-20-b",
  "category": 3,
  "name": "케플러 20 b",
  "location": "케플러 20 항성계",
  "fact": "케플러 20 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-20%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-20-c",
  "category": 3,
  "name": "케플러 20 c",
  "location": "케플러 20 항성계",
  "fact": "케플러 20 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-20%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-20-d",
  "category": 3,
  "name": "케플러 20 d",
  "location": "케플러 20 항성계",
  "fact": "케플러 20 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-20%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-20-e",
  "category": 3,
  "name": "케플러 20 e",
  "location": "케플러 20 항성계",
  "fact": "케플러 20 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-20%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-20-f",
  "category": 3,
  "name": "케플러 20 f",
  "location": "케플러 20 항성계",
  "fact": "케플러 20 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2011년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-20%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-20-g",
  "category": 3,
  "name": "케플러 20 g",
  "location": "케플러 20 항성계",
  "fact": "케플러 20 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2016년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-20%20g",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-444-b",
  "category": 3,
  "name": "케플러 444 b",
  "location": "케플러 444 항성계",
  "fact": "케플러 444 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2015년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-444%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-444-c",
  "category": 3,
  "name": "케플러 444 c",
  "location": "케플러 444 항성계",
  "fact": "케플러 444 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2015년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-444%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-444-d",
  "category": 3,
  "name": "케플러 444 d",
  "location": "케플러 444 항성계",
  "fact": "케플러 444 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2015년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-444%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-444-e",
  "category": 3,
  "name": "케플러 444 e",
  "location": "케플러 444 항성계",
  "fact": "케플러 444 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2015년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-444%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-444-f",
  "category": 3,
  "name": "케플러 444 f",
  "location": "케플러 444 항성계",
  "fact": "케플러 444 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2015년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-444%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-80-b",
  "category": 3,
  "name": "케플러 80 b",
  "location": "케플러 80 항성계",
  "fact": "케플러 80 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2012년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-80%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-80-c",
  "category": 3,
  "name": "케플러 80 c",
  "location": "케플러 80 항성계",
  "fact": "케플러 80 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2012년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-80%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-80-d",
  "category": 3,
  "name": "케플러 80 d",
  "location": "케플러 80 항성계",
  "fact": "케플러 80 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2014년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-80%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-80-e",
  "category": 3,
  "name": "케플러 80 e",
  "location": "케플러 80 항성계",
  "fact": "케플러 80 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2014년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-80%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-80-f",
  "category": 3,
  "name": "케플러 80 f",
  "location": "케플러 80 항성계",
  "fact": "케플러 80 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2016년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-80%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-kepler-80-g",
  "category": 3,
  "name": "케플러 80 g",
  "location": "케플러 80 항성계",
  "fact": "케플러 80 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2017년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-80%20g",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-pds-70-b",
  "category": 3,
  "name": "PDS 70 b",
  "location": "PDS 70 항성계",
  "fact": "PDS 70 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2018년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/PDS%2070%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-pds-70-c",
  "category": 3,
  "name": "PDS 70 c",
  "location": "PDS 70 항성계",
  "fact": "PDS 70 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2019년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/PDS%2070%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-178-b",
  "category": 3,
  "name": "TOI-178 b",
  "location": "TOI-178 항성계",
  "fact": "TOI-178 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2021년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-178%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-178-c",
  "category": 3,
  "name": "TOI-178 c",
  "location": "TOI-178 항성계",
  "fact": "TOI-178 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2021년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-178%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-178-d",
  "category": 3,
  "name": "TOI-178 d",
  "location": "TOI-178 항성계",
  "fact": "TOI-178 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2021년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-178%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-178-e",
  "category": 3,
  "name": "TOI-178 e",
  "location": "TOI-178 항성계",
  "fact": "TOI-178 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2021년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-178%20e",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-178-f",
  "category": 3,
  "name": "TOI-178 f",
  "location": "TOI-178 항성계",
  "fact": "TOI-178 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2021년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-178%20f",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-178-g",
  "category": 3,
  "name": "TOI-178 g",
  "location": "TOI-178 항성계",
  "fact": "TOI-178 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2021년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-178%20g",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-270-b",
  "category": 3,
  "name": "TOI-270 b",
  "location": "TOI-270 항성계",
  "fact": "TOI-270 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2019년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-270%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-270-c",
  "category": 3,
  "name": "TOI-270 c",
  "location": "TOI-270 항성계",
  "fact": "TOI-270 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2019년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-270%20c",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-toi-270-d",
  "category": 3,
  "name": "TOI-270 d",
  "location": "TOI-270 항성계",
  "fact": "TOI-270 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2019년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-270%20d",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-wasp-12-b",
  "category": 3,
  "name": "WASP-12 b",
  "location": "WASP-12 항성계",
  "fact": "WASP-12 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2008년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-12%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-wasp-121-b",
  "category": 3,
  "name": "WASP-121 b",
  "location": "WASP-121 항성계",
  "fact": "WASP-121 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2016년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-121%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "3-exo-wasp-76-b",
  "category": 3,
  "name": "WASP-76 b",
  "location": "WASP-76 항성계",
  "fact": "WASP-76 주위를 도는 확인된 외계행성이에요. NASA 외계행성 아카이브에 기록된 발견 연도는 2016년이에요.",
  "variant": 1,
  "status": "확인된 외계행성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-76%20b",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-55-cnc",
  "category": 4,
  "name": "게자리 55",
  "location": "외계행성이 발견된 항성계",
  "fact": "게자리 55는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/55%20Cnc",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-gj-581",
  "category": 4,
  "name": "GJ 581",
  "location": "외계행성이 발견된 항성계",
  "fact": "GJ 581는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20581",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-gj-876",
  "category": 4,
  "name": "GJ 876",
  "location": "외계행성이 발견된 항성계",
  "fact": "GJ 876는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20876",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-hd-10180",
  "category": 4,
  "name": "HD 10180",
  "location": "외계행성이 발견된 항성계",
  "fact": "HD 10180는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2010180",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-hd-40307",
  "category": 4,
  "name": "HD 40307",
  "location": "외계행성이 발견된 항성계",
  "fact": "HD 40307는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HD%2040307",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-hip-65426",
  "category": 4,
  "name": "HIP 65426",
  "location": "외계행성이 발견된 항성계",
  "fact": "HIP 65426는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HIP%2065426",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-hr-8799",
  "category": 4,
  "name": "HR 8799",
  "location": "외계행성이 발견된 항성계",
  "fact": "HR 8799는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/HR%208799",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-10",
  "category": 4,
  "name": "케플러 10",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 10는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-10",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-138",
  "category": 4,
  "name": "케플러 138",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 138는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-138",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-20",
  "category": 4,
  "name": "케플러 20",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 20는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-20",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-444",
  "category": 4,
  "name": "케플러 444",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 444는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-444",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-kepler-80",
  "category": 4,
  "name": "케플러 80",
  "location": "외계행성이 발견된 항성계",
  "fact": "케플러 80는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-80",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-pds-70",
  "category": 4,
  "name": "PDS 70",
  "location": "외계행성이 발견된 항성계",
  "fact": "PDS 70는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/PDS%2070",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-toi-178",
  "category": 4,
  "name": "TOI-178",
  "location": "외계행성이 발견된 항성계",
  "fact": "TOI-178는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-178",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-toi-270",
  "category": 4,
  "name": "TOI-270",
  "location": "외계행성이 발견된 항성계",
  "fact": "TOI-270는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-270",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-wasp-12",
  "category": 4,
  "name": "WASP-12",
  "location": "외계행성이 발견된 항성계",
  "fact": "WASP-12는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-12",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-wasp-121",
  "category": 4,
  "name": "WASP-121",
  "location": "외계행성이 발견된 항성계",
  "fact": "WASP-121는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-121",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "4-host-wasp-76",
  "category": 4,
  "name": "WASP-76",
  "location": "외계행성이 발견된 항성계",
  "fact": "WASP-76는 확인된 외계행성이 주위를 도는 항성이에요. 별과 행성의 관측 자료가 NASA 외계행성 아카이브에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 항성",
  "source": "https://exoplanetarchive.ipac.caltech.edu/overview/WASP-76",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-metis",
  "category": 2,
  "name": "메티스",
  "location": "목성의 위성",
  "fact": "메티스는 목성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 0,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/jupiter/jupiter-moons/all-jupiter-moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-adrastea",
  "category": 2,
  "name": "아드라스테아",
  "location": "목성의 위성",
  "fact": "아드라스테아는 목성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/jupiter/jupiter-moons/all-jupiter-moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-thebe",
  "category": 2,
  "name": "테베",
  "location": "목성의 위성",
  "fact": "테베는 목성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 2,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/jupiter/jupiter-moons/all-jupiter-moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-leda",
  "category": 2,
  "name": "레다",
  "location": "목성의 위성",
  "fact": "레다는 목성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 3,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/jupiter/jupiter-moons/all-jupiter-moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-atlas",
  "category": 2,
  "name": "아틀라스",
  "location": "토성의 위성",
  "fact": "아틀라스는 토성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 0,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/saturn/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-prometheus",
  "category": 2,
  "name": "프로메테우스",
  "location": "토성의 위성",
  "fact": "프로메테우스는 토성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/saturn/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-pandora",
  "category": 2,
  "name": "판도라",
  "location": "토성의 위성",
  "fact": "판도라는 토성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 2,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/saturn/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-janus",
  "category": 2,
  "name": "야누스",
  "location": "토성의 위성",
  "fact": "야누스는 토성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 3,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/saturn/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-epimetheus",
  "category": 2,
  "name": "에피메테우스",
  "location": "토성의 위성",
  "fact": "에피메테우스는 토성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 4,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/saturn/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-puck",
  "category": 2,
  "name": "퍽",
  "location": "천왕성의 위성",
  "fact": "퍽는 천왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 0,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/uranus/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-cordelia",
  "category": 2,
  "name": "코델리아",
  "location": "천왕성의 위성",
  "fact": "코델리아는 천왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/uranus/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-ophelia",
  "category": 2,
  "name": "오필리아",
  "location": "천왕성의 위성",
  "fact": "오필리아는 천왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 2,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/uranus/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-bianca",
  "category": 2,
  "name": "비앙카",
  "location": "천왕성의 위성",
  "fact": "비앙카는 천왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 3,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/uranus/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-cressida",
  "category": 2,
  "name": "크레시다",
  "location": "천왕성의 위성",
  "fact": "크레시다는 천왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 4,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/uranus/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-desdemona",
  "category": 2,
  "name": "데스데모나",
  "location": "천왕성의 위성",
  "fact": "데스데모나는 천왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 0,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/uranus/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-juliet",
  "category": 2,
  "name": "줄리엣",
  "location": "천왕성의 위성",
  "fact": "줄리엣는 천왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/uranus/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-portia",
  "category": 2,
  "name": "포샤",
  "location": "천왕성의 위성",
  "fact": "포샤는 천왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 2,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/uranus/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-rosalind",
  "category": 2,
  "name": "로잘린드",
  "location": "천왕성의 위성",
  "fact": "로잘린드는 천왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 3,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/uranus/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-belinda",
  "category": 2,
  "name": "벨린다",
  "location": "천왕성의 위성",
  "fact": "벨린다는 천왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 4,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/uranus/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-naiad",
  "category": 2,
  "name": "나이아드",
  "location": "해왕성의 위성",
  "fact": "나이아드는 해왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 0,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/neptune/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-thalassa",
  "category": 2,
  "name": "탈라사",
  "location": "해왕성의 위성",
  "fact": "탈라사는 해왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 1,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/neptune/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-despina",
  "category": 2,
  "name": "데스피나",
  "location": "해왕성의 위성",
  "fact": "데스피나는 해왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 2,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/neptune/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-galatea",
  "category": 2,
  "name": "갈라테아",
  "location": "해왕성의 위성",
  "fact": "갈라테아는 해왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 3,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/neptune/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-hippocamp",
  "category": 2,
  "name": "히포캄프",
  "location": "해왕성의 위성",
  "fact": "히포캄프는 해왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 4,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/neptune/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "2-halimede",
  "category": 2,
  "name": "할리메데",
  "location": "해왕성의 위성",
  "fact": "할리메데는 해왕성 주위를 도는 자연 위성이에요. 관측으로 발견되어 NASA의 위성 목록에 기록되어 있어요.",
  "variant": 0,
  "status": "관측된 자연 위성",
  "source": "https://science.nasa.gov/neptune/moons/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-m33-x7",
  "category": 5,
  "name": "M33 X-7의 블랙홀",
  "location": "M33 은하",
  "fact": "찬드라와 허블 관측으로 연구한, 무거운 별과 함께 공전하는 블랙홀이에요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://heasarc.gsfc.nasa.gov/docs/objects/heapow/archive/compact_objects/m33x7_chandra.html",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-ngc3115",
  "category": 5,
  "name": "NGC 3115 중심 블랙홀",
  "location": "NGC 3115 은하 중심",
  "fact": "찬드라 망원경이 이 블랙홀 쪽으로 흘러가는 뜨거운 가스를 관측했어요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://chandra.harvard.edu/photo/2011/n3115/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-ngc1600",
  "category": 5,
  "name": "NGC 1600 중심 블랙홀",
  "location": "NGC 1600 은하 중심",
  "fact": "거대한 타원은하 중심에 있는 초대질량 블랙홀이에요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://science.nasa.gov/missions/hubble/behemoth-black-hole-found-in-an-unlikely-place/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-ngc4889",
  "category": 5,
  "name": "NGC 4889 중심 블랙홀",
  "location": "NGC 4889 은하 중심",
  "fact": "겉으로 조용해 보이는 은하 중심에 매우 무거운 블랙홀이 숨어 있어요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-caldwell-catalog/caldwell-35/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-centaurus-a",
  "category": 5,
  "name": "센타우루스 A 중심 블랙홀",
  "location": "센타우루스 A 은하 중심",
  "fact": "주변 가스와 먼지를 끌어들이며, 중심 부근에서 거대한 제트가 뻗어 나와요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://www.chandra.harvard.edu/photo/2023/cena/index.html",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-ngc4258",
  "category": 5,
  "name": "NGC 4258 중심 블랙홀",
  "location": "NGC 4258 은하 중심",
  "fact": "주변 은하의 가스에 영향을 주는 초대질량 블랙홀이에요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://science.nasa.gov/missions/chandra/galactic-pyrotechnics-from-23-million-light-years-away/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-ngc4649",
  "category": 5,
  "name": "NGC 4649 중심 블랙홀",
  "location": "NGC 4649 은하 중심",
  "fact": "주변 별과 가스에 미치는 영향을 살펴보며 연구하는 블랙홀이에요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://www.chandra.cfa.harvard.edu/photo/2008/ngc4649/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-maxi-j1820",
  "category": 5,
  "name": "MAXI J1820+070의 블랙홀",
  "location": "우리은하의 쌍성계",
  "fact": "무거운 별의 붕괴로 만들어진 블랙홀이에요. 주변에서 나오는 엑스선과 제트를 관측해요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://www.nasa.gov/universe/maxi-j1820070-black-hole-outburst-caught-on-video/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-ngc1068",
  "category": 5,
  "name": "NGC 1068 중심 블랙홀",
  "location": "NGC 1068 은하 중심",
  "fact": "활발한 은하 중심에 있는 초대질량 블랙홀이에요. 주변 물질이 밝은 빛을 내요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://science.nasa.gov/mission/hubble/science/universe-uncovered/hubble-black-holes/",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 },
 {
  "id": "5-ngc3842",
  "category": 5,
  "name": "NGC 3842 중심 블랙홀",
  "location": "NGC 3842 은하 중심",
  "fact": "거대한 은하의 중심에서 관측으로 연구된 매우 무거운 블랙홀이에요.",
  "variant": 0,
  "status": "관측으로 확인",
  "source": "https://assets.science.nasa.gov/content/dam/science/missions/hubble/releases/2016/04/STScI-01EVSR49AWSPYY0GJHJR8C7SDG.pdf",
  "artLabel": "분류를 표현한 게임 그림 · 실제 천체 사진이 아니에요"
 }
]);

// Observation images: source, processing description and credit are retained.
for(const photo of [
 {
  "id": "3-mercury",
  "url": "https://science.nasa.gov/wp-content/uploads/2023/04/EW0108829708G4release_mercury-jpg.webp?w=640",
  "source": "https://science.nasa.gov/gallery/our-solar-system-images/",
  "label": "실제 관측 이미지 · 색 보정·합성 처리가 포함될 수 있어요",
  "credit": "NASA 공개 자료 · 상세 크레딧은 사진 출처 참조",
  "path": "./photos/3-mercury.jpg"
 },
 {
  "id": "3-venus",
  "url": "https://science.nasa.gov/wp-content/uploads/2024/03/venus-mariner-10-pia23791-fig2.jpg?w=640",
  "source": "https://science.nasa.gov/gallery/our-solar-system-images/",
  "label": "실제 관측 이미지 · 색 보정·합성 처리가 포함될 수 있어요",
  "credit": "NASA 공개 자료 · 상세 크레딧은 사진 출처 참조",
  "path": "./photos/3-venus.jpg"
 },
 {
  "id": "3-earth",
  "url": "https://science.nasa.gov/wp-content/uploads/2023/06/safires-epc-20240903.jpg?w=640",
  "source": "https://science.nasa.gov/gallery/our-solar-system-images/",
  "label": "실제 관측 이미지 · 색 보정·합성 처리가 포함될 수 있어요",
  "credit": "NASA 공개 자료 · 상세 크레딧은 사진 출처 참조",
  "path": "./photos/3-earth.jpg"
 },
 {
  "id": "3-jupiter",
  "url": "https://science.nasa.gov/wp-content/uploads/2023/05/jupiter-marble-pia22946-1920x640-1.jpg?w=640",
  "source": "https://science.nasa.gov/gallery/our-solar-system-images/",
  "label": "실제 관측 이미지 · 색 보정·합성 처리가 포함될 수 있어요",
  "credit": "NASA 공개 자료 · 상세 크레딧은 사진 출처 참조",
  "path": "./photos/3-jupiter.jpg"
 },
 {
  "id": "3-saturn",
  "url": "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2024/03/saturn-farewell-pia21345.jpg?w=640&h=530&fit=clip",
  "source": "https://science.nasa.gov/gallery/our-solar-system-images/",
  "label": "실제 관측 이미지 · 색 보정·합성 처리가 포함될 수 있어요",
  "credit": "NASA 공개 자료 · 상세 크레딧은 사진 출처 참조",
  "path": "./photos/3-saturn.jpg"
 },
 {
  "id": "3-uranus",
  "url": "https://images-assets.nasa.gov/image/PIA18182/PIA18182~orig.jpg?w=640&h=1720&fit=clip&crop=faces%2Cfocalpoint",
  "source": "https://science.nasa.gov/gallery/our-solar-system-images/",
  "label": "실제 관측 이미지 · 색 보정·합성 처리가 포함될 수 있어요",
  "credit": "NASA 공개 자료 · 상세 크레딧은 사진 출처 참조",
  "path": "./photos/3-uranus.jpg"
 },
 {
  "id": "3-neptune",
  "url": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/p/i/a/0/PIA01492-1.jpg?w=640&h=1024&fit=clip",
  "source": "https://science.nasa.gov/gallery/our-solar-system-images/",
  "label": "실제 관측 이미지 · 색 보정·합성 처리가 포함될 수 있어요",
  "credit": "NASA 공개 자료 · 상세 크레딧은 사진 출처 참조",
  "path": "./photos/3-neptune.jpg"
 },
 {
  "id": "1-pluto",
  "url": "https://images-assets.nasa.gov/image/PIA19702/PIA19702~large.jpg?w=640&h=1920&fit=clip&crop=faces%2Cfocalpoint",
  "source": "https://science.nasa.gov/gallery/our-solar-system-images/",
  "label": "실제 관측 이미지 · 색 보정·합성 처리가 포함될 수 있어요",
  "credit": "NASA 공개 자료 · 상세 크레딧은 사진 출처 참조",
  "path": "./photos/1-pluto.jpg"
 },
 {
  "id": "3-mars",
  "url": "https://science.nasa.gov/wp-content/uploads/2024/03/pia04304-mars.jpg?w=640",
  "source": "https://science.nasa.gov/mars/",
  "label": "바이킹 탐사선 관측 이미지 · 모자이크",
  "credit": "NASA/JPL-Caltech",
  "path": "./photos/3-mars.jpg"
 },
 {
  "id": "5-m87",
  "url": "https://cdn.eso.org/images/screen/eso1907a.jpg",
  "source": "https://www.eso.org/public/images/eso1907a/",
  "label": "전파 관측 재구성 이미지 · 블랙홀 주변 빛과 그림자",
  "credit": "EHT Collaboration",
  "path": "./photos/5-m87.jpg"
 }
]){const entry=CELESTIAL_CATALOG.find(e=>e.id===photo.id);if(entry)entry.photo=photo;}

class CosmosCollection {
 constructor(storage){
  this.storage=storage;this.key='little-cosmos-collection-v1';this.counts={};this.storageAvailable=!!storage;
  try{const raw=storage?.getItem(this.key);if(raw){const data=JSON.parse(raw);if(data.version!==1||!data.counts||typeof data.counts!=='object')throw Error('Invalid collection');for(const entry of CELESTIAL_CATALOG){const n=data.counts[entry.id];if(Number.isSafeInteger(n)&&n>0)this.counts[entry.id]=n;}}}catch{this.storageAvailable=false;}
 }
 owns(id){return (this.counts[id]||0)>0;}
 award(random=Math.random){
  const pool=CELESTIAL_CATALOG;
  const missing=pool.filter(entry=>!this.owns(entry.id)),choices=missing.length?missing:pool;
  const entry=choices[Math.min(choices.length-1,Math.max(0,Math.floor(random()*choices.length)))];
  const isNew=!this.owns(entry.id);this.counts[entry.id]=(this.counts[entry.id]||0)+1;
  try{if(!this.storage)throw Error('No storage');this.storage.setItem(this.key,JSON.stringify({version:1,counts:this.counts}));this.storageAvailable=true;}catch{this.storageAvailable=false;}
  return {entry,isNew,saved:this.storageAvailable,count:this.counts[entry.id]};
 }
 total(){return CELESTIAL_CATALOG.filter(entry=>this.owns(entry.id)).length;}
}
