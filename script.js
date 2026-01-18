const sceneEl = document.getElementById("scene");
const backgroundEl = document.getElementById("scene-background");
const eyebrowEl = document.getElementById("scene-eyebrow");
const titleEl = document.getElementById("scene-title");
const subtitleEl = document.getElementById("scene-subtitle");
const dialogueEl = document.getElementById("dialogue");
const actionsEl = document.getElementById("actions");
const footerEl = document.getElementById("scene-footer");
const characterEl = document.getElementById("character");
const elevatorEl = document.getElementById("elevator");
const resetBtn = document.getElementById("reset");

const statsEl = {
  knowledge: document.getElementById("stat-knowledge"),
  skill: document.getElementById("stat-skill"),
  stamina: document.getElementById("stat-stamina"),
  hp: document.getElementById("stat-hp"),
  km: document.getElementById("stat-km"),
};

const defaultState = {
  sceneIndex: 0,
  dialogueIndex: 0,
  actionCount: 0,
  stats: {
    knowledge: 0,
    skill: 0,
    stamina: 0,
    hp: 0,
    km: 0,
  },
};

const scenes = [
  {
    id: "intro",
    eyebrow: "MAP Cơ sở 2 UTH",
    title: "Tu Tiên Sân Trường",
    subtitle: "Hãy biến 'Tân Sinh Viên' từ 'dân' thành 'Tiên Sinh'.",
    background:
      "linear-gradient(135deg, rgba(15, 15, 32, 0.85), rgba(5, 6, 12, 0.95)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=60') center/cover",
    dialogue: [
      {
        speaker: "VJ",
        text: "Chào mừng bạn đến với Map Cơ sở 2 UTH. Hành trình tu tiên bắt đầu!",
      },
    ],
    actions: [
      {
        label: "PLAY",
        variant: "primary",
        nextScene: 1,
      },
      {
        label: "Tiếp tục",
        variant: "secondary",
        continue: true,
      },
    ],
    footer: "Bạn có thể chơi lại hoặc tiếp tục hành trình đã lưu.",
  },
  {
    id: "location",
    eyebrow: "Địa chỉ",
    title: "Cổng trường & Khuôn viên",
    subtitle: "Location unlocked: 10 – đường 12 – An Khánh – TP.HCM.",
    background:
      "linear-gradient(135deg, rgba(9, 12, 32, 0.8), rgba(10, 12, 22, 0.9)), url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=60') center/cover",
    dialogue: [
      {
        speaker: "VJ",
        text: "Bạn đã vào CS2 UTH. Map này dành cho hệ Khoa học Hàng hải nha!",
      },
      {
        speaker: "SV",
        text: "Em cảm nhận được năng lượng tu tiên đang thức tỉnh...",
      },
    ],
    actions: [
      {
        label: "Mở khóa điểm đến tiếp theo",
        variant: "primary",
        nextScene: 2,
      },
    ],
    footer: "Mở khóa điểm đến tiếp theo.",
  },
  {
    id: "classroom",
    eyebrow: "LEVEL 1",
    title: "Lớp học",
    subtitle: "Combo cơ bản: nghe giảng – ghi bài – làm bài.",
    background:
      "linear-gradient(135deg, rgba(20, 26, 45, 0.85), rgba(10, 12, 22, 0.92)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=60') center/cover",
    dialogue: [
      {
        speaker: "VJ",
        text: "LEVEL 1 Lớp học, combo cơ bản nè: nghe giảng – ghi bài – làm bài…",
      },
      {
        speaker: "SV",
        text: "Em đã sẵn sàng hấp thụ tri thức!",
      },
    ],
    actionEffect: { stat: "knowledge", amount: 10, label: "+10 Kiến Thức", times: 3 },
    actions: [
      {
        label: "Nghe giảng / Ghi bài / Làm bài",
        variant: "primary",
      },
      {
        label: "Đi tiếp",
        variant: "secondary",
        nextScene: 3,
      },
    ],
  },
  {
    id: "lab",
    eyebrow: "LEVEL 2",
    title: "Phòng Lap (N201)",
    subtitle: "Hệ thống phòng thực hành & lab xịn sò để vượt ải THCB, TADV.",
    background:
      "linear-gradient(135deg, rgba(24, 30, 52, 0.85), rgba(10, 12, 22, 0.92)), url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1600&q=60') center/cover",
    dialogue: [
      {
        speaker: "VJ",
        text: "LEVEL 2 Phòng lap, phòng thực hành cực kì xịn sò!",
      },
      {
        speaker: "SV",
        text: "Em sẽ ngồi ngoài cửa và cày lap ngay!",
      },
    ],
    actionEffect: { stat: "skill", amount: 10, label: "+10 Kỹ Năng", times: 3 },
    actions: [
      {
        label: "Thực hành trên lap",
        variant: "primary",
      },
      {
        label: "Đi tiếp",
        variant: "secondary",
        nextScene: 4,
      },
    ],
  },
  {
    id: "gym",
    eyebrow: "LEVEL 3",
    title: "GYM",
    subtitle: "Muốn gánh deadline thì phải có thể lực nha.",
    background:
      "linear-gradient(135deg, rgba(20, 32, 42, 0.85), rgba(10, 12, 22, 0.92)), url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=60') center/cover",
    dialogue: [
      {
        speaker: "VJ",
        text: "LEVEL 3 Phòng GYM, muốn gánh deadline thì phải có thể lực nha.",
      },
      {
        speaker: "SV",
        text: "Tầm này thì deadline nào cũng gánh nổi!",
      },
    ],
    actionEffect: { stat: "stamina", amount: 10, label: "+10 Thể Lực", times: 3 },
    actions: [
      {
        label: "Tập thử máy",
        variant: "primary",
      },
      {
        label: "Đi tiếp",
        variant: "secondary",
        nextScene: 5,
      },
    ],
  },
  {
    id: "canteen",
    eyebrow: "LEVEL 4",
    title: "Căn tin",
    subtitle: "Cày ải xong rồi vào đây hồi năng lượng nhé.",
    background:
      "linear-gradient(135deg, rgba(28, 30, 42, 0.85), rgba(10, 12, 22, 0.92)), url('https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=1600&q=60') center/cover",
    dialogue: [
      {
        speaker: "VJ",
        text: "LEVEL 4 CĂN TIN, cày ải xong rồi vào đây hồi năng lượng nhá.",
      },
      {
        speaker: "SV",
        text: "Em sẽ uống nước và ăn bánh ngay!",
      },
    ],
    actionEffect: { stat: "hp", amount: 1, label: "+1 HP", times: 3 },
    actions: [
      {
        label: "Ăn bánh / Uống nước",
        variant: "primary",
      },
      {
        label: "Đi tiếp",
        variant: "secondary",
        nextScene: 6,
      },
    ],
  },
  {
    id: "dorm",
    eyebrow: "Giảng đường & KTX",
    title: "Hành lang lầu 5",
    subtitle: "KTX ngay bên trong trường, siêu tiện nghi luôn!",
    background:
      "linear-gradient(135deg, rgba(18, 24, 42, 0.88), rgba(10, 12, 22, 0.92)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=60') center/cover",
    dialogue: [
      {
        speaker: "VJ",
        text: "Ở cơ sở 2 còn có KTX ngay bên trong trường đó, siêu siêu tiện nghi luôn nha.",
      },
      {
        speaker: "SV",
        text: "Chạy deadline mà tiết kiệm KM thế này thì quá tuyệt!",
      },
    ],
    actionEffect: { stat: "km", amount: -10, label: "-10 KM", times: 3, urgent: true },
    actions: [
      {
        label: "Xem quảng cáo 10s",
        variant: "primary",
        timer: 10,
      },
      {
        label: "Đi tiếp",
        variant: "secondary",
        nextScene: 7,
      },
    ],
  },
  {
    id: "elevator",
    eyebrow: "Thang máy",
    title: "Cày chay vượt cấp nhanh",
    subtitle: "Sử dụng thang máy để tua nhanh lên tầng cao nhất.",
    background:
      "linear-gradient(135deg, rgba(12, 16, 30, 0.88), rgba(10, 12, 22, 0.92)), url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=60') center/cover",
    dialogue: [
      {
        speaker: "VJ",
        text: "Mẹo dành cho sinh viên không muốn cày chay vượt cấp nhanh: dùng Thang máy.",
      },
      {
        speaker: "SV",
        text: "Em bấm nút đây, hi vọng tua nhanh thần tốc!",
      },
    ],
    actions: [
      {
        label: "Bấm nút thang máy",
        variant: "primary",
        elevator: true,
        nextScene: 8,
      },
    ],
  },
  {
    id: "library",
    eyebrow: "Thư viện",
    title: "Kho báu tri thức",
    subtitle: "Thư viện - nơi kích hoạt sức mạnh tiềm ẩn.",
    background:
      "linear-gradient(135deg, rgba(14, 18, 36, 0.88), rgba(10, 12, 22, 0.92)), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=60') center/cover",
    dialogue: [
      {
        speaker: "VJ",
        text: "Để hỗ trợ bạn kích hoạt sức mạnh tiềm ẩn, mình xin tặng bạn một kho báu.",
      },
      {
        speaker: "VJ",
        text: "Và đó là kho báu tri thức ở thư viện đó hehehe.",
      },
      {
        speaker: "SV",
        text: "Em sẽ nghiền ngẫm hết chồng sách này!",
      },
    ],
    actionEffect: { stat: "knowledge", amount: 100, label: "+100 Kiến Thức", times: 3 },
    actions: [
      {
        label: "Đọc sách",
        variant: "primary",
      },
      {
        label: "Đi tiếp",
        variant: "secondary",
        nextScene: 9,
      },
    ],
  },
  {
    id: "outro",
    eyebrow: "OUTRO",
    title: "Tu luyện thành công",
    subtitle: "Tổng kết hành trình Map Cơ sở 2 UTH.",
    background:
      "linear-gradient(135deg, rgba(8, 12, 24, 0.9), rgba(5, 6, 12, 0.95)), url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=60') center/cover",
    dialogue: [
      {
        speaker: "VJ",
        text: "Và đó là toàn bộ phần hướng dẫn chinh phục Map Cơ sở 2 UTH.",
      },
      {
        speaker: "VJ",
        text: "Chúc các bạn sinh viên cơ sở 2 sớm tu luyện thành công nha.",
      },
    ],
    actions: [
      {
        label: "Chơi lại",
        variant: "primary",
        restart: true,
      },
    ],
  },
];

const storageKey = "uth-tutien-state";
let state = loadState();

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) {
    return structuredClone(defaultState);
  }
  try {
    const parsed = JSON.parse(saved);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      stats: {
        ...structuredClone(defaultState.stats),
        ...parsed.stats,
      },
    };
  } catch (error) {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function updateStatsUI() {
  Object.entries(state.stats).forEach(([key, value]) => {
    statsEl[key].textContent = value;
  });
}

function addFloatText(text) {
  const floatEl = document.createElement("div");
  floatEl.className = "float-text";
  floatEl.textContent = text;
  characterEl.appendChild(floatEl);
  floatEl.addEventListener("animationend", () => floatEl.remove());
}

function applyEffect(effect) {
  if (!effect) return;
  state.stats[effect.stat] += effect.amount;
  addFloatText(effect.label);
  updateStatsUI();
  saveState();
}

function setBackground(background) {
  backgroundEl.style.background = background;
}

function renderDialogue(scene) {
  dialogueEl.innerHTML = "";
  const line = scene.dialogue[state.dialogueIndex] || scene.dialogue[scene.dialogue.length - 1];
  const lineEl = document.createElement("p");
  lineEl.className = "dialogue__line";
  lineEl.innerHTML = `<span class="dialogue__speaker">${line.speaker}:</span>${line.text}`;
  dialogueEl.appendChild(lineEl);

  if (scene.dialogue.length > 1) {
    const hintEl = document.createElement("p");
    hintEl.className = "scene__footer";
    hintEl.textContent = "Click hộp thoại để chuyển sang lời thoại tiếp theo.";
    dialogueEl.appendChild(hintEl);
  }
}

function renderActions(scene) {
  actionsEl.innerHTML = "";
  scene.actions.forEach((action) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = action.label;
    if (action.variant === "secondary") {
      btn.classList.add("secondary");
    }
    btn.addEventListener("click", (event) => handleAction(scene, action, event));
    actionsEl.appendChild(btn);
  });
}

function renderFooter(scene) {
  if (scene.id === "outro") {
    const summary = `Tổng kết: Kiến Thức ${state.stats.knowledge} · Kỹ Năng ${state.stats.skill} · Thể Lực ${state.stats.stamina} · HP ${state.stats.hp} · KM ${state.stats.km}`;
    footerEl.textContent = summary;
    return;
  }
  footerEl.textContent = scene.footer || "";
}

function updateActionButtons(scene) {
  const nextButton = Array.from(actionsEl.querySelectorAll("button")).find((btn) => btn.textContent === "Đi tiếp");
  if (nextButton && scene.actionEffect) {
    nextButton.disabled = state.actionCount < scene.actionEffect.times;
  }
}

function showScene(index) {
  const scene = scenes[index];
  state.sceneIndex = index;
  state.dialogueIndex = 0;
  state.actionCount = 0;
  setBackground(scene.background);
  eyebrowEl.textContent = scene.eyebrow;
  titleEl.textContent = scene.title;
  subtitleEl.textContent = scene.subtitle || "";
  renderDialogue(scene);
  renderActions(scene);
  renderFooter(scene);
  updateActionButtons(scene);
  saveState();
}

function handleAction(scene, action, event) {
  if (action.restart) {
    state = structuredClone(defaultState);
    saveState();
    updateStatsUI();
    showScene(0);
    return;
  }

  if (action.continue) {
    const nextIndex = Math.min(state.sceneIndex, scenes.length - 1);
    showScene(nextIndex);
    return;
  }

  if (action.elevator) {
    elevatorEl.classList.add("active");
    setTimeout(() => {
      elevatorEl.classList.remove("active");
      showScene(action.nextScene);
    }, 1200);
    return;
  }

  if (action.timer) {
    let remaining = action.timer;
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = `Đang quảng cáo... ${remaining}s`;
    const interval = setInterval(() => {
      remaining -= 1;
      button.textContent = `Đang quảng cáo... ${remaining}s`;
      if (remaining <= 0) {
        clearInterval(interval);
        button.textContent = "Xem quảng cáo xong!";
        button.disabled = false;
        state.actionCount = 0;
        applyEffect(scene.actionEffect);
        state.actionCount = scene.actionEffect.times;
        updateActionButtons(scene);
      }
    }, 1000);
    return;
  }

  if (scene.actionEffect && !action.nextScene) {
    state.actionCount += 1;
    applyEffect(scene.actionEffect);
    if (scene.actionEffect.urgent) {
      footerEl.innerHTML = `<span class="fast-alert">Siêu gấp gáp! KM đang giảm nhanh...</span>`;
    }
    updateActionButtons(scene);
    saveState();
    return;
  }

  if (typeof action.nextScene === "number") {
    showScene(action.nextScene);
  }
}

sceneEl.addEventListener("click", (event) => {
  if (!event.target.closest(".dialogue")) return;
  const scene = scenes[state.sceneIndex];
  if (scene.dialogue.length <= 1) return;
  state.dialogueIndex = (state.dialogueIndex + 1) % scene.dialogue.length;
  renderDialogue(scene);
  saveState();
});

resetBtn.addEventListener("click", () => {
  state = structuredClone(defaultState);
  saveState();
  updateStatsUI();
  showScene(0);
});

updateStatsUI();
showScene(state.sceneIndex || 0);
