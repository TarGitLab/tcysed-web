import { JsonRpcProvider, WebSocketProvider } from "../../../libary/ethers@6.5.0.js";

function getProvider(url) {
  if (url.startsWith("ws://") || url.startsWith("wss://")) {
    return new WebSocketProvider(url);
  }
  return new JsonRpcProvider(url);
}

async function checkRpc(url) {
  const provider = getProvider(url);

  try {
    const network = await provider.getNetwork();

    return {
      status: true,
      chainId: Number(network.chainId),
      error: null,
      provider: provider,
    };
  } catch (err) {
    return {
      status: false,
      chainId: null,
      error: err.message,
    };
  } finally {
    // if (provider.destroy) provider.destroy();
  }
}


export { checkRpc };
