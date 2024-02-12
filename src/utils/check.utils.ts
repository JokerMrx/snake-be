export const checkIsValidEmail = (email: string) =>
  /^[\w\-\\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
