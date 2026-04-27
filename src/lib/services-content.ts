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
// CONTEÚDO — Terapia Hiperbárica (template SEO-expandido — referência)
// -----------------------------------------------------------------------------
// Único serviço publicado no momento. Demais páginas serão recriadas seguindo
// este mesmo template e ativadas após aprovação da diretoria, uma a uma.
// -----------------------------------------------------------------------------

const HIPERBARICA: ServiceDetailData = {
  slug: "hiperbarica",
  meta: {
    // O sufixo "| Hospital São Rafael" é aplicado pelo template do root layout.
    title: "Terapia Hiperbárica em Belo Horizonte | Câmara Hiperbárica",
    description:
      "Medicina hiperbárica no Hospital São Rafael, BH. Oxigenoterapia indicada para pós-cirúrgico, cicatrização, osteomielite, pé diabético e mais. Atendimento exclusivamente particular.",
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
    headline: "Cicatrize mais rápido. Recupere com mais segurança.",
    subheadline:
      "Câmara hiperbárica do Hospital São Rafael, em Belo Horizonte. Oxigenoterapia conduzida por médicos titulados pela SBMH para recuperação pós-cirúrgica acelerada e tratamento de feridas complexas.",
    backgroundImage: "/assets/images/servicos/hiperbarica_2.jpg",
    pills: [
      "Pós-op cicatriza mais rápido",
      "Médicos titulados SBMH",
      "Protocolo CFM e ANVISA",
      "Atendimento particular",
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
        question: "Como funciona o atendimento e o pagamento da terapia hiperbárica no HSR?",
        answer:
          "O Hospital São Rafael é uma instituição exclusivamente particular, dedicada a procedimentos eletivos de alta complexidade. Não trabalhamos com convênios, planos de saúde ou SUS em nenhum dos nossos serviços. Os valores e formas de pagamento são apresentados de forma clara durante a avaliação médica, junto ao protocolo proposto e ao número estimado de sessões.",
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
}

// -----------------------------------------------------------------------------
// MAPA DE SERVIÇOS — indexado por slug
// -----------------------------------------------------------------------------
// Apenas serviços já publicados aparecem aqui. Demais cards seguem visíveis na
// home (constants.ts > SERVICOS_DATA), mas sem CTA — a página é criada via
// template, aprovada pela diretoria e só então o slug é adicionado abaixo.
// -----------------------------------------------------------------------------

export const SERVICES_CONTENT: Record<string, ServiceDetailData> = {
  "hiperbarica": HIPERBARICA,
}
