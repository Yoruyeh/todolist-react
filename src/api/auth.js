import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password
    })

    const { authToken } = data
    if (authToken) {
      return { sucess: true, ...data }
    }

    return data;

  } catch (error) {
    console.error('[Login failed]:', error)
  }
}