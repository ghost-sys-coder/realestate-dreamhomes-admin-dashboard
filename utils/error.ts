import axios from "axios";

export async function getAxiosError(error: unknown) {
  // axios error
  if (axios.isAxiosError(error)) {
    return (
      error?.response?.data?.message ||
      error?.response?.statusText ||
      "Request Failed"
    );
  }

  // native js Error
  if (error instanceof Error) {
    return error.message;
  }

  // fallback
  return "Something went wrong";
}
