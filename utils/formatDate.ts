export const formatDate = (analysis: [], date: []) => {
    return analysis.map((item: any) => {
      date.forEach((date: any) => {
        return (item.createdAt = date.createdAt)
      })
    })
}