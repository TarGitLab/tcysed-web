import { ethers } from "../../../libary/ethers@6.5.0.js";

async function encodeNftSetApprovalForAll(operator, approved) {
  try {
    const abi = ["function setApprovalForAll(address operator, bool approved)"];
    const iface = new ethers.Interface(abi);
    let data = iface.encodeFunctionData("setApprovalForAll", [operator, approved])
    return {status: true, data: data};
  } catch (error) {
    return {status: false, message: error.message};
  } 
}


export { encodeNftSetApprovalForAll };