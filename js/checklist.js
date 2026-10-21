// Renderização e interatividade da tela "Aprender"
function renderLearnModules() {
    const container = document.getElementById('learn-modules-container');
    if (!container) return;

    container.innerHTML = learnModules.map(mod => `
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:border-sky-300 transition-colors">
            <button onclick="toggleModule('${mod.id}')" class="w-full p-5 text-left flex justify-between items-center gap-4 bg-white hover:bg-slate-50 transition">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-sky-50 text-[#38bdf8] flex items-center justify-center font-bold text-lg">
                        <i class="fa-solid ${mod.icon}"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-[#0f172a] text-base">${mod.title}</h3>
                        <p class="text-xs text-gray-500">${mod.summary}</p>
                    </div>
                </div>
                <i id="icon-${mod.id}" class="fa-solid fa-chevron-down text-gray-400 text-sm transition-transform duration-200"></i>
            </button>
            <div id="content-${mod.id}" class="hidden p-5 border-t border-gray-100 bg-slate-50 space-y-4">
                <div>
                    <h4 class="text-xs font-bold text-[#1e293b] uppercase tracking-wider mb-2">
                        <i class="fa-solid fa-lightbulb text-amber-500 mr-1"></i> Dicas Fundamentais
                    </h4>
                    <ul class="space-y-1.5 text-xs text-gray-600">
                        ${mod.tips.map(tip => `<li class="flex items-start gap-2"><i class="fa-solid fa-check text-emerald-500 mt-0.5"></i> <span>${tip}</span></li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-[#1e293b] uppercase tracking-wider mb-2">
                        <i class="fa-solid fa-list-check text-[#38bdf8] mr-1"></i> Checklist Prático
                    </h4>
                    <div class="space-y-1.5">
                        ${mod.checklist.map((item, idx) => `
                            <label class="flex items-center gap-2 text-xs text-gray-700 bg-white p-2 rounded border border-gray-200 cursor-pointer">
                                <input type="checkbox" onchange="saveChecklistState('${mod.id}_${idx}', this.checked)" class="rounded text-[#38bdf8] focus:ring-[#38bdf8]">
                                <span>${item}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleModule(id) {
    const content = document.getElementById('content-' + id);
    const icon = document.getElementById('icon-' + id);
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

function saveChecklistState(key, isChecked) {
    localStorage.setItem(`chk_${key}`, isChecked);
}