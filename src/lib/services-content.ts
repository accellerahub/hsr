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

export interface ServiceDetailData {
  slug: string
  meta: {
    title: string
    description: string
  }
  hero: ServiceHeroData
  galleryBlock: ServiceGalleryBlockData
  highlights: ServiceHighlightsData
  testimonials: ServiceTestimonialsData
  faq: FAQData
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
    backgroundImage: "/assets/images/servicos/centro-cirurgico.jpg",
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
        src: "/assets/images/servicos/centro-cirurgico.jpg",
        alt: "Sala cirúrgica equipada com tecnologia de última geração",
      },
      {
        src: "/assets/images/servicos/centro-cirurgico.jpg",
        alt: "Bloco cirúrgico com equipe médica",
      },
      {
        src: "/assets/images/servicos/centro-cirurgico.jpg",
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
// MAPA DE SERVIÇOS — indexado por slug
// -----------------------------------------------------------------------------

export const SERVICES_CONTENT: Record<string, ServiceDetailData> = {
  "centro-cirurgico": CENTRO_CIRURGICO,
  "internacao": INTERNACAO,
}
