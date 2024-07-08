export function sendEmail(data: any) {
  const apiEndpoint = "/api/email";

  console.log(data);
  fetch(apiEndpoint, {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}
