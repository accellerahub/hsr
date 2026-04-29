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
// TYPES — blocos híbridos de persona (médico assistente / acompanhante)
// -----------------------------------------------------------------------------

export interface ServicePersonaBenefit {
  icon: string
  title: string
  description: string
}

export interface ServiceMedicoBlockData {
  /** Kicker default: "PARA O MÉDICO ASSISTENTE" */
  kicker: string
  headline: string
  description?: string
  benefits: ServicePersonaBenefit[]
  /** Label do CTA secundário do bloco. Default: "Falar com Consultoria Médica" */
  ctaLabel?: string
  /** Canal exclusivo p/ médico parceiro. Default: WhatsApp comercial padrão */
  ctaHref?: string
  note?: string
}

export interface ServiceAcompanhanteBlockData {
  /** Kicker default: "PARA QUEM ESTÁ COM VOCÊ" */
  kicker: string
  headline: string
  description?: string
  amenities: ServicePersonaBenefit[]
  /** Linha extra (ex: regra de voucher, horário visitação) */
  note?: string
}

// -----------------------------------------------------------------------------
// TYPES — E-E-A-T (referências + revisão clínica)
// -----------------------------------------------------------------------------

export interface ServiceReferenceItem {
  label: string
  href: string
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
  /** Bloco híbrido p/ médico assistente — captura persona secundária em páginas B2C */
  medico?: ServiceMedicoBlockData
  galleryBlock: ServiceGalleryBlockData
  /** Equipamentos e tecnologia */
  equipment?: ServiceEquipmentData
  highlights: ServiceHighlightsData
  /** Protocolos, segurança e certificações */
  protocols?: ServiceProtocolsData
  /** Jornada passo-a-passo do paciente */
  journey?: ServiceJourneyData
  /** Bloco p/ acompanhante/família — decisor sombra, principal em internação/alimentação */
  acompanhante?: ServiceAcompanhanteBlockData
  testimonials: ServiceTestimonialsData
  faq: FAQData
  /** Conteúdo relacionado (cross-link outros serviços) */
  related?: ServiceRelatedData
  /** Tipo do schema principal — MedicalProcedure p/ tratamento, MedicalClinic p/ infraestrutura */
  schemaType?: "MedicalProcedure" | "MedicalClinic"
  /** Data ISO da última revisão clínica (E-E-A-T YMYL) */
  lastReviewed?: string
  /** Fontes externas/referências (E-E-A-T YMYL) */
  references?: ServiceReferenceItem[]
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
    { id: "para-o-medico", label: "Para o médico" },
    { id: "infraestrutura", label: "Infraestrutura" },
    { id: "equipamentos", label: "Equipamentos" },
    { id: "numeros", label: "Números" },
    { id: "protocolos", label: "Protocolos" },
    { id: "jornada", label: "Como funciona" },
    { id: "acompanhante", label: "Acompanhante" },
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
  // [REVISAR DIRETORIA] copy provisório do bloco médico — validar antes de publicar
  medico: {
    kicker: "PARA O MÉDICO ASSISTENTE",
    headline: "Suporte hiperbárico integrado para o seu paciente",
    description:
      "Quando você indica oxigenoterapia hiperbárica para acelerar cicatrização ou tratar feridas complexas, conta com uma estrutura integrada ao Hospital São Rafael, agilidade no agendamento e relatório clínico de cada sessão para o seu acompanhamento.",
    benefits: [
      {
        icon: "clipboard-check",
        title: "Avaliação rápida do caso",
        description:
          "Médico hiperbaricista avalia a indicação em até 24h úteis após o encaminhamento, sem fila ou intermediários.",
      },
      {
        icon: "git-merge",
        title: "Integração total com o pós-operatório",
        description:
          "Sessões iniciadas já no pós-imediato em retalhos comprometidos, enxertos e suturas de alta tensão.",
      },
      {
        icon: "shield-check",
        title: "Protocolo SBMH e ANVISA",
        description:
          "Cada sessão monitorada e registrada em prontuário digital, com rastreabilidade completa do tratamento.",
      },
      {
        icon: "heart-handshake",
        title: "Comunicação direta com o assistente",
        description:
          "Relatório por sessão e canal dedicado para alinhamento clínico entre você e o hiperbaricista.",
      },
    ],
    ctaLabel: "Falar com a Consultoria Médica",
    note: "Médicos credenciados ou não credenciados podem encaminhar pacientes ao serviço.",
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
  // [REVISAR DIRETORIA] copy provisório do bloco acompanhante — validar antes de publicar
  acompanhante: {
    kicker: "PARA QUEM ESTÁ COM VOCÊ",
    headline: "Conforto e clareza para o acompanhante durante a sessão",
    description:
      "Sabemos que o acompanhamento de quem está com você faz parte do cuidado. Por isso, organizamos a estrutura para que a espera durante a sessão seja confortável, com informação clara sobre cada etapa e canais abertos para tirar dúvidas.",
    amenities: [
      {
        icon: "sofa",
        title: "Sala de espera dedicada",
        description:
          "Ambiente climatizado, com Wi-Fi e estação de café, próximo à câmara hiperbárica.",
      },
      {
        icon: "timer",
        title: "Tempo previsível por sessão",
        description:
          "Sessões de 90 a 120 minutos, com avisos de início, platô e descompressão para você se organizar.",
      },
      {
        icon: "headset",
        title: "Comunicação contínua",
        description:
          "Janelas de observação e intercomunicação permitem acompanhar a sessão e tirar dúvidas com a equipe.",
      },
      {
        icon: "heart-handshake",
        title: "Equipe orientadora",
        description:
          "Profissionais explicam cada etapa, sinais a observar e o que esperar entre uma sessão e outra.",
      },
      {
        icon: "utensils",
        title: "Praça de Alimentação no complexo",
        description:
          "Acompanhantes podem fazer refeições e lanches no mesmo complexo hospitalar entre sessões.",
      },
      {
        icon: "shield-check",
        title: "Suporte se algo mudar",
        description:
          "Em qualquer intercorrência, acesso imediato à equipe médica e à UTI dentro do mesmo complexo.",
      },
    ],
    note: "Em ciclos prolongados (20-40 sessões), nossa equipe orienta sobre logística, intervalos e cuidados domiciliares entre sessões.",
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
  // E-E-A-T (medical YMYL)
  schemaType: "MedicalProcedure",
  lastReviewed: "2026-04-28",
  references: [
    {
      label: "Resolução CFM nº 1.457/1995 — Medicina Hiperbárica",
      href: "https://sistemas.cfm.org.br/normas/visualizar/resolucoes/BR/1995/1457",
    },
    {
      label: "Sociedade Brasileira de Medicina Hiperbárica (SBMH)",
      href: "https://www.sbmh.com.br/",
    },
    {
      label: "ANVISA — Boas práticas em oxigenoterapia hiperbárica",
      href: "https://www.gov.br/anvisa/pt-br",
    },
  ],
}

// =============================================================================
// CONTEÚDO — Centro Cirúrgico (template padrão, copy provisório p/ aprovação)
// =============================================================================
// [REVISAR DIRETORIA] todo copy clínico carece validação antes de publicar.
// [PENDENTE CLIENTE] médico responsável (foto+RQE), 3 fotos diferentes,
// testimonials reais autorizados, selos visuais ONA/Acreditação.
// =============================================================================

const CENTRO_CIRURGICO: ServiceDetailData = {
  slug: "centro-cirurgico",
  meta: {
    title: "Centro Cirúrgico Particular em Belo Horizonte | Cirurgias Eletivas",
    description:
      "22 salas para cirurgias eletivas particulares no Hospital São Rafael, BH. Tecnologia robótica, laparoscopia avançada, taxa de infecção 0,33% e atendimento exclusivamente particular.",
  },
  navSections: [
    { id: "intro", label: "O Centro Cirúrgico" },
    { id: "indicacoes", label: "Especialidades" },
    { id: "para-o-medico", label: "Para o médico" },
    { id: "infraestrutura", label: "Infraestrutura" },
    { id: "equipamentos", label: "Tecnologia" },
    { id: "numeros", label: "Números" },
    { id: "protocolos", label: "Protocolos" },
    { id: "jornada", label: "Como funciona" },
    { id: "acompanhante", label: "Acompanhante" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Dúvidas" },
  ],
  hero: {
    kicker: "CENTRO CIRÚRGICO",
    headline: "Cirurgia eletiva particular onde cada detalhe é planejado para o seu sucesso.",
    subheadline:
      "22 salas integradas, tecnologia robótica e laparoscopia avançada, equipe multidisciplinar e taxa de infecção entre as mais baixas do país. Atendimento exclusivamente particular.",
    backgroundImage: "/assets/images/servicos/centro-cirurgico-v2.jpg",
    pills: [
      "22 salas integradas",
      "Robótica e laparoscopia",
      "Taxa de infecção 0,33%",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Um centro cirúrgico planejado para procedimentos eletivos de alta complexidade",
    paragraphs: [
      "O Centro Cirúrgico do Hospital São Rafael foi projetado para oferecer aos pacientes e médicos parceiros um ambiente de altíssima qualidade técnica, com 22 salas equipadas para cirurgias de baixa, média e alta complexidade. Cada detalhe — do fluxo de admissão à recuperação pós-anestésica — segue protocolos rigorosos validados internacionalmente, com foco em previsibilidade, segurança e experiência diferenciada.",
      "Como hospital exclusivamente particular dedicado a cirurgias eletivas, organizamos o complexo para reduzir desperdício de tempo do cirurgião e ansiedade do paciente. Salas integradas a sistemas de imagem, monitorização anestésica avançada, instrumentadores especializados e giro de sala otimizado em 40 minutos são alguns dos elementos que sustentam essa promessa.",
      "Nossa taxa de infecção de 0,33% — muito abaixo da média nacional de hospitais de grande porte — reflete uma cultura de segurança implementada em cada protocolo: antissepsia, esterilização, controle de fluxo de pessoas, manutenção da temperatura e umidade das salas, e checklists obrigatórios pré-incisão validados pela equipe.",
    ],
    subsections: [
      {
        id: "complexo-integrado",
        title: "Um complexo integrado, sem fragmentação do cuidado",
        paragraphs: [
          "Centro cirúrgico, IMD (consultas e exames), unidade de internação, UTI, terapia hiperbárica e estrutura para acompanhante operam como um único organismo. O paciente faz exames pré-operatórios, é admitido, operado, internado e recebe alta dentro do mesmo complexo — sem deslocamentos, sem perda de informação clínica, sem retrabalho de prontuário.",
          "Para o cirurgião, isso significa previsibilidade total: a sala marcada estará pronta, o instrumentador chegará treinado no procedimento, os exames pré-op estarão integrados ao prontuário e a equipe de internação receberá o paciente já com plano cirúrgico em mãos.",
        ],
      },
    ],
  },
  indications: {
    kicker: "ESPECIALIDADES",
    headline: "Cirurgias eletivas multiespecialidades em alta complexidade",
    intro:
      "Atendemos cirurgias eletivas particulares de baixa, média e alta complexidade em diversas especialidades. As mais comuns no nosso centro:",
    items: [
      {
        id: "ortopedia",
        icon: "bone",
        title: "Ortopedia",
        description:
          "Artroplastia de joelho e quadril, artroscopia, reconstrução ligamentar, cirurgia de coluna minimamente invasiva.",
        highlighted: true,
      },
      {
        id: "cardio",
        icon: "activity",
        title: "Cardiovascular",
        description:
          "Procedimentos eletivos cardíacos com equipe multidisciplinar e suporte de UTI no mesmo complexo.",
      },
      {
        id: "bariatrica",
        icon: "scalpel",
        title: "Bariátrica e metabólica",
        description:
          "Bypass gástrico, sleeve e cirurgias metabólicas conduzidas por equipe especializada e protocolo ERAS.",
      },
      {
        id: "urologia",
        icon: "shield-check",
        title: "Urologia",
        description:
          "Cirurgias urológicas robóticas e laparoscópicas, incluindo prostatectomia radical e nefrectomia parcial.",
      },
      {
        id: "ginecologia",
        icon: "heart-handshake",
        title: "Ginecologia",
        description:
          "Histerectomias, laparoscopia ginecológica e cirurgias de assoalho pélvico com técnicas minimamente invasivas.",
      },
      {
        id: "oncologica",
        icon: "shield-check",
        title: "Oncológica",
        description:
          "Procedimentos oncológicos eletivos integrados a serviços de patologia e diagnóstico do IMD.",
      },
      {
        id: "coluna",
        icon: "bone",
        title: "Coluna",
        description:
          "Cirurgias de coluna com técnicas percutâneas, neuromonitorização intraoperatória e equipe dedicada.",
      },
      {
        id: "oftalmo",
        icon: "sparkles",
        title: "Oftalmológica",
        description:
          "Catarata, refrativa e procedimentos oculares de alta precisão com equipamentos modernos.",
      },
      {
        id: "otorrino",
        icon: "headset",
        title: "Otorrinolaringologia",
        description:
          "Cirurgias endoscópicas nasais, septoplastias e procedimentos otológicos eletivos.",
      },
    ],
    note: "[REVISAR DIRETORIA] lista de especialidades para alinhamento com a oferta atual da casa.",
  },
  medico: {
    kicker: "PARA O MÉDICO ASSISTENTE",
    headline: "A estrutura que o cirurgião precisa para operar no seu melhor.",
    description:
      "Médicos credenciados e não credenciados podem operar no Hospital São Rafael. Nossa Consultoria Médica Institucional acompanha cada cirurgião em todas as etapas — do credenciamento à execução — com canais diretos, instrumentadores treinados, salas robóticas e suporte de engenharia clínica 24/7.",
    benefits: [
      {
        icon: "clipboard-check",
        title: "Credenciamento ágil",
        description:
          "Processo de habilitação simplificado, com acompanhamento da Consultoria Médica do início ao fim.",
      },
      {
        icon: "scalpel",
        title: "Sala robótica e laparoscopia",
        description:
          "Tecnologia disponível e instrumentadores especializados em cada procedimento minimamente invasivo.",
      },
      {
        icon: "timer",
        title: "Giro de sala em 40 minutos",
        description:
          "Processos otimizados que aumentam previsibilidade da sua agenda e reduzem ociosidade.",
      },
      {
        icon: "wrench",
        title: "Instrumentador exclusivo",
        description:
          "Profissionais treinados nos seus protocolos, prontos para antecipar cada movimento da cirurgia.",
      },
      {
        icon: "settings-2",
        title: "Engenharia clínica 24/7",
        description:
          "Equipamentos sempre disponíveis e calibrados, com suporte técnico imediato em qualquer turno.",
      },
      {
        icon: "sofa",
        title: "Conforto Médico",
        description:
          "Área exclusiva de descanso, preparação e conveniência entre procedimentos, com privacidade.",
      },
    ],
    ctaLabel: "Falar com a Consultoria Médica",
    note: "Para informações sobre credenciamento, agenda cirúrgica e parceria, fale com a Consultoria Médica Institucional.",
  },
  galleryBlock: {
    kicker: "INFRAESTRUTURA",
    headline: "Cada sala projetada para zero imprevistos.",
    description:
      "22 salas distribuídas em fluxos otimizados — entrada de paciente, área limpa, área contaminada, recuperação pós-anestésica — com controle ambiental rigoroso, sistemas de imagem integrados e tecnologia para procedimentos de baixa a altíssima complexidade.",
    images: [
      {
        // [PENDENTE CLIENTE] foto real da sala equipada
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Sala cirúrgica equipada com tecnologia de última geração no Hospital São Rafael",
      },
      {
        // [PENDENTE CLIENTE] foto da equipe em procedimento
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Equipe multidisciplinar em procedimento eletivo no Centro Cirúrgico HSR",
      },
      {
        // [PENDENTE CLIENTE] foto da recuperação pós-anestésica
        src: "/assets/images/servicos/centro-cirurgico-v2.jpg",
        alt: "Sala de recuperação pós-anestésica do Hospital São Rafael",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Salas para laparoscopia e cirurgia robótica",
        description: "Equipamentos de última geração integrados ao fluxo cirúrgico.",
      },
      {
        icon: "check-circle",
        title: "Monitorização intraoperatória contínua",
        description: "Sinais vitais e parâmetros anestésicos em tempo real durante todo o procedimento.",
      },
      {
        icon: "check-circle",
        title: "Controle ambiental rigoroso",
        description: "Pressão, temperatura e umidade controladas conforme normas internacionais.",
      },
      {
        icon: "check-circle",
        title: "Recuperação pós-anestésica integrada",
        description: "Saída da sala direto para área de monitorização especializada antes da internação.",
      },
    ],
    cta: { label: "Falar no WhatsApp", href: "https://wa.me/message/NZIPXRZ4SKUHM1" },
  },
  equipment: {
    kicker: "TECNOLOGIA",
    headline: "Equipamentos e recursos cirúrgicos de referência",
    description:
      "Tecnologia escolhida para dar ao cirurgião precisão e ao paciente segurança. Cada equipamento é mantido pela engenharia clínica do HSR e revisado em ciclos rígidos de calibração.",
    items: [
      {
        icon: "scalpel",
        title: "Plataforma robótica [modelo a confirmar]",
        description:
          "[REVISAR DIRETORIA] confirmar modelo. Cirurgias robóticas em urologia, ginecologia e cirurgia geral com precisão sub-milimétrica.",
      },
      {
        icon: "activity",
        title: "Torres de laparoscopia em alta definição",
        description:
          "Imagem 4K, fontes de luz LED e equipamentos de coagulação avançada para cirurgias minimamente invasivas.",
      },
      {
        icon: "shield-check",
        title: "Monitorização anestésica completa",
        description:
          "Capnografia, BIS, monitorização hemodinâmica e neuromuscular em todas as salas.",
      },
      {
        icon: "clipboard-check",
        title: "Imagem intraoperatória",
        description:
          "Arco em C, fluoroscopia digital e neuromonitorização disponíveis conforme procedimento.",
      },
      {
        icon: "settings-2",
        title: "Esterilização CME própria",
        description:
          "Central de Material e Esterilização integrada ao bloco, com rastreabilidade ponta a ponta.",
      },
    ],
  },
  highlights: {
    kicker: "NÚMEROS QUE COMPROVAM",
    headline: "Excelência cirúrgica medida em dados.",
    items: [
      {
        id: "salas",
        metric: "22",
        icon: "building-2",
        title: "Salas cirúrgicas",
        description:
          "Estrutura para procedimentos de baixa, média e alta complexidade em diversas especialidades.",
      },
      {
        id: "giro",
        metric: "40min",
        icon: "timer",
        title: "Giro de sala",
        description:
          "Processos ágeis que aumentam previsibilidade da agenda e reduzem ociosidade do cirurgião.",
      },
      {
        id: "infeccao",
        metric: "0,33%",
        icon: "shield-check",
        title: "Taxa de infecção",
        description:
          "Indicador entre os mais rigorosos do setor, muito abaixo da média nacional de hospitais de grande porte.",
      },
      {
        id: "experiencia",
        metric: "+12.000",
        icon: "activity",
        title: "Procedimentos realizados",
        description:
          "Base de experiência clínica que sustenta cada decisão da nossa equipe.",
      },
    ],
  },
  protocols: {
    kicker: "SEGURANÇA",
    headline: "Protocolos validados, segurança em cada etapa",
    intro:
      "Da admissão à alta, cada etapa segue protocolos institucionais alinhados a referências internacionais de segurança cirúrgica.",
    items: [
      {
        id: "checklist",
        icon: "clipboard-check",
        title: "Checklist de cirurgia segura",
        description:
          "Protocolo OMS de cirurgia segura aplicado em 100% dos procedimentos, com confirmação ativa da equipe.",
      },
      {
        id: "antibiotico",
        icon: "shield-check",
        title: "Antibioticoprofilaxia padronizada",
        description:
          "Administração rigorosa do antibiótico no tempo correto, reduzindo risco de infecção do sítio cirúrgico.",
      },
      {
        id: "rastreabilidade",
        icon: "git-merge",
        title: "Rastreabilidade total",
        description:
          "Cada material, instrumento e profissional registrado no prontuário digital — auditoria completa por procedimento.",
      },
      {
        id: "emergencia",
        icon: "activity",
        title: "Resposta rápida integrada",
        description:
          "UTI, banco de sangue e equipe de hemodinâmica disponíveis no mesmo complexo para qualquer intercorrência.",
      },
      {
        id: "pos-anestesica",
        icon: "heart-handshake",
        title: "Recuperação pós-anestésica especializada",
        description:
          "Equipe dedicada e monitorização contínua até alta para o quarto de internação ou domiciliar.",
      },
      {
        id: "controle-ambiental",
        icon: "sparkles",
        title: "Controle ambiental das salas",
        description:
          "Pressão positiva, filtragem HEPA, temperatura e umidade monitoradas continuamente.",
      },
    ],
    certifications: [
      "ANVISA",
      "CFM — Conselho Federal de Medicina",
      "OMS — Cirurgia Segura Salva Vidas",
      "[PENDENTE CLIENTE] Acreditação ONA / outros selos",
    ],
  },
  journey: {
    kicker: "COMO FUNCIONA",
    headline: "Sua jornada cirúrgica, passo a passo",
    intro:
      "Da indicação do seu médico ao retorno para casa, cada etapa é coordenada por uma equipe dedicada para que você se concentre apenas em se recuperar.",
    steps: [
      {
        number: "1",
        title: "Indicação e exames pré-operatórios",
        description:
          "Após a indicação do seu médico, agendamos consultas e exames pré-op no IMD, integrados ao centro cirúrgico, sem deslocamento externo.",
      },
      {
        number: "2",
        title: "Avaliação pré-anestésica",
        description:
          "Consulta com anestesiologista para revisão do histórico, otimização clínica e definição do protocolo anestésico personalizado.",
      },
      {
        number: "3",
        title: "Admissão hospitalar",
        description:
          "Recebimento na unidade de internação, conferência de documentos e exames, orientações finais ao paciente e ao acompanhante.",
      },
      {
        number: "4",
        title: "Procedimento cirúrgico",
        description:
          "Cirurgia conduzida pelo seu cirurgião com nossa equipe multidisciplinar de apoio. Comunicação contínua com o acompanhante na sala de espera.",
      },
      {
        number: "5",
        title: "Recuperação e alta",
        description:
          "Sala de recuperação pós-anestésica, internação no quarto, acompanhamento médico e alta com plano de cuidado domiciliar e retorno agendado.",
      },
    ],
  },
  acompanhante: {
    kicker: "PARA QUEM ESTÁ COM VOCÊ",
    headline: "Acompanhante informado, paciente mais tranquilo.",
    description:
      "Sabemos que quem está com você vive a cirurgia ao seu lado. Por isso, organizamos a estrutura para que o acompanhante tenha conforto durante a espera, comunicação ativa com a equipe e suporte em cada etapa.",
    amenities: [
      {
        icon: "sofa",
        title: "Sala de espera dedicada",
        description:
          "Ambiente climatizado, com Wi-Fi e estação de café, próximo ao bloco cirúrgico.",
      },
      {
        icon: "headset",
        title: "Comunicação ativa durante a cirurgia",
        description:
          "Equipe dá retornos periódicos e contato direto em qualquer mudança de cronograma.",
      },
      {
        icon: "heart-handshake",
        title: "Aviso assim que sair da sala",
        description:
          "Notificação imediata na recuperação pós-anestésica e orientação sobre quando ir ao quarto.",
      },
      {
        icon: "utensils",
        title: "Praça de Alimentação no complexo",
        description:
          "Refeições e lanches sem precisar sair do hospital — voucher disponível para acompanhantes em internação.",
      },
      {
        icon: "bed",
        title: "Pernoite no quarto",
        description:
          "Quartos individuais com poltrona reclinável, banheiro privativo e Wi-Fi para o acompanhante.",
      },
      {
        icon: "shield-check",
        title: "Suporte se algo mudar",
        description:
          "Acesso direto à equipe médica e à UTI no mesmo complexo, em qualquer intercorrência.",
      },
    ],
    note: "[REVISAR DIRETORIA] regras do voucher do acompanhante e horários de visitação.",
  },
  testimonials: {
    headline: "O que dizem nossos pacientes e médicos",
    items: [
      {
        id: "t1",
        // [PENDENTE CLIENTE] testimonials reais autorizados
        quote:
          "A estrutura do Hospital São Rafael é impressionante. Me senti seguro e bem cuidado em todas as etapas, do pré-operatório à alta.",
        author: "Paciente HSR",
        role: "Cirurgia ortopédica",
        image: "",
      },
      {
        id: "t2",
        quote:
          "Como cirurgião, encontro aqui a infraestrutura que preciso para operar com confiança: tecnologia, equipe treinada e processos previsíveis.",
        author: "Cirurgião parceiro HSR",
        role: "Especialista urológico",
        image: "",
      },
      {
        id: "t3",
        quote:
          "Minha cirurgia foi conduzida com total tranquilidade. O acolhimento da equipe e o conforto do quarto fizeram toda a diferença.",
        author: "Paciente HSR",
        role: "Cirurgia ginecológica",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Dúvidas frequentes sobre cirurgias eletivas particulares no HSR",
    items: [
      {
        id: "cc-faq-1",
        question: "O que são cirurgias eletivas particulares?",
        answer:
          "São procedimentos cirúrgicos planejados com antecedência, sem caráter de urgência, realizados em regime exclusivamente particular. No Hospital São Rafael, o agendamento é ágil e a internação ocorre em ambiente confortável, sem filas ou intermediários.",
      },
      {
        id: "cc-faq-2",
        question: "Como funciona o atendimento e o pagamento das cirurgias no HSR?",
        answer:
          "O Hospital São Rafael é uma instituição exclusivamente particular. Não trabalhamos com convênios, planos de saúde ou SUS. Os valores e formas de pagamento são apresentados de forma clara durante a avaliação, junto ao plano cirúrgico e à estimativa de internação.",
      },
      {
        id: "cc-faq-3",
        question: "Meu cirurgião pode operar no Hospital São Rafael?",
        answer:
          "Sim. Médicos credenciados e não credenciados podem operar no nosso centro cirúrgico. Nossa Consultoria Médica Institucional conduz o processo de credenciamento e orienta sobre os recursos disponíveis para cada especialidade.",
      },
      {
        id: "cc-faq-4",
        question: "Quais especialidades são atendidas no Centro Cirúrgico?",
        answer:
          "Atendemos cirurgias eletivas de Ortopedia, Cardiologia, Neurocirurgia, Urologia, Ginecologia, Bariátrica, Oncológica, Coluna, Oftalmologia, Otorrinolaringologia e outras. As 22 salas suportam procedimentos de baixa a altíssima complexidade, incluindo robótica e laparoscópica.",
      },
      {
        id: "cc-faq-5",
        question: "Como é feita a avaliação pré-operatória?",
        answer:
          "Os exames pré-op podem ser feitos no IMD, integrado ao Centro Cirúrgico. A consulta pré-anestésica avalia o histórico, otimiza condições clínicas e define o protocolo anestésico personalizado.",
      },
      {
        id: "cc-faq-6",
        question: "Quanto tempo dura a internação após a cirurgia?",
        answer:
          "Depende do tipo de procedimento e da evolução clínica. Cirurgias minimamente invasivas costumam ter alta em 24 a 48 horas; procedimentos de maior complexidade podem exigir 3 a 7 dias. Seu cirurgião informará a estimativa no pré-operatório.",
      },
      {
        id: "cc-faq-7",
        question: "Existe estrutura para o meu acompanhante?",
        answer:
          "Sim. Quartos individuais com poltrona reclinável e banheiro privativo, sala de espera durante a cirurgia, Wi-Fi, alimentação na praça do complexo e voucher para acompanhantes em internação.",
      },
      {
        id: "cc-faq-8",
        question: "Como funciona o suporte se houver intercorrência?",
        answer:
          "UTI, banco de sangue, hemodinâmica e equipe de resposta rápida estão disponíveis no mesmo complexo, com transferência ágil e equipe já familiarizada com o caso pelo prontuário único.",
      },
      {
        id: "cc-faq-9",
        question: "Quais protocolos de segurança são aplicados?",
        answer:
          "Aplicamos checklist de cirurgia segura da OMS, antibioticoprofilaxia padronizada, rastreabilidade total de materiais, controle ambiental rigoroso das salas e protocolos institucionais alinhados a referências internacionais.",
      },
      {
        id: "cc-faq-10",
        question: "Como agendo uma cirurgia no Hospital São Rafael?",
        answer:
          "Entre em contato com nossa equipe pelo WhatsApp. Após a indicação do seu médico, agendamos exames pré-op no IMD, consulta pré-anestésica e a data da cirurgia, coordenando todas as etapas em um único ponto de contato.",
      },
    ],
  },
  schemaType: "MedicalProcedure",
  lastReviewed: "2026-04-28",
  references: [
    {
      label: "OMS — Cirurgia Segura Salva Vidas (Checklist)",
      href: "https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery",
    },
    {
      label: "ANVISA — Boas práticas em centro cirúrgico",
      href: "https://www.gov.br/anvisa/pt-br",
    },
    {
      label: "CFM — Conselho Federal de Medicina",
      href: "https://portal.cfm.org.br/",
    },
  ],
}

// =============================================================================
// CONTEÚDO — IMD (Instituto Médico e Diagnóstico)
// =============================================================================
// [REVISAR DIRETORIA] copy provisório — validar antes de publicar.
// =============================================================================

const IMD: ServiceDetailData = {
  slug: "imd",
  meta: {
    title: "IMD — Consultas e Exames Particulares em Belo Horizonte",
    description:
      "Instituto Médico e Diagnóstico do Hospital São Rafael: consultas com especialistas, exames de imagem e laboratoriais integrados ao centro cirúrgico. Atendimento exclusivamente particular em BH.",
  },
  navSections: [
    { id: "intro", label: "O IMD" },
    { id: "indicacoes", label: "Serviços" },
    { id: "para-o-medico", label: "Para o médico" },
    { id: "infraestrutura", label: "Infraestrutura" },
    { id: "equipamentos", label: "Tecnologia" },
    { id: "numeros", label: "Números" },
    { id: "protocolos", label: "Protocolos" },
    { id: "jornada", label: "Como funciona" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Dúvidas" },
  ],
  hero: {
    kicker: "IMD — INSTITUTO MÉDICO E DIAGNÓSTICO",
    headline: "Consultas e exames particulares com a precisão e o conforto do São Rafael.",
    subheadline:
      "Especialistas com agenda ágil, exames de imagem e laboratoriais integrados ao centro cirúrgico. Tudo em um único complexo, com atendimento exclusivamente particular.",
    backgroundImage: "/assets/images/servicos/imd.jpg",
    pills: [
      "Consulta com especialistas",
      "Imagem e laboratório",
      "Integrado ao cirúrgico",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "O Instituto Médico e Diagnóstico do Hospital São Rafael",
    paragraphs: [
      "O IMD é o braço de consultas, exames de imagem e diagnósticos do Hospital São Rafael. Foi pensado para reunir, em um único endereço, o que normalmente exige deslocamento entre consultórios, laboratórios e centros de imagem — entregando ao paciente e ao médico assistente uma experiência integrada, com agilidade e segurança clínica.",
      "Por estar dentro do mesmo complexo do centro cirúrgico, da unidade de internação e da UTI, o IMD oferece um diferencial clínico raro: o exame que apoia uma decisão cirúrgica chega ao prontuário em minutos, e o paciente pode passar do diagnóstico ao tratamento sem fragmentação ou retrabalho.",
      "Atendimento exclusivamente particular, com agenda ágil para consultas e exames eletivos. Pacientes acompanhados por médicos próprios ou por médicos parceiros que utilizam o IMD como apoio diagnóstico.",
    ],
  },
  indications: {
    kicker: "SERVIÇOS",
    headline: "O que você encontra no IMD",
    intro:
      "Diferentes serviços diagnósticos e ambulatoriais reunidos em um único endereço, com integração total ao prontuário hospitalar.",
    items: [
      {
        id: "pre-op",
        icon: "clipboard-check",
        title: "Avaliação pré-operatória completa",
        description:
          "Exames laboratoriais, de imagem e avaliação cardiológica/anestésica em um único agendamento.",
        highlighted: true,
      },
      {
        id: "consulta",
        icon: "stethoscope",
        title: "Consultas com especialistas",
        description:
          "Agenda ágil em diversas especialidades médicas, com integração ao centro cirúrgico quando indicado.",
      },
      {
        id: "ressonancia",
        icon: "activity",
        title: "Ressonância magnética",
        description:
          "Equipamento moderno para diagnósticos neurológicos, ortopédicos, abdominais e cardíacos.",
      },
      {
        id: "tomografia",
        icon: "scan",
        title: "Tomografia computadorizada",
        description:
          "Tomógrafo multislice de alta resolução para diagnósticos rápidos e precisos.",
      },
      {
        id: "ultrassom",
        icon: "activity",
        title: "Ultrassonografia",
        description:
          "USG abdominal, vascular, obstétrica e musculoesquelética com profissionais especializados.",
      },
      {
        id: "lab",
        icon: "flask",
        title: "Laboratório clínico",
        description:
          "Análises clínicas com agilidade e integração direta ao prontuário hospitalar.",
      },
      {
        id: "cardio",
        icon: "heart-handshake",
        title: "Avaliação cardiológica",
        description:
          "ECG, ecocardiograma, MAPA, Holter e teste ergométrico conduzidos por equipe especializada.",
      },
      {
        id: "raiox",
        icon: "scan",
        title: "Radiografia digital",
        description:
          "Raio-X digital com laudo rápido integrado ao prontuário eletrônico.",
      },
    ],
    note: "[REVISAR DIRETORIA] lista exata de modalidades disponíveis hoje no IMD.",
  },
  medico: {
    kicker: "PARA O MÉDICO ASSISTENTE",
    headline: "Apoio diagnóstico ágil e integrado para o seu paciente",
    description:
      "O IMD foi pensado também para o médico assistente que indica exames ou consultas e quer um parceiro confiável, com laudo digital ágil e canal direto para alinhamento clínico.",
    benefits: [
      {
        icon: "clipboard-check",
        title: "Laudo digital em prazo curto",
        description:
          "Exames de imagem e laboratoriais com laudos disponíveis no portal e prontuário em prazo curto.",
      },
      {
        icon: "git-merge",
        title: "Integração com cirurgia",
        description:
          "Se o caso evoluir para cirurgia eletiva no HSR, todo o histórico migra automaticamente para o pré-op.",
      },
      {
        icon: "headset",
        title: "Canal direto com radiologista",
        description:
          "Discussão de casos complexos com radiologista responsável pelo laudo, quando necessário.",
      },
      {
        icon: "shield-check",
        title: "Equipe especializada",
        description:
          "Profissionais com experiência em laudos cirúrgicos e oncológicos, alinhados às demandas do médico solicitante.",
      },
    ],
    ctaLabel: "Falar com a Consultoria Médica",
  },
  galleryBlock: {
    kicker: "INFRAESTRUTURA",
    headline: "Um diagnóstico tão cuidado quanto o tratamento",
    description:
      "Salas de exame e consultórios projetados para conforto e privacidade, com equipamentos de referência e fluxos otimizados para reduzir tempo de espera e ansiedade do paciente.",
    images: [
      {
        src: "/assets/images/servicos/imd.jpg",
        alt: "Recepção do IMD — Hospital São Rafael, Belo Horizonte",
      },
      {
        src: "/assets/images/servicos/imd.jpg",
        alt: "Sala de exame de imagem do IMD HSR",
      },
      {
        src: "/assets/images/servicos/imd.jpg",
        alt: "Consultório de especialista no IMD HSR",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Equipamentos modernos",
        description: "Imagem em alta resolução e laboratório com automação completa.",
      },
      {
        icon: "check-circle",
        title: "Agenda ágil",
        description: "Atendimento com horários otimizados e baixa espera para consulta e exame.",
      },
      {
        icon: "check-circle",
        title: "Prontuário único integrado",
        description: "Resultados disponíveis no mesmo prontuário do centro cirúrgico e da internação.",
      },
      {
        icon: "check-circle",
        title: "Equipe especializada",
        description: "Radiologistas, técnicos e enfermagem treinados em demandas clínicas e cirúrgicas.",
      },
    ],
    cta: { label: "Falar no WhatsApp", href: "https://wa.me/message/NZIPXRZ4SKUHM1" },
  },
  highlights: {
    kicker: "NÚMEROS",
    headline: "O IMD em dados",
    items: [
      {
        id: "especialidades",
        metric: "+20",
        icon: "stethoscope",
        title: "Especialidades médicas",
        description:
          "[REVISAR DIRETORIA] confirmar número de especialidades clínicas disponíveis no IMD.",
      },
      {
        id: "modalidades",
        metric: "+10",
        icon: "scan",
        title: "Modalidades de exame",
        description:
          "Imagem, laboratório, cardiológicos e endoscópicos em um mesmo endereço.",
      },
      {
        id: "integracao",
        metric: "100%",
        icon: "git-merge",
        title: "Integração com cirurgia",
        description:
          "Resultados disponíveis automaticamente no prontuário cirúrgico do HSR.",
      },
      {
        id: "tempo",
        metric: "Curto",
        icon: "timer",
        title: "Tempo médio de laudo",
        description:
          "[REVISAR DIRETORIA] confirmar SLA real de laudo por modalidade.",
      },
    ],
  },
  protocols: {
    kicker: "QUALIDADE",
    headline: "Padrões de qualidade em diagnóstico",
    intro:
      "Cada exame e consulta segue protocolos institucionais alinhados a referências brasileiras e internacionais.",
    items: [
      {
        id: "calibracao",
        icon: "settings-2",
        title: "Calibração e manutenção rigorosa",
        description:
          "Equipamentos mantidos pela engenharia clínica em ciclos rígidos de calibração e validação.",
      },
      {
        id: "biosseguranca",
        icon: "shield-check",
        title: "Biossegurança",
        description:
          "Protocolos rigorosos de antissepsia, descarte e fluxo de pacientes em todas as salas.",
      },
      {
        id: "rastreabilidade",
        icon: "git-merge",
        title: "Rastreabilidade do exame",
        description:
          "Cada exame tem registro completo: técnico, equipamento, parâmetros e laudo arquivados no prontuário.",
      },
      {
        id: "laudo",
        icon: "clipboard-check",
        title: "Dupla checagem em laudos críticos",
        description:
          "Casos oncológicos e cirúrgicos passam por revisão por segundo radiologista, quando indicado.",
      },
    ],
    certifications: [
      "ANVISA",
      "CFM — Conselho Federal de Medicina",
      "[PENDENTE CLIENTE] CBR — Colégio Brasileiro de Radiologia",
      "[PENDENTE CLIENTE] Acreditação ONA / outros selos",
    ],
  },
  journey: {
    kicker: "COMO FUNCIONA",
    headline: "Seu atendimento no IMD, em 5 passos",
    intro:
      "Do agendamento ao laudo, organizamos o processo para reduzir tempo de espera e dar clareza em cada etapa.",
    steps: [
      {
        number: "1",
        title: "Agendamento direto",
        description:
          "Solicite consulta ou exame pelo WhatsApp. Equipe de relacionamento orienta sobre preparo, documentos e horário.",
      },
      {
        number: "2",
        title: "Preparo orientado",
        description:
          "Você recebe instruções claras de jejum, medicação, vestimenta e demais cuidados específicos do exame.",
      },
      {
        number: "3",
        title: "Atendimento no IMD",
        description:
          "Recepção ágil, salas confortáveis, equipe técnica especializada e tempo de exame conforme protocolo clínico.",
      },
      {
        number: "4",
        title: "Laudo e integração",
        description:
          "Laudo elaborado por especialista e disponibilizado no portal. Em caso de cirurgia futura no HSR, dados migram automaticamente.",
      },
      {
        number: "5",
        title: "Continuidade do cuidado",
        description:
          "Se houver indicação cirúrgica, agendamos próximas etapas (consulta pré-anestésica, cirurgia eletiva) no mesmo complexo.",
      },
    ],
  },
  testimonials: {
    headline: "O que dizem nossos pacientes e médicos",
    items: [
      {
        id: "t1",
        quote:
          "Fiz toda a investigação no IMD e a cirurgia depois no mesmo complexo. Foi muito mais rápido do que eu esperava — e tudo conversava entre si.",
        author: "Paciente HSR",
        role: "Investigação cardiológica e cirurgia",
        image: "",
      },
      {
        id: "t2",
        quote:
          "Como cardiologista, encaminho meus pacientes ao IMD pela qualidade do laudo e pela integração com o centro cirúrgico — economiza tempo e evita retrabalho.",
        author: "Médico parceiro HSR",
        role: "Cardiologista",
        image: "",
      },
      {
        id: "t3",
        quote:
          "O atendimento foi rápido e os resultados saíram no prazo. Me senti acolhida em todos os exames.",
        author: "Paciente HSR",
        role: "Avaliação pré-operatória",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Dúvidas frequentes sobre o IMD",
    items: [
      {
        id: "imd-faq-1",
        question: "Como funciona o atendimento no IMD?",
        answer:
          "O IMD oferece consultas com especialistas, exames de imagem e laboratoriais em regime exclusivamente particular. O agendamento é feito diretamente pela nossa equipe de relacionamento, com agenda ágil e atendimento humanizado.",
      },
      {
        id: "imd-faq-2",
        question: "O IMD aceita convênios ou planos de saúde?",
        answer:
          "Não. O Hospital São Rafael e seus serviços, incluindo o IMD, são exclusivamente particulares. Os valores são apresentados de forma clara no agendamento, com pagamento à vista ou conforme condições combinadas.",
      },
      {
        id: "imd-faq-3",
        question: "Quais especialidades atendem no IMD?",
        answer:
          "[REVISAR DIRETORIA] Atendemos diversas especialidades médicas. Consulte nossa equipe para confirmar disponibilidade da especialidade que você precisa.",
      },
      {
        id: "imd-faq-4",
        question: "Quais exames o IMD realiza?",
        answer:
          "Ressonância magnética, tomografia, ultrassonografia, raio-X digital, exames laboratoriais, ECG, ecocardiograma, MAPA, Holter, teste ergométrico e outros. [REVISAR DIRETORIA] confirmar lista exata.",
      },
      {
        id: "imd-faq-5",
        question: "Quanto tempo demora o laudo?",
        answer:
          "Depende da modalidade. Exames laboratoriais e de rotina costumam ter resultado no mesmo dia. Imagens e laudos especializados seguem prazos clínicos rigorosos. Sua equipe de relacionamento informa o prazo no agendamento.",
      },
      {
        id: "imd-faq-6",
        question: "Posso fazer pré-operatório completo no IMD?",
        answer:
          "Sim. O IMD foi planejado especialmente para pacientes que farão cirurgia no Hospital São Rafael — exames laboratoriais, de imagem, cardiológicos e a consulta pré-anestésica em um único agendamento integrado.",
      },
      {
        id: "imd-faq-7",
        question: "Meu médico pode receber o laudo direto?",
        answer:
          "Sim. Disponibilizamos laudos pelo portal e enviamos cópia ao médico solicitante, com canal direto ao radiologista para discussão de casos quando necessário.",
      },
      {
        id: "imd-faq-8",
        question: "Como agendo consulta ou exame no IMD?",
        answer:
          "Pelo WhatsApp da nossa equipe de relacionamento. Você recebe orientação completa de preparo, documentos necessários, horário e estimativa de duração.",
      },
    ],
  },
  schemaType: "MedicalProcedure",
  lastReviewed: "2026-04-28",
  references: [
    {
      label: "ANVISA — Boas práticas em diagnóstico por imagem",
      href: "https://www.gov.br/anvisa/pt-br",
    },
    {
      label: "CFM — Resoluções sobre exames complementares",
      href: "https://portal.cfm.org.br/",
    },
    {
      label: "Colégio Brasileiro de Radiologia (CBR)",
      href: "https://cbr.org.br/",
    },
  ],
}

// =============================================================================
// CONTEÚDO — Unidade de Internação
// =============================================================================
// [REVISAR DIRETORIA] copy provisório — validar antes de publicar.
// =============================================================================

const INTERNACAO: ServiceDetailData = {
  slug: "internacao",
  meta: {
    title: "Internação Particular em Belo Horizonte | Hospital São Rafael",
    description:
      "65 leitos individuais com monitoramento 24h, equipe multidisciplinar e estrutura para acompanhante. Internação exclusivamente particular para cirurgias eletivas no HSR, BH.",
  },
  navSections: [
    { id: "intro", label: "A internação" },
    { id: "indicacoes", label: "Quem internamos" },
    { id: "infraestrutura", label: "Infraestrutura" },
    { id: "equipamentos", label: "Equipamentos" },
    { id: "numeros", label: "Números" },
    { id: "protocolos", label: "Protocolos" },
    { id: "jornada", label: "Como funciona" },
    { id: "acompanhante", label: "Acompanhante" },
    { id: "depoimentos", label: "Depoimentos" },
    { id: "faq", label: "Dúvidas" },
  ],
  hero: {
    kicker: "UNIDADE DE INTERNAÇÃO",
    headline: "Recuperação no conforto que você merece, com a segurança que precisa.",
    subheadline:
      "65 leitos individuais, monitoramento 24h, equipe multidisciplinar e integração com centro cirúrgico, IMD e UTI. Estrutura pensada também para o acompanhante. Atendimento exclusivamente particular.",
    backgroundImage: "/assets/images/servicos/internacao.jpg",
    pills: [
      "65 leitos individuais",
      "Monitoramento 24h",
      "Estrutura p/ acompanhante",
      "Atendimento particular",
    ],
  },
  intro: {
    kicker: "O QUE É",
    headline: "Uma internação pensada para a sua recuperação e para quem está com você",
    paragraphs: [
      "A Unidade de Internação do Hospital São Rafael foi planejada para que você se concentre apenas em uma coisa: se recuperar bem. São 65 leitos individuais, todos com banheiro privativo, poltrona reclinável para o acompanhante e monitorização à beira do leito 24 horas por dia.",
      "Estamos integrados ao centro cirúrgico, ao IMD e à UTI no mesmo complexo, com prontuário único e equipe multidisciplinar de enfermagem, fisioterapia, nutrição e farmácia clínica acompanhando cada paciente. Essa integração elimina a fragmentação do cuidado — do bloco operatório à alta hospitalar, todos os profissionais conversam entre si com base no mesmo plano clínico.",
      "Como hospital exclusivamente particular dedicado a cirurgias eletivas, organizamos a internação para acolher também o acompanhante: alimentação no complexo, Wi-Fi, regras de visitação claras e suporte da equipe sempre que necessário. Sabemos que recuperação acontece com quem cuida ao lado.",
    ],
  },
  indications: {
    kicker: "QUEM INTERNAMOS",
    headline: "Internação para cirurgias eletivas particulares",
    intro:
      "Recebemos pacientes em recuperação de procedimentos eletivos realizados no nosso centro cirúrgico, em diversas especialidades.",
    items: [
      {
        id: "pos-cirurgico",
        icon: "scalpel",
        title: "Pós-cirúrgico eletivo",
        description:
          "Recuperação de procedimentos cirúrgicos eletivos com monitoramento contínuo e plano de cuidado personalizado.",
        highlighted: true,
      },
      {
        id: "ortopedica",
        icon: "bone",
        title: "Recuperação ortopédica",
        description:
          "Pós-operatório de artroplastias, artroscopias e cirurgias de coluna com fisioterapia integrada.",
      },
      {
        id: "cardiologica",
        icon: "activity",
        title: "Recuperação cardiológica",
        description:
          "Pacientes pós-procedimentos cardíacos eletivos com acompanhamento intensivo até alta.",
      },
      {
        id: "bariatrica",
        icon: "shield-check",
        title: "Pós-bariátrica",
        description:
          "Recuperação especializada de cirurgias bariátricas e metabólicas com nutrição clínica dedicada.",
      },
      {
        id: "transicao",
        icon: "heart-handshake",
        title: "Unidade de Transição",
        description:
          "Acompanhamento entre alta hospitalar e retorno domiciliar para pacientes que precisam de suporte intermediário.",
      },
      {
        id: "outras",
        icon: "stethoscope",
        title: "Demais especialidades",
        description:
          "Internações eletivas pós-procedimentos de urologia, ginecologia, otorrino, oftalmo e demais especialidades.",
      },
    ],
  },
  galleryBlock: {
    kicker: "INFRAESTRUTURA",
    headline: "Um ambiente projetado para a sua recuperação",
    description:
      "Quartos individuais com banheiro privativo, decoração acolhedora e tecnologia para monitorização contínua. Postos de enfermagem distribuídos para resposta rápida e copa interna para refeições do paciente e acompanhante.",
    images: [
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Quarto individual da unidade de internação do Hospital São Rafael",
      },
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Posto de enfermagem na unidade de internação HSR",
      },
      {
        src: "/assets/images/servicos/internacao.jpg",
        alt: "Quarto com espaço dedicado ao acompanhante no HSR",
      },
    ],
    features: [
      {
        icon: "check-circle",
        title: "Quartos individuais com banheiro privativo",
        description: "Privacidade e conforto para paciente e acompanhante durante toda a internação.",
      },
      {
        icon: "check-circle",
        title: "Monitorização à beira do leito",
        description: "Sinais vitais acompanhados em tempo real e alarmes integrados ao posto de enfermagem.",
      },
      {
        icon: "check-circle",
        title: "Equipe multidisciplinar",
        description: "Enfermagem, fisioterapia, nutrição e farmácia clínica integrados no plano de cuidado.",
      },
      {
        icon: "check-circle",
        title: "Integração com centro cirúrgico, IMD e UTI",
        description: "Prontuário único e fluxo direto entre setores no mesmo complexo.",
      },
    ],
    cta: { label: "Falar no WhatsApp", href: "https://wa.me/message/NZIPXRZ4SKUHM1" },
  },
  equipment: {
    kicker: "TECNOLOGIA",
    headline: "Tecnologia que sustenta o cuidado",
    description:
      "A unidade conta com equipamentos modernos de monitorização e sistemas digitais que garantem segurança e rastreabilidade do cuidado em cada turno.",
    items: [
      {
        icon: "activity",
        title: "Monitorização à beira do leito",
        description:
          "Frequência cardíaca, saturação, pressão e demais parâmetros conectados ao posto de enfermagem.",
      },
      {
        icon: "headset",
        title: "Sistema de chamada inteligente",
        description:
          "Botões e dispositivos com priorização clínica e resposta rastreável.",
      },
      {
        icon: "clipboard-check",
        title: "Prontuário eletrônico integrado",
        description:
          "Registro digital ponta a ponta — bloco cirúrgico, IMD, internação e UTI no mesmo histórico.",
      },
      {
        icon: "shield-check",
        title: "Bombas de infusão e medicação rastreada",
        description:
          "Administração de medicamentos com dupla checagem e rastreabilidade do dispensário ao paciente.",
      },
    ],
  },
  highlights: {
    kicker: "NÚMEROS",
    headline: "Internação em dados",
    items: [
      {
        id: "leitos",
        metric: "65",
        icon: "bed",
        title: "Leitos individuais",
        description:
          "Capacidade para atender cirurgias eletivas de baixa a altíssima complexidade com disponibilidade.",
      },
      {
        id: "monitor",
        metric: "24h",
        icon: "activity",
        title: "Monitoramento contínuo",
        description:
          "Enfermagem e equipe médica presentes 24h, com sistemas de chamada e protocolos de resposta rápida.",
      },
      {
        id: "uti",
        metric: "UTI",
        icon: "shield-check",
        title: "Suporte intensivo integrado",
        description:
          "UTI no mesmo complexo, com transferência ágil e equipe já familiarizada com o caso.",
      },
      {
        id: "prontuario",
        metric: "100%",
        icon: "git-merge",
        title: "Prontuário integrado",
        description:
          "IMD, bloco cirúrgico, internação e UTI no mesmo prontuário digital — rastreabilidade ponta a ponta.",
      },
    ],
  },
  protocols: {
    kicker: "SEGURANÇA",
    headline: "Protocolos de internação alinhados a referências internacionais",
    intro:
      "Cada turno e cada profissional segue protocolos institucionais que reduzem risco e elevam a qualidade percebida pelo paciente.",
    items: [
      {
        id: "infeccao",
        icon: "shield-check",
        title: "Controle de infecção hospitalar",
        description:
          "Protocolos rigorosos de antissepsia, isolamento, antibioticoprofilaxia e auditoria contínua.",
      },
      {
        id: "queda",
        icon: "user-check",
        title: "Prevenção de quedas",
        description:
          "Avaliação de risco em cada admissão e medidas individualizadas durante toda a internação.",
      },
      {
        id: "ulcera",
        icon: "heart-handshake",
        title: "Prevenção de lesão por pressão",
        description:
          "Mudança de decúbito, colchões especiais e avaliação periódica conforme escala de Braden.",
      },
      {
        id: "medicamento",
        icon: "clipboard-check",
        title: "Segurança medicamentosa",
        description:
          "Dupla checagem, rastreabilidade do dispensário ao paciente e dispensação por dose unitária.",
      },
      {
        id: "alta",
        icon: "git-merge",
        title: "Alta segura",
        description:
          "Plano de cuidado domiciliar entregue por escrito, retorno agendado e contato direto em caso de dúvida.",
      },
    ],
    certifications: [
      "ANVISA",
      "CFM — Conselho Federal de Medicina",
      "OMS — Metas internacionais de segurança do paciente",
      "[PENDENTE CLIENTE] Acreditação ONA / outros selos",
    ],
  },
  journey: {
    kicker: "COMO FUNCIONA",
    headline: "Sua internação no HSR, do início ao fim",
    intro:
      "Cada etapa coordenada por uma equipe dedicada para que você e seu acompanhante saibam exatamente o que esperar.",
    steps: [
      {
        number: "1",
        title: "Admissão",
        description:
          "Recepção, conferência de documentos e exames pré-op, apresentação do quarto e da equipe responsável pelo turno.",
      },
      {
        number: "2",
        title: "Pós-operatório imediato",
        description:
          "Vinda do bloco cirúrgico ou da recuperação anestésica, com monitorização contínua e equipe atenta a cada parâmetro.",
      },
      {
        number: "3",
        title: "Recuperação",
        description:
          "Plano de cuidado individualizado, com fisioterapia, nutrição e enfermagem coordenados pelo seu cirurgião.",
      },
      {
        number: "4",
        title: "Alta segura",
        description:
          "Avaliação clínica, plano de cuidado domiciliar por escrito, prescrição de medicamentos e retorno agendado.",
      },
      {
        number: "5",
        title: "Acompanhamento pós-alta",
        description:
          "Canal aberto para dúvidas, retorno ao consultório do seu médico e suporte da equipe HSR se necessário.",
      },
    ],
  },
  acompanhante: {
    kicker: "PARA QUEM ESTÁ COM VOCÊ",
    headline: "Quem cuida de você também precisa de cuidado.",
    description:
      "A presença de quem está com você faz parte da recuperação. Por isso, organizamos a Unidade de Internação para acolher o acompanhante com conforto, informação clara e suporte sempre que necessário.",
    amenities: [
      {
        icon: "sofa",
        title: "Poltrona reclinável no quarto",
        description:
          "Espaço dedicado ao descanso do acompanhante, com poltrona reclinável e roupa de cama disponível.",
      },
      {
        icon: "shield-check",
        title: "Banheiro privativo",
        description:
          "Cada quarto tem banheiro privativo, com itens de higiene básicos disponíveis.",
      },
      {
        icon: "utensils",
        title: "Alimentação no complexo",
        description:
          "Praça de Alimentação dentro do hospital com voucher disponível para acompanhantes.",
      },
      {
        icon: "headset",
        title: "Wi-Fi e suporte",
        description:
          "Conexão estável em todos os quartos e equipe disponível para qualquer dúvida no turno.",
      },
      {
        icon: "heart-handshake",
        title: "Regras de visitação claras",
        description:
          "Horários, número de visitantes e cuidados de higiene apresentados na admissão.",
      },
      {
        icon: "user-check",
        title: "Suporte se algo mudar",
        description:
          "Acesso direto à equipe médica e à UTI no mesmo complexo, em qualquer intercorrência.",
      },
    ],
    note: "[REVISAR DIRETORIA] regras do voucher de alimentação para acompanhantes e horários de visitação atualizados.",
  },
  testimonials: {
    headline: "O que dizem nossos pacientes e acompanhantes",
    items: [
      {
        id: "t1",
        quote:
          "A equipe de enfermagem foi excepcional. Atenção e cuidado de dia e de noite. Me senti seguro durante toda a internação.",
        author: "Paciente HSR",
        role: "Cirurgia ortopédica",
        image: "",
      },
      {
        id: "t2",
        quote:
          "Pude ficar com meu marido o tempo todo, com conforto e respeito. Fez muita diferença para a recuperação dele.",
        author: "Acompanhante HSR",
        role: "Esposa de paciente cirúrgico",
        image: "",
      },
      {
        id: "t3",
        quote:
          "Como cirurgião, fico tranquilo sabendo que meus pacientes estão em uma unidade preparada e bem coordenada.",
        author: "Cirurgião parceiro HSR",
        role: "Especialista bariátrico",
        image: "",
      },
    ],
  },
  faq: {
    kicker: "PERGUNTAS FREQUENTES",
    headline: "Dúvidas frequentes sobre a internação",
    items: [
      {
        id: "int-faq-1",
        question: "Como funciona a internação no Hospital São Rafael?",
        answer:
          "A internação é programada junto com o agendamento da cirurgia. Você é recebido na recepção, passa pela admissão e é conduzido ao quarto. A equipe apresenta a unidade e inicia o plano de cuidado individualizado.",
      },
      {
        id: "int-faq-2",
        question: "O HSR aceita convênios ou planos de saúde para internação?",
        answer:
          "Não. O Hospital São Rafael é exclusivamente particular. Os valores de internação são apresentados de forma clara no agendamento da cirurgia, junto ao plano cirúrgico.",
      },
      {
        id: "int-faq-3",
        question: "O acompanhante pode ficar durante toda a internação?",
        answer:
          "Sim. Quartos individuais com poltrona reclinável e banheiro privativo, com Wi-Fi, alimentação no complexo e regras de visitação claras. Em casos clínicos específicos, a equipe pode indicar restrições temporárias.",
      },
      {
        id: "int-faq-4",
        question: "Quanto tempo dura a internação?",
        answer:
          "Depende do tipo de cirurgia e da evolução clínica. Cirurgias minimamente invasivas costumam ter alta em 24 a 48 horas; procedimentos de maior complexidade podem exigir 3 a 7 dias. Seu cirurgião informa a estimativa no pré-operatório.",
      },
      {
        id: "int-faq-5",
        question: "Como funciona a alimentação durante a internação?",
        answer:
          "Equipe de nutrição clínica avalia cada paciente e adapta a dieta às necessidades pós-cirúrgicas. Acompanhantes têm acesso à Praça de Alimentação do complexo, com voucher disponível.",
      },
      {
        id: "int-faq-6",
        question: "E se eu precisar de UTI?",
        answer:
          "A UTI fica no mesmo complexo, com transferência ágil e equipe já familiarizada com o caso pelo prontuário único. Protocolos institucionais garantem resposta rápida em qualquer intercorrência.",
      },
      {
        id: "int-faq-7",
        question: "Posso receber visitas?",
        answer:
          "Sim. As regras de horário e número de visitantes são apresentadas na admissão e podem variar conforme o caso clínico, sempre priorizando o descanso e a recuperação do paciente.",
      },
      {
        id: "int-faq-8",
        question: "Como funciona a alta?",
        answer:
          "A alta é planejada com seu cirurgião e equipe multidisciplinar. Você recebe plano de cuidado domiciliar por escrito, prescrição de medicamentos, retorno agendado e canal direto para dúvidas.",
      },
      {
        id: "int-faq-9",
        question: "Existe Unidade de Transição?",
        answer:
          "Sim. Para pacientes que precisam de suporte entre alta hospitalar e retorno completo ao domicílio, oferecemos Unidade de Transição com cuidado intermediário.",
      },
      {
        id: "int-faq-10",
        question: "Como agendo internação no HSR?",
        answer:
          "A internação é agendada junto com a cirurgia. Após a indicação do seu médico, fale com a nossa equipe pelo WhatsApp para coordenar exames pré-op no IMD, consulta pré-anestésica e a data da cirurgia.",
      },
    ],
  },
  schemaType: "MedicalProcedure",
  lastReviewed: "2026-04-28",
  references: [
    {
      label: "OMS — Metas internacionais de segurança do paciente",
      href: "https://www.who.int/teams/integrated-health-services/patient-safety",
    },
    {
      label: "ANVISA — Boas práticas em internação hospitalar",
      href: "https://www.gov.br/anvisa/pt-br",
    },
    {
      label: "CFM — Conselho Federal de Medicina",
      href: "https://portal.cfm.org.br/",
    },
  ],
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
  "centro-cirurgico": CENTRO_CIRURGICO,
  "imd": IMD,
  "internacao": INTERNACAO,
}
