// Gerenciamento de Persistência no LocalStorage e Inicializador
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa carregamentos dependendo da página atual
    if (typeof renderLearnModules === 'function') renderLearnModules();
    if (typeof loadScenario === 'function') loadScenario();
    if (typeof loadQuizQuestion === 'function') loadQuizQuestion();
});

function saveScore(type, score) {
    localStorage.setItem(`conecta_seguro_${type}`, score);
}

function getSavedScore(type) {
    return localStorage.getItem(`conecta_seguro_${type}`) || 0;
}