// =============================================================================
// CONSTANTS.TS — Dados centralizados da Home | Hospital São Rafael
// =============================================================================
// Este arquivo é a ÚNICA fonte de verdade para textos, métricas e dados da home.
// Componentes NUNCA devem ter textos hardcoded — sempre importar daqui.
// Itens pendentes de aprovação do cliente estão marcados com [PENDENTE CLIENTE].
// =============================================================================

// -----------------------------------------------------------------------------
// NAVEGAÇÃO
// -----------------------------------------------------------------------------
export const NAV_ITEMS = [
  { label: "Início", href: "#hero" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Serviços", href: "#servicos" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Produtos", href: "#produtos" },
  { label: "Jornada", href: "#jornada" },
  { label: "Médicos", href: "#medicos" },
  { label: "FAQ", href: "#faq" },
] as const

export const NAV_CTA = {
  label: "Falar com Atendimento",
  href: "https://wa.me/message/NZIPXRZ4SKUHM1",
} as const

// -----------------------------------------------------------------------------
// HERO (Dobra 1)
// -----------------------------------------------------------------------------
export const HERO_DATA = {
  kicker: "Cirurgias eletivas multiespecialidades particulares",
  headline: "Alta performance em saúde com acolhimento que eleva a sua experiência.",
  subheadline: [
    "O maior e mais completo Hospital de cirurgias eletivas do Brasil, com estrutura hospitalar integrada e foco absoluto em segurança, conforto e experiência.",
    "Toda a sua jornada em um só lugar: consultas, exames, preparo, cirurgia e recuperação com excelência em cada detalhe.",
  ],
  ctaPrimary: {
    label: "Falar com Atendimento",
    href: "https://wa.me/message/NZIPXRZ4SKUHM1",
  },
  // Placeholder até vídeo real ser entregue
  video: {
    src: "/assets/video/hero-hsr.mp4",
    poster: "/assets/images/hero/hero-poster.jpg",
    alt: "Instalações modernas do Hospital São Rafael",
  },
} as const

// -----------------------------------------------------------------------------
// NÚMEROS DE CREDIBILIDADE (Dobra 2)
// -----------------------------------------------------------------------------
export const STATS_DATA = {
  headline: "A segurança da sua cirurgia medida em resultados reais.",
  items: [
    {
      id: "infeccao",
      value: "0,33%",
      label: "Taxa de Infecção",
      description:
        "Um índice de excelência clínica rigorosa, muito abaixo da média nacional, garantindo um ambiente ultrasseguro para o seu procedimento.",
    },
    {
      id: "cirurgias",
      value: 12000,
      prefix: "+",
      label: "Procedimentos realizados com sucesso",
      description:
        "Experiência comprovada de uma equipe médica e multidisciplinar altamente capacitada.",
    },
    {
      id: "salas",
      value: 22,
      label: "Salas Cirúrgicas",
      description:
        "Equipadas com tecnologia de última geração para atender da baixa à mais alta complexidade com total previsibilidade.",
    },
    {
      id: "investimento",
      value: 170,
      prefix: "R$ ",
      suffix: " mi",
      label: "De reais em inovação",
      description:
        "Aplicados em parque tecnológico e expansão estrutural para o seu conforto.",
    },
    {
      id: "hiperbarica",
      value: 10000,
      prefix: "+",
      label: "Sessões de Hiperbárica",
      // [PENDENTE CLIENTE] Número em levantamento — valor simbólico provisório
      description:
        "Sessões realizadas para acelerar a recuperação e prevenir complicações pós-cirúrgicas com tecnologia de oxigenoterapia hiperbárica.",
    },
  ],
} as const

// -----------------------------------------------------------------------------
// DIFERENCIAIS (Dobra 3) — Nova dobra, separada de Serviços conforme reunião
// -----------------------------------------------------------------------------
export const DIFERENCIAIS_DATA = {
  kicker: "RIGOR CIENTÍFICO E CONFORTO",
  headline: "Excelência comprovada em cada detalhe do cuidado.",
  description: [
    "No Hospital São Rafael, tecnologia de ponta e rigor técnico se unem a uma estrutura hospitalar completa para oferecer segurança, conforto e precisão em todas as etapas.",
    "Com o suporte do nosso Instituto Médico e Diagnóstico integrado, você realiza consultas, exames e procedimentos com fluidez, qualidade e atenção individualizada.",
  ],
  ctas: [
    { label: "Conheça nossas Especialidades", href: "#especialidades" },
    { label: "Conheça o Centro Cirúrgico", href: "#servicos" },
  ],
  image: {
    src: "/assets/images/diferenciais-hsr.jpg",
    alt: "Infraestrutura tecnológica do Hospital São Rafael",
  },
} as const

// -----------------------------------------------------------------------------
// SERVIÇOS (Dobra 4) — Serviços do hospital
// -----------------------------------------------------------------------------
// NOTA DA REUNIÃO: Serviços são do hospital (infraestrutura).
// Diferente de "Produtos" (experiências adicionais ao paciente/médico).
export const SERVICOS_DATA = {
  kicker: "ESTRUTURA HOSPITALAR",
  headline: "Infraestrutura completa em um único complexo integrado.",
  description:
    "Tudo o que o seu procedimento exige, integrado no mesmo complexo, sem dispersão, sem deslocamento, sem atrito.",
  items: [
    {
      id: "centro-cirurgico",
      title: "Centro Cirúrgico",
      description:
        "22 salas equipadas com tecnologia de última geração para procedimentos de alta complexidade.",
      icon: "scalpel",
      image: "/assets/images/servicos/centro-cirurgico.jpg",
    },
    {
      id: "internacao",
      title: "Unidade de Internação",
      description:
        "Acomodações projetadas para conforto e recuperação, com monitoramento contínuo e equipe dedicada.",
      icon: "bed",
      image: "/assets/images/servicos/internacao.jpg",
    },
    {
      id: "imd",
      title: "IMD Instituto Médico e Diagnóstico",
      description:
        "O IMD do Hospital São Rafael reúne consultas e exames em um só lugar, com mais precisão, agilidade e muito mais conforto.",
      icon: "microscope",
      image: "/assets/images/servicos/imd.jpg",
    },
    {
      id: "laboratorio",
      title: "Laboratório",
      description:
        "Análises clínicas com agilidade e precisão, integradas ao fluxo pré e pós-operatório.",
      icon: "flask",
      image: "/assets/images/servicos/laboratorio.jpg",
    },
    {
      id: "hiperbarica",
      title: "Terapia Hiperbárica",
      description:
        "Tecnologia de ponta para aceleração da recuperação e prevenção de complicações pós-cirúrgicas.",
      icon: "activity",
      image: "/assets/images/servicos/hiperbarica.jpeg",
    },
    {
      id: "centro-convencoes",
      title: "Centro de Convenções",
      description:
        "Espaço dedicado a simpósios, treinamentos, confraternizações técnico-científicas e troca de conhecimento.",
      icon: "presentation",
      image: "/assets/images/servicos/centro-convencoes.jpg",
    },
    {
      id: "praca-alimentacao",
      title: "Praça de Alimentação",
      description:
        "Alimentação de qualidade para pacientes, acompanhantes, equipe médica e público externo dentro do complexo.",
      icon: "utensils",
      image: "/assets/images/servicos/praca-alimentacao.jpg",
    },
  ],
} as const

// -----------------------------------------------------------------------------
// ESPECIALIDADES (Dobra 5)
// -----------------------------------------------------------------------------
// [PENDENTE CLIENTE] Documento com procedimentos por especialidade (13/mar)
// deve ser reencaminhado para completar esta seção.
export const ESPECIALIDADES_DATA = {
  kicker: "ESPECIALIDADES",
  headline: "Excelência em cada área de atuação.",
  description:
    "Conheça as especialidades atendidas no Instituto Médico e Diagnóstico do Hospital São Rafael.",
  items: [
    {
      id: "ortopedia",
      title: "Ortopedia",
      description:
        "Artroscopia, artroplastias de joelho e quadril e cirurgias de coluna com técnicas minimamente invasivas e protocolos de recuperação acelerada.",
      icon: "bone",
      procedures: [
        "Artroplastia total de joelho",
        "Artroplastia total de quadril",
        "Artroscopia de joelho e ombro",
        "Reconstrução do LCA",
        "Cirurgia da coluna vertebral",
        "Tratamento de fraturas complexas",
      ],
    },
    {
      id: "cardiologia",
      title: "Cardiologia",
      description:
        "Cateterismo, angioplastia coronária e cirurgias cardíacas de alta complexidade com monitorização contínua em UTI cardiológica dedicada.",
      icon: "heart-pulse",
      procedures: [
        "Cateterismo cardíaco",
        "Angioplastia coronária",
        "Implante de stent",
        "Implante de marcapasso",
        "Ablação por cateter",
        "Cirurgia de revascularização",
      ],
    },
    {
      id: "neurocirurgia",
      title: "Neurocirurgia",
      description:
        "Ressecção de tumores cerebrais, microcirurgia da coluna e tratamento de neuropatias com navegação cirúrgica assistida de precisão.",
      icon: "brain",
      procedures: [
        "Ressecção de tumores cerebrais",
        "Cirurgia minimamente invasiva da coluna",
        "Microcirurgia de hérnia discal",
        "Derivação ventrículo-peritoneal",
        "Neurocirurgia da coluna cervical",
        "Tratamento de estenose do canal",
      ],
    },
    {
      id: "urologia",
      title: "Urologia",
      description:
        "Prostatectomia, nefrectomia e tratamento de cálculos renais com acesso laparoscópico e robótico, garantindo alta precisão e internação reduzida.",
      icon: "stethoscope",
      procedures: [
        "Prostatectomia radical",
        "Nefrectomia laparoscópica",
        "Litotripsia e ureteroscopia",
        "Cistoscopia e RTU",
        "Cirurgia robótica urológica",
        "Tratamento de incontinência",
      ],
    },
    {
      id: "ginecologia",
      title: "Ginecologia",
      description:
        "Histerectomia laparoscópica, miomectomia e tratamento da endometriose com precisão minimamente invasiva e protocolos de recuperação rápida.",
      icon: "baby",
      procedures: [
        "Histerectomia laparoscópica",
        "Miomectomia",
        "Cirurgia de endometriose",
        "Ooforectomia",
        "Correção de prolapso pélvico",
        "Salpingectomia",
      ],
    },
    {
      id: "oftalmologia",
      title: "Oftalmologia",
      description:
        "Facoemulsificação de catarata, tratamento cirúrgico de glaucoma e vitrectomia com tecnologia de última geração em centro oftalmológico especializado.",
      icon: "eye",
      procedures: [
        "Facoemulsificação (catarata)",
        "Trabeculectomia (glaucoma)",
        "Vitrectomia posterior",
        "Cirurgia refrativa a laser",
        "Transplante de córnea",
        "Correção de estrabismo",
      ],
    },
    {
      id: "dermatologia",
      title: "Dermatologia",
      description:
        "Exérese de lesões, cirurgia de Mohs para carcinomas e reconstruções cutâneas com precisão cirúrgica e diagnóstico histopatológico integrado.",
      icon: "scan",
      procedures: [
        "Exérese de lesões cutâneas",
        "Cirurgia de Mohs",
        "Reconstrução cutânea",
        "Biópsias e histopatologia",
        "Ressecção de carcinomas",
        "Eletrocirurgia dermatológica",
      ],
    },
    {
      id: "cirurgia-geral",
      title: "Cirurgia Geral",
      description:
        "Colecistectomia, herniorrafia e ressecções intestinais por laparoscopia com ampla experiência clínica e protocolos de recuperação acelerada.",
      icon: "scissors",
      procedures: [
        "Colecistectomia laparoscópica",
        "Apendicectomia",
        "Herniorrafia inguinal e ventral",
        "Ressecção intestinal",
        "Fundoplicatura",
        "Cirurgia de refluxo gastroesofágico",
      ],
    },
    {
      id: "cirurgia-plastica",
      title: "Cirurgia Plástica",
      description:
        "Mamoplastias, rinoplastia e reconstrução pós-oncológica com resultados naturais, seguros e protocolos de reabilitação integrada.",
      icon: "sparkles",
      procedures: [
        "Mamoplastia de aumento e redução",
        "Rinoplastia",
        "Lipoaspiração",
        "Abdominoplastia",
        "Ritidoplastia (lifting facial)",
        "Reconstrução mamária pós-mastectomia",
      ],
    },
    {
      id: "cirurgia-vascular",
      title: "Cirurgia Vascular",
      description:
        "Revascularização arterial, correção de aneurismas e tratamento de varizes com abordagem endovascular e tecnologia de imagem intraoperatória.",
      icon: "waves",
      procedures: [
        "Revascularização arterial",
        "Correção de aneurisma",
        "Safenectomia e flebectomia",
        "Fístula arteriovenosa",
        "Angioplastia periférica",
        "Trombectomia",
      ],
    },
    {
      id: "cabeca-pescoco",
      title: "Cabeça e Pescoço",
      description:
        "Tireoidectomia, esvaziamento cervical e ressecção oncológica craniofacial com reconstrução por retalhos microvascularizados.",
      icon: "user",
      procedures: [
        "Tireoidectomia total e parcial",
        "Paratireoidectomia",
        "Esvaziamento cervical",
        "Ressecção de tumor parotídeo",
        "Laringectomia",
        "Reconstrução com retalhos microvascularizados",
      ],
    },
    {
      id: "cirurgia-toracica",
      title: "Cirurgia Torácica",
      description:
        "Lobectomia, segmentectomia e ressecção de tumores por videoassistência (VATS), com abordagem minimamente invasiva do tórax e mediastino.",
      icon: "wind",
      procedures: [
        "Lobectomia pulmonar (VATS)",
        "Segmentectomia",
        "Ressecção mediastinal",
        "Tratamento de pneumotórax",
        "Biópsia pleural videoassistida",
        "Empiemectomia",
      ],
    },
    // [PENDENTE CLIENTE] Completar lista com todas as especialidades do documento de 13/mar
  ],
} as const

// -----------------------------------------------------------------------------
// PRODUTOS (Dobra 6) — Divididos por público conforme reunião
// -----------------------------------------------------------------------------
// NOTA DA REUNIÃO: Produtos são experiências/upgrades adicionais.
// Diferente de "Serviços" (infraestrutura do hospital).
// Evitar duplicidade com "Diferenciais".
export const PRODUTOS_DATA = {
  kicker: "PRODUTOS E EXPERIÊNCIAS",
  headline: "Soluções que elevam cada etapa da sua jornada.",
  description:
    "Além da infraestrutura hospitalar, oferecemos produtos pensados para maximizar o conforto do paciente e a eficiência do cirurgião.",
  categories: [
    {
      id: "paciente",
      label: "Para Pacientes",
      items: [
        {
          id: "upgrade-acomodacao",
          title: "Upgrade de Acomodação",
          description:
            "Conforto, privacidade e atendimento exclusivo. Transforme o período pós-cirúrgico em uma experiência de recuperação diferenciada.",
          icon: "crown",
          image: "/assets/images/produtos/upgrade-acomodacao.jpg",
        },
        {
          id: "extensao-diaria",
          title: "Extensão de Diária",
          description:
            "Flexibilidade no tempo de internação para uma recuperação sem pressa e com total suporte médico.",
          icon: "clock",
          image: "/assets/images/produtos/extensao-diaria.jpg",
        },
        {
          id: "unidade-transicao",
          title: "Unidade de Transição",
          description:
            "O elo seguro entre a alta hospitalar e o regresso a casa. Monitorização contínua e reabilitação assistida.",
          icon: "shield-check",
          image: "/assets/images/produtos/unidade-transicao.jpg",
        },
        {
          id: "consulta-pre-anestesica",
          title: "Consulta Pré-Anestésica",
          description:
            "Avaliação especializada antes do procedimento para mitigar riscos e personalizar o protocolo anestésico.",
          icon: "clipboard-check",
          image: "/assets/images/produtos/consulta-pre-anestesica.jpg",
        },
        {
          id: "tecnico-enfermagem",
          title: "Técnico de Enfermagem Exclusivo",
          description:
            "Técnico de enfermagem dedicado exclusivamente ao seu cuidado, com acompanhamento contínuo, segurança e atenção personalizada durante toda a internação.",
          icon: "heart-handshake",
          image: "/assets/images/produtos/tecnico-enfermagem.jpg",
        },
      ],
    },
    {
      id: "medico",
      label: "Para Médicos",
      items: [
        {
          id: "instrumentador",
          title: "Instrumentador Especializado",
          // [PENDENTE CLIENTE] Validar se instrumentador é diferencial por especialidade
          description:
            "Profissionais treinados nos mais rigorosos protocolos, prontos para antecipar as necessidades do seu procedimento.",
          icon: "wrench",
          image: "/assets/images/produtos/instrumentador.jpg",
        },
        {
          id: "academia",
          title: "Academia",
          description:
            "Espaço de atividade física e bem-estar exclusivo para médicos e equipe cirúrgica, com equipamentos modernos e estrutura completa dentro do complexo.",
          icon: "dumbbell",
          image: "/assets/images/produtos/academia.jpg",
        },
        {
          id: "conforto-medico",
          title: "Conforto Médico",
          description:
            "Área exclusiva de descanso e conveniência para médicos, com estrutura pensada para preparação e recuperação entre procedimentos com privacidade e comodidade.",
          icon: "sofa",
          image: "/assets/images/produtos/conforto-medico.jpg",
        },
        {
          id: "engenharia-clinica",
          title: "Engenharia Clínica",
          description:
            "Suporte técnico especializado em manutenção e operação de equipamentos médico-hospitalares, garantindo máxima disponibilidade e performance dos recursos cirúrgicos.",
          icon: "settings-2",
          image: "/assets/images/produtos/engenharia-clinica.jpg",
        },
      ],
    },
  ],
} as const

// -----------------------------------------------------------------------------
// JORNADA DO PACIENTE (Dobra 7)
// -----------------------------------------------------------------------------
// NOTA DA REUNIÃO: Em cada etapa, indicar produtos/serviços aplicáveis
// e usar âncoras para rolar até dobras relevantes.
export const JORNADA_DATA = {
  kicker: "O COMPLEXO INTEGRADO SÃO RAFAEL & IMD",
  headline:
    "Do diagnóstico de precisão à recuperação total, sem sair do nosso complexo integrado.",
  description:
    "A descontinuidade do cuidado médico gera atrito. Aqui, o IMD e o centro cirúrgico operam como uma única estrutura completa — previsível para o seu médico, seguro e confortável para você.",
  steps: [
    {
      id: "consulta",
      number: 1,
      title: "Consulta e Diagnóstico",
      subtitle: "IMD",
      description:
        "Diagnóstico de precisão no IMD antes de qualquer decisão cirúrgica.",
      icon: "/assets/icons/jornada-consulta.svg",
      relatedLinks: [
        { label: "Conheça o IMD", href: "#servicos" },
      ],
    },
    {
      id: "preparo",
      number: 2,
      title: "Preparo Cirúrgico",
      subtitle: "",
      description:
        "Protocolos de segurança integrados para mitigar riscos e reduzir a ansiedade.",
      icon: "/assets/icons/jornada-preparo.svg",
      relatedLinks: [
        { label: "Consulta Pré-Anestésica", href: "#produtos" },
      ],
    },
    {
      id: "procedimento",
      number: 3,
      title: "O Procedimento",
      subtitle: "",
      description:
        "Rigor clínico máximo no centro de alta performance.",
      icon: "/assets/icons/jornada-procedimento.svg",
      relatedLinks: [
        { label: "Centro Cirúrgico", href: "#servicos" },
      ],
    },
    {
      id: "recuperacao",
      number: 4,
      title: "Recuperação Acelerada",
      subtitle: "",
      description:
        "Terapia Hiperbárica integrada para acelerar a recuperação e reduzir a inatividade.",
      icon: "/assets/icons/jornada-recuperacao.svg",
      relatedLinks: [
        { label: "Terapia Hiperbárica", href: "#servicos" },
        { label: "Upgrade de Acomodação", href: "#produtos" },
      ],
    },
    {
      id: "alta",
      number: 5,
      title: "Unidade de Transição e Alta",
      subtitle: "",
      description:
        "Monitorização contínua na Unidade de Transição até o regresso seguro à rotina.",
      icon: "/assets/icons/jornada-alta.svg",
      relatedLinks: [
        { label: "Unidade de Transição", href: "#produtos" },
        { label: "Extensão de Diária", href: "#produtos" },
      ],
    },
  ],
} as const

// -----------------------------------------------------------------------------
// ÁREA DO MÉDICO — B2B (Dobra 8)
// -----------------------------------------------------------------------------
// NOTA DA REUNIÃO: Seção rasa, deve ser expandida com academia, tecnologias,
// equipe e processos. Validar se "instrumentador" é diferencial por especialidade.
export const B2B_DATA = {
  kicker: "PARA CIRURGIÕES PARCEIROS",
  headline: "A base operacional perfeita para a escalabilidade da sua agenda.",
  subheadline:
    "Um centro de excelência focado na eficiência do seu ato cirúrgico e no conforto do seu paciente.",
  description: "",
  features: [
    {
      id: "giro-sala",
      metric: "40min",
      title: "Giro de Sala",
      description:
        "Processos ágeis desenhados para reduzir a ociosidade e otimizar seu tempo entre procedimentos.",
      icon: "timer",
    },
    {
      id: "suporte-tecnico",
      metric: "",
      title: "Suporte Técnico Especializado",
      description:
        "Equipe de instrumentadores altamente treinados e suporte operacional dedicado via WhatsApp — do agendamento à alta.",
      icon: "headset",
    },
    {
      id: "ecossistema-medico",
      metric: "",
      title: "Ambiente Médico",
      description:
        "Acesso a Centro de Convenções para simpósios, Academia 24h e áreas de convivência exclusivas para médicos parceiros.",
      icon: "building-2",
    },
    {
      id: "gestao-processos",
      metric: "",
      title: "Gestão de Processos Integrados",
      description:
        "Do IMD direto para o prontuário do bloco cirúrgico, sem perda de informações e com rastreabilidade total.",
      icon: "git-merge",
    },
  ],
  testimonials: [
    {
      id: "depoimento-1",
      quote: "O São Rafael é a base operacional que eu precisava para escalar minha agenda sem abrir mão de nenhum padrão de qualidade. Giro de sala de 40 minutos, equipe treinada e infraestrutura impecável. Aqui eu opero com previsibilidade.",
      author: "Dr. Marcelo Andrade",
      role: "Cirurgião Ortopédico",
      image: "",
    },
    {
      id: "depoimento-2",
      quote: "A integração entre o IMD e o bloco cirúrgico elimina o atrito que sempre existiu na medicina. Meus pacientes chegam preparados, os exames já estão no sistema e eu consigo focar 100% no procedimento. Isso não tem preço.",
      author: "Dra. Fernanda Lemos",
      role: "Cirurgiã Ginecológica",
      image: "",
    },
  ],
  cta: {
    label: "Falar com Consultoria Médica Institucional",
    href: "https://wa.me/message/SN2SK7HN3IUDH1",
  },
} as const

// -----------------------------------------------------------------------------
// FAQ (Dobra 9)
// -----------------------------------------------------------------------------
// NOTA: Perguntas mantidas do site atual. Respostas precisam ser reais.
export const FAQ_DATA = {
  kicker: "TRANSPARÊNCIA E CLAREZA",
  headline: "O que você precisa saber antes da sua decisão cirúrgica.",
  items: [
    {
      id: "faq-1",
      question: "Como funciona o fluxo de atendimento particular?",
      answer:
        "O atendimento no Hospital São Rafael segue um fluxo integrado do primeiro contato até a alta. Tudo começa com o agendamento pela nossa central de atendimento, que organiza cada etapa de acordo com a sua necessidade: consultas, exames, check-ups e preparação cirúrgica. Na sequência, você realiza consultas e exames no IMD, Instituto Médico e Diagnóstico, onde todas as informações já são inseridas digitalmente no prontuário integrado. Com o preparo concluído, incluindo a consulta pré-anestésica quando indicada, o procedimento é realizado em um de nossos 22 centros cirúrgicos. Após a cirurgia, você passa pela recuperação com suporte contínuo da equipe, podendo contar com a Unidade de Transição até o retorno seguro à rotina. Todo esse trajeto acontece sem sair do nosso complexo.",
    },
    {
      id: "faq-2",
      question: "Meu cirurgião pode operar no São Rafael?",
      answer:
        "Sim. O Hospital São Rafael é um hospital de corpo clínico aberto, o que significa que qualquer médico com registro ativo e em situação regular no conselho pode solicitar credenciamento para realizar procedimentos em nossas instalações, sem a necessidade de vínculo empregatício com o hospital. O processo é conduzido pela nossa Consultoria Médica Institucional, que avalia o perfil do profissional e alinha as especialidades e protocolos aplicáveis. Uma vez credenciado, o cirurgião conta com 22 salas cirúrgicas equipadas com tecnologia de última geração, instrumentadores especializados, suporte técnico dedicado e giro de sala de 40 minutos, garantindo previsibilidade e eficiência para a sua agenda. Para iniciar o processo, entre em contato pelo botão \"Falar com Consultoria Médica Institucional\".",
    },
    {
      id: "faq-3",
      question: "Qual a real diferença do Upgrade de Acomodação?",
      answer:
        "O Upgrade de Acomodação transforma o período pós-cirúrgico em uma experiência de recuperação diferenciada. Além de todo o suporte clínico, você conta com quarto de maior privacidade e conforto, atendimento exclusivo e personalizado e um ambiente pensado para que você descanse com tranquilidade. É a escolha ideal para quem deseja uma internação com padrão elevado de hotelaria hospitalar, unindo excelência médica e bem-estar em cada detalhe.",
    },
    {
      id: "faq-4",
      question: "Como o IMD agiliza minha cirurgia?",
      answer:
        "O IMD funciona de forma totalmente integrada ao bloco cirúrgico do Hospital São Rafael. Consultas, exames de imagem e laudos realizados no Instituto alimentam automaticamente o prontuário digital do centro cirúrgico — sem reencaminhamentos, repetição de informações ou perda de dados. Quando chega o dia da cirurgia, seu médico já tem acesso a tudo que precisa, com rastreabilidade total. Esse modelo elimina a espera e a burocracia que normalmente existe entre diagnóstico e procedimento, garantindo mais agilidade, segurança e previsibilidade para você e para o seu cirurgião.",
    },
    // [PENDENTE CLIENTE] Avaliar se mais perguntas são necessárias:
    // - Sobre formas de pagamento
    // - Sobre convênios (se aplicável)
    // - Sobre acompanhantes
    // - Sobre tempo médio de internação
  ],
} as const

// -----------------------------------------------------------------------------
// FOOTER (Dobra 10)
// -----------------------------------------------------------------------------
export const FOOTER_DATA = {
  description:
    "Excelência em saúde com infraestrutura completa e atendimento humanizado em Belo Horizonte.",
  stats: [
    { label: "Leitos", value: 65 },
    { label: "Salas Cirúrgicas", value: 22 },
  ],
  navigation: {
    pacientes: {
      title: "PARA PACIENTES",
      links: [
        { label: "Marcar consulta", href: "#" },
        { label: "Marcar exame", href: "#" },
        { label: "Resultado de exames", href: "#" },
        { label: "Emergências", href: "#" },
        { label: "Encontre um médico", href: "#" },
      ],
    },
    hospital: {
      title: "O HOSPITAL",
      links: [
        { label: "Nossa história", href: "#" },
        { label: "Especialidades", href: "#especialidades" },
        { label: "Centro médico", href: "#servicos" },
        { label: "Qualidade", href: "#" },
        { label: "Trabalhe conosco", href: "#" },
        { label: "Ouvidoria", href: "#" },
      ],
    },
  },
  contact: {
    address: {
      street: "Av. Raja Gabáglia, 1380",
      neighborhood: "Gutierrez — BH / MG",
      cep: "CEP 30441-194",
    },
    phone: "(31) 2517-0900",
    email: "relacionamentocliente@hospitalsaorafael.com",
  },
  social: [
    { platform: "instagram", url: "https://www.instagram.com/hospitalsaorafaelmg/", icon: "instagram" },
    { platform: "linkedin", url: "https://www.linkedin.com/company/hospitalsaorafaelmg/", icon: "linkedin" },
    { platform: "youtube", url: "https://www.youtube.com/@hospitalsaorafaelmg", icon: "youtube" },
    { platform: "tiktok", url: "https://www.tiktok.com/@hospitalsaorafaelmg", icon: "tiktok" },
  ],
  emergency: {
    label: "Emergência 24 horas",
    href: "tel:+553125170000",
  },
} as const

// -----------------------------------------------------------------------------
// METADATA (SEO)
// -----------------------------------------------------------------------------
export const SITE_METADATA = {
  title: "Hospital São Rafael | Centro de Cirurgias Eletivas Particulares - BH",
  description:
    "A maior estrutura de cirurgias eletivas particulares do Brasil. Tecnologia de ponta, agilidade e acolhimento do diagnóstico à recuperação completa.",
  url: "https://hospitalsaorafael.com", // [PENDENTE CLIENTE] URL final do domínio
  ogImage: "/og-image.png",
  locale: "pt_BR",
  type: "website",
} as const

// -----------------------------------------------------------------------------
// SCHEMA.ORG (JSON-LD)
// -----------------------------------------------------------------------------
export const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: "Hospital São Rafael",
  description: SITE_METADATA.description,
  url: SITE_METADATA.url,
  telephone: "(31) 2517-XXXX", // [PENDENTE CLIENTE] Número real
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Raja Gabáglia, 1380",
    addressLocality: "Belo Horizonte",
    addressRegion: "MG",
    postalCode: "30441-194",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -19.9437,  // [VERIFICAR] Coordenadas aproximadas
    longitude: -43.9582,
  },
  medicalSpecialty: [
    "Ortopedia",
    "Cardiologia",
    "Neurologia",
    "Urologia",
    "Ginecologia",
    "Oftalmologia",
    // [PENDENTE CLIENTE] Completar lista
  ],
  availableService: {
    "@type": "MedicalProcedure",
    name: "Cirurgias Eletivas Particulares",
  },
} as const
