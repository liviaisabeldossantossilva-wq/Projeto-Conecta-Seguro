let currentScenarioIndex = 0;
let gameScore = 0;

function loadScenario() {
    const scenario = gameScenarios[currentScenarioIndex];
    const gameStep = document.getElementById('game-step');
    if (!gameStep) return;

    gameStep.innerText = `Cenário ${currentScenarioIndex + 1} de ${gameScenarios.length}`;
    document.getElementById('game-category').innerText = scenario.category;
    document.getElementById('scenario-mock').innerHTML = scenario.mockHtml;
    
    document.getElementById('game-feedback').classList.add('hidden');
    document.getElementById('game-actions').classList.remove('hidden');
}

function handleGameChoice(choice) {
    const scenario = gameScenarios[currentScenarioIndex];
    const isPhishing = scenario.type === 'phishing';
    const userReported = choice === 'report';
    const isCorrect = (userReported && isPhishing) || (!userReported && !isPhishing);

    const feedbackBox = document.getElementById('game-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackReasons = document.getElementById('feedback-reasons');

    document.getElementById('game-actions').classList.add('hidden');
    feedbackBox.classList.remove('hidden');

    if (isCorrect) {
        gameScore += 100;
        document.getElementById('game-score').innerText = gameScore;
        feedbackBox.className = "mt-6 p-5 rounded-xl border animate-fade-in max-w-lg mx-auto bg-emerald-50 border-emerald-200 text-emerald-900";
        feedbackIcon.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-600"></i>';
        feedbackTitle.innerText = `Excelente Decisão! +100 pts`;
    } else {
        feedbackBox.className = "mt-6 p-5 rounded-xl border animate-fade-in max-w-lg mx-auto bg-red-50 border-red-200 text-red-900";
        feedbackIcon.innerHTML = '<i class="fa-solid fa-circle-xmark text-red-600"></i>';
        feedbackTitle.innerText = `Cuidado! Resposta Incorreta`;
    }

    feedbackText.innerText = scenario.explanation;
    feedbackReasons.innerHTML = `<strong class="block mb-1 font-semibold text-slate-800">Indicadores do Cenário:</strong>` + 
        scenario.reasons.map(r => `<div class="flex items-start gap-1.5"><i class="fa-solid fa-caret-right text-sky-500 mt-0.5"></i> <span>${r}</span></div>`).join('');
    
    saveScore('simulador', gameScore);
}

function nextScenario() {
    if (currentScenarioIndex < gameScenarios.length - 1) {
        currentScenarioIndex++;
        loadScenario();
    } else {
        document.getElementById('game-card').innerHTML = `
            <div class="p-8 text-center space-y-4">
                <div class="text-5xl text-[#38bdf8]"><i class="fa-solid fa-trophy"></i></div>
                <h2 class="text-2xl font-bold text-[#0f172a]">Simulação Concluída!</h2>
                <p class="text-gray-600">Sua pontuação final foi de <strong class="text-[#38bdf8] text-xl">${gameScore}</strong> de 400 pontos.</p>
                <button onclick="resetGame()" class="bg-[#1e293b] hover:bg-[#0f172a] text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition inline-flex items-center gap-2">
                    <i class="fa-solid fa-rotate-left"></i> Jogar Novamente
                </button>
            </div>
        `;
    }
}

function resetGame() {
    window.location.reload();
}