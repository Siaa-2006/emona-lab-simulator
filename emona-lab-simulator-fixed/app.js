(() => {
  'use strict';

  const IMAGE_W = 1281;
  const IMAGE_H = 1097;

  const sockets = window.EMONA_SOCKETS || [];
  const tasks = window.EMONA_TASKS || [];
  const socketById = new Map(sockets.map(s => [s.id, s]));

  const wrap = document.getElementById('trainerWrap');
  const socketLayer = document.getElementById('socketLayer');
  const wireLayer = document.getElementById('wireLayer');
  const previewLayer = document.getElementById('previewLayer');
  const tooltip = document.getElementById('tooltip');
  const taskSelect = document.getElementById('taskSelect');
  const challengeText = document.getElementById('challengeText');
  const hintText = document.getElementById('hintText');
  const statusPill = document.getElementById('statusPill');
  const message = document.getElementById('message');
  const wireCount = document.getElementById('wireCount');
  const leadColours = document.getElementById('leadColours');
  const switchLayer = document.getElementById('switchLayer');
  const switchStatus = document.getElementById('switchStatus');
  const switchDefs = [
    { id:'vco', label:'VCO', x:273, y:885, positions:['HI','LO'], initial:1 },
    { id:'phase', label:'PHASE SHIFTER', x:881, y:400, positions:['0°','180°'], initial:0 },
    { id:'pcm', label:'PCM ENCODER', x:515, y:727, positions:['PCM','TDM'], initial:0 }
  ];
  const switchPositions = Object.fromEntries(switchDefs.map(def => [def.id,def.initial]));
  const switchControls = document.getElementById('switchControls');
  function setSwitch(id, index) {
    const def = switchDefs.find(d => d.id === id);
    if (!def) return;
    switchPositions[id] = index;
    refreshSwitches();
    setMessage(`${def.label} set to ${def.positions[index]}.`);
  }
  function refreshSwitches() {
    switchLayer.querySelectorAll('.trainer-switch').forEach(el => {
      const def = switchDefs.find(d => d.id === el.dataset.switchId);
      if (!def) return;
      const index = switchPositions[def.id];
      el.dataset.position = String(index);
      el.setAttribute('aria-label', `${def.label}: ${def.positions[index]}. Click to switch to ${def.positions[1-index]}`);
      el.setAttribute('aria-pressed', String(index === 1));
      el.querySelector('.switch-indicator').textContent = def.positions[index];
      el.title = `${def.label}: ${def.positions[index]} (click to toggle)`;
    });
    switchStatus.replaceChildren();
    switchDefs.forEach(def => {
      const state = document.createElement('span'); state.className = 'switch-state';
      state.append(document.createTextNode(`${def.label}: `));
      const val = document.createElement('b'); val.textContent = def.positions[switchPositions[def.id]];
      state.append(val); switchStatus.appendChild(state);
    });
    switchControls.querySelectorAll('[data-switch-choice]').forEach(el => {
      const active = switchPositions[el.dataset.switchId] === Number(el.dataset.switchChoice);
      el.setAttribute('aria-pressed', String(active));
      el.classList.toggle('switch-choice-active', active);
    });
  }
  function buildSwitches() {
    switchDefs.forEach(def => {
      const el = document.createElement('button'); el.type = 'button'; el.className = 'trainer-switch';
      el.dataset.switchId = def.id;
      el.style.left = `${def.x / IMAGE_W * 100}%`;
      el.style.top = `${def.y / IMAGE_H * 100}%`;
      const handle = document.createElement('span'); handle.className = 'toggle-handle';
      const indicator = document.createElement('span'); indicator.className = 'switch-indicator';
      el.append(handle,indicator);
      el.addEventListener('click', (e) => {e.stopPropagation();setSwitch(def.id, 1-switchPositions[def.id]);});
      switchLayer.appendChild(el);
      const group = document.createElement('fieldset'); group.className = 'switch-group';
      const legend = document.createElement('legend'); legend.textContent = def.label; group.appendChild(legend);
      def.positions.forEach((position, index) => {
        const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'switch-choice';
        btn.textContent = position; btn.dataset.switchId = def.id; btn.dataset.switchChoice = String(index);
        btn.addEventListener('click', () => setSwitch(def.id,index)); group.appendChild(btn);
      });
      switchControls.appendChild(group);
    });
    document.getElementById('resetSwitchesBtn').addEventListener('click', () => {
      switchDefs.forEach(def => switchPositions[def.id] = def.initial);
      refreshSwitches(); setMessage('Toggle switches reset.');
    });
    refreshSwitches();
  }

  const palette = ['#e3342f', '#f2c230', '#2676e8', '#141414', '#22a06b', '#f3f4f6'];
  let leadColour = palette[0];
  let wires = [];
  let selectedSocket = null;
  let pointerDownSocket = null;
  let pointerMoved = false;
  let currentPointer = null;
  let showSockets = false;

  const normalizePair = (a, b) => [a, b].sort().join('::');

  function svgEl(tag, attrs = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, String(value)));
    return el;
  }

  function boardPointFromClient(clientX, clientY) {
    const r = wrap.getBoundingClientRect();
    return {
      x: (clientX - r.left) / r.width * IMAGE_W,
      y: (clientY - r.top) / r.height * IMAGE_H
    };
  }

  function cableCurve(a, b, index = 0) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.hypot(dx, dy);
    const direction = index % 2 ? -1 : 1;
    const sag = Math.min(145, 32 + distance * 0.11) * direction;
    const c1 = { x: a.x + dx * 0.29, y: a.y + dy * 0.22 + sag };
    const c2 = { x: a.x + dx * 0.71, y: a.y + dy * 0.78 + sag };
    return `M ${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`;
  }

  function drawPlug(svg, p, colour, preview = false) {
    if (preview) return;
    svg.appendChild(svgEl('circle', { cx: p.x + 3, cy: p.y + 4, r: 12, class: 'plug-shadow' }));
    svg.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: 11, fill: colour, class: 'plug-ring' }));
    svg.appendChild(svgEl('circle', { cx: p.x, cy: p.y, r: 4.3, fill: '#d6d9dc', stroke: '#151719', 'stroke-width': 1.5 }));
  }

  function drawCable(svg, a, b, colour, index = 0, preview = false, wireId = null) {
    const d = cableCurve(a, b, index);
    svg.appendChild(svgEl('path', { d, class: 'cable-shadow' }));
    svg.appendChild(svgEl('path', { d, class: 'cable-body', stroke: colour }));
    svg.appendChild(svgEl('path', { d, class: 'cable-highlight' }));
    if (!preview && wireId !== null) {
      const hit = svgEl('path', { d, class: 'wire-hit', 'data-wire-id': wireId });
      hit.addEventListener('click', (e) => {
        e.stopPropagation();
        wires = wires.filter(w => w.uid !== wireId);
        renderWires();
        setMessage('Lead removed.');
      });
      svg.appendChild(hit);
    }
    drawPlug(svg, a, colour, preview);
    drawPlug(svg, b, colour, preview);
  }

  function renderWires() {
    wireLayer.innerHTML = '';
    wires.forEach((wire, index) => {
      const a = socketById.get(wire.a);
      const b = socketById.get(wire.b);
      if (a && b) drawCable(wireLayer, a, b, wire.colour, index, false, wire.uid);
    });
    wireCount.textContent = String(wires.length);
  }

  function drawPreview(endPoint = null) {
    previewLayer.innerHTML = '';
    if (!selectedSocket || !endPoint) return;
    const start = socketById.get(selectedSocket.dataset.id);
    if (!start) return;
    drawCable(previewLayer, start, endPoint, leadColour, wires.length, true);
  }

  function setMessage(text, kind = '') {
    message.textContent = text;
    message.className = `message ${kind}`.trim();
  }

  function setSelected(el) {
    if (selectedSocket) selectedSocket.classList.remove('selected');
    selectedSocket = el || null;
    if (selectedSocket) {
      selectedSocket.classList.add('selected');
      setMessage(`Selected: ${selectedSocket.dataset.label}. Choose the second socket.`);
    }
  }

  function connectSockets(aEl, bEl) {
    if (!aEl || !bEl || aEl === bEl) {
      setSelected(null);
      previewLayer.innerHTML = '';
      return;
    }
    const a = aEl.dataset.id;
    const b = bEl.dataset.id;
    const pair = normalizePair(a, b);
    const duplicate = wires.some(w => normalizePair(w.a, w.b) === pair);
    if (duplicate) {
      setMessage('That exact patch lead is already connected.');
      setSelected(null);
      previewLayer.innerHTML = '';
      return;
    }

    wires.push({
      uid: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      a,
      b,
      colour: leadColour
    });
    renderWires();
    setMessage(`${aEl.dataset.label} ↔ ${bEl.dataset.label}`);
    setSelected(null);
    previewLayer.innerHTML = '';
  }

  function nearestSocket(clientX, clientY, radiusPx = 26) {
    let winner = null;
    let best = radiusPx;
    for (const el of socketLayer.querySelectorAll('.socket')) {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const d = Math.hypot(clientX - cx, clientY - cy);
      if (d < best) { best = d; winner = el; }
    }
    return winner;
  }

  function showTooltip(el) {
    const s = socketById.get(el.dataset.id);
    if (!s) return;
    tooltip.textContent = s.label;
    tooltip.style.left = `${s.x / IMAGE_W * 100}%`;
    tooltip.style.top = `${s.y / IMAGE_H * 100}%`;
    tooltip.classList.add('show');
  }

  function hideTooltip() { tooltip.classList.remove('show'); }

  function buildSockets() {
    socketLayer.innerHTML = '';
    sockets.forEach((s, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `socket ${s.type === 'square' ? 'square' : 'round'}`;
      button.style.left = `${s.x / IMAGE_W * 100}%`;
      button.style.top = `${s.y / IMAGE_H * 100}%`;
      button.dataset.id = s.id;
      button.dataset.label = s.label;
      button.setAttribute('aria-label', s.label);
      button.title = s.label;

      const indexTag = document.createElement('span');
      indexTag.className = 'socket-index';
      indexTag.textContent = String(index + 1);
      button.appendChild(indexTag);

      button.addEventListener('mouseenter', () => showTooltip(button));
      button.addEventListener('mouseleave', hideTooltip);
      button.addEventListener('focus', () => showTooltip(button));
      button.addEventListener('blur', hideTooltip);

      button.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        pointerDownSocket = button;
        pointerMoved = false;
        currentPointer = { x: e.clientX, y: e.clientY };
        if (!selectedSocket) setSelected(button);
        else if (selectedSocket !== button) connectSockets(selectedSocket, button);
        try { button.setPointerCapture(e.pointerId); } catch (_) {}
      });

      button.addEventListener('pointermove', (e) => {
        if (!pointerDownSocket) return;
        const moved = Math.hypot(e.clientX - currentPointer.x, e.clientY - currentPointer.y);
        if (moved > 3) pointerMoved = true;
        drawPreview(boardPointFromClient(e.clientX, e.clientY));
      });

      button.addEventListener('pointerup', (e) => {
        if (!pointerDownSocket) return;
        e.preventDefault();
        e.stopPropagation();
        const origin = pointerDownSocket;
        const target = nearestSocket(e.clientX, e.clientY, 34);
        pointerDownSocket = null;
        if (pointerMoved && target && target !== origin) connectSockets(origin, target);
        else if (pointerMoved) {
          previewLayer.innerHTML = '';
          setSelected(origin);
        }
      });

      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Pointer events handle mouse/touch; this keeps keyboard activation useful.
        if (e.detail === 0) {
          if (!selectedSocket) setSelected(button);
          else if (selectedSocket === button) setSelected(null);
          else connectSockets(selectedSocket, button);
        }
      });

      socketLayer.appendChild(button);
    });
  }

  function buildPalette() {
    palette.forEach((colour, index) => {
      const swatch = document.createElement('button');
      swatch.type = 'button';
      swatch.className = `colour-swatch ${index === 0 ? 'active' : ''}`;
      swatch.style.background = colour;
      swatch.setAttribute('aria-label', `Use ${colour} patch lead`);
      swatch.addEventListener('click', () => {
        leadColour = colour;
        leadColours.querySelectorAll('.colour-swatch').forEach(x => x.classList.remove('active'));
        swatch.classList.add('active');
      });
      leadColours.appendChild(swatch);
    });
  }

  function buildTasks() {
    tasks.forEach(task => {
      const option = document.createElement('option');
      option.value = task.id;
      option.textContent = task.name;
      taskSelect.appendChild(option);
    });
  }

  function currentTask() {
    return tasks.find(t => t.id === taskSelect.value) || null;
  }

  function loadTask() {
    const task = currentTask();
    wires = [];
    renderWires();
    setSelected(null);
    previewLayer.innerHTML = '';
    if (!task) {
      challengeText.textContent = 'Connect any two sockets. Any jack can connect to any other jack.';
      hintText.textContent = 'Drag from a socket to another socket, or click one and then the other.';
      statusPill.textContent = 'Free practice';
      setMessage('Free practice ready.');
      return;
    }
    challengeText.textContent = task.text;
    hintText.textContent = task.hint || '';
    statusPill.textContent = task.name;
    setMessage('Task loaded. Make the connections, then press Check.');
  }

  function checkTask() {
    const task = currentTask();
    if (!task) {
      setMessage(`${wires.length} lead(s) connected. Free practice does not grade the wiring.`, 'ok');
      return;
    }
    const expected = new Set(task.connections.map(([a,b]) => normalizePair(a,b)));
    const actual = new Set(wires.map(w => normalizePair(w.a,w.b)));
    const missing = [...expected].filter(p => !actual.has(p));
    const extras = [...actual].filter(p => !expected.has(p));
    const switchErrors = Object.entries(task.switches || {}).filter(([id,value]) => {
      const def = switchDefs.find(def => def.id === id);
      return !def || def.positions[switchPositions[id]] !== value;
    });

    if (missing.length === 0 && extras.length === 0 && switchErrors.length === 0) {
      setMessage('✓ Correct. Exact required patching.', 'ok');
    } else if (missing.length === 0 && extras.length === 0 && switchErrors.length) {
      setMessage(`Wires correct; check switch setting(s): ${switchErrors.map(([id,value]) => `${id.toUpperCase()} → ${value}`).join(', ')}.`, 'bad');
    } else if (missing.length === 0) {
      setMessage(`Required connections are correct, but ${extras.length} extra lead(s) are present.`, 'bad');
    } else {
      setMessage(`${missing.length} required connection(s) still missing.`, 'bad');
    }
  }

  wrap.addEventListener('pointermove', (e) => {
    if (!pointerDownSocket || !pointerMoved) return;
    drawPreview(boardPointFromClient(e.clientX, e.clientY));
  });

  wrap.addEventListener('pointerup', (e) => {
    if (!pointerDownSocket) return;
    const origin = pointerDownSocket;
    const target = nearestSocket(e.clientX, e.clientY, 34);
    pointerDownSocket = null;
    if (pointerMoved && target && target !== origin) connectSockets(origin, target);
    else previewLayer.innerHTML = '';
  });

  document.getElementById('checkBtn').addEventListener('click', checkTask);
  document.getElementById('clearBtn').addEventListener('click', () => {
    wires = [];
    renderWires();
    setSelected(null);
    previewLayer.innerHTML = '';
    setMessage('All patch leads removed.');
  });
  document.getElementById('undoBtn').addEventListener('click', () => {
    if (!wires.length) return setMessage('Nothing to undo.');
    wires.pop();
    renderWires();
    setMessage('Last patch lead removed.');
  });
  document.getElementById('socketBtn').addEventListener('click', (e) => {
    showSockets = !showSockets;
    socketLayer.classList.toggle('socket-map-visible', showSockets);
    e.currentTarget.setAttribute('aria-pressed', String(showSockets));
    e.currentTarget.textContent = showSockets ? 'Hide sockets' : 'Show sockets';
    setMessage(showSockets ? `${sockets.length} mapped sockets shown.` : 'Socket markers hidden.');
  });
  taskSelect.addEventListener('change', loadTask);
  window.addEventListener('resize', () => { previewLayer.innerHTML = ''; });

  buildPalette();
  buildSockets();
  buildSwitches();
  buildTasks();
  renderWires();
  loadTask();
})();
