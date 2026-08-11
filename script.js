  // ---- Tab switching ----
  const tabs = document.querySelectorAll('.tab-panel');
  const navBtns = document.querySelectorAll('.navbtn');
  function showTab(name){
    tabs.forEach(t => t.classList.toggle('active', t.id === 'tab-' + name));
    navBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    document.getElementById('scrollArea').scrollTop = 0;
    document.getElementById('researchBarWrap').style.display = (name === 'research') ? 'block' : 'none';
  }
  navBtns.forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
  document.querySelectorAll('[data-goto]').forEach(el =>
    el.addEventListener('click', () => showTab(el.dataset.goto))
  );

  // ---- Cases filter ----
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const f = chip.dataset.filter;
      document.querySelectorAll('#fullCaseList .case-card').forEach(card => {
        card.style.display = (f === 'all' || card.dataset.status === f) ? '' : 'none';
      });
    });
  });

  // ---- Chat logic ----
  const mainView = document.getElementById('mainView');
  const chatScreen = document.getElementById('chatScreen');
  const chatLog = document.getElementById('chatLog');
  const chatInput = document.getElementById('chatInput');

  function openChat(firstPrompt){
    mainView.style.display = 'none';
    chatScreen.classList.add('active');
    chatLog.innerHTML = '';
    if (firstPrompt) sendToChat(firstPrompt);
  }
  document.getElementById('chatBack').addEventListener('click', () => {
    chatScreen.classList.remove('active');
    mainView.style.display = 'block';
  });

  function addMsg(who, text){
    const wrap = document.createElement('div');
    wrap.className = 'msg ' + who;
    wrap.innerHTML = `<div class="bubble"></div>`;
    wrap.querySelector('.bubble').textContent = text;
    chatLog.appendChild(wrap);
    chatLog.scrollTop = chatLog.scrollHeight;
    return wrap;
  }
  function addTyping(){
    const wrap = document.createElement('div');
    wrap.className = 'msg bot';
    wrap.innerHTML = `<div class="bubble typing"><span></span><span></span><span></span></div>`;
    chatLog.appendChild(wrap);
    chatLog.scrollTop = chatLog.scrollHeight;
    return wrap;
  }

  function mockAnswer(q){
    const s = q.toLowerCase();
    if (s.includes('kumar') || s.includes('1042')) {
      return "State vs. Kumar (#1042, Delhi High Court) is an ongoing criminal appeal under Section 420 IPC, with 34 documents on file. It was last updated 2 hours ago.";
    }
    if (s.includes('mehta') || s.includes('1039')) {
      return "Mehta v. Priya Holdings (#1039, NCLT Mumbai) is a company law dispute — a winding up petition. A hearing has been set; 18 documents are on file.";
    }
    if (s.includes('bail')) {
      return "For bail modification on medical grounds, courts generally weigh the severity of the condition, verified medical records, and flight risk. In the full version, LexAI would pull and verify Supreme Court authorities on point.";
    }
    if (s.includes('adverse possession')) {
      return "Adverse possession in India generally requires open, continuous, and hostile possession for 12 years under the Limitation Act. LexAI would surface the leading judgments and any recent refinements here.";
    }
    if (s.includes('citation') || s.includes('verify')) {
      return "2 citations across your active cases currently need verification. In the full version, LexAI cross-checks each citation against verified case law databases and flags any that can't be confirmed.";
    }
    if (s.includes('document') || s.includes('review')) {
      return "Share or select a document and LexAI will extract key clauses, flag risks, and summarize it against the relevant case context.";
    }
    if (s.includes('analyze')) {
      return "Select a case and LexAI will build out its full timeline, flag open issues, and surface the most relevant precedent automatically.";
    }
    return "In the connected version, LexAI would search verified case law, statutes, and your case files to answer that. This is a prototype response.";
  }

  function sendToChat(text){
    addMsg('user', text);
    const typingEl = addTyping();
    const delay = 550 + Math.random() * 450;
    setTimeout(() => {
      typingEl.remove();
      addMsg('bot', mockAnswer(text));
    }, delay);
  }

  // Home input
  const homeInput = document.getElementById('homeInput');
  const homeSend = document.getElementById('homeSend');
  homeInput.addEventListener('input', () => homeSend.classList.toggle('ready', homeInput.value.trim().length > 0));
  function triggerHomeSend(){
    const val = homeInput.value.trim();
    if (!val) return;
    homeInput.value = '';
    homeSend.classList.remove('ready');
    openChat(val);
  }
  homeSend.addEventListener('click', triggerHomeSend);
  homeInput.addEventListener('keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); triggerHomeSend(); }});

  // Quick action pills
  document.querySelectorAll('.pill[data-prompt]').forEach(p =>
    p.addEventListener('click', () => openChat(p.dataset.prompt))
  );

  // Research items + bar
  document.querySelectorAll('.research-item[data-prompt]').forEach(r =>
    r.addEventListener('click', () => openChat(r.dataset.prompt))
  );
  const researchInput = document.getElementById('researchInput');
  document.getElementById('researchSend').addEventListener('click', () => {
    const val = researchInput.value.trim();
    if (!val) return;
    researchInput.value = '';
    openChat(val);
  });
  researchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter'){ e.preventDefault(); document.getElementById('researchSend').click(); }
  });

  // Chat composer
  document.getElementById('chatSend').addEventListener('click', () => {
    const val = chatInput.value.trim();
    if (!val) return;
    chatInput.value = '';
    sendToChat(val);
  });
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter'){ e.preventDefault(); document.getElementById('chatSend').click(); }
  });

  // Seed the intelligence + case card clicks from Home into chat (nice touch)
  document.querySelectorAll('.intel-item').forEach(item =>
    item.addEventListener('click', () => openChat(item.querySelector('.intel-text').textContent))
  );