<template>
  <Page>
    <v-container grid-list-md>
      <v-layout row wrap justify-center>
        <v-flex md12 lg8>
          <v-card>
            <v-card-title primary-title>
              <h1 class="mb-0 text-md-center">{{ title }}</h1>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12>
                    <iframe
                      v-show="vid"
                      style="margin: 0 auto;display: block;width:100%"
                      width="560"
                      height="315"
                      :src="video"
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </v-flex>
                </v-layout>
              </v-container>
              <div class="mb-5">
                Start auction: {{ dateStart }}<br />
                End auction: {{ dateEnd }}<br />
                Last bid: <b>{{ bid }}</b
                ><br />
                <span v-if="account">by {{ account }}</span>
                <br />
                <span v-if="liability"
                  >Liability:
                  <a
                    :href="`https://kovan.etherscan.io/address/${liability}`"
                    >{{ liability }}</a
                  ></span
                >
              </div>

              <template v-if="$robonomics.account">
                <Bid
                  v-if="status === 'auction'"
                  :objective="objective"
                  :minCost="minCost"
                />
              </template>
              <v-btn
                v-else
                color="primary"
                @click="$store.dispatch('chain/accessAccount', false)"
              >
                Connect ethereum account
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </Page>
</template>

<script>
import axios from "axios";
import Bid from "./Bid";
import config from "~config";
import socket from "../utils/socket";
import { number } from "../utils/tools";
import { getFormatDate } from "../utils/utils";
import Page from "@/components/layout/Page";

const youTubeGetID = (url) => {
  let id = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    id = url[2].split(/[^0-9a-z_-]/i);
    id = id[0];
  } else {
    id = url;
  }
  return id;
};

export default {
  props: ["idAuction"],
  components: {
    Page,
    Bid
  },
  data() {
    return {
      title: "Auction",
      step: config.PRICE_STEP,
      status: "auction",
      minCost: 0,
      dateStart: "",
      dateEnd: "",
      bid: 0,
      account: "",
      objective: "",
      vid: "",
      liability: ""
    };
  },
  computed: {
    video: function() {
      return `https://gateway.pinata.cloud/ipfs/${this.vid}`;
      // return `https://www.youtube.com/embed/${this.vid}`
    }
  },
  created() {
    const upAuction = (data) => {
      this.status = data.status;
      this.liability = data.liability;
      this.dateStart = getFormatDate(
        new Date(data.dateStart.replace(" +00:00", ""))
      );
      this.dateEnd = getFormatDate(
        new Date(data.dateEnd.replace(" +00:00", ""))
      );
      this.bid = `${number
        .fromWei(Number(data.cost), config.TOKEN_DECIMALS)
        .toString()} XRT`;
      this.minCost = Number(data.cost) + this.step;
      this.account = data.account;
      this.objective = data.objective;
      this.vid = youTubeGetID(data.vid);
      this.title =
        'Auction for the picture "' +
        (data.name !== null && data.name.length > 0 ? String(data.name) : "") +
        '"';
      document.title = this.title;
    };
    socket.on("auction", (msg) => {
      if (Number(msg.index) === Number(this.idAuction)) {
        upAuction(msg.auction);
      }
    });
    axios.get(config.AUCTION_API + "/auction/" + this.idAuction).then((r) => {
      upAuction(r.data.result);
    });
  },
  methods: {
    onChangeAccount() {
      window.location.reload(false);
    }
  }
};
</script>
