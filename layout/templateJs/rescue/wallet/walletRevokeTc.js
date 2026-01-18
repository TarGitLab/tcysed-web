const revokeDelegationTermsData = [
  {
    section: "Required Wallets",
    items: [
      {
        title: "Delegated (Compromised) Wallet",
        message:
          "The wallet that previously granted delegation must be connected to sign the revocation authorization. This wallet is only used for signing and does not require gas funds.",
      },
      {
        title: "Sponsor Wallet",
        message:
          "A separate sponsor wallet must be connected to pay gas fees for the delegation revocation transaction, avoiding the need to fund the delegated wallet.",
      },
    ],
  },

  {
    section: "Delegation Revocation Requirements",
    items: [
      {
        title: "Supported EVM Network",
        message:
          "The selected blockchain network must support EVM-based delegation mechanisms (such as EIP-7702-style execution delegation).",
      },
      {
        title: "Active Delegation",
        message:
          "The wallet must currently have an active delegation set. Revocation clears the delegated execution target by resetting it to a null address.",
      },
      {
        title: "Authorization Signature",
        message:
          "A valid revocation authorization must be signed by the delegated wallet to explicitly remove execution rights.",
      },
    ],
  },

  {
    section: "Sponsor Wallet Requirements",
    items: [
      {
        title: "Gas Fee Balance",
        message:
          "The sponsor wallet must hold sufficient native tokens to cover the gas cost of the revocation transaction on the selected network.",
      },
    ],
  },

  {
    section: "Revoke Delegation Process",
    items: [
      {
        title: "Delegation Reset",
        message:
          "The delegation target is reset to the zero address, immediately removing all delegated execution permissions.",
      },
      {
        title: "Atomic Execution",
        message:
          "The revocation is executed as a single atomic transaction, preventing partial state changes or exploit windows.",
      },
      {
        title: "Bot Risk Reduction",
        message:
          "No ETH is transferred to the delegated wallet during revocation, minimizing exposure to sweeper or frontrunning bots.",
      },
    ],
  },

  {
    section: "Security Policies",
    items: [
      {
        title: "Local Signing",
        message:
          "All authorization signatures are generated locally in the user’s wallet. No private keys or sensitive data are stored or transmitted.",
      },
      {
        title: "Explicit User Consent",
        message:
          "Delegation revocation is only performed after explicit user approval and signature confirmation.",
      },
      {
        title: "Permission Scope",
        message:
          "Revocation strictly removes existing delegation permissions and does not grant any new rights to the sponsor wallet or third parties.",
      },
    ],
  },

  {
    section: "Finality & Limitations",
    items: [
      {
        title: "Irreversible Action",
        message:
          "Once a delegation is revoked, the change is permanent on-chain. Re-delegation requires a new explicit authorization.",
      },
      {
        title: "Transaction Timing",
        message:
          "Revocation cannot cancel malicious transactions that are already mined or pending in the mempool.",
      },
      {
        title: "EVM-Only Support",
        message:
          "Delegation revocation tools are available only for EVM-compatible blockchain networks.",
      },
    ],
  },
];

export { revokeDelegationTermsData };
