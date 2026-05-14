const blacklist = [
    'connho',
    'coñ[o0]?',
    'puta',
    'puto',
    'mierda',
    'idiota',
    'imbecil',
    'estupido',
    'cabr[o0]n',
    'carquin',
    'pendejo',
    'carajo',
    'chongo',
    'chinga',
    'chingada'
];

const regex = new RegExp('\\b(' + blacklist.join('|') + ')\\b', 'i');

export function isBlocked(text) {
  if (!text) return false;
  return regex.test(String(text));
}

export function checkAndRespond(text) {
  if (isBlocked(text)) {
    return { blocked: true, response: 'Lo siento, no puedo ayudar con eso bb.' };
  }
  return { blocked: false, response: null };
}


export default {
  isBlocked,
  checkAndRespond,
};
