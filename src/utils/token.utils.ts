const getToken = (tokenBearer: string) => tokenBearer?.split(" ")[1] ?? "";

export { getToken };
