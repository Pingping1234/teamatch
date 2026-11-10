const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyq5kvm7mIodHts0ImwrT89bxX3QIBVgbh8vL0Iti57IRLKf2Ocvr7Cm_FdXAu3SNcjYg/exec';

let userData = {
  name: '',
  email: ''
};

let currentQuestion = 0;
let teaAnswers = Array(16).fill(null);
let isBgmPlaying = false;

function toggleBGM() {
  const audio = document.getElementById('bgmAudio');
  const btn = document.getElementById('bgmToggleBtn');
  const icon = document.getElementById('bgmIcon');

  if (!audio) return;

  if (isBgmPlaying) {
    audio.pause();
    isBgmPlaying = false;
    if (btn) btn.classList.add('muted');
    if (icon) icon.textContent = '🔇';
  } else {
    audio.volume = 0.25; // ปรับระดับความดัง 25% ให้คลอเบาๆ
    audio.play().then(() => {
      isBgmPlaying = true;
      if (btn) btn.classList.remove('muted');
      if (icon) icon.textContent = '🎵';
    }).catch(err => {
      console.log('Autoplay prevented by browser:', err);
    });
  }
}

// 🟢 2. ระบบสลับหน้าจอ (Navigation)
function showScreen(screenId) {
  const nextScreen = document.getElementById(screenId);
  if (!nextScreen) return;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  nextScreen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 🟢 3. บันทึกชื่อ-อีเมล
function saveUserInfo(event) {
  if (event) event.preventDefault();
  
  const nameInput = document.getElementById('userName').value.trim();
  const emailInput = document.getElementById('userEmail').value.trim();

  if (!nameInput || !emailInput) {
    alert('กรุณากรอกชื่อและอีเมลให้ครบถ้วน');
    return false;
  }

  userData.name = nameInput;
  userData.email = emailInput;

  showScreen('intro');
  return false;
}

// 🟢 4. ฟังก์ชันเริ่มทำควิซ (แก้ไขปัญหาเริ่มควิซไม่ได้ + เปิดเพลง BGM อัตโนมัติ)
function startQuiz() {
  if (!isBgmPlaying) {
    toggleBGM();
  }
  currentQuestion = 0;
  teaAnswers.fill(null);
  renderQuestion();
  showScreen('quiz');
}

// 🟢 5. ชุดคำถามและตัวเลือกคำตอบ 16 ข้อ
const teaQuestions = [
  {
    category: 'PERSONALITY · 01',
    question: 'หลังจากวันที่เหนื่อยมาก ๆ คุณอยากใช้เวลาที่เหลือแบบไหน?',
    options: ['อยู่เงียบ ๆ คนเดียว', 'คุยกับเพื่อน', 'ทำงานอดิเรก', 'ออกไปข้างนอกหรือทำกิจกรรม']
  },
  {
    category: 'PERSONALITY · 02',
    question: 'เมื่อเจอปัญหายาก ๆ คุณมักรับมืออย่างไร?',
    options: ['คิดทบทวนเงียบ ๆ', 'ขอคำแนะนำจากคนอื่น', 'วางแผนเป็นขั้นตอน', 'ลงมือแก้ปัญหาทันที']
  },
  {
    category: 'PERSONALITY · 03',
    question: 'วันหยุดในอุดมคติของคุณเป็นแบบไหน?',
    options: ['อยู่บ้านพักผ่อน', 'ออกไปเที่ยวกับเพื่อน', 'สำรวจสถานที่ใหม่', 'ทำโปรเจกต์ส่วนตัว']
  },
  {
    category: 'PERSONALITY · 04',
    question: 'ข้อไหนอธิบายตัวคุณได้ดีที่สุด?',
    options: ['ใจเย็นและชอบคิดทบทวน', 'เป็นมิตรและแสดงออกเก่ง', 'อยากรู้อยากเห็นและชอบผจญภัย', 'มีระเบียบและรับผิดชอบ']
  },
  {
    category: 'PERSONALITY · 05',
    question: 'เมื่อมี Deadline คุณมักทำอย่างไร?',
    options: ['เริ่มลงมือทำทันทีตั้งแต่เนิ่น ๆ', 'วางแผนและค่อย ๆ ทำตามตารางที่จัดไว้', 'รอนึกไอเดียออก แล้วค่อยเร่งทำใกล้ถึงกำหนด', 'คิดหาวิธีแก้ปัญหาอย่างสร้างสรรค์']
  },
  {
    category: 'PERSONALITY · 06',
    question: 'ถ้ามีคนชวนไปสถานที่ใหม่แบบกะทันหัน คุณจะ...',
    options: ['ขอเวลาคิดก่อน', 'สนใจและอยากลองทันที', 'อยากรู้ก่อนว่าใครไปบ้าง', 'ถามรายละเอียดแผนก่อน']
  },
  {
    category: 'LIFESTYLE · 01',
    question: 'โดยปกติคุณนอนประมาณกี่ชั่วโมง?',
    options: ['น้อยกว่า 6 ชั่วโมง', '6–7 ชั่วโมง', '7–9 ชั่วโมง', 'มากกว่า 9 ชั่วโมง']
  },
  {
    category: 'LIFESTYLE · 02',
    question: 'ตารางเวลานอนของคุณสม่ำเสมอแค่ไหน?',
    options: ['สม่ำเสมอมาก', 'ค่อนข้างสม่ำเสมอ', 'เปลี่ยนไปตามแต่ละวัน', 'ไม่ค่อยแน่นอน']
  },
  {
    category: 'LIFESTYLE · 03',
    question: 'คุณออกกำลังกายบ่อยแค่ไหน?',
    options: ['ไม่ค่อยออกกำลังกาย', '1–2 ครั้งต่อสัปดาห์', '3–4 ครั้งต่อสัปดาห์', '5 ครั้งขึ้นไปต่อสัปดาห์']
  },
  {
    category: 'LIFESTYLE · 04',
    question: 'คุณรู้สึกว่าความเครียดในแต่ละวันเป็นอย่างไร?',
    options: ['โดยทั่วไปเครียดน้อย', 'เครียดเป็นบางครั้ง', 'เครียดค่อนข้างบ่อย', 'เครียดมาก']
  },
  {
    category: 'LIFESTYLE · 05',
    question: 'วันปกติของคุณมีลักษณะอย่างไร?',
    options: ['ยุ่งและมีสิ่งที่ต้องทำตลอด', 'เป็นระเบียบเรียบร้อย ทำตามแผน', 'ยืดหยุ่นและเปลี่ยนแปลงตลอด', 'ดำเนินไปอย่างช้า ๆ และผ่อนคลาย']
  },
  {
    category: 'TEA PREFERENCE · 01',
    question: 'รสชาติแบบไหนฟังดูน่าลองที่สุด?',
    options: ['กลมกล่อมและหอมอ่อน ๆ', 'สดชื่นและเปรี้ยวเล็กน้อย', 'อุ่นและมีรสเผ็ดจากเครื่องเทศ', 'สดชื่นและมีกลิ่นสมุนไพร']
  },
  {
    category: 'TEA PREFERENCE · 02',
    question: 'คุณมักจะดื่มชาสมุนไพรช่วงไหน?',
    options: ['ช่วงเย็นที่เงียบสงบ', 'ระหว่างวัน', 'ในวันที่มีกิจกรรมเยอะ', 'ระหว่างเรียนหรือทำงาน']
  },
  {
    category: 'TEA PREFERENCE · 03',
    question: 'คุณเปิดรับอาหารและเครื่องดื่มใหม่ ๆ มากแค่ไหน?',
    options: ['ชอบลองสิ่งใหม่มาก', 'ลองของใหม่เป็นบางครั้ง', 'มักเลือกสิ่งที่คุ้นเคย', 'ชอบสิ่งที่คุ้นเคยเป็นพิเศษ']
  },
  {
    category: 'TEA PREFERENCE · 04',
    question: 'เครื่องดื่มแบบไหนดึงดูดคุณมากที่สุด?',
    options: ['รสนุ่มนวล ดื่มง่าย', 'รสอมเปรี้ยวอมหวาน จิบแล้วสดชื่น', 'รสเข้มและให้ความรู้สึกอบอุ่น', 'สีสันสวยงามและแปลกใหม่']
  },
  {
    category: 'TEA PREFERENCE · 05',
    question: 'การมี Routine ที่ดีสำคัญกับคุณแค่ไหน?',
    options: ['สำคัญมาก', 'สำคัญอยู่บ้าง', 'ชอบความยืดหยุ่นมากกว่า', 'ส่วนใหญ่ทำตามความรู้สึกของตัวเอง']
  }
];

const personalityInfo = {
  Restorer: {
    name: 'The Restorer',
    imageUrl: 'https://lh3.googleusercontent.com/d/18MP4SeIaDUyoPzEdzMAijG_Q9ZOEBxkc',
    description: 'คุณให้ความสำคัญกับการพักใจและการกลับมาเชื่อมโยงกับตัวเอง'
  },
  Balanced: {
    name: 'The Balanced',
    imageUrl: 'https://lh3.googleusercontent.com/d/1QZSGdS00tuTcKB91_gOjtdBsmDlzBBtQ',
    description: 'คุณมองหาความสมดุลและจังหวะชีวิตที่พอดีกับตัวเอง'
  },
  Explorer: {
    name: 'The Explorer',
    imageUrl: 'https://lh3.googleusercontent.com/d/1zSD6Le-yIq-2fDHs6ZoAvJU7FKyH0akp',
    description: 'คุณเปิดรับประสบการณ์ใหม่ ๆ และสนุกกับการค้นพบสิ่งรอบตัว'
  },
  GoGetter: {
    name: 'The Go-Getter',
    imageUrl: 'https://lh3.googleusercontent.com/d/1KbdCYVWnLo-qZtN-02SuiU9wTboeTR73',
    description: 'คุณมีพลังในการลงมือทำและพร้อมเดินหน้าไปสู่เป้าหมาย'
  },
  Vibrant: {
    name: 'The Vibrant',
    imageUrl: 'https://lh3.googleusercontent.com/d/1TkmSqNLpLNcUAel8PlC-jVu9h22fdFuq',
    description: 'คุณมีสีสันและให้ความสำคัญกับความสัมพันธ์และประสบการณ์ร่วมกัน'
  },
  Creative: {
    name: 'The Creative',
    imageUrl: 'https://lh3.googleusercontent.com/d/1j68Y6k6spe3h2OkVlw04K2eEzPcmsEzB',
    description: 'คุณชอบจินตนาการ ทดลอง และมองเห็นความเป็นไปได้ใหม่ ๆ'
  },
  Gentle: {
    name: 'The Gentle',
    imageUrl: 'https://lh3.googleusercontent.com/d/1uISqGahCBvG9pjNq1X2nxcjKzLGGpY2J',
    description: 'คุณให้คุณค่ากับความอ่อนโยนและการใช้ชีวิตอย่างไม่กดดันตัวเอง'
  },
  Grounded: {
    name: 'The Grounded',
    imageUrl: 'https://lh3.googleusercontent.com/d/1t6HFNt-unTHFTIx9wi3aizt5dloexcdQ',
    description: 'คุณชอบความมั่นคง มีแบบแผน และรู้สึกดีกับการเตรียมตัวให้พร้อม'
  }
};

const personalityKeys = ['Restorer', 'Balanced', 'Explorer', 'GoGetter', 'Vibrant', 'Creative', 'Gentle', 'Grounded'];
const tieBreakOrder = ['GoGetter', 'Creative', 'Vibrant', 'Explorer', 'Grounded', 'Restorer', 'Balanced', 'Gentle'];

const personalityBonus = [
  [{ Restorer: 2, Gentle: 1 }, { Vibrant: 2, Balanced: 1 }, { Creative: 2, Restorer: 1 }, { Explorer: 2, GoGetter: 1 }],
  [{ Restorer: 2, Grounded: 1 }, { Vibrant: 2, Gentle: 1 }, { Grounded: 2, Balanced: 1 }, { GoGetter: 2, Explorer: 1 }],
  [{ Restorer: 2, Gentle: 1 }, { Vibrant: 2, Explorer: 1 }, { Explorer: 2, Creative: 1 }, { Creative: 2, GoGetter: 1 }],
  [{ Gentle: 2, Restorer: 1 }, { Vibrant: 2, Balanced: 1 }, { Explorer: 2, Creative: 1 }, { Grounded: 2, GoGetter: 1 }],
  [{ Grounded: 2, GoGetter: 1 }, { Balanced: 2, Grounded: 1 }, { GoGetter: 2, Explorer: 1 }, { Creative: 2, GoGetter: 1 }],
  [{ Restorer: 2, Gentle: 1 }, { Explorer: 2, Creative: 1 }, { Vibrant: 2, Gentle: 1 }, { Grounded: 2, Balanced: 1 }],
  [{ GoGetter: 2, Explorer: 1 }, { Balanced: 2, GoGetter: 1 }, { Gentle: 2, Balanced: 1 }, { Restorer: 2, Gentle: 1 }],
  [{ Grounded: 2, Balanced: 1 }, { Balanced: 2, Grounded: 1 }, { Explorer: 1, Vibrant: 1 }, { Creative: 2, Explorer: 1 }],
  [{ Gentle: 2, Restorer: 1 }, { Balanced: 2, Gentle: 1 }, { Balanced: 2, GoGetter: 1 }, { GoGetter: 2, Explorer: 2 }],
  [{ Gentle: 2, Balanced: 1 }, { Balanced: 2, Gentle: 1 }, { Restorer: 2, Balanced: 1 }, { Restorer: 2, Grounded: 1 }],
  [{ GoGetter: 2, Vibrant: 1 }, { Grounded: 2, Balanced: 1 }, { Explorer: 2, Creative: 1 }, { Gentle: 2, Restorer: 1 }],
  [{ Gentle: 2, Restorer: 1 }, { Vibrant: 2, Explorer: 1 }, { GoGetter: 2, Grounded: 1 }, { Explorer: 2, Creative: 1 }],
  [{ Restorer: 2, Gentle: 1 }, { Balanced: 2, Vibrant: 1 }, { Explorer: 2, GoGetter: 1 }, { Grounded: 2, GoGetter: 1 }],
  [{ Creative: 2, Explorer: 2 }, { Vibrant: 1, Balanced: 1 }, { Balanced: 1, Grounded: 1 }, { Grounded: 2, Gentle: 1 }],
  [{ Gentle: 2, Restorer: 1 }, { Vibrant: 2, Explorer: 1 }, { GoGetter: 2, Grounded: 1 }, { Creative: 2, Explorer: 1 }],
  [{ Grounded: 2, Balanced: 2 }, { Balanced: 2, Grounded: 1 }, { Explorer: 2, Vibrant: 1 }, { Creative: 2, Explorer: 1 }]
];

const teaHerbMap = {
  Restorer: 'ชาใบเตยกับใบบัวบก',
  Balanced: 'ชาใบบัวบกกับอัญชัน',
  Explorer: 'ชาตะไคร้กับขิง',
  GoGetter: 'ชาขิงกับขมิ้นชัน',
  Vibrant: 'ชากระเจี๊ยบแดงกับใบเตย',
  Creative: 'ชาอัญชันกับใบเตย',
  Gentle: 'ชาเก๊กฮวยกับใบเตย',
  Grounded: 'ชาขมิ้นชันกับขิงและตะไคร้'
};

// 🟢 6. แสดงผลคำถามในหน้าควิซ
function renderQuestion() {
  const q = teaQuestions[currentQuestion];
  const selected = teaAnswers[currentQuestion];

  document.getElementById('questionCounter').textContent = `คำถามที่ ${currentQuestion + 1} / ${teaQuestions.length}`;
  const percent = Math.round(((currentQuestion + 1) / teaQuestions.length) * 100);

  document.getElementById('progressPercent').textContent = `${percent}%`;
  document.getElementById('progressFill').style.width = `${percent}%`;
  document.getElementById('progressTrack').setAttribute('aria-valuenow', currentQuestion + 1);

  document.getElementById('questionCategory').textContent = q.category;
  document.getElementById('questionText').textContent = q.question;

  const optionsContainer = document.getElementById('answerOptions');
  optionsContainer.replaceChildren();

  q.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `answer-option ${selected === index ? 'selected' : ''}`;
    
    const letter = document.createElement('span');
    letter.className = 'option-letter';
    letter.textContent = String.fromCharCode(65 + index);

    const label = document.createElement('span');
    label.className = 'option-label';
    label.textContent = option;

    const check = document.createElement('span');
    check.className = 'option-check';
    check.textContent = selected === index ? '✓' : '';

    button.append(letter, label, check);
    button.addEventListener('click', () => {
      teaAnswers[currentQuestion] = index;
      renderQuestion();
    });

    optionsContainer.appendChild(button);
  });

  document.getElementById('backButton').disabled = currentQuestion === 0;
  const nextButton = document.getElementById('nextButton');
  nextButton.disabled = selected === null;
  nextButton.textContent = currentQuestion === teaQuestions.length - 1 ? 'ตรวจคำตอบ →' : 'ถัดไป →';
}

function nextQuestion() {
  if (teaAnswers[currentQuestion] === null) return;
  if (currentQuestion < teaQuestions.length - 1) {
    currentQuestion++;
    renderQuestion();
    return;
  }
  renderReview();
  showScreen('review');
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  } else {
    showScreen('user-info');
  }
}

// 🟢 7. หน้าตรวจคำตอบ
function renderReview() {
  const list = document.getElementById('reviewList');
  list.replaceChildren();

  teaQuestions.forEach((q, index) => {
    const item = document.createElement('div');
    item.className = 'review-item';

    const heading = document.createElement('div');
    heading.className = 'review-question';
    heading.textContent = `ข้อ ${index + 1}. ${q.question}`;

    const answer = document.createElement('div');
    answer.className = 'review-answer';
    answer.textContent = q.options[teaAnswers[index]];

    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'review-edit';
    edit.textContent = 'แก้ไข';
    edit.addEventListener('click', () => {
      currentQuestion = index;
      renderQuestion();
      showScreen('quiz');
    });

    item.append(heading, answer, edit);
    list.appendChild(item);
  });
}

function editLastAnswer() {
  currentQuestion = teaQuestions.length - 1;
  renderQuestion();
  showScreen('quiz');
}

// 🟢 8. คำนวณคะแนนและบันทึกลง Google Sheets
function calculateTeaMatch(userAnswers) {
  const scores = {
    Restorer: 16,
    Balanced: 16,
    Explorer: 16,
    GoGetter: 16,
    Vibrant: 16,
    Creative: 16,
    Gentle: 16,
    Grounded: 16
  };

  userAnswers.forEach((ansIndex, qIndex) => {
    const bonusObj = personalityBonus[qIndex]?.[ansIndex];
    if (bonusObj) {
      for (const [pKey, pts] of Object.entries(bonusObj)) {
        if (scores[pKey] !== undefined) {
          scores[pKey] += pts;
        }
      }
    }
  });

  let highestPersonality = tieBreakOrder[0];
  let maxScore = -1;

  for (const pKey of tieBreakOrder) {
    if (scores[pKey] > maxScore) {
      maxScore = scores[pKey];
      highestPersonality = pKey;
    }
  }

  const selectedHerb = teaHerbMap[highestPersonality] || '';

  return {
    scores: scores,
    resultKey: highestPersonality,
    personality: personalityInfo[highestPersonality],
    herbPreference: selectedHerb
  };
}

async function finishReview() {
  try {
    const result = calculateTeaMatch(teaAnswers);

    const resultImgElem = document.getElementById('resultImage');
    if (resultImgElem && result.personality.imageUrl) {
      resultImgElem.src = result.personality.imageUrl;
    }

    const statusElem = document.getElementById('resultStatus');
    if (statusElem) statusElem.textContent = 'กำลังบันทึกผลของคุณ...';

    showScreen('result');

    setTimeout(() => {
      showAssessmentPopup();
    }, 11000);

    // ส่งข้อมูลลง Google Sheets
    await saveCurrentTeaMatchResult(result);
    if (statusElem) {
      statusElem.textContent = 'บันทึกผลของคุณเรียบร้อยแล้ว 🍵';
    }
  } catch (error) {
    console.error('TeaMatch error:', error);
  }
}

async function saveCurrentTeaMatchResult(result) {
  const payloadData = {
    participant_name: userData.name,
    participant_email: userData.email,
    ...teaAnswers.reduce((acc, ansIdx, i) => {
      const qKey = `q${String(i + 1).padStart(2, '0')}`;
      acc[qKey] = String.fromCharCode(65 + ansIdx);
      return acc;
    }, {}),
    score_restorer: result.scores.Restorer,
    score_balanced: result.scores.Balanced,
    score_explorer: result.scores.Explorer,
    score_go_getter: result.scores.GoGetter,
    score_vibrant: result.scores.Vibrant,
    score_creative: result.scores.Creative,
    score_gentle: result.scores.Gentle,
    score_grounded: result.scores.Grounded,
    personality_result: result.personality.name,
    herb_preference: result.herbPreference
  };

  if (GAS_WEB_APP_URL) {
    await fetch(GAS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payloadData)
    });
  }
}

// 🟢 9. ฟังก์ชันแชร์ และ Popup
async function shareToInstagram() {
  const imgElement = document.getElementById('resultImage');
  if (!imgElement || !imgElement.src) {
    alert('ไม่พบรูปภาพผลลัพธ์');
    return;
  }

  try {
    const response = await fetch(imgElement.src);
    const blob = await response.blob();
    const file = new File([blob], 'TeaMatch-Result.jpg', { type: 'image/jpeg' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'TeaMatch Result',
        text: 'ค้นพบชาที่ใช่สำหรับคุณกับ TeaMatch 🍵✨'
      });
    } else {
      const link = document.createElement('a');
      link.href = imgElement.src;
      link.download = 'TeaMatch-Result.jpg';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      link.remove();
      alert('บันทึกรูปภาพเรียบร้อยแล้ว! สามารถนำรูปนี้ไปอัปโหลดแชร์ใน Instagram Story ได้เลยครับ 📸');
    }
  } catch (err) {
    console.error('Share error:', err);
    window.open(imgElement.src, '_blank');
  }
}

function showAssessmentPopup() {
  const popup = document.getElementById('assessmentPopup');
  if (popup) popup.style.display = 'flex';
}

function goToRequiredAssessment() {
  const popup = document.getElementById('assessmentPopup');
  if (popup) popup.style.display = 'none';
  showScreen('feedback');
}
