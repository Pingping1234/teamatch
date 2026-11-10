const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyq5kvm7mIodHts0ImwrT89bxX3QIBVgbh8vL0Iti57IRLKf2Ocvr7Cm_FdXAu3SNcjYg/exec';

let userData = {
  name: '',
  email: ''
};

// ป้องกันหน้าเว็บรีเฟรชตอนกดส่งชื่อ
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

const teaQuestions = [
  {
    category: 'PERSONALITY · 01',
    question: 'หลังจากวันที่เหนื่อยมาก ๆ คุณอยากใช้เวลาที่เหลือแบบไหน?',
    options: ['อยู่เงียบ ๆ คนเดียวในพื้นที่ส่วนตัว', 'คุยกับเพื่อน หาของอร่อยกินกัน', 'ทำกิจกรรมหรืองานอดิเรกที่ชอบ', 'ออกไปข้างนอก เปิดรับสิ่งใหม่ๆ']
  },
  {
    category: 'PERSONALITY · 02',
    question: 'เมื่อเจอปัญหายาก ๆ คุณมักรับมืออย่างไร?',
    options: ['ค่อย ๆ คิดทบทวนและตกผลึกกับตัวเอง', 'พูดคุยขอคำแนะนำจากคนรอบข้าง', 'วางแผนแก้ปัญหาเป็นขั้นตอนชัดเจน', 'ลงมือแก้ปัญหาทันที ปรับเปลี่ยนตามสถานการณ์']
  },
  {
    category: 'PERSONALITY · 03',
    question: 'วันหยุดในอุดมคติของคุณเป็นแบบไหน?',
    options: ['พักผ่อนอยู่บ้านชิล ๆ', 'นัดเจอเพื่อน เที่ยวทำกิจกรรม', 'ออกไปสำรวจสถานที่ใหม่ ๆ', 'ลองทำโปรเจกต์ใหม่ ๆ ที่สนใจ']
  },
  {
    category: 'PERSONALITY · 04',
    question: 'ข้อไหนอธิบายความเป็นคุณได้ดีที่สุด?',
    options: ['ใจเย็น นุ่มนวล สบาย ๆ', 'เป็นมิตร เข้ากับคนง่าย แสดงออกเก่ง', 'อยากรู้อยากเห็น ชอบความท้าทาย', 'มุ่งมั่น มีระเบียบและรับผิดชอบสูง']
  },
  {
    category: 'PERSONALITY · 05',
    question: 'เมื่อมี Deadline คุณมักทำอย่างไร?',
    options: ['เริ่มลงมือทำทันทีตั้งแต่เนิ่น ๆ', 'ทำตามตารางและกิจวัตรที่วางไว้', 'เร่งทำอย่างเต็มที่ใกล้กำหนด', 'คิดหาวิธีแก้ปัญหาอย่างสร้างสรรค์']
  },
  {
    category: 'PERSONALITY · 06',
    question: 'ถ้ามีคนชวนไปสถานที่ใหม่แบบกะทันหัน คุณจะ...',
    options: ['ขอเวลาคิดทบทวนก่อน', 'สนใจทันทีและพร้อมออกเดินทาง', 'ถามรายละเอียดว่ามีใครไปบ้าง', 'เช็กตารางเวลาและแผนงานก่อน']
  },
  {
    category: 'LIFESTYLE · 01',
    question: 'โดยปกติคุณนอนประมาณกี่ชั่วโมงต่อคืน?',
    options: ['น้อยกว่า 6 ชั่วโมง', '6–7 ชั่วโมง', '7–9 ชั่วโมง', 'มากกว่า 9 ชั่วโมง']
  },
  {
    category: 'LIFESTYLE · 02',
    question: 'ตารางการนอนของคุณสม่ำเสมอแค่ไหน?',
    options: ['สม่ำเสมอมาก เข้านอนและตื่นเวลาเดิม', 'ค่อนข้างสม่ำเสมอ ยืดหยุ่นเล็กน้อย', 'ไม่แน่นอน เปลี่ยนไปตามแต่ละวัน', 'เปลี่ยนแปลงตลอดเวลา']
  },
  {
    category: 'LIFESTYLE · 03',
    question: 'คุณออกกำลังกายบ่อยแค่ไหน?',
    options: ['ไม่ค่อยได้ออกกำลังกาย', '1–2 ครั้งต่อสัปดาห์', '3–4 ครั้งต่อสัปดาห์', '5 ครั้งขึ้นไปต่อสัปดาห์']
  },
  {
    category: 'LIFESTYLE · 04',
    question: 'คุณรู้สึกว่าความเครียดในชีวิตประจำวันเป็นอย่างไร?',
    options: ['เครียดน้อย ค่อนข้างผ่อนคลาย', 'เครียดปานกลาง แต่รับมือได้', 'เครียดค่อนข้างบ่อย มีเรื่องให้คิดตลอด', 'เครียดสูงมาก รู้สึกเหนื่อยล้า']
  },
  {
    category: 'LIFESTYLE · 05',
    question: 'วันปกติของคุณมีลักษณะอย่างไร?',
    options: ['ยุ่งและมีสิ่งที่ต้องทำตลอดเวลา', 'มีโครงสร้างและเป็นระเบียบเรียบร้อย', 'ยืดหยุ่น ปรับเปลี่ยนตามสถานการณ์', 'ดำเนินไปอย่างช้า ๆ และผ่อนคลาย']
  },
  {
    category: 'TEA PREFERENCE · 01',
    question: 'รสชาติชาแบบไหนที่คุณคิดว่าน่าลองที่สุด?',
    options: ['กลิ่นหอมอ่อน ๆ รสนุ่มนวล', 'สดชื่น อมเปรี้ยวอมหวาน', 'รสเข้มข้น อุ่น มีกลิ่นเครื่องเทศ', 'สดชื่น มีกลิ่นสมุนไพรแปลกใหม่']
  },
  {
    category: 'TEA PREFERENCE · 02',
    question: 'คุณมักจะชอบดื่มชาในช่วงเวลาไหนมากกว่ากัน?',
    options: ['ช่วงเย็นที่เงียบสงบ เพื่อผ่อนคลาย', 'ระหว่างวัน เพื่อเติมความสดชื่น', 'ในวันที่มีกิจกรรมแน่น เพื่อเพิ่มพลัง', 'ระหว่างเรียนหรือทำงาน เพื่อเพิ่มสมาธิ']
  },
  {
    category: 'TEA PREFERENCE · 03',
    question: 'คุณเปิดรับเครื่องดื่มรสชาติใหม่ ๆ มากแค่ไหน?',
    options: ['ชอบลองสิ่งใหม่ ๆ มาก ตื่นเต้นเสมอ', 'เปิดใจลอง ถ้าดูน่าสนใจ', 'ขอคิดดูก่อน ชอบรสชาติที่คุ้นเคยมากกว่า', 'เลือกเฉพาะรสชาติที่ชอบและคุ้นเคยเท่านั้น']
  },
  {
    category: 'TEA PREFERENCE · 04',
    question: 'เครื่องดื่มแบบไหนดึงดูดใจคุณมากที่สุด?',
    options: ['รสละมุน ดื่มง่าย สบายท้อง', 'รสอมเปรี้ยวอมหวาน จิบแล้วสดชื่น', 'รสเข้มข้น หอมกลิ่นเครื่องเทศ อุ่นสบาย', 'สีสันสวยแปลกตา มีเอกลักษณ์ไม่ซ้ำใคร']
  },
  {
    category: 'TEA PREFERENCE · 05',
    question: 'การมี Routine ที่ดีสำคัญต่อการใช้ชีวิตของคุณแค่ไหน?',
    options: ['สำคัญมาก ช่วยให้ชีวิตมีระเบียบ', 'สำคัญปานกลาง ปรับเปลี่ยนได้ตามความเหมาะสม', 'ไม่ค่อยสำคัญ ชอบความยืดหยุ่นมากกว่า', 'ทำตามอารมณ์และความรู้สึกในแต่ละวัน']
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

// 🟢 ตารางโบนัสคะแนนฉบับปรับสมดุลใหม่ (Balanced Matrix)
const personalityBonus = [
  // Q1
  [{ Restorer: 2, Gentle: 1 }, { Vibrant: 2, Balanced: 1 }, { Creative: 2, Restorer: 1 }, { Explorer: 2, GoGetter: 1 }],
  // Q2
  [{ Restorer: 2, Grounded: 1 }, { Vibrant: 2, Gentle: 1 }, { Grounded: 2, Balanced: 1 }, { GoGetter: 2, Explorer: 1 }],
  // Q3
  [{ Restorer: 2, Gentle: 1 }, { Vibrant: 2, Explorer: 1 }, { Explorer: 2, Creative: 1 }, { Creative: 2, GoGetter: 1 }],
  // Q4
  [{ Gentle: 2, Restorer: 1 }, { Vibrant: 2, Balanced: 1 }, { Explorer: 2, Creative: 1 }, { Grounded: 2, GoGetter: 1 }],
  // Q5
  [{ Grounded: 2, GoGetter: 1 }, { Balanced: 2, Grounded: 1 }, { GoGetter: 2, Explorer: 1 }, { Creative: 2, GoGetter: 1 }],
  // Q6
  [{ Restorer: 2, Gentle: 1 }, { Explorer: 2, Creative: 1 }, { Vibrant: 2, Gentle: 1 }, { Grounded: 2, Balanced: 1 }],
  // Q7
  [{ GoGetter: 2, Explorer: 1 }, { Balanced: 2, GoGetter: 1 }, { Gentle: 2, Balanced: 1 }, { Restorer: 2, Gentle: 1 }],
  // Q8
  [{ Grounded: 2, Balanced: 1 }, { Balanced: 2, Grounded: 1 }, { Explorer: 1, Vibrant: 1 }, { Creative: 2, Explorer: 1 }],
  // Q9
  [{ Gentle: 2, Restorer: 1 }, { Balanced: 2, Gentle: 1 }, { Balanced: 2, GoGetter: 1 }, { GoGetter: 2, Explorer: 2 }],
  // Q10
  [{ Gentle: 2, Balanced: 1 }, { Balanced: 2, Gentle: 1 }, { Restorer: 2, Balanced: 1 }, { Restorer: 2, Grounded: 1 }],
  // Q11
  [{ GoGetter: 2, Vibrant: 1 }, { Grounded: 2, Balanced: 1 }, { Explorer: 2, Creative: 1 }, { Gentle: 2, Restorer: 1 }],
  // Q12
  [{ Gentle: 2, Restorer: 1 }, { Vibrant: 2, Explorer: 1 }, { GoGetter: 2, Grounded: 1 }, { Explorer: 2, Creative: 1 }],
  // Q13
  [{ Restorer: 2, Gentle: 1 }, { Balanced: 2, Vibrant: 1 }, { Explorer: 2, GoGetter: 1 }, { Grounded: 2, GoGetter: 1 }],
  // Q14
  [{ Creative: 2, Explorer: 2 }, { Vibrant: 1, Balanced: 1 }, { Balanced: 1, Grounded: 1 }, { Grounded: 2, Gentle: 1 }],
  // Q15
  [{ Gentle: 2, Restorer: 1 }, { Vibrant: 2, Explorer: 1 }, { GoGetter: 2, Grounded: 1 }, { Creative: 2, Explorer: 1 }],
  // Q16
  [{ Grounded: 2, Balanced: 2 }, { Balanced: 2, Grounded: 1 }, { Explorer: 2, Vibrant: 1 }, { Creative: 2, Explorer: 1 }]
];

// จับคู่ Personality กับ ชาสมุนไพร
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

// 🟢 ฟังก์ชันคำนวณผลลัพธ์ TeaMatch พร้อมระบบ Tie-Break ฉบับปรับปรุง
function calculateTeaMatch(answers) {
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

  answers.forEach((ansIndex, qIndex) => {
    const bonusObj = personalityBonus[qIndex]?.[ansIndex];
    if (bonusObj) {
      for (const [pKey, pts] of Object.entries(bonusObj)) {
        if (scores[pKey] !== undefined) {
          scores[pKey] += pts;
        }
      }
    }
  });

  // 🟢 ลำดับ Tie-Break ใหม่ (ดันตัวละครออกยากขึ้นมาอยู่อันดับต้น)
  const priorityOrder = [
    'GoGetter',
    'Creative',
    'Vibrant',
    'Explorer',
    'Grounded',
    'Restorer',
    'Balanced',
    'Gentle'
  ];

  let highestPersonality = priorityOrder[0];
  let maxScore = -1;

  for (const pKey of priorityOrder) {
    if (scores[pKey] > maxScore) {
      maxScore = scores[pKey];
      highestPersonality = pKey;
    }
  }

  return {
    scores: scores,
    resultKey: highestPersonality,
    personality: personalityInfo[highestPersonality]
  };
}

let currentQuestion = 0;
let teaAnswers = Array(teaQuestions.length).fill(null);

function showScreen(screenId) {
  const nextScreen = document.getElementById(screenId);
  if (!nextScreen) return;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  nextScreen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startQuiz() {
  currentQuestion = 0;
  teaAnswers.fill(null);
  renderQuestion();
  showScreen('quiz');
}

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
    showScreen('user-info'); // 🟢 ย้อนกลับมาหน้ากรอกชื่อถูกต้อง
  }
}

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

    try {
      const saved = await saveCurrentTeaMatchResult(result);
      window.teaMatchCurrentResult = result;
      window.teaMatchParticipantId = saved.participantId;

      if (statusElem) {
        statusElem.textContent = 'บันทึกผลของคุณเรียบร้อยแล้ว 🍵';
      }
    } catch (saveError) {
      console.error('TeaMatch save error:', saveError);
      if (statusElem) {
        statusElem.textContent = 'ยังบันทึกข้อมูลไม่ได้: ' + saveError.message + ' กรุณาแจ้งผู้ดูแลระบบก่อนปิดหน้าเว็บ';
      }
    }
  } catch (error) {
    alert(error.message || 'เกิดข้อผิดพลาดในการคำนวณคะแนน');
  }
}

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

async function saveCurrentTeaMatchResult(result) {
  const payload = {
    name: userData.name,
    email: userData.email,
    answers: teaAnswers,
    scores: result.scores,
    personalityKey: result.personalityKey,
    herbPreference: result.herbPreference
  };

  const response = await fetch(GAS_WEB_APP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(payload)
  });

  const saved = await response.json();

  if (!saved || !saved.success) {
    throw new Error(saved.message || 'ระบบยังยืนยันการบันทึกไม่ได้');
  }

  return saved;
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
let isBgmPlaying = false;

// ฟังก์ชันสลับสถานะ เล่น / หยุด เสียงเพลง
function toggleBGM() {
  const audio = document.getElementById('bgmAudio');
  const btn = document.getElementById('bgmToggleBtn');
  const icon = document.getElementById('bgmIcon');

  if (!audio) return;

  if (isBgmPlaying) {
    audio.pause();
    isBgmPlaying = false;
    btn.classList.remove('playing');
    btn.classList.add('muted');
    icon.textContent = '🔇';
  } else {
    audio.volume = 0.25; // ความดัง 25% ให้เปิดคลอเบาๆ
    audio.play().then(() => {
      isBgmPlaying = true;
      btn.classList.add('playing');
      btn.classList.remove('muted');
      icon.textContent = '🎵';
    }).catch(err => {
      console.log('Autoplay prevented by browser:', err);
    });
  }
}

// 🟢 เรียกใช้ในฟังก์ชันตอนผู้ใช้กดเริ่มทำแบบทดสอบ (เช่น startQuiz)
function startQuiz() {
  // หากยังไม่ได้เปิดเพลง ให้เปิดเพลงคลอทันทีหลังมี User Click
  if (!isBgmPlaying) {
    toggleBGM();
  }

  // โค้ดเดิมสำหรับเปลี่ยนหน้าไปทำคำถาม...
  showScreen('question-screen');
}
