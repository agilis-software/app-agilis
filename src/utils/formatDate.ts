export function addDateMask(value: string) {
  if (!value) {
    return
  }

  const date = new Date(value)

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }

  return date.toLocaleDateString('pt-BR', options)
}

export function formatDateToISO(value: string) {
  if (!value) {
    return
  }

  const date = new Date(value)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }

  return date.toLocaleDateString('fr-CA', options)
}
