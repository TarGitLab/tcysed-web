import { ethers } from "../../../libary/ethers@6.5.0.js";

async function encodeErc20Transfer(to, amount, decimals) {
  try {
    const abi = ["function transfer(address to, uint256 amount)"];
    const iface = new ethers.Interface(abi);

    // Convert human amount → raw on-chain amount
    const parsedAmount = ethers.parseUnits(amount.toString(), decimals);

    const data = iface.encodeFunctionData("transfer", [to, parsedAmount]);

    return {
      status: true,
      data: data,
      rawAmount: parsedAmount.toString(),
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
}

export { encodeErc20Transfer };
