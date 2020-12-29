const chains = {
  1: {
    ROBONOMICS: {
      ens: "",
      ensSuffix: "eth",
      lighthouse: "airalab.lighthouse.5.robonomics.eth"
    },
    TOKEN: "0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7", // XRT
    TOKEN_SYMBOL: "XRT",
    TOKEN_DECIMALS: 9
  }
};

let currentChain;
function set(id) {
  currentChain = id;
}
function get() {
  if (currentChain) {
    return chains[currentChain];
  }
  throw new Error("Chain not selected");
}
function getListId() {
  return Object.keys(chains);
}
export default {
  set,
  get,
  getListId
};
