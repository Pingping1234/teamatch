// ✅ ใส่ Web App URL ของ Apps Script เรียบร้อยแล้ว
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzKKtJsHqhVaUTBLEYtWVZQvEmfz3tUTBSMmf_c4KZdaJD7ynhD1s_fA77PabbKEJvWwg/exec';

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
    options: ['เริ่มทำตั้งแต่เนิ่น ๆ', 'ทำตามกิจวัตรที่วางไว้', 'เร่งทำอย่างเต็มที่ใกล้กำหนด', 'คิดหาวิธีแก้ปัญหาอย่างสร้างสรรค์']
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
    options: ['ยุ่งและมีสิ่งที่ต้องทำตลอด', 'มีโครงสร้างและคาดเดาได้', 'ยืดหยุ่นและเปลี่ยนแปลงตลอด', 'ดำเนินไปอย่างช้า ๆ และผ่อนคลาย']
  },
  {
    category: 'TEA PREFERENCE · 01',
    question: 'รสชาติแบบไหนฟังดูน่าลองที่สุด?',
    options: ['หอมอ่อน ๆ', 'สดชื่นและเปรี้ยวเล็กน้อย', 'อุ่นและมีรสเผ็ดจากเครื่องเทศ', 'สดชื่นและมีกลิ่นสมุนไพร']
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
    options: ['รสนุ่มนวลและเบาสบาย', 'สดชื่นและมีรสชาติสดใส', 'รสเข้มและให้ความรู้สึกอบอุ่น', 'สีสันสวยงามและแปลกใหม่']
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
    imageUrl: 'https://lh3.googleusercontent.com/d/1pE4IdahDRGOummy_PEXxeT6rZZuKn8Bq',
    description: 'คุณให้ความสำคัญกับการพักใจและการกลับมาเชื่อมโยงกับตัวเอง'
  },
  Balanced: {
    name: 'The Balanced',
    imageUrl: 'https://lh3.googleusercontent.com/d/1pE4IdahDRGOummy_PEXxeT6rZZuKn8Bq',
    description: 'คุณมองหาความสมดุลและจังหวะชีวิตที่พอดีกับตัวเอง'
  },
  Explorer: {
    name: 'The Explorer',
    imageUrl: 'https://lh3.googleusercontent.com/d/1pE4IdahDRGOummy_PEXxeT6rZZuKn8Bq',
    description: 'คุณเปิดรับประสบการณ์ใหม่ ๆ และสนุกกับการค้นพบสิ่งรอบตัว'
  },
  GoGetter: {
    name: 'The Go-Getter',
    imageUrl: 'https://lh3.googleusercontent.com/d/1pE4IdahDRGOummy_PEXxeT6rZZuKn8Bq',
    description: 'คุณมีพลังในการลงมือทำและพร้อมเดินหน้าไปสู่เป้าหมาย'
  },
  Vibrant: {
    name: 'The Vibrant',
    imageUrl: 'https://lh3.googleusercontent.com/d/1pE4IdahDRGOummy_PEXxeT6rZZuKn8Bq',
    description: 'คุณมีสีสันและให้ความสำคัญกับความสัมพันธ์และประสบการณ์ร่วมกัน'
  },
  Creative: {
    name: 'The Creative',
    imageUrl: 'https://lh3.googleusercontent.com/d/1pE4IdahDRGOummy_PEXxeT6rZZuKn8Bq',
    description: 'คุณชอบจินตนาการ ทดลอง และมองเห็นความเป็นไปได้ใหม่ ๆ'
  },
  Gentle: {
    name: 'The Gentle',
    imageUrl: 'https://lh3.googleusercontent.com/d/1pE4IdahDRGOummy_PEXxeT6rZZuKn8Bq',
    description: 'คุณให้คุณค่ากับความอ่อนโยนและการใช้ชีวิตอย่างไม่กดดันตัวเอง'
  },
  Grounded: {
    name: 'The Grounded',
    imageUrl: 'https://lh3.googleusercontent.com/d/1pE4IdahDRGOummy_PEXxeT6rZZuKn8Bq',
    description: 'คุณชอบความมั่นคง มีแบบแผน และรู้สึกดีกับการเตรียมตัวให้พร้อม'
  }
};

const personalityKeys = ['Restorer', 'Balanced', 'Explorer', 'GoGetter', 'Vibrant', 'Creative', 'Gentle', 'Grounded'];
const tieBreakOrder = ['Restorer', 'Balanced', 'Explorer', 'GoGetter', 'Vibrant', 'Creative', 'Gentle', 'Grounded'];

const personalityBonus = [
  [{Restorer:2, Gentle:2, Balanced:1}, {Vibrant:2, Balanced:1, Gentle:1}, {Creative:2, Restorer:1, Balanced:1}, {Explorer:2, GoGetter:1, Vibrant:1}],
  [{Restorer:2, Balanced:1, Gentle:1}, {Vibrant:2, Balanced:1, Gentle:1}, {Grounded:2, Balanced:2}, {GoGetter:2, Explorer:1, Creative:1}],
  [{Restorer:2, Gentle:2}, {Vibrant:2, Explorer:1}, {Explorer:2, Creative:1}, {Creative:2, Grounded:1}],
  [{Restorer:2, Gentle:2}, {Vibrant:2, Creative:1}, {Explorer:2, Creative:1}, {Grounded:2, Balanced:2}],
  [{Grounded:2, Balanced:1}, {Balanced:2, Grounded:1}, {GoGetter:2, Explorer:1}, {Creative:2, GoGetter:1}],
  [{Restorer:2, Gentle:1, Balanced:1}, {Explorer:2, Vibrant:1}, {Vibrant:2, Gentle:1}, {Grounded:2, Balanced:1}],
  [{Restorer:1, GoGetter:1}, {Balanced:1, Grounded:1}, {Balanced:2, Gentle:1}, {Gentle:2, Restorer:1}],
  [{Grounded:2, Balanced:1}, {Balanced:2, Gentle:1}, {Creative:1, Explorer:1, Balanced:1}, {Explorer:1, Creative:1, Restorer:1}],
  [{Gentle:2, Restorer:1}, {Balanced:2, Gentle:1}, {Explorer:2, Balanced:1}, {Explorer:2, GoGetter:2}],
  [{Gentle:2, Balanced:1}, {Balanced:2, Grounded:1}, {Restorer:2, Gentle:1}, {Restorer:2, Gentle:2}],
  [{GoGetter:2, Explorer:1}, {Grounded:2, Balanced:1}, {Explorer:2, Creative:1}, {Gentle:2, Restorer:1}],
  [{Gentle:2}, {Vibrant:2}, {GoGetter:2}, {Explorer:2}],
  [{Restorer:2, Gentle:2}, {Balanced:2, Vibrant:1}, {Explorer:2, GoGetter:1}, {Grounded:2, Creative:1}],
  [{Creative:2, Explorer:2}, {Balanced:1, Creative:1}, {Grounded:1, Gentle:1}, {Grounded:2, Gentle:2}],
  [{Gentle:2, Restorer:2}, {Vibrant:2, Explorer:1}, {GoGetter:2, Grounded:1}, {Creative:2, Explorer:1}],
  [{Grounded:2, Balanced:2}, {Balanced:2, Gentle:1}, {Explorer:2, Creative:1}, {Gentle:2, Creative:1}]
];

const herbByOption = { 0: 'ใบเตย', 1: 'กระเจี๊ยบ', 2: 'ขิง', 3: 'ตะไคร้' };

function calculateTeaMatch(answers) {
  if (!Array.isArray(answers) || answers.length !== teaQuestions.length || answers.some(a => !Number.isInteger(a) || a < 0 || a > 3)) {
    throw new Error('กรุณาตอบคำถามให้ครบทั้ง 16 ข้อ');
  }

  const scores = {};
  personalityKeys.forEach(key => { scores[key] = 16; });

  answers.forEach((answerIndex, questionIndex) => {
    const bonus = personalityBonus[questionIndex][answerIndex];
    Object.entries(bonus).forEach(([key, points]) => { scores[key] += points; });
  });

  const highestScore = Math.max(...Object.values(scores));
  const winner = tieBreakOrder.find(key => scores[key] === highestScore);
  const herbPreference = herbByOption[answers[11]];

  return {
    personalityKey: winner,
    personality: personalityInfo[winner],
    scores: scores,
    highestScore: highestScore,
    herbPreference: herbPreference
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
    showScreen('intro');
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
    }, 5000);

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
    answers: teaAnswers,
    scores: result.scores,
    personalityKey: result.personalityKey,
    herbPreference: result.herbPreference
  };

  const response = await fetch(GAS_WEB_APP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8', // 👈 ต้องใช้ text/plain เท่านั้น
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
