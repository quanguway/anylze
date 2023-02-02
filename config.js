export const configAPI = {
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? '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'}`,
  }
}

export const apiURL = process.env.API_URL;