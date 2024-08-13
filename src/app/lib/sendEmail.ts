export async function sendEmail(
  data: any
): Promise<{ message: string; status: number }> {
  const apiEndpoint = "/api/email";

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      // If the response is not OK, throw an error with the status text
      const errorText = await response.text();
      throw new Error(errorText || "Something went wrong");
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    return error;
  }
}
