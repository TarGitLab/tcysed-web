import { ethers } from "../../../libary/ethers@6.5.0.js";

const abi = ["function name() view returns (string)"];

async function getNFTName(provider, nftCaAddress) {
  const contract = new ethers.Contract(nftCaAddress, abi, provider);

  try {
    const name = await contract.name();
    return { status: true, name: name };
  } catch (err) {
    return { status: false, message: err.message };
  }
}

export { getNFTName };
