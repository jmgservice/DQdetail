/**
 * DELLAZARI & QUADROS — Lógica de agendamento
 * -----------------------------------------------------------
 * Módulo puro (sem dependência de framework). Funciona tanto
 * num backend Node/Express quanto numa Cloud Function do
 * Supabase/Firebase. Toda função que precisa de dado
 * persistido recebe um `store` como argumento — troque a
 * implementação de `store` (Postgres, Firestore, etc.) sem
 * mexer nas regras abaixo.
 * -----------------------------------------------------------
 */

// ---------------------------------------------------------
// 1. CATÁLOGO DE SERVIÇOS
// channel: 'site'     -> agenda direto, entra no fluxo de slots
//          'whatsapp' -> nunca mostra calendário, só o botão
// ---------------------------------------------------------
export const SERVICES = [
  // --- Carro/Camioneta ---
  { id: 'carro-l1', name: 'Lavagem Nível 1', vehicleType: 'carro', channel: 'site', capacityGroup: 'lavagem_rapida' },
  { id: 'carro-l2', name: 'Lavagem Nível 2 (Detalhada)', vehicleType: 'carro', channel: 'site', capacityGroup: 'lavagem_rapida' },
  { id: 'carro-polimento', name: 'Polimento Técnico', vehicleType: 'carro', channel: 'whatsapp' },
  { id: 'carro-higienizacao', name: 'Higienização Interna Completa', vehicleType: 'carro', channel: 'whatsapp' },
  { id: 'carro-motor', name: 'Lavagem Técnica de Motor', vehicleType: 'carro', channel: 'whatsapp' },
  { id: 'carro-chassi', name: 'Lavagem Técnica de Chassi', vehicleType: 'carro', channel: 'whatsapp' },
  { id: 'carro-farois', name: 'Polimento de Faróis (Par)', vehicleType: 'carro', channel: 'whatsapp' },
  { id: 'carro-chuva-acida', name: 'Remoção de Chuva Ácida (Vidros)', vehicleType: 'carro', channel: 'whatsapp' },
  { id: 'carro-espelhamento', name: 'Espelhamento de Pintura (Brilho Intenso Profundo)', vehicleType: 'carro', channel: 'whatsapp' },

  // --- Moto ---
  { id: 'moto-l1', name: 'Lavagem Nível 1', vehicleType: 'moto', channel: 'site', capacityGroup: 'lavagem_rapida' },
  { id: 'moto-l2', name: 'Lavagem Nível 2', vehicleType: 'moto', channel: 'site', capacityGroup: 'lavagem_rapida' },
  { id: 'moto-l3', name: 'Lavagem Nível 3 (Detalhada)', vehicleType: 'moto', channel: 'site', capacityGroup: 'lavagem_rapida' },
  { id: 'moto-polimento', name: 'Polimento de Pintura', vehicleType: 'moto', channel: 'whatsapp' },
  { id: 'moto-escapamento', name: 'Polimento de Escapamento', vehicleType: 'moto', channel: 'whatsapp' },
  { id: 'moto-pintura-escapamento', name: 'Pintura de Escapamento', vehicleType: 'moto', channel: 'whatsapp' },
  { id: 'moto-vitrificacao', name: 'Vitrificação de Pintura (Proteção Cerâmica)', vehicleType: 'moto', channel: 'whatsapp' },
  { id: 'moto-descontaminacao', name: 'Descontaminação Ferrosa Completa', vehicleType: 'moto', channel: 'whatsapp' },
  { id: 'moto-espelhamento', name: 'Espelhamento de Pintura (Brilho Intenso)', vehicleType: 'moto', channel: 'whatsapp' },

  // --- Caminhão (tudo especializado -> sempre WhatsApp) ---
  { id: 'caminhao-lavagem', name: 'Lavagem e Estética de Caminhões', vehicleType: 'caminhao', channel: 'whatsapp' },
  { id: 'caminhao-higienizacao', name: 'Higienização Interna Completa de Cabine', vehicleType: 'caminhao', channel: 'whatsapp' },
  { id: 'caminhao-vitrificacao', name: 'Vitrificação e Proteção de Pintura', vehicleType: 'caminhao', channel: 'whatsapp' },
  { id: 'caminhao-polimento', name: 'Polimento Técnico de Cabine e Alumínios', vehicleType: 'caminhao', channel: 'whatsapp' },
  { id: 'caminhao-chuva-acida', name: 'Remoção de Chuva Ácida dos Vidros', vehicleType: 'caminhao', channel: 'whatsapp' },
  { id: 'caminhao-farois', name: 'Polimento e Restauração de Faróis', vehicleType: 'caminhao', channel: 'whatsapp' },
];

// ---------------------------------------------------------
// 2. GRUPOS DE CAPACIDADE
// 6 slots x 2 vagas = 12/dia. Ajuste aqui sem tocar no resto.
// ---------------------------------------------------------
export const CAPACITY_GROUPS = {
  lavagem_rapida: {
    slots: ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00'],
    capacityPerSlot: 2,
  },
};

// ---------------------------------------------------------
// 2b. CONFIGURAÇÃO CENTRAL DA ESTÉTICA
// Único lugar do módulo com dados específicos deste cliente
// (nome da empresa, WhatsApp do proprietário). Pra reutilizar
// o sistema em outra estética, troque só aqui. Em produção,
// substitua os valores fixos por variáveis de ambiente, ex.:
//   NEXT_PUBLIC_WHATSAPP_ESTETICA=5554993018888
// lida via process.env.NEXT_PUBLIC_WHATSAPP_ESTETICA (ou o
// equivalente do framework usado no backend).
// ---------------------------------------------------------
export const CONFIG = {
  empresaNome: 'Dellazari & Quadros',
  whatsappEstetica: '5554993018888', // número do PROPRIETÁRIO, nunca o do cliente
};

// ---------------------------------------------------------
// 3. DISPONIBILIDADE
// store precisa expor:
//   getConfirmedCount({ capacityGroup, date, slotTime }) -> number
//   getAdjustment({ capacityGroup, date, slotTime|null }) -> number (soma de deltas)
// ---------------------------------------------------------
export async function getAvailableSlots(store, { capacityGroup, date }) {
  const group = CAPACITY_GROUPS[capacityGroup];
  if (!group) throw new Error(`Grupo de capacidade desconhecido: ${capacityGroup}`);

  const slots = await Promise.all(
    group.slots.map(async (slotTime) => {
      const [confirmed, dayAdjustment, slotAdjustment] = await Promise.all([
        store.getConfirmedCount({ capacityGroup, date, slotTime }),
        store.getAdjustment({ capacityGroup, date, slotTime: null }),
        store.getAdjustment({ capacityGroup, date, slotTime }),
      ]);
      const capacidade = group.capacityPerSlot + dayAdjustment + slotAdjustment;
      const vagasRestantes = Math.max(0, capacidade - confirmed);
      return { slotTime, vagasRestantes, disponivel: vagasRestantes > 0 };
    })
  );
  return slots;
}

// ---------------------------------------------------------
// 4. CRIAÇÃO DE AGENDAMENTO
// Revalida a vaga dentro da própria transação do store para
// evitar overbooking por concorrência (dois clientes clicando
// "confirmar" ao mesmo tempo no último horário livre).
// store precisa expor:
//   runInTransaction(fn)
//   lockAndCountConfirmed({ trx, capacityGroup, date, slotTime }) -> number
//   getAdjustment({ trx, capacityGroup, date, slotTime|null }) -> number
//   insertAppointment({ trx, ...dados }) -> appointment
// ---------------------------------------------------------
export async function createAppointment(store, input) {
  const service = SERVICES.find((s) => s.id === input.serviceId);
  if (!service) throw new Error('Serviço não encontrado.');
  if (service.channel !== 'site') {
    throw new Error('Este serviço não é agendado pelo site — use o redirecionamento para o WhatsApp.');
  }

  const group = CAPACITY_GROUPS[service.capacityGroup];
  if (!group.slots.includes(input.slotTime)) {
    throw new Error('Horário inválido para este serviço.');
  }

  return store.runInTransaction(async (trx) => {
    const [confirmed, dayAdjustment, slotAdjustment] = await Promise.all([
      store.lockAndCountConfirmed({ trx, capacityGroup: service.capacityGroup, date: input.date, slotTime: input.slotTime }),
      store.getAdjustment({ trx, capacityGroup: service.capacityGroup, date: input.date, slotTime: null }),
      store.getAdjustment({ trx, capacityGroup: service.capacityGroup, date: input.date, slotTime: input.slotTime }),
    ]);
    const capacidade = group.capacityPerSlot + dayAdjustment + slotAdjustment;
    if (confirmed >= capacidade) {
      throw new SlotFullError('Esse horário acabou de lotar. Escolha outro, por favor.');
    }

    return store.insertAppointment({
      trx,
      serviceId: service.id,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      vehicleModel: input.vehicleModel ?? null,
      date: input.date,
      slotTime: input.slotTime,
      status: 'confirmado',
    });
  });
}

export class SlotFullError extends Error {}

// ---------------------------------------------------------
// 4b. NOTIFICAÇÃO DO PROPRIETÁRIO APÓS AGENDAMENTO PELO SITE
// Chamada só DEPOIS que createAppointment() já salvou com
// sucesso (o `appointment` retornado por ela tem os dados
// necessários). Não é uma integração com WhatsApp Business
// API — é só o link click-to-chat de https://wa.me, com a
// mensagem já preenchida. Quem decide enviar é o cliente,
// clicando no botão no front-end; nada é disparado sozinho.
// ---------------------------------------------------------
export function buildOwnerNotificationMessage(appointment) {
  const service = SERVICES.find((s) => s.id === appointment.serviceId);
  const linhas = [
    'Olá! Novo agendamento realizado pelo site.',
    '',
    `👤 Cliente: ${appointment.customerName}`,
    `📱 WhatsApp: ${appointment.customerPhone}`,
    '',
    `🚗 Serviço: ${service ? service.name : appointment.serviceId}`,
    `📅 Data: ${formatarDataBr(appointment.date)}`,
    `🕐 Horário: ${appointment.slotTime}`,
    '',
    'O agendamento foi realizado pelo sistema do site.',
  ];
  return linhas.join('\n');
}

export function buildOwnerNotificationUrl(appointment) {
  const mensagem = buildOwnerNotificationMessage(appointment);
  return `https://wa.me/${CONFIG.whatsappEstetica}?text=${encodeURIComponent(mensagem)}`;
}

// ---------------------------------------------------------
// 5. MENSAGEM PRÉ-FORMATADA PARA O WHATSAPP
// Usada tanto para serviços channel='whatsapp' quanto,
// opcionalmente, para enviar a confirmação de um agendamento
// feito no site.
// ---------------------------------------------------------
export function buildWhatsappUrl({ service, customerName, vehicleModel, preferredDate, notes }) {
  const linhas = [
    `Olá! Quero saber mais sobre o serviço: *${service.name}* (${labelVeiculo(service.vehicleType)}).`,
  ];
  if (customerName) linhas.push(`Nome: ${customerName}`);
  if (vehicleModel) linhas.push(`Veículo: ${vehicleModel}`);
  if (preferredDate) linhas.push(`Data de interesse: ${formatarDataBr(preferredDate)}`);
  if (notes) linhas.push(`Observações: ${notes}`);
  linhas.push('Poderiam me confirmar disponibilidade e valor?');

  const texto = encodeURIComponent(linhas.join('\n'));
  return `https://wa.me/${CONFIG.whatsappEstetica}?text=${texto}`;
}

function labelVeiculo(v) {
  return { carro: 'Carro/Camioneta', moto: 'Moto', caminhao: 'Caminhão' }[v] ?? v;
}

function formatarDataBr(isoDate) {
  const [ano, mes, dia] = isoDate.split('-');
  return `${dia}/${mes}/${ano}`;
}
