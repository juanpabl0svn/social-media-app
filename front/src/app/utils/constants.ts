
export const POST = (endpoint: string, body: any) => {
  return fetch(`http://localhost:3000/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const GET = (endpoint: string) => {
  return fetch(`http://localhost:3000/${endpoint}`).then((res) => res.json());
};



