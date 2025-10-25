/* Divisions Page Script */

const divisions = [
  { id:'open', name:'Open', type:'skill', ratingMin:8, ratingMax:10, ageMin:null, ageMax:null, team:'singles', gender:'open', roster:1, tags:['elite','seeding','competitive'], notes:'Highest competitive tier. Strong tournament history expected.' },
  { id:'advanced', name:'Advanced', type:'skill', ratingMin:6, ratingMax:8, ageMin:null, ageMax:null, team:'singles', gender:'open', roster:1, tags:['competitive'], notes:'Experienced players with strong fundamentals and prior event play.' },
  { id:'intermediate', name:'Intermediate', type:'skill', ratingMin:4, ratingMax:6, ageMin:null, ageMax:null, team:'singles', gender:'open', roster:1, tags:['development'], notes:'Players building consistency and event experience.' },
  { id:'beginner', name:'Beginner', type:'skill', ratingMin:1, ratingMax:4, ageMin:null, ageMax:null, team:'singles', gender:'open', roster:1, tags:['entry','first-timers'], notes:'Introductory level; great for first events.' },
  { id:'youth-u12', name:'Youth U12', type:'age', ratingMin:1, ratingMax:10, ageMin:null, ageMax:12, team:'singles', gender:'open', roster:1, tags:['youth'], notes:'Players aged 11 and under on event day.' },
  { id:'youth-u16', name:'Youth U16', type:'age', ratingMin:1, ratingMax:10, ageMin:null, ageMax:16, team:'singles', gender:'open', roster:1, tags:['youth'], notes:'Players aged 15 and under on event day.' },
  { id:'masters-35', name:'Masters 35+', type:'age', ratingMin:1, ratingMax:10, ageMin:35, ageMax:null, team:'singles', gender:'open', roster:1, tags:['masters'], notes:'Players aged 35 or older on event day.' },
  { id:'womens-open', name:"Women's Open", type:'skill', ratingMin:6, ratingMax:10, ageMin:null, ageMax:null, team:'singles', gender:'women', roster:1, tags:['gender'], notes:'Open division for women and femme-identifying players.' },
  { id:'doubles-open', name:'Doubles Open', type:'team', ratingMin:6, ratingMax:10, ageMin:null, ageMax:null, team:'doubles', gender:'open', roster:2, tags:['team','seeding'], notes:'High-level doubles. Partners may be assigned a combined seed.' },
  { id:'mixed-doubles', name:'Mixed Doubles', type:'team', ratingMin:4, ratingMax:10, ageMin:null, ageMax:null, team:'doubles', gender:'mixed', roster:2, tags:['team','mixed'], notes:'Mixed-gender pairs. Some events may require M/F or posted equivalents.' }
];

const compareSet = new Set();

function typeLabel(t){ return t==='skill'?'Skill tier':t==='age'?'Age group':'Team format'; }
function skillLabel(d){ return (d.ratingMin||1) + '–' + (d.ratingMax||10); }
function ageLabel(d){
  if(d.ageMin && d.ageMax) return d.ageMin+'–'+d.ageMax;
  if(d.ageMin) return d.ageMin+'+';
  if(d.ageMax) return '≤'+d.ageMax;
  return 'Any';
}
function titleCase(s){ return (s||'').replace(/\b\w/g, c=>c.toUpperCase()); }
function mkPill(text, cls=''){
  const span=document.createElement('span');
  span.className='pill '+cls;
  span.textContent=text;
  return span;
}

function renderGrid(){
  const grid = document.getElementById('grid');
  if (!grid) return;

  const q = (document.getElementById('q')?.value||'').toLowerCase().trim();
  const typeSelected = new Set(Array.from(document.querySelectorAll('#typeFilters .filter[aria-pressed="true"]').values()).map(b=>b.dataset.value));
  const tagSelected = new Set(Array.from(document.querySelectorAll('#tagFilters .filter[aria-pressed="true"]').values()).map(b=>b.dataset.value));

  grid.innerHTML = '';
  let shown = 0;

  for(const d of divisions){
    const hay = (d.name+' '+d.type+' '+(d.tags||[]).join(' ')+' '+(d.notes||'')).toLowerCase();
    const okText = !q || hay.includes(q);
    const okType = typeSelected.size===0 || typeSelected.has(d.type);
    const okTags = tagSelected.size===0 || (d.tags||[]).some(t=>tagSelected.has(t));
    if(!(okText && okType && okTags)) continue;
    shown++;

    const card = document.createElement('article');
    card.className='card reveal in-view';
    card.id = d.id;

    const head = document.createElement('header');
    const h3 = document.createElement('h3');
    h3.textContent = d.name;
    head.appendChild(h3);
    const tagWrap = document.createElement('div');
    tagWrap.className='tags';
    tagWrap.appendChild(mkPill(typeLabel(d.type)));
    (d.tags||[]).forEach(t=> tagWrap.appendChild(mkPill(t)) );
    head.appendChild(tagWrap);
    card.appendChild(head);

    const body = document.createElement('div');
    body.className='body';
    const meta = document.createElement('div');
    meta.className='meta';
    meta.innerHTML = `
      <div><strong>Skill:</strong> ` + skillLabel(d) + `</div>
      <div><strong>Age:</strong> ` + ageLabel(d) + `</div>
      <div><strong>Team:</strong> ` + titleCase(d.team) + `</div>
      <div><strong>Gender:</strong> ` + titleCase(d.gender) + `</div>
      <div><strong>Roster:</strong> ` + d.roster + `</div>
      <div><strong>ID check:</strong> Required at check-in</div>
    `;
    body.appendChild(meta);
    const p = document.createElement('p');
    p.textContent = d.notes;
    body.appendChild(p);
    card.appendChild(body);

    const actions = document.createElement('div');
    actions.className='actions';
    const compareBtn = document.createElement('button');
    compareBtn.type='button';
    compareBtn.className='btn-ghost';
    compareBtn.textContent = compareSet.has(d.id)?'Remove from compare':'Add to compare';
    compareBtn.addEventListener('click',()=>{
      if(compareSet.has(d.id)) compareSet.delete(d.id);
      else compareSet.add(d.id);
      renderCompare();
      compareBtn.textContent = compareSet.has(d.id)?'Remove from compare':'Add to compare';
    });
    const linkBtn = document.createElement('a');
    linkBtn.className='btn-ghost';
    linkBtn.href = '#'+d.id;
    linkBtn.textContent = 'Link';
    const applyBtn = document.createElement('a');
    applyBtn.className='btn';
    applyBtn.href = 'index.html#events-tables';
    applyBtn.textContent='See events';
    actions.appendChild(compareBtn);
    actions.appendChild(linkBtn);
    actions.appendChild(applyBtn);
    card.appendChild(actions);

    grid.appendChild(card);
  }

  const resultCountEl = document.getElementById('resultCount');
  if (resultCountEl) {
    resultCountEl.textContent = shown + ' division' + (shown===1?'':'s') + ' shown';
  }

  const targetId = location.hash.slice(1);
  if (targetId){
    const el = document.getElementById(targetId);
    if (el){ setTimeout(()=> el.scrollIntoView({ behavior:'smooth', block:'start' }), 50); }
  }
}

function renderTypeFilters(){
  const container = document.getElementById('typeFilters');
  if (!container) return;

  container.innerHTML = '';
  const types = ['skill','age','team'];
  for(const t of types){
    const b = document.createElement('button');
    b.className='filter';
    b.type='button';
    b.dataset.value=t;
    b.setAttribute('aria-pressed','false');
    b.textContent=typeLabel(t);
    b.addEventListener('click',()=>{
      const on=b.getAttribute('aria-pressed')==='true';
      b.setAttribute('aria-pressed', String(!on));
      renderGrid();
    });
    container.appendChild(b);
  }
}

function renderTagFilters(){
  const container = document.getElementById('tagFilters');
  if (!container) return;

  const all = new Set(divisions.flatMap(d=>d.tags||[]));
  container.innerHTML = '';
  const priority = ['elite','competitive','development','entry','youth','masters','team','mixed','gender','seeding'];
  const ordered = [...new Set([...priority.filter(t=>all.has(t)), ...Array.from(all).sort()])];
  for(const tag of ordered){
    const b = document.createElement('button');
    b.className='filter';
    b.type='button';
    b.dataset.value=tag;
    b.setAttribute('aria-pressed','false');
    b.textContent=tag;
    b.addEventListener('click',()=>{
      const on=b.getAttribute('aria-pressed')==='true';
      b.setAttribute('aria-pressed', String(!on));
      renderGrid();
    });
    container.appendChild(b);
  }
}

function renderCompare(){
  const tbody = document.getElementById('compareBody');
  const count = document.getElementById('compareCount');
  if (!tbody || !count) return;

  const chosen = divisions.filter(d=> compareSet.has(d.id));
  count.textContent = chosen.length + ' selected';
  tbody.innerHTML = '';
  if (chosen.length===0){
    tbody.innerHTML = '<tr><td colspan="8" class="note">Use "Add to compare" on any card to build your table.</td></tr>';
    return;
  }
  for(const d of chosen){
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><a class="link" href="#` + d.id + `">` + d.name + `</a></td>
      <td>` + typeLabel(d.type) + `</td>
      <td>` + skillLabel(d) + `</td>
      <td>` + ageLabel(d) + `</td>
      <td>` + titleCase(d.team) + `</td>
      <td>` + titleCase(d.gender) + `</td>
      <td>` + d.roster + `</td>
      <td>` + d.notes + `</td>
    `;
    tbody.appendChild(tr);
  }
}

function runFinder(){
  const age = Number(document.getElementById('age')?.value);
  const rating = Number(document.getElementById('rating')?.value);
  const team = document.getElementById('team')?.value;
  const out = document.getElementById('finderResults');
  if (!out) return;

  const problems = [];
  if(Number.isNaN(age)) problems.push('Enter a valid age');
  if(Number.isNaN(rating)) problems.push('Enter a valid rating');
  if(problems.length){
    out.innerHTML = '<span class="pill warn">' + problems.join(' · ') + '</span>';
    return;
  }

  const eligible = divisions.filter(d => {
    const okAge = (d.ageMin==null || age>=d.ageMin) && (d.ageMax==null || age<=d.ageMax);
    const okSkill = rating>=d.ratingMin && rating<=d.ratingMax;
    const okTeam = (team==='any') || d.team===team;
    return okAge && okSkill && okTeam;
  });

  out.innerHTML = '';
  if(eligible.length===0){
    out.innerHTML = '<span class="pill warn">No exact matches. Consider contacting OSS for placement guidance.</span>';
    return;
  }

  for(const d of eligible){
    const row = document.createElement('div');
    row.innerHTML = `<strong>` + d.name + `</strong><br><span class="note">Skill ` + skillLabel(d) + ` · Age ` + ageLabel(d) + ` · ` + titleCase(d.team) + `, ` + titleCase(d.gender) + `</span>`;
    out.appendChild(row);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('q');
  if (searchInput) {
    searchInput.addEventListener('input', ()=>{
      clearTimeout(window.__qT);
      window.__qT = setTimeout(renderGrid, 120);
    });
  }

  renderTypeFilters();
  renderTagFilters();
  renderGrid();

  const finderBtn = document.getElementById('runFinder');
  if (finderBtn) {
    finderBtn.addEventListener('click', runFinder);
  }

  const targetId = location.hash.slice(1);
  if (targetId){
    const el = document.getElementById(targetId);
    if (el){ setTimeout(()=> el.scrollIntoView({ behavior:'smooth', block:'start' }), 150); }
  }
});
