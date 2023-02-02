export const configAPI = {
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  }
}

export const apiURL = process.env.API_URL;