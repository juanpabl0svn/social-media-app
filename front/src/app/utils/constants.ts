const API_URL = 'http://localhost:5000';

export const POST = (endpoint: string, body: any) => {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch(() => null);
};

export const GET = (endpoint: string) => {
  return fetch(`${API_URL}${endpoint}`)
    .then((res) => res.json())
    .catch(() => null);
};

export const POST_FORMDATA = (endpoint: string, formData: FormData) => {
  return fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .catch(() => null);
};
