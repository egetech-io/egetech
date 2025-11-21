let currentTab = 'bank';

function showTab(tab) {
  document.querySelectorAll('.tab').forEach(sec => sec.style.display = 'none');
  document.getElementById(tab).style.display = 'block';
  currentTab = tab;
}

// Загрузка JSON с заданиями
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    loadBank(data);
    loadTests(data);
  });

// Банк заданий
function loadBank(data) {
  const container = document.getElementById('bank-questions');
  container.innerHTML = '';
  data.forEach(q => {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.innerHTML = `<p><strong>${q.subject} - ${q.topic}</strong></p>
                      <p>${q.question}</p>
                      <button onclick="alert('Ответ: ${q.answer}')">Показать ответ</button>`;
    container.appendChild(card);
  });
}

// Тесты
function loadTests(data) {
  const container = document.getElementById('test-questions');
  container.innerHTML = '';
  data.forEach(q => {
    const card = document.createElement('div');
    card.className = 'question-card';
    if(q.type === 'выбор') {
      let optionsHTML = '';
      q.options.forEach(opt => {
        optionsHTML += `<label><input type="radio" name="q${q.id}" value="${opt}"> ${opt}</label><br>`;
      });
      card.innerHTML = `<p><strong>${q.subject} - ${q.topic}</strong></p>
                        <p>${q.question}</p>
                        ${optionsHTML}
                        <button onclick="checkAnswer('${q.id}', '${q.answer}')">Проверить</button>`;
    } else if(q.type === 'числовой') {
      card.innerHTML = `<p><strong>${q.subject} - ${q.topic}</strong></p>
                        <p>${q.question}</p>
                        <input type="number" id="q${q.id}">
                        <button onclick="checkAnswer('${q.id}', '${q.answer}')">Проверить</button>`;
    }
    container.appendChild(card);
  });
}

function checkAnswer(id, answer) {
  const input = document.querySelector(`input[name="q${id}"]:checked`) || document.getElementById(`q${id}`);
  if(!input) { alert('Выберите ответ!'); return; }
  const userAnswer = input.value;
  if(userAnswer == answer) alert('Правильно! ✅');
  else alert(`Неправильно ❌. Правильный ответ: ${answer}`);
}

// Показываем первую вкладку
showTab('bank');
