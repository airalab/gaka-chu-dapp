<template>
  <v-app id="inspire">
    <header role="banner">
      <div class="secw-narrow">
        <div id="header-logo">
          <router-link to="/">
            <img class="img-block" alt="" src="assets/i/logo.svg" />
          </router-link>
        </div>
      </div>
    </header>
    <v-main style="margin-bottom: 50px">
      <v-container grid-list-md>
        <v-layout justify-center row wrap>
          <v-flex md12 style="text-align: center">
            <a @click="dialog = true"
              ><img src="assets/i/manifest.png" width="60%"
            /></a>
            <v-card-text>
              <p class="text">
                The physical autonomy of robots is well understood both
                theoretically and practically. By contrast, there is almost no
                research exploring their potential economic autonomy. In this
                paper, we present the first economically autonomous robot -- a
                robot able to produce marketable goods while having full control
                over the use of its generated income. Gaka-chu ("painter" in
                Japanese) is a 6-axis robot arm that creates artistic paintings
                of Japanese kanjis from an autoselected keyword. By using a
                blockchain-based smart contract, Gaka-chu can autonomously list
                a painting it made for sale in an online auction. In this
                transaction, the robot interacts with the human bidders as a
                peer not as a tool. Using the blockchain-based smart contract,
                Gaka-chu can then use its income from selling paintings to
                replenish its resources by autonomously ordering materials from
                an online art shop, and maintain its activity by remunerating a
                human assistant for manual tasks such as placing canvases. We
                built the Gaka-chu prototype with an Ethereum-based smart
                contract and ran a 6-month long experiment, during which the
                robot painted and sold four paintings one-by-one, simultaneously
                using its income to purchase art supplies, human assistance, and
                paid initial investors. In this work, we present the results of
                the experiments conducted and discuss the implications of
                economically autonomous robots.
              </p>
            </v-card-text>
            <div class="logo">
              <h2>Link to materials</h2>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Link</th>
                  </tr>
                  <tr>
                    <td>General Software Architecture of Gaka-chu</td>
                    <td>article</td>
                    <td>
                      <a
                        href="https://gateway.ipfs.io/ipfs/QmS6ZnKwCNqcF4ESmetGuBMRchqmWidBQD53LiYmtjwroZ"
                        >Link</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>Using NFTs to Conduct an Auction</td>
                    <td>article</td>
                    <td>
                      <a
                        href="https://gateway.ipfs.io/ipfs/QmP31d56mmR7tCf8orwkYpwwzecnfCWbzYSaE4P1k8JeF8"
                        >Link</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>Ordering Consumables in Art Shop via Robonomics</td>
                    <td>article</td>
                    <td>
                      <a
                        href="https://gateway.ipfs.io/ipfs/QmWd4TdKgN2RAUi2DJ4HwbsZXnGHrzJBxy2WftWFWHCqf4"
                        >Link</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td>Gaka-chu software repositories</td>
                    <td>repos</td>
                    <td>
                      <a
                        href="https://github.com/Multi-Agent-io/gaka-chu.online"
                        >Link</a
                      >
                    </td>
                  </tr>
                </thead>
              </v-simple-table>
            </div>
            <div class="logo">
              <h2>Videos</h2>
            </div>
            <div class="media">
              <p>
                Gaka-Chu: The Robot That Dreams of Being an Artist
              </p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/GxlYxaykqTU"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="media">
              <p>
                Gaka-chu draws Twitter trending words from hashtags
              </p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/xSD_lsrAA0I"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="media">
              <p>
                First launches of Gaka-chu
              </p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/gQHtsI2Kfv4"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="logo">
              <h2>Photos</h2>
            </div>
            <div class="media">
              <img
                src="../../../public/assets/i/gaka-chu-first-step.jpg"
                width="60%"
              />
              <p>
                First steps of Gaka-chu
              </p>
            </div>
            <div class="media">
              <img
                src="../../../public/assets/i/drawing-room.jpg"
                width="60%"
              />
              <p>
                The first drawing room for Gaka-chu in Tolyatti
              </p>
            </div>
            <div class="media">
              <img
                src="../../../public/assets/i/drawing-room-tgl-2.jpg"
                width="60%"
              />
              <p>
                Gaka-chu is working in the old drawing room, Tolyatti
              </p>
            </div>
            <div class="media">
              <img
                src="../../../public/assets/i/gaka-chu-spb.jpg"
                width="60%"
              />
              <p>
                Gaka-chu in a new place, St. Petersburg
              </p>
            </div>
            <div class="media">
              <img
                src="../../../public/assets/i/gaka-chu-completed.jpg"
                width="60%"
              />
              <p>
                Completed work with the phrase "Women's History Month"
              </p>
            </div>
            <v-dialog v-model="dialog" width="500">
              <v-card>
                <v-card-text style="padding-top: 20px">
                  <h3>Manifesto</h3>
                  <p>
                    Developing technologies in the field of machine learning and
                    neural networks allow robotized systems to show previously
                    unattainable results in control and collaboration with
                    humans. Robots are slowly beginning to work in close
                    proximity with humans, and due to blockchain technologies,
                    they also become direct participants in our economy.
                    Gaka-chu is an independent economic agent thanks to
                    robonomics contracts. Gaka-chu is able to generate images
                    independently, but has no rights to its works. In this
                    regard, We, group of ITMO students led by Alexandr
                    Kapitonov, PhD, Dean of the Faculty of Infocommunication
                    Technologies, give up the rights to works created by the
                    robot-artist “Gaka-chu”.
                  </p>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-footer
      fixed
      class="pa-1"
      style="height: auto; border-top: 1px solid #dedede"
    >
      <v-spacer></v-spacer>
      <div>
        <b>Troubleshooting</b>: If dapp is not loading or part of data is
        missing try to connect metamask with other public node.
        <a href="https://wiki.robonomics.network/" target="_blank"
          >Look into tech documentation</a
        >
        and try to find other answers.
        <a
          href="https://github.com/airalab/robonomics-js/issues/new"
          target="_blank"
          >Open issue on GitHub</a
        >
        <!-- <Status /> -->
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import config from "~config";
// import Status from "./Status";

export default {
  name: "App",
  // components: { Status },
  data() {
    return {
      dialog: false
    };
  },
  created() {
    if (this.$robonomics.account) {
      this.$store.dispatch("tokens/add", config.chain.get().TOKEN);
      this.$store.dispatch("tokens/watchBalance", {
        token: config.chain.get().TOKEN,
        account: this.$robonomics.account.address
      });
    }
  }
};
</script>

<style>
.text {
  color: black;
  padding-left: 19%;
  padding-right: 19%;
  text-align: center;
}

.logo {
  color: black;
  margin-top: 3%;
  padding-left: 19%;
  padding-right: 19%;
  text-align: left;
}

.media {
  color: black;
  margin-top: 3%;
  padding-left: 19%;
  padding-right: 19%;
  text-align: center;
}

body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  background-color: #f2f2f2;
}
.application.theme--light {
  background: #f2f2f2;
  color: rgba(0, 0, 0, 0.87);
}
#header-logo .img-block {
  max-width: 400px;
}
.img-block {
  display: block;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}
.secw-narrow {
  max-width: 680px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
}
header[role="banner"] {
  padding-top: 20px;
  padding-bottom: 40px;
}
.application .theme--light.card,
.theme--light .card {
  border: 1px solid #707070;
  border-radius: 0;
  box-shadow: none;
}
</style>
