export function getStudents() {
  return fetch(process.env.API_URL)
  .then((response) => {
    return response.json();
  });
}
