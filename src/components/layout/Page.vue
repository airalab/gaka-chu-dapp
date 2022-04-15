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
                paper, we present the first economically autonomous robot — a
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
              <h2>Software Architecture of Gaka-chu</h2>
            </div>
            <div class="text">
              <div class="media">
                <img src="assets/i/gaka-chu-ros-nodes.png" width="120%" />
                <p>
                  Figure 1. Information flow for the Gaka-chu implementation.
                  <a href="https://www.ros.org/" target="_blank">ROS</a> nodes
                  and topics are shown with black rectangles and white ovals,
                  respectively. Interaction with external devices and services
                  is shown with dashed arrows.
                </p>
              </div>
              <p>
                Fig. 1 shows the information flow of the Gaka-chu
                implementation, including actions such as drawing, filming, NFT
                (non-fungible token) minting, auction opening, and buying. Most
                of these actions are implemented as ROS nodes that exchange
                information using the
                <a href="https://www.ros.org" target="_blank">ROS</a> topics
                framework. The information workflow for a drawing job proceeds
                as follows:
              </p>
              <ol>
                <li>
                  The <samp>rs_camera</samp> node receives data (e.g.,
                  dimensions of the canvas, coordinates of its center) needed to
                  transform the coordinates. Then, the
                  <samp>rs_camera</samp> node sends the transformed coordinates
                  to the <samp>picture_preprocessing</samp> and LTP (Local Task
                  Planner) nodes.
                </li>
                <li>
                  The topic <samp>/run</samp>, to which the LTP node is
                  subscribed, receives a link to the image to be painted.
                </li>
                <li>
                  The LTP node sends a service call to the
                  <samp>picture_preprocessing</samp> node for getting
                  trajectories from the image.
                </li>
                <li>
                  The image is processed in several steps. First, the 2D
                  coordinates of the strokes forming each kanji character are
                  calculated. Second, a logo for the NFT is generated. Third,
                  the results are saved in a rosbag file.
                </li>
                <li>
                  The LTP node calculates the actions needed to paint the
                  defined strokes.
                </li>
                <li>
                  The LTP node starts sending commands to the KUKA robot arm,
                  and a <samp>'start'</samp> message is sent to the topic
                  <samp>/film</samp> to trigger the
                  <samp>video_saver</samp> node to start recording.
                </li>
                <li>
                  After the robot finishes all painting actions, the LTP node
                  sends the <samp>'stop</samp> message to the
                  <samp>/film</samp> topic. This triggers the video recording to
                  stop and the resulting video file (in mp4 format) to be
                  stored. The <samp>nft_minter</samp> node also receives the
                  <samp>'stop'</samp> message from the LTP node, which triggers
                  the <samp>nft_minter</samp> node to collect the files
                  generated in the painting process (e.g., robot trajectories,
                  NFT logo, video) and upload them to the IPFS network.
                </li>
                <li>
                  The <samp>nft_minter</samp> node performs a transaction in the
                  Ethereum network to mint an NFT of the completed painting.
                </li>
                <li>
                  The <samp>nft_minter</samp> node opens an auction in an NFT
                  marketplace to sell the newly minted NFT token.
                </li>
                <li>
                  The <samp>consumables_orderer</samp> node checks the number of
                  remaining consumables (e.g., canvases).
                </li>
                <li>
                  If the stock counter for any consumable reaches the level
                  needed for one new painting (e.g., one canvas), the
                  <samp>consumables_orderer</samp> node generates a
                  <samp>demand</samp>message for ordering supplies (e.g.,
                  canvases, paints, and brushes). The
                  <samp>demand</samp> message specifies the needed items and
                  their quantities.
                </li>
                <li>
                  The <samp>demand</samp> message passes through the
                  <a href="https://robonomics.network/" target="_blank"
                    >Robonomics</a
                  >
                  node and is sent to the IPFS network. The order is received by
                  the online art shop.
                </li>
                <li>
                  After the purchase is completed, tokens are debited from
                  Gaka-chu's wallet and credited to the wallet of the online art
                  shop.
                </li>
                <li>
                  Gaka-chu uses the tokens obtained from the NFT auction to pay
                  for supplies, pay for human assistance, and pay back initial
                  investors.
                </li>
              </ol>
            </div>
            <div class="logo">
              <h2>Using NFTs to Conduct an Auction</h2>
            </div>
            <div class="text">
              <p>
                NFTs are unique tokens that cannot be copied or divided. NFTs
                have become very popular in digital art because they can be used
                as a certificate of the uniqueness of a digital object and can
                be used to transfer the property rights of a digital or physical
                asset. As a result, marketplace platforms have emerged for
                exchanging NFTs and putting them up for auction (<a
                  href="https://opensea.io/"
                  target="_blank"
                  >OpenSea</a
                >, <a href="https://rarible.com/" target="_blank">Rarible</a>,
                <a href="https://makersplace.com/" target="_blank"
                  >MakersPlace</a
                >
                ). In the case of Gaka-chu, potential buyers can purchase an NFT
                minted by Gaka-chu (and therefore digital ownership of the
                respective artwork) on the
                <a href="https://rarible.com/gakachu" target="_blank"
                  >Rarible</a
                >
                platform. The process of minting an NFT is like the issuance of
                a regular token, except that an NFT token is unique and
                indivisible. To mint an NFT for an asset, all of the asset's
                data needs to be used as input in a cryptographic process.
                Gaka-chu creates an NFT using the
                <a href="https://eips.ethereum.org/EIPS/eip-721" target="_blank"
                  >ERC-721</a
                >
                standard and manages the online auctions using the SDK of the
                Rarible platform.
              </p>
              <p>
                As described above, Gaka-chu uses the
                <samp>nft_minter</samp> node to mint an NFT. This node uses the
                data generated during the painting process as input. These data
                contain the IPFS hashes of all files resulting from the painting
                process (e.g., a <samp>rosbag</samp> file with the joint
                trajectories needed to paint the kanji strokes, an image of the
                finished painting and the video of the entire drawing process).
                Including these data in the minting process proves ownership of
                the physical painting and makes it viable to use an NFT as way
                to transfer the digital rights of the artwork created.
                Gaka-chu's NFT minting process proceeds as follows:
              </p>
              <ol>
                <li>
                  The <samp>picture_preprocessing</samp> node creates a PNG
                  image file based on the respective keyword and saves it to
                  Gaka-chu's internal file system. A low-resolution version of
                  this file will be used as the NFT logo. Simultaneously, a
                  <samp>rosbag</samp> file with the robot joint trajectories is
                  created.
                </li>
                <li>
                  The <samp>/video_saver</samp> node records the entire painting
                  process in MP4 format and saves the resultant file in the
                  internal file system.
                </li>
                <li>
                  The <samp>/nft_minter</samp> node listens to the topic
                  <samp>/film</samp> and waits until the
                  <samp>'stop'</samp> message s received. After receiving the
                  message, the node outputs the resultant painting files
                  (<samp>.bag</samp>, <samp>.png</samp>, <samp>.mp4</samp>) and
                  uploads them to the IPFS file system.
                </li>
                <li>
                  The <samp>/nft_minter</samp> node creates a data file with the
                  IPFS hashes of the files uploaded in the previous step. This
                  file is uploaded to IPFS as well.
                </li>
                <li>
                  The <samp>/nft_minter</samp> node mints the NFT by accessing
                  the ERC-721 pre-deployed contract in Rarible. The transaction
                  is signed with Gaka-chu's unique private key and sent back to
                  the network as a confirmation. Gaka-chu includes information
                  such as its own Ethereum address, the description of the
                  artwork, and the hashes of the files uploaded in step 3.
                </li>
                <li>
                  Rarible detects the generated NFT and parses the information
                  sent by Gaka-chu, publishing all the artwork results for
                  viewing on the marketplace platform.
                </li>
                <li>
                  The <samp>nft_minter</samp> node launches an auction for the
                  newly minted NFT by using the Rarible SDK. When launching the
                  auction, the node specifies the following fields: the address
                  of the NFT in the network, Gaka-chu's address, the starting
                  price, and the closing date of the auction.
                </li>
                <br />
              </ol>
            </div>
            <div class="logo">
              <h2>
                Ordering consumables at the online art shop via Robonomics
              </h2>
            </div>
            <div class="text">
              <p>
                When Gaka-chu runs low on art supplies (e.g., canvases, brushes,
                paint) it immediately orders a restock from an online art shop
                that accepts payments in cryptocurrency. The ordering process
                with the art shop is organized through the creation of a
                cryptographic "promisee-promisor" relationship between Gaka-chu
                and the art shop system. This agreement is based on the
                <a
                  href="https://www.researchgate.net/profile/Aleksandr-Kapitonov/publication/336642043_Robonomics_platform_for_integration_of_cyber_physical_systems_into_human_economy_For_engineers_smart_cities_and_Industry_40_creators/links/5da9955092851c577eb82491/Robonomics-platform-for-integration-of-cyber-physical-systems-into-human-economy-For-engineers-smart-cities-and-Industry-40-creators.pdf"
                  target="_blank"
                  >Robonomics standard</a
                >
                that can be executed on the Ethereum network. In this situation,
                Gaka-chu acts as a promisee (i.e., customer of the service under
                the contract) and the art shop agent acts as a promisor (i.e,
                service provider under the contract). The ordering process
                proceeds as follows:
              </p>
              <ol>
                <li>
                  Gaka-chu generates a <samp>demand</samp> message, which
                  includes the specific items to be bought and the quantities of
                  those items.
                </li>
                <li>
                  The <samp>demand</samp> message is sent to the art shop and
                  received by a ROS node managing their incoming orders.
                </li>
                <li>
                  In case the order is accepted by the art shop, an
                  <samp>offer</samp> message is sent to Gaka-chu with the same
                  information that was included in the
                  <samp>demand</samp> message.
                </li>
                <li>
                  The Robonomics node creates a smart contract that acts as an
                  intermediary between the Gaka-chu and the art shop. This smart
                  contract creates “liability” and guarantees between the
                  parties.
                </li>
                <li>
                  The required number of tokens is debited from Gaka-chu's
                  wallet and blocked until the order is completed.
                </li>
                <li>
                  The art shop agent sends a finalization message and the tokens
                  debited in step 5 are sent to the art shop's address, minus a
                  network fee.
                </li>
              </ol>
              The Ethereum addresses of participating nodes and smart contracts
              are:
              <ol>
                <li>
                  Gaka-chu -
                  <samp>0xCc3672C869c923B90F2C1BfbA2C7801e3924114A </samp>
                </li>
                <li>
                  Art shop agent -
                  <samp> 0x128Fba3E5315118ba075f591b54F8139193663a5 </samp>
                </li>
                <li>
                  Liability contract -
                  <samp> 0x94ce20E486CCA74df5f9E69eb6D522c997BFBBc9 </samp>
                </li>
                <br />
              </ol>
            </div>
            <div class="logo">
              <h2>Links to code repositories</h2>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Link</th>
                  </tr>
                  <tr>
                    <td>Gaka-chu software repositories</td>
                    <td>repos</td>
                    <td>
                      <a
                        href="https://github.com/Multi-Agent-io/gaka-chu.online"
                        target="_blank"
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
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/xSD_lsrAA0I"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <p>Gaka-chu draws Twitter trending words from hashtags</p>
            </div>
            <div class="media">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/gQHtsI2Kfv4"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <p>First launches of Gaka-chu</p>
            </div>
            <div class="logo">
              <h2>Photos</h2>
            </div>
            <div class="media">
              <img src="assets/i/gakachu-firsts-steps.jpg" width="100%" />
              <p>First steps of Gaka-chu</p>
            </div>
            <div class="media">
              <img src="assets/i/gakachu-old-room.png" width="100%" />
              <p>The first drawing room for Gaka-chu in Tolyatti</p>
            </div>
            <div class="media">
              <img src="assets/i/gakachu-old-work.jpg" width="100%" />
              <p>Gaka-chu is working in the old drawing room, Tolyatti</p>
            </div>
            <div class="media">
              <img src="assets/i/gaka-chu-new-room.jpg" width="100%" />
              <p>Gaka-chu in a new place, St. Petersburg</p>
            </div>
            <div class="media">
              <img src="assets/i/gakachu-new-work.jpg" width="100%" />
              <p>Completed work with the phrase "Women's History Month"</p>
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
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: black;
  margin-top: 1%;
  padding-left: 19%;
  padding-right: 19%;
  text-align: justify;
}

.logo {
  color: black;
  margin-top: 1%;
  padding-left: 19%;
  padding-right: 19%;
  text-align: left;
}

.media {
  color: black;
  margin-top: 2%;
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
