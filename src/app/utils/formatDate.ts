export function formatDate(date: Date) {
  return Intl.DateTimeFormat("pt-br", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
