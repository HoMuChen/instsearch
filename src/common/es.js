export const genMatchAry = (field, keywords) => {
  if (Array.isArray(keywords)) {
    return keywords
             .map(keyword => ({
               match: { [field]: keyword }
             }))
  } else {
    if (keywords === '') return [];

    return keywords.split(' ')
             .map(keyword => ({
               match: { [field]: keyword }
             }))
  }
}

export const genRangeAry = ({ field='tm', from, to }) => [
  {
    range: {
      [field]: { gt: from, lt: to }
    },
  },
]
