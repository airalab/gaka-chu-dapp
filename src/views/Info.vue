<template>
  <Page>
    <div>
      <v-container
        grid-list-lg
        text-xs-center
        style="max-width: 1170px;margin: 0 auto;"
      >
        <v-row justify="center">
          <v-col
            class="pa-6"
            cols="12"
            md="4"
            v-for="(cell, index) in cells"
            :key="index"
          >
            <v-card
              v-if="cell.status === 'coming'"
              style="background: #fff; box-shadow: 0 2px 10px #e2e2e2; text-align: center;"
            >
              <v-card-text class="px-0">
                <img :src="`assets/i/${cell.name}.jpg`" style="width:100%" />
                <h3 style="text-transform: uppercase;margin: 10px;">
                  {{ cell.name }}
                </h3>
                <br />
                Acrylic, canvas, 40cmx50cm
                <v-divider style="margin: 5px;" />
                <b>Coming soon</b>
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
              :to="`/auction/${cell.id}`"
              style="background: #fff; box-shadow: 0 2px 10px #e2e2e2; text-align: center;"
            >
              <v-card-text class="px-0">
                <img :src="`assets/i/${cell.name}.jpg`" style="width:100%" />
                <h3 style="text-transform: uppercase;margin: 10px;">
                  {{ cell.name }}
                </h3>
                <v-btn
                  :to="`/auction/${cell.id}`"
                  color="blue-grey lighten-2"
                  style="margin: 15px;width: 80%;height: auto;padding: 15px;"
                  >RESULT</v-btn
                >
                <br />
                Acrylic, canvas, 40cmx50cm
                <v-divider style="margin: 5px;" />
                <b class="orange--text">Auction finished!</b>
                <v-divider style="margin: 5px;" />
                End: {{ cell.dateEnd }}
                <v-divider style="margin: 5px;" />
                Highest bid - {{ cell.cost }}
                <br />
                <b>
                  By:
                  <span :title="cell.account">
                    {{ cell.account | labelAddress }}
                  </span>
                  <template
                    v-if="
                      $robonomics.account &&
                        cell.account === $robonomics.account.address
                    "
                  >
                    (your bid)
                  </template>
                </b>
              </v-card-text>
            </v-card>
            <v-card
              v-else
              :to="`/auction/${cell.id}`"
              style="background: #fff; box-shadow: 0 2px 10px #e2e2e2; text-align: center;"
            >
              <v-card-text class="px-0">
                <div class="frame">
                  <img :src="`assets/i/${cell.name}.jpg`" style="width:100%" />
                </div>
                <h3 style="text-transform: uppercase;margin: 10px;">
                  {{ cell.name }}
                </h3>
                <v-btn
                  :to="`/auction/${cell.id}`"
                  color="success"
                  style="margin: 15px;width: 80%;height: auto;padding: 15px;"
                  >BID</v-btn
                >
                <br />
                Acrylic, canvas, 40cmx50cm
                <v-divider style="margin: 5px;" />
                <b class="green--text">Auction started!</b>
                <v-divider style="margin: 5px;" />
                End: {{ cell.dateEnd }}
                <v-divider style="margin: 5px;" />
                Highest bid - {{ cell.cost }}
                <br />
                <b>
                  By:
                  <span :title="cell.account">
                    {{ cell.account | labelAddress }}
                  </span>
                  <template
                    v-if="
                      $robonomics.account &&
                        cell.account === $robonomics.account.address
                    "
                  >
                    (your bid)
                  </template>
                </b>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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

<style scoped>
.frame {
  width: 90%;
  margin: 0 auto 30px;
  position: relative;
}
.frame:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 15px solid #fff;
  box-shadow: 0 0 10px #ccc inset;
}
</style>
