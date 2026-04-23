// =============================================================================
// SERVICES-CONTENT.TS — Dados das páginas de serviço | Hospital São Rafael
// =============================================================================
// Fonte de verdade para todas as páginas /servicos/[slug].
// Cada entrada segue o ServiceDetailData interface.
// =============================================================================

import type { FAQData } from "@/types"

// -----------------------------------------------------------------------------
// TIPOS
// -----------------------------------------------------------------------------

export interface ServiceHeroData {
  kicker: string
  headline: string
  subheadline: string
  backgroundImage: string
  pills: string[]
}

export interface ServiceGalleryImage {
  src: string
  alt: string
}

export interface ServiceFeature {
  icon: string
  title: string
  description: string
}

export interface ServiceGalleryBlockData {
  kicker: string
  headline: string
  description: string
  images: ServiceGalleryImage[]
  features: ServiceFeature[]
  cta: {
    label: string
    href: string
  }
}

export interface ServiceHighlightItem {
  id: string
  metric: string
  icon: string
  title: string
  description: string
}

export interface ServiceHighlightsData {
  kicker: string
  headline: string
  items: ServiceHighlightItem[]
}

export interface ServiceTestimonialItem {
  id: string
  quote: string
  author: string
  role: string
  image: string
}

export interface ServiceTestimonialsData {
  headline: string
  items: ServiceTestimonialItem[]
}

// -----------------------------------------------------------------------------
// TYPES — novos blocos (SEO expansion)
// -----------------------------------------------------------------------------

export interface ServiceNavSection {
  id: string
  label: string
}

export interface ServiceIntroSubsection {
  id: string
  title: string
  paragraphs: string[]
}

export interface ServiceIntroBlockData {
  kicker: string
  headline: string
  paragraphs: string[]
  subsections?: ServiceIntroSubsection[]
}

export interface ServiceIndicationItem {
  id: string
  icon: string
  title: string
  description: string
  highlighted?: boolean
}

export interface ServiceIndicationsData {
  kicker: string
  headline: string
  intro?: string
  items: ServiceIndicationItem[]
  note?: string
}

export interface ServiceEquipmentItem {
  icon: string
  title: string
  description: string
}

export interface ServiceEquipmentData {
  kicker: string
  headline: string
  description?: string
  items: ServiceEquipmentItem[]
}

export interface ServiceProtocolItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface ServiceProtocolsData {
  kicker: string
  headline: string
  intro?: string
  items: ServiceProtocolItem[]
  certifications?: string[]
}

export interface ServiceJourneyStep {
  number: string
  title: string
  description: string
}

export interface ServiceJourneyData {
  kicker: string
  headline: string
  intro?: string
  steps: ServiceJourneyStep[]
}

export interface ServiceRelatedItem {
  slug: string
  title: string
  description: string
  image: string
  icon: string
}

export interface ServiceRelatedData {
  kicker?: string
  headline: string
  items: ServiceRelatedItem[]
}

// -----------------------------------------------------------------------------
// TYPE PRINCIPAL — campos novos opcionais (retrocompat)
// -----------------------------------------------------------------------------

export interface ServiceDetailData {
  slug: string
  meta: {
    title: string
    description: string
  }
  /** Seções para sidebar scroll-spy. Se undefined, sidebar esconde. */
  navSections?: ServiceNavSection[]
  hero: ServiceHeroData
  /** Bloco long-form "O que é" — 300-500 palavras */
  intro?: ServiceIntroBlockData
  /** Indicações/aplicações do serviço (grid) */
  indications?: ServiceIndicationsData
  galleryBlock: ServiceGalleryBlockData
  /** Equipamentos e tecnologia */
  equipment?: ServiceEquipmentData
  highlights: ServiceHighlightsData
  /** Protocolos, segurança e certificações */
  protocols?: ServiceProtocolsData
  /** Jornada passo-a-passo do paciente */
  journey?: ServiceJourneyData
  testimonials: ServiceTestimonialsData
  faq: FAQData
  /** Conteúdo relacionado (cross-link outros serviços) */
  related?: ServiceRelatedData
}

// -----------------------------------------------------------------------------
// CONTEÚDO — Centro Cirúrgico
// -----------------------------------------------------------------------------

const CENTRO_CIRURGICO: ServiceDetailData = {
  slug: "centro-cirurgico",
  meta: {
    title: "Centro Cirúrgico | Hospital São Rafael — 22 Salas para Cirurgias Eletivas",
    description:
      "22 salas cirúrgicas com tecnologia robótica, laparoscopia avançada e taxa de infecção de 0,33%. Conheça o Centro Cirúrgico do Hospital São Rafael em BH.",
  },
  hero: {
    kicker: "CENTRO CIRÚRGICO",
    headline: "22 salas para o mais alto padrão em cirurgias eletivas.",
    subheadline:
      "Tecnologia robótica, laparoscopia avançada e equipe multidisciplinar integrada para o sucesso do seu procedimento.",
    backgroundImage: "/assets/images/servicos/centro-cirurgico-v2.jpg",
    pills: [
      "22 Salas Cirúrgicas",
      "Tecnologia Robótica",
      "Giro de Sala 40min",
      "0,33% Taxa de Infecção",
    ],
  },
  galleryBlock: {
    kicker: "ESTRUTURA",
    headline: "Projetado para zero imprevistos.",
    description:
      "Cada detalhe das nossas salas foi planejado para dar ao cirurgião controle total sobre o ambiente e ao paciente máxima segurança. Da entrada no centro cirúrgico à sala de recuperação, tudo é gerenciado por protocolos rígidos de qualidade.",
    images: [
      {
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Sala cirúrgica equipada com tecnologia de última geração",
      },
      {
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Bloco cirúrgico com equipe médica",
      },
      {
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Área de recuperação pós-operatória",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Salas para laparoscopia e cirurgia robótica",
        description: "Equipamentos de última geração integrados ao fluxo cirúrgico",
      },
      {
        icon: "check-circle",
        title: "Monitorização intraoperatória contínua",
        description: "Segurança máxima durante todo o ato cirúrgico",
      },
      {
        icon: "check-circle",
        title: "Giro de sala de 40 minutos",
        description: "Processos ágeis que otimizam a agenda do cirurgião",
      },
      {
        icon: "check-circle",
        title: "Equipe de instrumentadores exclusiva",
        description: "Suporte técnico especializado em cada procedimento",
      },
    ],
    cta: {
      label: "Falar com Atendimento",
      href: "#contato",
    },
  },
  highlights: {
    kicker: "NÚMEROS QUE COMPROVAM",
    headline: "Excelência que se mede em dados.",
    items: [
      {
        id: "salas",
        metric: "22",
        icon: "building-2",
        title: "Salas Cirúrgicas",
        description:
          "Todas equipadas com tecnologia de última geração para procedimentos de baixa a altíssima complexidade.",
      },
      {
        id: "giro",
        metric: "40min",
        icon: "timer",
        title: "Giro de Sala",
        description:
          "Processos ágeis que reduzem a ociosidade e maximizam a previsibilidade da sua agenda cirúrgica.",
      },
      {
        id: "infeccao",
        metric: "0,33%",
        icon: "shield-check",
        title: "Taxa de Infecção",
        description:
          "Um dos indicadores mais rigorosos do setor, muito abaixo da média nacional de hospitais de grande porte.",
      },
      {
        id: "experiencia",
        metric: "+12.000",
        icon: "activity",
        title: "Procedimentos Realizados",
        description:
          "Uma base de experiência clínica sólida que sustenta cada decisão do nosso time médico e operacional.",
      },
    ],
  },
  testimonials: {
    headline: "O que dizem nossos pacientes",
    items: [
      {
        id: "t1",
        quote:
          "A estrutura do Hospital São Rafael é impressionante. Me senti seguro e bem cuidado em todas as etapas, do pré-operatório à alta. A equipe foi extraordinária.",
        author: "Carlos Eduardo M.",
        role: "Paciente — Cirurgia de Joelho",
        image: "",
      },
      {
        id: "t2",
        quote:
          "Minha cirurgia foi realizada com total tranquilidade. A integração entre o IMD e o centro cirúrgico fez toda a diferença no meu processo de preparo e recuperação.",
        author: "Ana Lucia S.",
        role: "Paciente — Cirurgia Abdominal",
        image: "",
      },
      {
        id: "t3",
        quote:
          "Como cirurgião, encontrei aqui tudo que preciso para operar com confiança: infraestrutura moderna, equipe treinada e um giro de sala que me permite atender mais pacientes com qualidade.",
        author: "Dr. Rodrigo F.",
        role: "Cirurgião Ortopédico Parceiro",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Perguntas frequentes sobre o Centro Cirúrgico",
    items: [
      {
        id: "cc-faq-1",
        question: "O que são cirurgias eletivas particulares?",
        answer:
          "São procedimentos cirúrgicos planejados com antecedência, que não necessitam de urgência, realizados em regime particular. No Hospital São Rafael, o agendamento é ágil e a internação ocorre em um ambiente confortável e seguro, sem filas ou imprevistos burocráticos.",
      },
      {
        id: "cc-faq-2",
        question: "Como funciona o agendamento de uma cirurgia?",
        answer:
          "Após a indicação do seu médico, nossa equipe de relacionamento coordena todos os detalhes: agendamento da sala cirúrgica, exames pré-operatórios no IMD integrado e reserva de acomodação. Um único ponto de contato para todo o processo.",
      },
      {
        id: "cc-faq-3",
        question: "Meu cirurgião pode realizar o procedimento no HSR?",
        answer:
          "Sim. Médicos credenciados e não credenciados podem operar em nosso centro. Entre em contato com nossa Consultoria Médica Institucional para conhecer o processo de credenciamento e os recursos disponíveis para cada especialidade.",
      },
      {
        id: "cc-faq-4",
        question: "Quais especialidades são atendidas no Centro Cirúrgico?",
        answer:
          "Atendemos cirurgias eletivas de Ortopedia, Cardiologia, Neurologia, Urologia, Ginecologia, Oftalmologia e outras especialidades. Nossas 22 salas estão preparadas para procedimentos de baixa a altíssima complexidade, incluindo cirurgias robóticas e laparoscópicas.",
      },
      {
        id: "cc-faq-5",
        question: "Qual é o suporte disponível no pós-operatório?",
        answer:
          "Contamos com internação confortável, Unidade de Transição para acompanhamento pós-cirúrgico, Terapia Hiperbárica para recuperação acelerada e protocolo de alta segura. Cada etapa é monitorada pela nossa equipe multidisciplinar.",
      },
    ],
  },
}

// -----------------------------------------------------------------------------
// CONTEÚDO — Internação
// -----------------------------------------------------------------------------

const INTERNACAO: ServiceDetailData = {
  slug: "internacao",
  meta: {
    title: "Internação | Hospital São Rafael — Conforto e Segurança na Recuperação",
    description:
      "Acomodações individuais projetadas para recuperação pós-cirúrgica com monitoramento contínuo, equipe dedicada e protocolos rigorosos de segurança. Internação particular no Hospital São Rafael, BH.",
  },
  hero: {
    kicker: "INTERNAÇÃO",
    headline: "Recuperação segura em um ambiente desenhado para o seu bem-estar.",
    subheadline:
      "Acomodações confortáveis, monitoramento 24 horas e equipe multidisciplinar integrada para que você se dedique apenas a recuperar.",
    backgroundImage: "/assets/images/servicos/internacao.jpg",
    pills: [
      "65 Leitos",
      "Monitoramento 24h",
      "Equipe Multidisciplinar",
      "UTI Integrada",
    ],
  },
  galleryBlock: {
    kicker: "ESTRUTURA",
    headline: "Um ambiente projetado para a sua recuperação.",
    description:
      "Cada detalhe das nossas acomodações foi pensado para unir conforto e segurança clínica. Quartos individuais com monitoramento contínuo, equipe de enfermagem exclusiva e processos integrados ao centro cirúrgico e ao IMD garantem que o período de internação seja o mais tranquilo e seguro possível.",
    images: [
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Acomodação individual do Hospital São Rafael",
      },
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Posto de enfermagem com monitoramento contínuo",
      },
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Quarto com espaço para acompanhante",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Quartos individuais com banheiro privativo",
        description: "Privacidade e conforto para paciente e acompanhante durante toda a internação",
      },
      {
        icon: "check-circle",
        title: "Monitorização contínua à beira do leito",
        description: "Equipamentos modernos que acompanham os sinais vitais em tempo real",
      },
      {
        icon: "check-circle",
        title: "Equipe de enfermagem exclusiva",
        description: "Profissionais treinados e dedicados ao cuidado individualizado de cada paciente",
      },
      {
        icon: "check-circle",
        title: "Integração total com centro cirúrgico e IMD",
        description: "Prontuário único compartilhado entre todos os setores, sem perda de informação",
      },
    ],
    cta: {
      label: "Falar com Atendimento",
      href: "#contato",
    },
  },
  highlights: {
    kicker: "NÚMEROS QUE COMPROVAM",
    headline: "Segurança e conforto medidos em resultados.",
    items: [
      {
        id: "leitos",
        metric: "65",
        icon: "bed",
        title: "Leitos Disponíveis",
        description:
          "Estrutura robusta para atender cirurgias eletivas de baixa a altíssima complexidade com total disponibilidade e sem imprevistos de ocupação.",
      },
      {
        id: "monitoramento",
        metric: "24h",
        icon: "activity",
        title: "Monitoramento Contínuo",
        description:
          "Enfermagem e equipe médica presentes ininterruptamente, com sistemas de chamada imediata e protocolos de resposta rápida.",
      },
      {
        id: "integracao",
        metric: "100%",
        icon: "git-merge",
        title: "Integração Prontuário",
        description:
          "Informações do IMD, bloco cirúrgico e internação em um único prontuário digital, garantindo rastreabilidade e continuidade do cuidado.",
      },
      {
        id: "uti",
        metric: "UTI",
        icon: "shield-check",
        title: "Suporte Intensivo Integrado",
        description:
          "UTI disponível no mesmo complexo para casos que exijam suporte intensivo, com transferência ágil e equipe já familiarizada com o histórico do paciente.",
      },
    ],
  },
  testimonials: {
    headline: "O que dizem nossos pacientes",
    items: [
      {
        id: "t1",
        quote:
          "A equipe de enfermagem foi excepcional. Atenção e cuidado em cada momento, de dia e de noite. Me senti seguro e bem assistido durante toda a internação. Voltaria sem hesitar.",
        author: "Roberto Almeida S.",
        role: "Paciente — Cirurgia de Quadril",
        image: "",
      },
      {
        id: "t2",
        quote:
          "O quarto era muito confortável e tinha espaço para minha esposa ficar comigo. A integração com o centro cirúrgico foi perfeita — do pós-op direto para a internação, sem burocracia e sem atrito.",
        author: "Marcos Paulo V.",
        role: "Paciente — Cirurgia Cardíaca Eletiva",
        image: "",
      },
      {
        id: "t3",
        quote:
          "Como cirurgiã, fico tranquila sabendo que meus pacientes estão em boas mãos depois da cirurgia. A equipe de internação é treinada, os protocolos são rigorosos e a comunicação comigo é rápida e clara.",
        author: "Dra. Patrícia Souza",
        role: "Cirurgiã Ginecológica Parceira",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Perguntas frequentes sobre a Internação",
    items: [
      {
        id: "int-faq-1",
        question: "Como funciona o processo de internação no Hospital São Rafael?",
        answer:
          "A internação é programada junto com o agendamento da cirurgia. Nossa equipe de relacionamento orienta o paciente sobre todos os documentos necessários, horário de chegada e o que trazer. Na admissão, um enfermeiro dedicado realiza a triagem e apresenta todas as instalações. O objetivo é que o paciente se sinta acolhido desde o primeiro momento.",
      },
      {
        id: "int-faq-2",
        question: "Acompanhante pode ficar durante toda a internação?",
        answer:
          "Sim. Nossos quartos individuais são projetados para acomodar um acompanhante com conforto, incluindo poltrona reclinável para descanso. O acompanhante tem acesso a alimentação, Wi-Fi e todas as comodidades do hospital. Em casos especiais, a equipe médica pode indicar restrições por critério clínico.",
      },
      {
        id: "int-faq-3",
        question: "Qual é o tempo médio de internação para cirurgias eletivas?",
        answer:
          "O tempo de internação varia conforme o tipo de procedimento e a evolução clínica de cada paciente. Cirurgias minimamente invasivas costumam ter alta em 24 a 48 horas. Procedimentos de maior complexidade podem exigir 3 a 5 dias. Seu cirurgião informará o tempo estimado no pré-operatório.",
      },
      {
        id: "int-faq-4",
        question: "Como é o suporte nutricional durante a internação?",
        answer:
          "Contamos com equipe de nutrição clínica que avalia e acompanha cada paciente, adaptando a dieta às necessidades pós-cirúrgicas. As refeições são preparadas no hospital, com opções para restrições alimentares e preferências do paciente. Acompanhantes têm acesso à praça de alimentação do complexo.",
      },
      {
        id: "int-faq-5",
        question: "O que acontece em caso de necessidade de UTI?",
        answer:
          "O Hospital São Rafael conta com UTI integrada ao complexo. Em caso de necessidade, a transferência é feita de forma ágil e segura, com a equipe já familiarizada com o histórico do paciente por conta do prontuário único. Nossos protocolos garantem que qualquer intercorrência seja tratada com rapidez e precisão.",
      },
    ],
  },
}

// -----------------------------------------------------------------------------
// CONTEÚDO — Terapia Hiperbárica (template SEO-expandido)
// -----------------------------------------------------------------------------

const HIPERBARICA: ServiceDetailData = {
  slug: "hiperbarica",
  meta: {
    title: "Terapia Hiperbárica em Belo Horizonte | Câmara Hiperbárica HSR",
    description:
      "Medicina hiperbárica no Hospital São Rafael, BH. Oxigenoterapia indicada para pós-cirúrgico, cicatrização, osteomielite, pé diabético e mais. Agende uma avaliação.",
  },
  navSections: [
    { id: "intro", label: "O que é" },
    { id: "indicacoes", label: "Indicações" },
    { id: "infraestrutura", label: "Infraestrutura" },
    { id: "equipamentos", label: "Equipamentos" },
    { id: "numeros", label: "Números" },
    { id: "protocolos", label: "Protocolos" },
    { id: "jornada", label: "Como funciona" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Dúvidas" },
  ],
  hero: {
    kicker: "MEDICINA HIPERBÁRICA",
    headline: "Terapia hiperbárica no Hospital São Rafael",
    subheadline:
      "Oxigenoterapia hiperbárica para recuperação pós-cirúrgica acelerada, tratamento de feridas complexas e suporte em diversas condições clínicas em Belo Horizonte.",
    backgroundImage: "/assets/images/servicos/hiperbarica_2.jpg",
    pills: [
      "14 indicações CFM",
      "Sessões de 90 a 120min",
      "Integrada ao complexo",
      "Equipe especializada",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Entenda a terapia hiperbárica e seus benefícios clínicos",
    paragraphs: [
      "A terapia hiperbárica — também conhecida como oxigenoterapia hiperbárica (OHB) ou medicina hiperbárica — é um tratamento médico que consiste em administrar oxigênio a 100% de concentração dentro de uma câmara pressurizada, em pressões que variam geralmente de 2 a 3 atmosferas absolutas (ATA). Esse ambiente controlado permite que o organismo absorva até 20 vezes mais oxigênio do que em condições normais, acelerando processos de cicatrização, combate a infecções e regeneração de tecidos.",
      "No Hospital São Rafael, a câmara hiperbárica integra-se à estrutura do centro cirúrgico e à unidade de internação, oferecendo suporte contínuo a pacientes em recuperação pós-operatória, pacientes com feridas crônicas e casos clínicos que exigem alta oxigenação tecidual. Cada sessão é conduzida por equipe médica com experiência em medicina hiperbárica, monitorada do início ao fim com segurança e conforto.",
      "A modalidade é reconhecida pelo Conselho Federal de Medicina (CFM) há mais de duas décadas e possui indicações específicas para 14 condições clínicas, incluindo cicatrização de feridas complexas, osteomielite refratária, intoxicação por monóxido de carbono, radionecrose, pé diabético e suporte pós-cirúrgico. A prescrição deve ser sempre feita por médico assistente em conjunto com o médico hiperbaricista responsável pelo serviço.",
    ],
    subsections: [
      {
        id: "como-funciona",
        title: "Como funciona a oxigenoterapia hiperbárica",
        paragraphs: [
          "Durante a sessão, o paciente entra na câmara hiperbárica e respira oxigênio puro enquanto a pressão interna é gradualmente elevada. Esse processo, chamado de compressão, dura em média 10 a 15 minutos. Em seguida, a pressão é mantida estável por 60 a 90 minutos no platô terapêutico, período em que ocorre a hiperoxigenação tecidual — responsável pelos efeitos clínicos da terapia.",
          "Ao final da sessão, a pressão é reduzida lentamente (descompressão) até retornar ao nível atmosférico normal. O tempo total costuma variar de 90 a 120 minutos por sessão. A frequência e o número total de sessões são definidos pelo médico hiperbaricista conforme a condição clínica, variando de poucas sessões em quadros agudos até ciclos de 20 a 40 sessões em tratamentos de feridas crônicas.",
        ],
      },
      {
        id: "monoplace-multiplace",
        title: "Diferença entre câmara monoplace e multiplace",
        paragraphs: [
          "Câmaras monoplace acomodam um único paciente por sessão, são pressurizadas com oxigênio puro e permitem monitorização individualizada. Câmaras multiplace acomodam múltiplos pacientes simultaneamente, são pressurizadas com ar comprimido e o oxigênio é administrado por máscara ou capuz individual — permitindo que a equipe médica acompanhe o paciente dentro da câmara quando necessário.",
          "O Hospital São Rafael opera sua câmara hiperbárica com atenção individualizada e monitorização contínua, garantindo segurança e conforto mesmo em sessões prolongadas ou em pacientes que requerem suporte clínico durante o tratamento.",
        ],
      },
    ],
  },
  indications: {
    kicker: "INDICAÇÕES",
    headline: "Para que serve a câmara hiperbárica",
    intro:
      "A medicina hiperbárica é indicada em 14 condições reconhecidas pelo Conselho Federal de Medicina. No contexto de cirurgias eletivas particulares, ela se destaca no suporte pós-operatório e no tratamento de feridas complexas. Conheça as principais aplicações:",
    items: [
      {
        id: "pos-cirurgico",
        icon: "scalpel",
        title: "Suporte pós-cirúrgico",
        description:
          "Aceleração da cicatrização em retalhos comprometidos, enxertos de pele e suturas de alta tensão, reduzindo complicações e tempo de recuperação.",
        highlighted: true,
      },
      {
        id: "pe-diabetico",
        icon: "activity",
        title: "Pé diabético",
        description:
          "Tratamento adjuvante em úlceras crônicas de membro inferior em pacientes diabéticos, reduzindo risco de amputação.",
      },
      {
        id: "osteomielite",
        icon: "bone",
        title: "Osteomielite crônica",
        description:
          "Suporte no tratamento de infecções ósseas refratárias a antibióticos convencionais e cirurgia, promovendo maior oxigenação óssea.",
      },
      {
        id: "radionecrose",
        icon: "shield-check",
        title: "Radionecrose",
        description:
          "Tratamento de lesões de tecidos moles e ósseos causadas por radioterapia, especialmente em região de cabeça e pescoço.",
      },
      {
        id: "feridas-cronicas",
        icon: "sparkles",
        title: "Feridas crônicas",
        description:
          "Úlceras venosas, arteriais e por pressão que não cicatrizam com tratamento convencional em tempo adequado.",
      },
      {
        id: "embolia-gasosa",
        icon: "wind",
        title: "Embolia gasosa",
        description:
          "Emergência médica por bolhas de ar na circulação — complicação rara de cirurgia, trauma ou mergulho.",
      },
      {
        id: "intoxicacao-co",
        icon: "shield-check",
        title: "Intoxicação por monóxido de carbono",
        description:
          "Intervenção emergencial que acelera a eliminação do CO ligado à hemoglobina, reduzindo sequelas neurológicas.",
      },
      {
        id: "surdez-subita",
        icon: "activity",
        title: "Surdez súbita idiopática",
        description:
          "Tratamento adjuvante em casos selecionados, com melhor resposta quando iniciado nas primeiras semanas do quadro.",
      },
      {
        id: "infeccao-tecidos-moles",
        icon: "shield-check",
        title: "Infecções graves de tecidos moles",
        description:
          "Gangrena gasosa, fasciite necrosante e outras infecções por germes anaeróbios que exigem combate agressivo.",
      },
    ],
    note:
      "Lista baseada na Resolução CFM nº 1.457/1995 e atualizações. A indicação final sempre depende de avaliação médica individualizada e discussão entre médico assistente e hiperbaricista.",
  },
  galleryBlock: {
    kicker: "INFRAESTRUTURA",
    headline: "Câmara hiperbárica integrada ao Hospital São Rafael",
    description:
      "A estrutura de medicina hiperbárica do HSR foi projetada para oferecer segurança, conforto e integração total com o centro cirúrgico e a unidade de internação. Pacientes em recuperação pós-operatória recebem suporte dentro do mesmo complexo, sem necessidade de deslocamento — um diferencial crítico em tratamentos que exigem ciclos frequentes de sessões.",
    images: [
      {
        src: "/assets/images/servicos/hiperbarica_2.jpg",
        alt: "Câmara hiperbárica do Hospital São Rafael em Belo Horizonte",
      },
      {
        src: "/assets/images/servicos/hiperbarica_2.jpg",
        alt: "Ambiente da medicina hiperbárica no HSR",
      },
      {
        src: "/assets/images/servicos/hiperbarica_2.jpg",
        alt: "Equipe hiperbárica durante monitorização",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Equipe médica com formação em hiperbárica",
        description:
          "Médicos com título reconhecido em medicina hiperbárica coordenando cada sessão.",
      },
      {
        icon: "check-circle",
        title: "Integração com centro cirúrgico e internação",
        description:
          "Suporte contínuo para pacientes operados sem deslocamento externo.",
      },
      {
        icon: "check-circle",
        title: "Monitorização clínica contínua",
        description:
          "Sinais vitais acompanhados do início ao fim da sessão.",
      },
      {
        icon: "check-circle",
        title: "Ambiente climatizado e privativo",
        description:
          "Conforto térmico e acústico para sessões de até 120 minutos.",
      },
    ],
    cta: {
      label: "Falar com atendimento",
      href: "#contato",
    },
  },
  equipment: {
    kicker: "TECNOLOGIA",
    headline: "Equipamentos e recursos técnicos",
    description:
      "A câmara hiperbárica do HSR é operada dentro de rigorosos padrões técnicos e regulatórios, com equipamentos de referência em medicina hiperbárica moderna.",
    items: [
      {
        icon: "building-2",
        title: "Câmara hiperbárica [modelo]",
        description:
          "Equipamento certificado para pressões terapêuticas de até 2,4 ATA, com sistema de segurança redundante e janelas de observação para contato visual constante com a equipe.",
      },
      {
        icon: "activity",
        title: "Sistema de monitorização integrado",
        description:
          "Acompanhamento de sinais vitais (frequência cardíaca, saturação, pressão arterial) em tempo real, com registro eletrônico por sessão.",
      },
      {
        icon: "shield-check",
        title: "Protocolo de suporte emergencial",
        description:
          "Interface direta com UTI e centro cirúrgico do HSR para resposta imediata em qualquer intercorrência clínica.",
      },
      {
        icon: "check-circle",
        title: "Ambiente antiestático normatizado",
        description:
          "Vestimenta 100% algodão, cosméticos controlados e ambiente com umidade regulada, seguindo normas ANVISA de segurança em oxigenoterapia.",
      },
      {
        icon: "headset",
        title: "Comunicação bidirecional com equipe",
        description:
          "Sistema de intercomunicação durante toda a sessão. Entretenimento por áudio disponível para maior conforto.",
      },
    ],
  },
  highlights: {
    kicker: "NÚMEROS",
    headline: "Medicina hiperbárica em dados",
    items: [
      {
        id: "sessao",
        metric: "90-120min",
        icon: "timer",
        title: "Duração média",
        description:
          "Tempo total da sessão incluindo compressão, platô terapêutico e descompressão gradual.",
      },
      {
        id: "indicacoes",
        metric: "14",
        icon: "clipboard-check",
        title: "Indicações CFM",
        description:
          "Condições clínicas reconhecidas pelo Conselho Federal de Medicina para uso da oxigenoterapia hiperbárica.",
      },
      {
        id: "pressao",
        metric: "2,4 ATA",
        icon: "activity",
        title: "Pressão operacional",
        description:
          "Pressão máxima terapêutica, equivalente a aproximadamente 14 metros de profundidade em ambiente aquático.",
      },
      {
        id: "integracao",
        metric: "100%",
        icon: "git-merge",
        title: "Integrada ao HSR",
        description:
          "Serviço dentro do próprio complexo hospitalar, eliminando deslocamento e garantindo continuidade do cuidado.",
      },
    ],
  },
  protocols: {
    kicker: "SEGURANÇA",
    headline: "Protocolos rigorosos para cada sessão",
    intro:
      "Segurança é o primeiro princípio da medicina hiperbárica. Cada sessão no HSR segue protocolos internacionais de preparo, monitorização e resposta a intercorrências, alinhados às normas da Sociedade Brasileira de Medicina Hiperbárica (SBMH) e da ANVISA.",
    items: [
      {
        id: "avaliacao",
        icon: "clipboard-check",
        title: "Avaliação pré-tratamento",
        description:
          "Consulta médica prévia com hiperbaricista, avaliação de contraindicações e definição do número de sessões.",
      },
      {
        id: "preparo",
        icon: "user-check",
        title: "Preparo do paciente",
        description:
          "Vestimenta antiestática, remoção de cosméticos e objetos metálicos, orientação sobre respiração e equalização.",
      },
      {
        id: "monitorizacao",
        icon: "activity",
        title: "Monitorização contínua",
        description:
          "Sinais vitais acompanhados do início ao fim, com profissional dedicado à janela de observação.",
      },
      {
        id: "resposta-rapida",
        icon: "shield-check",
        title: "Resposta rápida integrada",
        description:
          "Em caso de intercorrência, acesso imediato à UTI e centro cirúrgico do complexo HSR.",
      },
      {
        id: "registro",
        icon: "check-circle",
        title: "Registro e rastreabilidade",
        description:
          "Cada sessão é documentada no prontuário eletrônico, com histórico integrado ao cuidado hospitalar do paciente.",
      },
      {
        id: "pos-sessao",
        icon: "heart-handshake",
        title: "Acompanhamento pós-sessão",
        description:
          "Avaliação clínica após cada sessão e orientação para o paciente sobre sinais a observar antes do próximo atendimento.",
      },
    ],
    certifications: [
      "ANVISA",
      "SBMH — Sociedade Brasileira de Medicina Hiperbárica",
      "CFM — Resolução 1.457/1995",
      "Protocolos internos HSR",
    ],
  },
  journey: {
    kicker: "COMO FUNCIONA",
    headline: "Sua jornada no tratamento hiperbárico",
    intro:
      "Do primeiro contato à finalização do ciclo terapêutico, você é acompanhado por uma equipe dedicada. Entenda como é cada etapa:",
    steps: [
      {
        number: "1",
        title: "Indicação e avaliação médica",
        description:
          "A partir da prescrição do seu médico assistente, nossa equipe hiperbárica agenda uma avaliação para definir protocolo, número de sessões e cronograma de tratamento.",
      },
      {
        number: "2",
        title: "Orientação pré-tratamento",
        description:
          "Você recebe todas as instruções sobre preparo: vestimenta apropriada, restrições alimentares quando aplicáveis, documentos necessários e o que esperar da primeira sessão.",
      },
      {
        number: "3",
        title: "Chegada e preparo",
        description:
          "Na data agendada, você é recebido pela equipe, troca a vestimenta (100% algodão antiestático), faz avaliação clínica rápida e é apresentado à câmara hiperbárica.",
      },
      {
        number: "4",
        title: "Sessão de oxigenoterapia",
        description:
          "Sessão de 90 a 120 minutos. Durante a compressão e a descompressão pode haver sensação nos ouvidos — a equipe orienta técnicas simples de equalização. No platô terapêutico, o tratamento ocorre com conforto total.",
      },
      {
        number: "5",
        title: "Avaliação pós-sessão e retorno",
        description:
          "Avaliação clínica breve ao final, registro da sessão em prontuário eletrônico, orientações para o intervalo até a próxima sessão e, ao fim do ciclo, relatório integrado para o médico assistente.",
      },
    ],
  },
  testimonials: {
    headline: "O que dizem nossos pacientes",
    items: [
      {
        id: "t1",
        quote:
          "Após a cirurgia, o médico indicou as sessões de câmara hiperbárica. Foi impressionante ver a diferença na cicatrização. Me senti segura e bem acompanhada em cada sessão.",
        author: "Paciente HSR",
        role: "Pós-cirúrgico",
        image: "",
      },
      {
        id: "t2",
        quote:
          "Fazia acompanhamento para uma ferida complexa que não cicatrizava há meses. A integração com o hospital foi perfeita e o resultado superou minhas expectativas.",
        author: "Paciente HSR",
        role: "Tratamento de ferida crônica",
        image: "",
      },
      {
        id: "t3",
        quote:
          "Como médico, tenho indicado a hiperbárica do HSR aos meus pacientes no pós-operatório. A equipe é preparada e a comunicação comigo é rápida e clara a cada sessão.",
        author: "Médico parceiro HSR",
        role: "Cirurgião",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Dúvidas frequentes sobre terapia hiperbárica",
    items: [
      {
        id: "hip-faq-1",
        question: "Quanto tempo dura uma sessão de câmara hiperbárica?",
        answer:
          "Cada sessão dura entre 90 e 120 minutos, incluindo o tempo de compressão (entrada gradual na pressão terapêutica), o platô terapêutico de 60 a 90 minutos com oxigênio a 100%, e a descompressão gradual até o retorno à pressão atmosférica normal.",
      },
      {
        id: "hip-faq-2",
        question: "Quantas sessões de terapia hiperbárica são necessárias?",
        answer:
          "O número de sessões varia conforme a condição clínica. Casos agudos como intoxicação por CO ou embolia gasosa podem exigir poucas sessões. Tratamentos crônicos como feridas complexas, osteomielite ou radionecrose geralmente envolvem ciclos de 20 a 40 sessões. A definição é feita pelo médico hiperbaricista após avaliação.",
      },
      {
        id: "hip-faq-3",
        question: "A terapia hiperbárica dói?",
        answer:
          "Não é um procedimento doloroso. Durante a fase de compressão e descompressão, alguns pacientes relatam sensação nos ouvidos, semelhante à que ocorre em decolagens de avião. A equipe orienta técnicas simples de equalização (bocejar, deglutir) que resolvem esse desconforto. No platô terapêutico, o paciente fica confortável.",
      },
      {
        id: "hip-faq-4",
        question: "Posso fazer câmara hiperbárica com claustrofobia?",
        answer:
          "Claustrofobia leve a moderada é compatível com o tratamento, especialmente porque as câmaras modernas têm janelas de observação e comunicação bidirecional constante com a equipe. Em casos mais severos, o médico hiperbaricista pode recomendar preparação prévia ou medicação ansiolítica. Nunca deixe de mencionar esse histórico na avaliação.",
      },
      {
        id: "hip-faq-5",
        question: "Existem contraindicações para a oxigenoterapia hiperbárica?",
        answer:
          "Sim. A principal contraindicação absoluta é pneumotórax não tratado. Contraindicações relativas incluem doença pulmonar obstrutiva grave, infecções respiratórias agudas, história de cirurgia torácica ou de ouvido recente, gravidez (casos selecionados) e alguns quadros oncológicos ativos. A avaliação pré-tratamento identifica e trata qualquer restrição.",
      },
      {
        id: "hip-faq-6",
        question: "Quais são os efeitos colaterais possíveis?",
        answer:
          "Efeitos colaterais são geralmente leves e transitórios. Os mais comuns são desconforto auricular durante mudanças de pressão, fadiga leve pós-sessão e, raramente, alterações visuais temporárias após ciclos longos. Efeitos mais graves são muito raros quando os protocolos de segurança são seguidos adequadamente.",
      },
      {
        id: "hip-faq-7",
        question: "Convênios e planos de saúde cobrem terapia hiperbárica?",
        answer:
          "A cobertura depende do plano e da indicação clínica. O Rol da ANS prevê cobertura obrigatória para algumas indicações específicas. Nossa equipe de relacionamento orienta sobre o processo de autorização e documentação necessária para cada convênio.",
      },
      {
        id: "hip-faq-8",
        question: "SUS cobre terapia hiperbárica?",
        answer:
          "O SUS oferece terapia hiperbárica em serviços credenciados para indicações específicas, mediante encaminhamento pela rede pública. O Hospital São Rafael é um serviço particular — a cobertura via SUS não se aplica ao nosso atendimento.",
      },
      {
        id: "hip-faq-9",
        question: "Quem pode prescrever terapia hiperbárica?",
        answer:
          "Qualquer médico pode prescrever, mas a indicação deve ser validada pelo médico hiperbaricista responsável pelo serviço. A prescrição envolve avaliação da condição clínica, revisão de contraindicações e definição de protocolo — sempre em conjunto entre médico assistente e hiperbaricista.",
      },
      {
        id: "hip-faq-10",
        question: "Posso fazer sessões hiperbáricas logo após uma cirurgia?",
        answer:
          "Sim, e é uma das principais indicações do HSR. A oxigenoterapia hiperbárica no pós-operatório é especialmente útil em retalhos comprometidos, enxertos de pele e suturas de alta tensão. No nosso caso, a integração com o centro cirúrgico permite iniciar o tratamento já nos primeiros dias pós-cirurgia, quando indicado.",
      },
    ],
  },
  related: {
    kicker: "EXPLORE MAIS",
    headline: "Conheça outros serviços do Hospital São Rafael",
    items: [
      {
        slug: "centro-cirurgico",
        title: "Centro Cirúrgico",
        description:
          "22 salas equipadas para cirurgias eletivas de alta complexidade com tecnologia robótica e laparoscopia avançada.",
        image: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        icon: "scalpel",
      },
      {
        slug: "internacao",
        title: "Unidade de Internação",
        description:
          "Acomodações projetadas para recuperação pós-cirúrgica com monitoramento contínuo e equipe dedicada.",
        image: "/assets/images/servicos/internacao.jpg",
        icon: "bed",
      },
      {
        slug: "imd",
        title: "IMD Instituto Médico e Diagnóstico",
        description:
          "Consultas e exames integrados ao cuidado cirúrgico, com mais precisão, agilidade e conforto.",
        image: "/assets/images/servicos/imd.jpg",
        icon: "microscope",
      },
    ],
  },
}

// -----------------------------------------------------------------------------
// MAPA DE SERVIÇOS — indexado por slug
// -----------------------------------------------------------------------------

export const SERVICES_CONTENT: Record<string, ServiceDetailData> = {
  "centro-cirurgico": CENTRO_CIRURGICO,
  "internacao": INTERNACAO,
  "hiperbarica": HIPERBARICA,
}
