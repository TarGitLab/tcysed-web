import { ethers } from "../../../libary/ethers@6.5.0.js";

const erc20Abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
];

async function getERC20Details(provider, tokenAddress) {
  const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);

  try {
    const [name, symbol, decimals] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
    ]);

    return {
      status: true,
      name,
      symbol,
      decimals,
    };
  } catch (err) {
    return {
      status: false,
      message: err.message,
    };
  }
}

async function getERC20Balance(provider, tokenAddress, walletAddress) {

  const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);

  try {
    const [rawBalance, decimals] = await Promise.all([
      contract.balanceOf(walletAddress),
      contract.decimals(),
    ]);

    // Convert using ethers.formatUnits()
    const formattedBalance = ethers.formatUnits(rawBalance, decimals);

    return {
      status: true,
      rawBalance,
      decimals,
      formattedBalance: Math.floor(Number(formattedBalance)), 
    };
  } catch (err) {
    return {
      status: false,
      message: err.message,
    };
  }

}


export { getERC20Details, getERC20Balance };
