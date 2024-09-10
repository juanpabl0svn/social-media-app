import axios from 'axios';

interface IError {
  response: {
    data: {
      message: string[];
    }
  }
}

const API_URL = 'http://localhost:3000';

export const POST = async (endpoint: string, body: any) => {

  try {
    const req = await axios.post(`${API_URL}${endpoint}`, body)
    return req.data;
  } catch (e) {
    const error = e as IError;
    const message = typeof error.response?.data.message == 'object' ? error.response?.data.message : ['Error en nuestros servicios, espere un momento y vuelva a intentarlo'];
    return {
      error: message
    }

  }
}

export const GET = async (endpoint: string) => {
  try {
    const req = await axios.get(`${API_URL}${endpoint}`)
    return req.data;
  } catch (e) {
    const error = e as IError;
    return {
      error: error.response.data.message[0]
    }
  }
};

export const DELETE = async (endpoint: string) => {
  try {
    const req = await axios.delete(`${API_URL}${endpoint}`)
    return req.data;
  } catch (e) {
    const error = e as IError;
    return {
      error: error.response.data.message[0]
    }
  }
};

export const PATCH = async (endpoint: string, body: any) => {
  try {
    const req = await axios.patch(`${API_URL}${endpoint}`, body)
    return req.data;
  } catch (e) {
    const error = e as IError;
    return {
      error: error.response.data.message[0]
    }
  }
};

export function handleCloseModal(callback: Function) {
  const modal = document.getElementById('modal') as HTMLElement;

  if (!modal) return;

  modal.classList.add('hide-modal');

  setTimeout(() => {
    callback();
  }, 300);
}
