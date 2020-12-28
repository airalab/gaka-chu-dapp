import Vue from "vue";
import * as filters from "../utils/filters";
import { setConfig } from "../config/robonomics";
import config from "~config";

Vue.filter("fromWei", filters.fromWei);
Vue.filter("labelAddress", filters.labelAddress);

setConfig({
  ipfs: {
    cdn: "ipfs.min.js",
    fallback: config.ipfs
  },
  statusPeers: config.statusPeers,
  robonomics: (networkId) => {
    config.chain.set(networkId);
    return {
      version: 5,
      ...config.chain.get().ROBONOMICS
    };
  }
});
