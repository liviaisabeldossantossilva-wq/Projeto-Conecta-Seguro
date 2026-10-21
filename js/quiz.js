let currentQuizIndex = 0;
let quizScore = 0;
let selectedOption = null;

function loadQuizQuestion() {
    const q = quizQuestions[currentQuizIndex];
    const quizProgress = document.getElementById('quiz-progress');
    if (!quizProgress) return;

    const progressPct = ((currentQuizIndex + 1) / quizQuestions.length) * 100;
    quizProgress.style.width = `${progressPct}%`;
    
    document.getElementById('quiz-question-number').innerText = `Pergunta ${currentQuizIndex + 1} de ${quizQuestions.length}`;
    document.getElementById('quiz-category').innerText = q.category;
    document.getElementById('quiz-question-text').innerText = q.question;

    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = q.options.map((opt, idx) => `
        <button onclick="selectQuizOption(${idx})" id="opt-btn-${idx}" class="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-[#38bdf8] hover:bg-sky-50/50 transition flex items-center justify-between text-sm text-gray-700 font-medium">
            <span>${opt}</span>
            <i id="opt-icon-${idx}" class="fa-regular fa-circle text-gray-300 text-lg"></i>
        </button>
    `).join('');

    document.getElementById('quiz-explanation').classList.add('hidden');
    document.getElementById('quiz-next-btn').classList.add('hidden');
    selectedOption = null;
}

function selectQuizOption(optionIdx) {
    if (selectedOption !== null) return;
    
    selectedOption = optionIdx;
    const q = quizQuestions[currentQuizIndex];
    const isCorrect = optionIdx === q.correct;

    if (isCorrect) quizScore++;

    q.options.forEach((_, idx) => {
        const btn = document.getElementById(`opt-btn-${idx}`);
        const icon = document.getElementById(`opt-icon-${idx}`);
        btn.disabled = true;

        if (idx === q.correct) {
            btn.className = "w-full text-left p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-medium flex items-center justify-between text-sm";
            icon.className = "fa-solid fa-circle-check text-emerald-600 text-lg";
        } else if (idx === optionIdx && !isCorrect) {
            btn.className = "w-full text-left p-4 rounded-xl border-2 border-red-500 bg-red-50 text-red-900 font-medium flex items-center justify-between text-sm";
            icon.className = "fa-solid fa-circle-xmark text-red-600 text-lg";
        } else {
            btn.className = "w-full text-left p-4 rounded-xl border border-gray-200 opacity-50 text-sm text-gray-600";
        }
    });

    const expBox = document.getElementById('quiz-explanation');
    const expTitle = document.getElementById('explanation-title');
    const expBody = document.getElementById('explanation-body');

    expBox.classList.remove('hidden');
    if (isCorrect) {
        expTitle.className = "font-bold text-sm mb-1 text-emerald-700";
        expTitle.innerText = "Resposta Correta!";
    } else {
        expTitle.className = "font-bold text-sm mb-1 text-red-700";
        expTitle.innerText = "Resposta Incorreta";
    }
    expBody.innerText = q.explanation;

    document.getElementById('quiz-next-btn').classList.remove('hidden');
}

function nextQuestion() {
    if (currentQuizIndex < quizQuestions.length - 1) {
        currentQuizIndex++;
        loadQuizQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultBox = document.getElementById('quiz-result');
    resultBox.classList.remove('hidden');

    document.getElementById('quiz-final-score').innerText = quizScore;

    const badgeTitle = document.getElementById('quiz-badge-title');
    const badgeDesc = document.getElementById('quiz-badge-desc');
    const badgeIcon = document.getElementById('quiz-badge-icon');

    if (quizScore === 5) {
        badgeTitle.innerText = "Guardião Digital Mestre 🏆";
        badgeDesc.innerText = "Parabéns! Você demonstrou domínio completo dos conceitos essenciais de segurança na internet.";
        badgeIcon.className = "w-20 h-20 mx-auto bg-amber-100 text-amber-500 rounded-full flex items-center justify-center text-4xl mb-4";
    } else if (quizScore >= 3) {
        badgeTitle.innerText = "Navegador Consciente 🛡️";
        badgeDesc.innerText = "Muito bem! Você possui bons hábitos de proteção, mas vale a pena revisar alguns detalhes no módulo Aprender.";
        badgeIcon.className = "w-20 h-20 mx-auto bg-sky-100 text-[#38bdf8] rounded-full flex items-center justify-center text-4xl mb-4";
    } else {
        badgeTitle.innerText = "Iniciante em Segurança 🌱";
        badgeDesc.innerText = "Recomendamos explorar os módulos da aba 'Aprender' e praticar no 'Simulador' para reforçar sua proteção.";
        badgeIcon.className = "w-20 h-20 mx-auto bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-4xl mb-4";
    }

    saveScore('quiz', quizScore);
}

function restartQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-container').classList.remove('hidden');
    loadQuizQuestion();
}