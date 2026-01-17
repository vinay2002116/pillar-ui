import { format } from 'date-fns'

const convertEpochTime = (epochTime: number) => {
  const date = new Date(epochTime * 1000)
  return format(date, 'dd MMM yyyy, hh:mm a')
}

export { convertEpochTime }
