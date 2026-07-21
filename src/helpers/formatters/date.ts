export function formatDate(date: Date) {
  const partes = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).formatToParts(new Date(date));

  const obter = (tipo) => partes.find((p) => p.type === tipo)?.value;

  return `${obter('weekday')}, ${obter('day')} ${obter('month')} ${obter('year')}`;
}
