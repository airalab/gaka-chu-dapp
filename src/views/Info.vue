<template>
  <Page>
    <div>
      <v-container grid-list-lg text-xs-center>
        <v-layout row wrap justify-center>
          <v-flex xs12>
            <h1 style="text-align: center;">Gaka-chu</h1>
          </v-flex>
        </v-layout>
        <v-layout
          row
          wrap
          justify-center
          style="max-width: 1170px;margin: 0 auto;"
        >
          <v-flex xs12 sm6 md4 lg3 v-for="(cell, index) in cells" :key="index">
            <v-card
              v-if="cell.status === 'coming'"
              style="background: none;box-shadow: none;-webkit-box-shadow: none;text-align: center;"
            >
              <v-card-text class="px-0">
                <img src="assets/i/3_comming_soon.png" style="width:100%" />
                <h3 style="text-transform: uppercase;margin: 10px;">
                  Coming soon
                </h3>
                <v-divider style="margin: 5px;" />
                Start day: {{ cell.dateStart }}
              </v-card-text>
            </v-card>
            <v-card
              v-else-if="
                cell.status === 'stop' ||
                  cell.status === 'finish' ||
                  cell.status === 'close'
              "
              style="background: none;box-shadow: none;-webkit-box-shadow: none;text-align: center;"
            >
              <v-card-text class="px-0">
                <img src="assets/i/1_sold.png" style="width:100%" />
                <h3 style="text-transform: uppercase;margin: 10px;">
                  Auction finished!
                </h3>
                <v-divider style="margin: 5px;" />
                Highest bid - {{ cell.cost }}
                <v-divider style="margin: 5px;" />
                Last day: {{ cell.dateEnd }}
                <v-btn
                  :to="`/auction/${cell.id}`"
                  color="blue-grey lighten-2"
                  style="margin: 15px;width: 80%;height: auto;padding: 15px;"
                  >RESULT</v-btn
                >
              </v-card-text>
            </v-card>
            <v-card
              v-else
              style="background: none;box-shadow: none;-webkit-box-shadow: none;text-align: center;"
            >
              <v-card-text class="px-0">
                <img src="assets/i/2_auction_start.png" style="width:100%" />
                <h3 style="text-transform: uppercase;margin: 10px;">
                  Auction started!
                </h3>
                <v-divider style="margin: 5px;" />
                Highest bid - {{ cell.cost }}
                <v-divider style="margin: 5px;" />
                Last day: {{ cell.dateEnd }}
                <v-btn
                  :to="`/auction/${cell.id}`"
                  color="success"
                  style="margin: 15px;width: 80%;height: auto;padding: 15px;"
                  >BID</v-btn
                >
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </Page>
</template>

<script>
import Page from "@/components/layout/Page";
import axios from "axios";
import _map from "lodash/map";
import socket from "../utils/socket";
import { number } from "../utils/tools";
import { getFormatDate } from "../utils/utils";
import config from "~config";

export default {
  components: {
    Page
  },
  data() {
    return {
      cells: []
    };
  },
  created() {
    const upList = (list) => {
      this.cells = _map(list, (v) => {
        return {
          ...v,
          dateStart: getFormatDate(v.dateStart),
          dateEnd: getFormatDate(v.dateEnd),
          cost: `${number
            .fromWei(Number(v.cost), config.TOKEN_DECIMALS)
            .toString()} XRT`
        };
      });
    };
    socket.on("list", (list) => {
      upList(list);
    });
    axios.get(config.AUCTION_API + "/list").then((r) => {
      upList(r.data.result);
    });
  }
};
</script>
