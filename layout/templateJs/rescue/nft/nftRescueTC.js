const rescueTermsData = [
  {
    section: "Required Wallets",
    items: [
      {
        title: "Compromised Wallet",
        message:
          "User must connect the compromised wallet containing the NFT. This wallet is only used for signing rescue transactions.",
      },
      {
        title: "Sponsor Wallet",
        message:
          "A separate sponsor wallet must be connected. This wallet covers the gas fees required for the rescue process and receives the rescued NFT.",
      },
    ],
  },

  {
    section: "Rescue Requirements",
    items: [
      {
        title: "Network RPC URL",
        message:
          "A valid RPC URL for the selected blockchain network must be provided to broadcast transactions securely.",
      },
      {
        title: "NFT Contract Address",
        message:
          "The ERC721/ERC1155 contract address of the NFT is required for verifying ownership and executing the transfer.",
      },
      {
        title: "NFT Transfer Data",
        message:
          "Token ID and transfer call-data must be provided so the system can generate an emergency transfer transaction.",
      },
    ],
  },

  {
    section: "Sponsor Wallet Requirements",
    items: [
      {
        title: "Gas Fee Balance",
        message:
          "The sponsor wallet must have sufficient native tokens to pay for rescue transactions on the chosen blockchain network.",
      },
    ],
  },

  {
    section: "Rescue NFT Process",
    items: [
      {
        title: "Emergency Transfer",
        message:
          "The NFT is transferred directly from the compromised wallet to the sponsor wallet through a single atomic transaction.",
      },
      {
        title: "Bot Avoidance Strategy",
        message:
          "Transactions are crafted to minimize exposure to sweeper bots by avoiding unnecessary gas funding of the compromised wallet.",
      },
      {
        title: "Irreversible Operation",
        message:
          "Once the NFT is rescued and transferred to the sponsor wallet, the action is irreversible on-chain.",
      },
    ],
  },

  {
    section: "Security Policies",
    items: [
      {
        title: "Local Data Handling",
        message:
          "No private keys, wallet seeds, or sensitive data are stored on our servers; all processing occurs on the user’s local machine.",
      },
      {
        title: "Transaction Safety",
        message:
          "Only user-approved transactions are executed. The system does not perform any blockchain action without explicit signature.",
      },
      {
        title: "Risk Awareness",
        message:
          "Users should verify all inputs carefully. Incorrect contract addresses or nft transaction data may result in failed or misdirected transfers.",
      },
    ],
  },

  {
    section: "Support & Limitations",
    items: [
      {
        title: "Supported Blockchains",
        message:
          "Rescue tools are available only for EVM networks .",
      },
      {
        title: "Technical Support",
        message:
          "Users can open a support request for guidance. Response time is usually within 24–48 hours.",
      },
      {
        title: "No Guarantee",
        message:
          "Successful rescue depends on the current state of the compromised wallet and sweeper bot activity; results cannot be guaranteed.",
      },
    ],
  },
];

export { rescueTermsData };
