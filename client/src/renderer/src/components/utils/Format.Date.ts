// -------- format Date
export const forDate = (d): string => {
  const DD = String(d.getDate()).padStart(2, '0')
  const MM = String(d.getMonth() + 1).padStart(2, '0')
  const YY = d.getFullYear()
  const formatDate = `${DD}.${MM}.${YY}`
  return formatDate
}
