import { CryptoJS } from "../../../../src/libary/crypto-js.js";

function encryptData(data, password) {
  try {
    const jsonString = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(jsonString, password).toString();
    return {status: true, data: encrypted};
  } catch (error) {
    return { status: false, message: error.message}
  }
}


export { encryptData };