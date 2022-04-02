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
              <h2>General Software Architecture of Gaka-chu</h2>
            </div>
            <div class="text">
              <div class="media">
                <img
                  src="../../../public/assets/i/gaka-chu-ros-nodes.png"
                  width="60%"
                />
                <p>
                  Scheme of the Gaka-chu software in ROS terms; ROS nodes and
                  topics are shown with rectangles and ovals, respectively,
                  interaction with external devices and services is shown with
                  dashed arrows.
                </p>
              </div>
              <p>
                The final scheme of drawing, filming, NFT (non-fungible token)
                creating, auction opening and buying supplies in terms of
                <a href="https://www.ros.org" target="_blank">ROS</a>
                is shown in above. Most of the components are implemented as ROS
                nodes that exchange messages using ROS topics. The complete
                process is as follows:
              </p>
              <ol>
                <li>
                  Immediately after starting the robot, the
                  <samp>/rs_camera</samp>
                  node receives the necessary data for transforming coordinates
                  from the camera, which, upon request, sends to the
                  <samp>/picture_preprocessing</samp> and LTP (Local Task
                  Planner) nodes.
                </li>
                <li>
                  The topic <samp>/run</samp>, to which the LTP is subscribed,
                  receives a link to an image for drawing.
                </li>
                <li>
                  LTP sends a service call to the
                  <samp>/picture_preprocessing</samp> node.
                </li>
                <li>
                  The image is processed: the 2D coordinates of the hieroglyph
                  lines are determined, a logo for NFT is generated, the results
                  are saved in a rosbag file.
                </li>
                <li>
                  The LTP does all the calculations to prepare the drawing and
                  starts sending commands to KUKA, signaling with the
                  <samp>'start'</samp> message in the <samp>/film</samp>.
                </li>
                <li>
                  The <samp>/video_saver</samp> node starts recording and saves
                  video to the device.
                </li>
                <li>
                  After finishing drawing, LTP sends a
                  <samp>'stop'</samp> message to the <samp>/film</samp> topic,
                  video recording stops.
                </li>
                <li>
                  The <samp>/nft_minter</samp> node collects files and sends
                  them to IPFS.
                </li>
                <li>
                  The <samp> /nft_minter </samp> node performs a transaction in
                  Ethereum to create an NFT.
                </li>
                <li>
                  The <samp>/nft_minter</samp> node opens an auction on the NFT
                  platform.
                </li>
                <li>
                  The <samp>/consumables_orderer</samp> node counts the number
                  of canvases left.
                </li>
                <li>
                  After reaching the limit, the
                  <samp>/consumables_orderer</samp> node generates a demand
                  message for ordering supplies.
                </li>
                <li>
                  The <samp>demand</samp> message passes through ROS nodes of
                  Robonomics, as a result of which the key-signed message is
                  sent to the IPFS pubsub.
                </li>
                <li>
                  After completing the purchase, tokens are debited from the
                  KUKA address.
                </li>
              </ol>
            </div>
            <div class="logo">
              <h2>Using NFTs to Conduct an Auction</h2>
            </div>
            <div class="text">
              <p>
                Initially, we planned to create an additional service with dapp
                that implements the auction using the pubsub channels of the
                IPFS (InterPlanetary File System) distributed file system. The
                robot would send the initial request to create an auction, and
                the bidders through the dapp (decentralized application) would
                place their bids. At the end, the service would send the robot
                the address of the winner and their further interaction on
                payment / sending of the painting would go through the standard
                Robonomics on Ethereum process ("promisee-promisor" relationship
                <sup><a href="#fn1" id="ref1">1</a></sup
                >).
              </p>
              <p>
                However, auctions with non-fungible tokens (NFT) are much better
                suited for this task. NFTs are tokens, each instance of which is
                unique and cannot be interchangeable with another similar token.
                NFT has become very popular in digital art, as it allows to
                create a certificate of uniqueness of a digital object, which
                confirms the property rights of a digital asset. As a result,
                platforms have emerged for exchanging NFTs and holding auctions
                with them (OpenSea<sup
                  ><a href="#openSea" id="openSea">2</a></sup
                >, Rarible<sup><a href="#rarible" id="rarible">3</a></sup
                >, MakersPlace<sup
                  ><a href="#makersplace" id="makersplace">4</a></sup
                >
              </p>
              <p>
                In our case, buyers can view created paintings on two NFT
                platforms:
                <a href="https://rarible.com/gakachu" target="_blank"
                  >Rarible</a
                >
                and
                <a href="https://opensea.io/Gaka-Chu" target="_blank">OpenSea</a
                >. OpenSea has more options for automation of auction, and
                Rarible is more convenient in terms of interface.
              </p>
              <p>
                The process of creating an NFT (minting) is similar to the
                issuance of a regular token, with the difference that the NFT is
                unique and indivisible. For NFT, there are an ownership field
                and a metadata field where all information about the asset is
                recorded (for example, a link to an image). For Gaka-chu, we
                first create an NFT of ERC-721<sup
                  ><a href="#erc721" id="erc721">5</a></sup
                >
                standard and then use the SDK of OpenSea platform to conduct
                auctions.
              </p>
              <p>
                The robot has <samp>/nft_minter</samp> ROS node, which collects
                data on the drawing process and creates the non-fungible token
                based on them. The node creates an metadata file with IPFS
                hashes of all files, that prove authorship of the robot (the
                <samp>.bag</samp> file with coordinates, an NFT logo with
                hieroglyph image and the <samp>.mp4</samp> file with the record
                of the drawing process). Based on this metadata file and robot's
                Ethereum address NFT is created. <br />
                The process is organized as follows:
              </p>
              <ol>
                <li>
                  The <samp>/picture_preprocessing</samp> node, in addition to
                  creating a <samp>.bag</samp> file with coordinates,
                  simultaneously creates a file based on the template in PNG
                  format with inserted hieroglyph image, and saves it in the
                  file system. This file will be used as the NFT logo.
                </li>
                <li>
                  The <samp>/video_saver</samp> node records the drawing
                  process, saving the recording in MP4 format to the file
                  system.
                </li>
                <li>
                  The <samp>/nft_minter</samp> node listens to the topic
                  <samp>/film</samp>, waiting for a <samp>'stop'</samp> message.
                  After receiving the message, the node gets the drawing result
                  files (<samp>.bag</samp>, <samp>.png</samp>,
                  <samp>.mp4</samp>) to publish them to the IPFS file system.
                </li>
                <li>
                  The <samp>/nft_minter</samp> node creates an overall metadata
                  file with IPFS hashes of uploaded files. This file is then
                  sent to IPFS as well.
                </li>
                <li>
                  The <samp>/nft_minter</samp> node creates the NFT by accessing
                  the ERC-721 pre-deployed contract. The final transaction is
                  signed with a unique key of the robot and sent to the network.
                  In the process, the required token fields are filled in (the
                  robot's Ethereum address, description), and the IPFS hash of
                  the sent file is specified as metadata.
                </li>
                <li>
                  OpenSea detects the generated token and parses the metadata
                  file, publishing all drawing results for viewing on the
                  platform.
                </li>
                <br />
              </ol>
              <p>
                Next, the <samp>/nft_minter</samp> node launches an auction for
                the sale of NFT using the OpenSea SDK. When creating an auction,
                the node specifies the following fields: the address of the NFT
                token in the network, the Gaka-chu address, the starting price,
                the closing date of the auction.
              </p>
              <sup id="fn1"
                >1. [I. Berman, E. Zereik, A. Kapitonov, F. Bonsignorio, A.
                Khassanov, A. Oripova, S. Lonshakov, and V. Bulatov, “Trustable
                environmental monitoring by means of sensors networks on
                swarming autonomous marine vessels and distributed ledger
                technology,” Frontiers in Robotics and AI, vol. 7, p. 70,
                2020.]<a href="#ref1">↩</a></sup
              >
              <br />
              <sup id="openSea"
                >2. [<a href="https://opensea.io/" target="_blank">opensea.io</a
                >]<a href="#openSea">↩</a></sup
              >
              <br />
              <sup id="rarible"
                >3. [<a href="https://rarible.com/" target="_blank"
                  >rarible.com</a
                >]<a href="#rarible">↩</a></sup
              >
              <br />
              <sup id="makersplace"
                >4. [<a href="https://makersplace.com/" target="_blank"
                  >makersplace.com</a
                >]<a href="#makersplace">↩</a></sup
              >
              <br />
              <sup id="erc721"
                >5. [<a
                  href="https://eips.ethereum.org/EIPS/eip-721"
                  target="_blank"
                  >eips.ethereum.org/EIPS/eip-721</a
                >]<a href="#erc721">↩</a></sup
              >
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
