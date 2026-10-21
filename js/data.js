// Base de dados global da aplicação
const learnModules = [
    {
        id: 'phishing',
        title: 'Identificação de Phishing',
        icon: 'fa-fish-fins',
        summary: 'Aprenda a reconhecer mensagens falsas que tentam roubar suas senhas e dados.',
        tips: [
            'Verifique sempre o endereço de e-mail do remetente (ex: banco@atendimento-seguro.com costuma ser falso).',
            'Desconfie de mensagens com senso de urgência ("Sua conta será bloqueada em 2 horas!").',
            'Passe o mouse por cima dos links antes de clicar para ver a URL real de destino.'
        ],
        checklist: [
            'Conferir o domínio oficial do site na barra do navegador.',
            'Nunca fornecer dados bancários ou senhas via link de SMS ou E-mail.'
        ]
    },
    {
        id: 'passwords',
        title: 'Gestão de Senhas Fortes',
        icon: 'fa-key',
        summary: 'Crie credenciais seguras e não repetidas para impedir o acesso indevido.',
        tips: [
            'Use pelo menos 12 caracteres misturando letras maiúsculas, minúsculas, números e símbolos.',
            'Nunca reutilize a mesma senha do seu e-mail em outros sites ou redes sociais.',
            'Considere utilizar um Gerenciador de Senhas confiável para armazenar suas credenciais.'
        ],
        checklist: [
            'Substituir senhas simples (como "123456" ou datas de aniversário).',
            'Ativar a verificação em duas etapas em todas as contas importantes.'
        ]
    },
    {
        id: '2fa',
        title: 'Autenticação em Dois Fatores (2FA)',
        icon: 'fa-mobile-screen-button',
        summary: 'Adicione uma camada extra de proteção que impede invasões mesmo que saibam sua senha.',
        tips: [
            'Ative o 2FA prioritariamente via aplicativos autenticadores (Google Authenticator, Authy) em vez de SMS.',
            'Guarde os códigos de recuperação em um local físico ou seguro fora do celular.',
            'Nunca compartilhe o código de verificação recebido via SMS com terceiros (golpe do WhatsApp).'
        ],
        checklist: [
            'Ativar o 2FA no WhatsApp, Instagram e e-mail principal.',
            'Configurar o PIN de confirmação em duas etapas no aplicativo de mensagens.'
        ]
    },
    {
        id: 'social-eng',
        title: 'Engenharia Social',
        icon: 'fa-user-ninja',
        summary: 'Entenda como criminosos usam persuasão e manipulação psicológica para enganar você.',
        tips: [
            'Mantenha a calma diante de ligações de supostos parentes pedindo dinheiro urgente.',
            'Sempre confirme pedidos de Pix por chamada de voz ou de vídeo direta com a pessoa.',
            'Bancos e órgãos públicos NUNCA ligam pedindo para você transferir dinheiro de teste ou digitar sua senha.'
        ],
        checklist: [
            'Combinar uma palavra-chave de segurança com familiares.',
            'Desconfiar de promoções irrealistas e prêmios em dinheiro inesperados.'
        ]
    },
    {
        id: 'lgpd',
        title: 'Privacidade & LGPD',
        icon: 'fa-user-shield',
        summary: 'Saiba quais são seus direitos sobre seus dados pessoais na internet.',
        tips: [
            'Você tem o direito de saber como suas informações são usadas e pedir a exclusão de dados.',
            'Revise periodicamente as permissões de aplicativos no seu celular (câmera, microfone, localização).',
            'Evite expor documentos pessoais (CPF, RG, passagens aéreas) em fotos publicadas na rede.'
        ],
        checklist: [
            'Ajustar configurações de privacidade das redes sociais para "Apenas Amigos".',
            'Negar permissões de localização a apps que não precisam dela para funcionar.'
        ]
    },
    {
        id: 'browsing',
        title: 'Navegação Segura',
        icon: 'fa-globe',
        summary: 'Práticas essenciais para navegar na web sem infectar seus dispositivos com malware.',
        tips: [
            'Certifique-se de que o site possui o protocolo HTTPS (cadeado ao lado da URL).',
            'Evite baixar arquivos ou softwares de sites não oficiais ou piratas.',
            'Cuidado ao utilizar redes Wi-Fi públicas sem proteção (evite acessar bancos nelas).'
        ],
        checklist: [
            'Manter o sistema operacional e os navegadores sempre atualizados.',
            'Utilizar uma rede VPN confiável ao se conectar em redes Wi-Fi públicas.'
        ]
    }
];

const gameScenarios = [
    {
        category: 'SMS de Banco Falso (Smishing)',
        type: 'phishing',
        mockHtml: `
            <div class="bg-white rounded-lg p-3 shadow-sm border">
                <div class="flex items-center gap-2 border-b pb-2 mb-2">
                    <i class="fa-solid fa-comment-sms text-sky-500"></i>
                    <span class="text-xs font-bold text-gray-700">SMS - Número: 28400</span>
                </div>
                <p class="text-xs text-gray-800 font-sans leading-relaxed">
                    BANCO CENTRAL: Sua conta possui uma pendência cadastral. Evite a suspensão do Pix hoje acessando: <span class="text-blue-600 underline">http://banco-bloqueio-alerta.com/pix</span>
                </p>
            </div>
        `,
        title: 'Golpe Detectado! (SMS Falso)',
        explanation: 'Esta mensagem é uma tentativa clássica de smishing (phishing via SMS).',
        reasons: [
            'Bancos não enviam links urgentes de atualização por SMS.',
            'O domínio "banco-bloqueio-alerta.com" não pertence a nenhum banco oficial.',
            'Ameaça de "suspensão imediata do Pix" visa provocar pânico no usuário.'
        ]
    },
    {
        category: 'Notificação de Redes Sociais',
        type: 'phishing',
        mockHtml: `
            <div class="bg-white rounded-lg p-3 shadow-sm border">
                <div class="flex items-center justify-between border-b pb-2 mb-2">
                    <span class="text-xs font-bold text-slate-800">Remetente: suporte@instagram-verify-security.net</span>
                    <span class="text-[10px] text-gray-400">10:14</span>
                </div>
                <h4 class="text-xs font-bold text-red-600 mb-1">Aviso de Violação de Direitos Autorais!</h4>
                <p class="text-xs text-gray-600 mb-2">Sua conta será desativada em 24 horas. Para contestar a decisão, faça login com sua senha no portal abaixo:</p>
                <div class="bg-blue-50 text-blue-600 text-xs font-bold p-2 text-center rounded border border-blue-200">
                    Contestar no Selo de Verificação
                </div>
            </div>
        `,
        title: 'Golpe Detectado! (Falso E-mail de Suporte)',
        explanation: 'Ameaça de perda de conta em redes sociais é uma estratégia recorrente para roubar credenciais.',
        reasons: [
            'O endereço do remetente termina em ".net" e usa um domínio suspeito.',
            'Plataformas oficiais enviam notificações diretamente no aplicativo da rede social.',
            'Links de login fornecidos por e-mail costumam ser páginas clonadas.'
        ]
    },
    {
        category: 'E-mail Corporativo / Fatura',
        type: 'legit',
        mockHtml: `
            <div class="bg-white rounded-lg p-3 shadow-sm border">
                <div class="flex items-center justify-between border-b pb-2 mb-2">
                    <span class="text-xs font-bold text-slate-800">Remetente: cobranca@provedoroficial.com.br</span>
                    <span class="text-[10px] text-gray-400">Ontem</span>
                </div>
                <h4 class="text-xs font-bold text-slate-800 mb-1">Fatura Mensal de Serviços - Ref. Outubro</h4>
                <p class="text-xs text-gray-600 mb-2">Olá João, o boleto do seu plano de internet está disponível no aplicativo oficial ou pode ser pago utilizando o código Pix oficial abaixo:</p>
                <div class="bg-gray-100 p-2 text-[11px] font-mono break-all text-gray-700 rounded border">
                    00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000...
                </div>
            </div>
        `,
        title: 'Comunicação Legítima / Segura',
        explanation: 'Apesar de devermos sempre manter a cautela, esta comunicação apresenta características legítimas.',
        reasons: [
            'O domínio do remetente é exatamente o oficial da empresa contratada (.com.br).',
            'A mensagem sugere a conferência no aplicativo oficial do provedor.',
            'Não exige senhas nem cria desespero injustificado.'
        ]
    },
    {
        category: 'Aviso de Presente / Sorteio no WhatsApp',
        type: 'phishing',
        mockHtml: `
            <div class="bg-emerald-50 rounded-lg p-3 shadow-sm border border-emerald-200">
                <div class="flex items-center gap-2 border-b border-emerald-200 pb-2 mb-2">
                    <i class="fa-brands fa-whatsapp text-emerald-600 text-lg"></i>
                    <span class="text-xs font-bold text-emerald-900">Mensagem de Contato Desconhecido</span>
                </div>
                <p class="text-xs text-gray-800 leading-relaxed">
                    Parabéns!! Você foi sorteado no prêmio de aniversário do Magazine Digital! Ganhe 1 Gift Card de R$ 500 agora. Para resgatar, compartilhe esta mensagem com 10 amigos no WhatsApp e instale o app do link!
                </p>
            </div>
        `,
        title: 'Golpe Detectado! (Sorteio Falso e Corrente)',
        explanation: 'Promessas de presentes fácil em troca de compartilhamento massivo são vírus/phishing.',
        reasons: [
            'Exigir compartilhamento com contatos é o padrão de propagação de malware via WhatsApp.',
            'Empresas reais não distribuem cartões presente através de correntes de zap.',
            'O link provavelmente instalará extensões ou aplicativos maliciosos no seu celular.'
        ]
    }
];

const quizQuestions = [
    {
        category: 'Engenharia Social',
        question: 'O que caracteriza um ataque do tipo Phishing?',
        options: [
            'Aumento repentino do consumo de memória do computador.',
            'Mensagens fraudulentas desenhadas para enganar e induzir a entrega de informações confidenciais.',
            'Uma falha física nos cabos de fibra óptica da internet.',
            'O bloqueio automático de sites com conteúdo inadequado.'
        ],
        correct: 1,
        explanation: 'Phishing é uma técnica de engenharia social onde atacantes se passam por entidades confiáveis para capturar senhas, dados de cartão ou instalar malwares.'
    },
    {
        category: 'Autenticação & Senhas',
        question: 'Qual das opções a seguir representa a combinação mais recomendada para uma senha segura?',
        options: [
            'Sua data de nascimento repetida duas vezes (ex: 1510199815101998).',
            'Uma sequência numérica simples (ex: 12345678).',
            'Uma frase longa combinando maiúsculas, minúsculas, números e símbolos (ex: C#f3Segur02026!).',
            'O primeiro nome da sua mãe seguido do seu primeiro nome.'
        ],
        correct: 2,
        explanation: 'Senhas fortes e complexas combinam múltiplos tipos de caracteres e possuem bom tamanho, dificultando ataques de força bruta e dicionário.'
    },
    {
        category: 'Proteção de Contas',
        question: 'Como funciona a Autenticação em Dois Fatores (2FA)?',
        options: [
            'Exige que duas pessoas diferentes façam login ao mesmo tempo.',
            'Requer duas senhas escritas em um papel.',
            'Exige um segundo fator de verificação (ex: aplicativo autenticador) além da senha principal.',
            'Duplica automaticamente todos os seus arquivos na nuvem.'
        ],
        correct: 2,
        explanation: 'O 2FA adiciona uma camada adicional de verificação. Mesmo que a senha vaze, o invasor não consegue entrar sem o segundo fator temporário.'
    },
    {
        category: 'Privacidade & LGPD',
        question: 'Qual é o objetivo principal da Lei Geral de Proteção de Dados (LGPD) no Brasil?',
        options: [
            'Proibir o uso da internet por menores de idade.',
            'Garantir a privacidade e dar aos cidadãos controle sobre a coleta e tratamento de seus dados pessoais.',
            'Tornar obrigatória a compra de antivírus em todos os celulares.',
            'Aumentar o valor das mensalidades dos serviços de streaming.'
        ],
        correct: 1,
        explanation: 'A LGPD regulamenta o tratamento de dados pessoais no Brasil, garantindo transparência, consentimento e direitos de acesso e eliminação de informações.'
    },
    {
        category: 'Navegação Segura',
        question: 'O que o ícone de cadeado e o protocolo "HTTPS" no endereço de um site indicam?',
        options: [
            'Que o site é 100% livre de qualquer tipo de vírus.',
            'Que a comunicação entre o seu navegador e o site é criptografada e protegida no trajeto.',
            'Que o site pertence obrigatoriamente ao governo.',
            'Que você não precisa usar senha para se cadastrar naquele site.'
        ],
        correct: 1,
        explanation: 'HTTPS significa que os dados trafegados entre você e o servidor estão criptografados, protegendo contra interceptação no meio do caminho.'
    }
];