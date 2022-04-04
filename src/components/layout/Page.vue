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
                  width="100%"
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
              <h2>Ordering Consumables in Art Shop via Robonomics</h2>
            </div>
            <div class="text">
              <p>
                The ordering process with art shop agent is organized through
                the creation of a "promisee-promisor" relationship between the
                robot and the store system based on the standard Robonomics on
                Ethereum. Each of them acts as an autonomous agent capable of
                creating and accepting orders for performing some work with
                payment in cryptocurrency. In our case, Gaka-chu acts as a
                Promisee, and an art shop agent acts as a Promisor<sup
                  ><a href="#fn1" id="ref1">1</a></sup
                >).
              </p>
              <p>
                Gaka-chu generates a <samp>demand</samp> message by filling in
                all required fields. This message is seen by the ROS node of the
                store, which accepts it for execution by sending an
                <samp>offer</samp> message with a matched condition. The
                Robonomics Network node, which monitors the occurrence of
                matches between supply and demand, creates a smart contract with
                the liability between Gaka-chu and an art shop agent on the
                Ethereum network. After that, the required number of tokens is
                debited from the robot's address and blocked until the order is
                completed. After completing the order, the art shop agent sends
                a finalization message and tokens are sent to the store address,
                minus a network fee.
              </p>
              <ol>
                <li>
                  The <samp>model</samp> field specifies the IPFS hash for the
                  specification file of the required agent behavior model. In
                  our case, the behavior is to sell drawing supplies.
                </li>
                <li>
                  The <samp>objective</samp> field specifies the IPFS hash of
                  the rosbag file. This file describes the necessary ROS topics
                  and parameters for them. Subscribing on topics, the store
                  agent receives the purchase order.
                </li>
                <li>
                  The fields <samp>token</samp> and <samp>cost</samp> contain
                  the address of the payment token and amount of tokens.
                </li>
                <li>
                  The <samp>lighthouse</samp> and <samp>validator</samp> fields
                  are service fields in the Robonomics Network and are needed to
                  control the execution of liability between agents.
                </li>
                <li>
                  In the last <samp>sender</samp> and
                  <samp>signature</samp> fields, Gaka-chu specifies the address
                  of its cryptowallet and the signature of the
                  <samp>demand</samp> message.
                </li>
              </ol>
              <p>
                The <samp>demand</samp> message is sent to "Liability Market",
                implemented as an IPFS pubsub network. This message is seen by
                the ROS <samp>trader_node</samp> of the store, which accepts it
                for execution by sending an <samp>offer</samp> message with a
                matched condition. The Robonomics Network node, which monitors
                the occurrence of matches between supply and demand, creates a
                smart contract with the liability between Gaka-chu and an art
                shop agent on the Ethereum network. After that, the required
                number of tokens is debited from the robot's address and blocked
                until the order is completed. From this moment on, the
                <samp>worker_node</samp> of the store can start processing the
                order. After completing the order, the art shop agent sends a
                finalization message and tokens are sent to the store address,
                minus a network fee.
              </p>
              <p>
                Below are the results obtained during one of the test for
                purchase of consumables. Agent-agent interaction in the
                Robonomics Network runs through an intermediary, the so-called
                ``Provider'' node, which searches for a match between supply and
                demand. Providers are controlled by the "Lighthouse" - a special
                smart contract, which performs a transaction to Ethereum when
                the Provider finds a match. <br />
                Ethereum addresses of participating nodes and smart contracts
                are presented below:
              </p>
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
                <li>
                  Lighthouse contract -
                  <samp> 0xD40AC7F1e5401e03D00F5aeC1779D8e5Af4CF9f1 </samp>
                </li>
                <li>
                  Provider -
                  <samp> 0x420029e64F849AA3De300D2ad86075aD32f01680 </samp>
                </li>
                <br />
              </ol>
              <p>
                Prior to the start of orders, Gaka-chu performs an approval<sup
                  ><a href="#aprroval" id="aprroval">2</a></sup
                >
                transaction of the form
                <samp>approve(address guy, uint256 wad)</samp> in Ethereum. This
                is necessary to allow the Provider to charge the required amount
                of wrapped ETH from robot's address when creating a liability
                contract. This amount is "blocked" when the contract is created
                until the order is completed.
              </p>
              <p>
                As described above, the robot should complete the following
                task: when the counter of the remaining canvases reaches 1,
                Gaka-chu needs to create an order for the art shop agent with 5
                canvases, 1 brush and 1 set of paints (0.0075 ETH in total). The
                robot first generates the <samp>demand</samp> message to send to
                IPFS pubsub.
              </p>
              <p class="media">Gaka-chu logs when forming the order</p>
              <p>
                <code
                  style="color: #333; background-color: #f2f2f2; display:block; white-space:pre-wrap; font-family: monospace"
                >
                  [rosout][INFO] 2021-09-03 15:43:44,624: Previous number of
                  canvases: 2 <br />
                  [rosout][INFO] 2021-09-03 15:43:44,627: Current number of
                  canvases: 1 <br />
                  [rosout][INFO] 2021-09-03 15:43:44,631: Need to order
                  canvases. <br />
                  [rosout][INFO] 2021-09-03 15:43:44,955: Creating a demand...
                  <br />
                  [rosout][INFO] 2021-09-03 15:43:44,956: model: <br />
                  multihash: "QmZq9axSqwSVdGsJ4HQ5Mjucu1CW2xAWecmXCb5Y5ku 47T"
                  <br />
                  objective: <br />
                  multihash: "QmTGY5N4XSqYivgN1aVxtwx27s5ChC4KoJekq7gjShu GyA"
                  <br />
                  token: <br />
                  address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" <br />
                  cost: <br />
                  uint256: "7500000000000000" <br />
                  lighthouse: <br />
                  address: "0xD40AC7F1e5401e03D00F5aeC1779D8e5Af4CF9f1" <br />
                  validator: <br />
                  address: "0x0000000000000000000000000000000000000000" <br />
                  validatorFee: <br />
                  uint256: "0" <br />
                  deadline: <br />
                  uint256: "13154633" <br />
                  sender: <br />
                  address: "0xCc3672C869c923B90F2C1BfbA2C7801e3924114A" <br />
                  nonce: <br />
                  uint256: "0" <br />
                  signature: [] <br />
                  [rosout][INFO] 2021-09-03 15:43:46,962: Published!
                </code>
              </p>
              <p>
                Here, the <samp>model</samp> field contains an IPFS link to the
                file, with a description of the required service, which
                coincides with the art shop agent's behavior model. The
                <samp>objective</samp> field contains an IPFS link to the rosbag
                file with order parameters.
              </p>
              <p class="media">
                Python script that creates a rosbag file with order parameters
              </p>
              <p>
                <code
                  style="color: #333; background-color: #f2f2f2; display:block; white-space:pre-wrap; font-family: monospace"
                >
                  import rosbag <br />
                  from std_msgs.msg import String <br />
                  bag = rosbag.Bag('kuka_buy_consumables_objective.bag', 'w')
                  <br />
                  bag.write('/brushes', String("1")) <br />
                  bag.write('/canvases', String("5")) <br />
                  bag.write('/paint', String("1")) <br />
                  bag.close() <br />
                </code>
              </p>
              <p>
                ROS <samp>trader_node</samp> of art shop agent, upon seeing the
                <samp>demand</samp> message, generates a counter
                <samp>offer</samp> message and also sends it to IPFS pubsub.
              </p>
              <p class="media">
                Shop agent logs when a demand message is detected and an offer
                message is generated
              </p>
              <p>
                <code
                  style="color: #333; background-color: #f2f2f2; display:block; white-space:pre-wrap; font-family: monospace"
                >
                  [rosout][INFO] 2021-09-03 15:43:47,320: Incoming demand model:
                  <br />
                  multihash: "QmZq9axSqwSVdGsJ4HQ5Mjucu1CW2xAWecmXCb5Y5ku 47T"
                  <br />
                  objective: <br />
                  multihash: "QmTGY5N4XSqYivgN1aVxtwx27s5ChC4KoJekq7gjSh uGyA"
                  <br />
                  token: <br />
                  address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" <br />
                  cost: <br />
                  uint256: "7500000000000000" <br />
                  lighthouse: <br />
                  address: "0xD40AC7F1e5401e03D00F5aeC1779D8e5Af4CF9f1" <br />
                  validator: <br />
                  address: "0x0000000000000000000000000000000000000000" <br />
                  validatorFee: <br />
                  uint256: "0" <br />
                  deadline: <br />
                  uint256: "13154633" <br />
                  sender: <br />
                  address: "0xCc3672C869c923B90F2C1BfbA2C7801e3924114A" <br />
                  nonce: <br />
                  uint256: "0" <br />
                  signature: []... <br />
                  [rosout][INFO] 2021-09-03 15:43:47,322: For my model and
                  token! <br />
                  [rosout][INFO] 2021-09-03 15:43:47,323: Making offer... <br />
                  [rosout][INFO] 2021-09-03 15:43:47,492: model: <br />
                  multihash: "QmZq9axSqwSVdGsJ4HQ5Mjucu1CW2xAWecmXCb5Y5ku 47T"
                  <br />
                  objective: <br />
                  multihash: "QmTGY5N4XSqYivgN1aVxtwx27s5ChC4KoJekq7gjShu GyA"
                  <br />
                  token: <br />
                  address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2" <br />
                  cost: <br />
                  uint256: "7500000000000000" <br />
                  validator: <br />
                  address: "0x0000000000000000000000000000000000000000" <br />
                  lighthouse: <br />
                  address: "0xD40AC7F1e5401e03D00F5aeC1779D8e5Af4CF9f1" <br />
                  lighthouseFee: <br />
                  uint256: "0" <br />
                  deadline: <br />
                  uint256: "13154633" <br />
                  sender: <br />
                  address: '0x128Fba3E5315118ba075f591b54F8139193663a5' <br />
                  nonce: <br />
                  uint256: "0" <br />
                  signature: [] <br />
                </code>
              </p>
              <p>
                Next, the Provider detects the match between the messages and
                starts the process of creating the liability contract. A
                transaction<sup><a href="#liability" id="liability">3</a></sup>
                of the form <samp>createLiability(bytes _ask, bytes _bid)</samp>
                is sent to Ethereum, and the required amount in wrapped ETH is
                withdrawn from the Gaka-chu address.
              </p>
              <p>
                ROS <samp>trader_node</samp> of art shop agent sees confirmation
                of the creation of the liability and then transfers control to
                the ROS <samp>worker_node</samp>.
              </p>
              <p class="media">
                Shop agent logs when a demand message is detected and an offer
                message is generated
              </p>
              <p>
                <code
                  style="color: #333; background-color: #f2f2f2; display:block; white-space:pre-wrap; font-family: monospace"
                >
                  [rosout][INFO] 2021-09-03 15:44:51,180: New liability added to
                  persistence queue: address:
                  "0x94ce20E486CCA74df5f9E69eb6D522c997BFBBc9" <br />
                  [rosout][INFO] 2021-09-03 15:45:04,987: Append address:
                  "0x94ce20E486CCA74df5f9E69eb6D522c997BFBBc9" to liability
                  queue. <br />
                  [rosout][INFO] 2021-09-03 15:45:04,991: Prepare to start
                  liability 0x94ce20E486CCA74df5f9E69eb6D522c997BFBBc9 <br />
                  [rosout][INFO] 2021-09-03 15:45:04,994: Use directory
                  /home/user/.ros/liabilities_executions/ <br />
                  0x94ce20E486CCA74df5f9E69eb6D522c997BFBBc9 for liability
                  0x94ce20E486CCA74df5f9E69eb6D522c997BFBBc9 executor thread
                  <br />
                  [rosout][INFO] 2021-09-03 15:45:04,997: Liability read
                  successfully: address:
                  "0x94ce20E486CCA74df5f9E69eb6D522c997BFBBc9" <br />
                </code>
              </p>
              <p>
                The ROS <samp>worker_node</samp> executes the purchase order and
                then sends a confirmation message. Since the validator (another
                Robonomics node that verifies the liability results) was not
                specified when creating the <samp>demand</samp> message, the
                task is considered completed.
              </p>
              <p class="media">
                <samp>Worker_node</samp> logs on order execution
              </p>
              <p>
                <code
                  style="color: #333; background-color: #f2f2f2; display:block; white-space:pre-wrap; font-family: monospace"
                >
                  [rosout][INFO] 2021-09-06 10:22:11,135: Launching worker
                  node... <br />
                  [rosout][INFO] 2021-09-06 10:22:11,141: Worker node is
                  launched <br />
                  [rospy.internal][INFO] 2021-09-06 10:22:11,143:
                  topic[/liability/ready] adding connection to
                  [http://user-airalab-server:36793/], count 0 <br />
                  [rospy.internal][INFO] 2021-09-06 10:22:11,402: topic[/rosout]
                  adding connection to [/rosout], count 0 <br />
                  [rosout][INFO] 2021-09-06 10:22:20,748: Starting process...
                  <br />
                  [rosout][INFO] 2021-09-06 10:22:31,128: Process complete.
                  <br />
                </code>
              </p>
              <p>
                After that, the Provider finalizes the liability contract (by
                sending a transaction<sup
                  ><a href="#finalize" id="finalize">4</a></sup
                >
                of the form
                <samp
                  >finalizeLiability(address _liability, bytes _result, bool
                  _success, bytes _signature)</samp
                >
                ). Funds in wrapped ETH blocked on the contract are sent to the
                store address, and the Provider receives rewards in the form of
                issued Robonomics Network tokens (XRT). That is, in fact, the
                Provider performs a function similar to that of miners, placing
                important economic information on the blockchain.
              </p>
              <br />
              <sup id="aprroval"
                >2. [<a
                  href="https://etherscan.io/tx/0xc126e8b32af8b8d6c45c9e83d238c3ed5f0196e88c6d60888d578cff0e56f8ce"
                  target="_blank"
                  >https://etherscan.io/tx/0xc126e8b32af8b8d6c45c9e83d238c3ed5f0196e88c6d60888d578cff0e56f8ce</a
                >]<a href="#aprroval">↩</a></sup
              >
              <br />
              <sup id="liability"
                >3. [<a
                  href="https://etherscan.io/tx/0x9990799cc787c6d529197d3fd40316be3e43d87f0e12914fbd13ba3262c1232b"
                  target="_blank"
                  >https://etherscan.io/tx/0x9990799cc787c6d529197d3fd40316be3e43d87f0e12914fbd13ba3262c1232b</a
                >]<a href="#liability">↩</a></sup
              >
              <br />
              <sup id="finalize"
                >4. [<a
                  href="https://etherscan.io/tx/0xd06dd0920d1d30ffc5015c7373647580140e010783788bf28f3272a5e50798ce"
                  target="_blank"
                  >https://etherscan.io/tx/0xd06dd0920d1d30ffc5015c7373647580140e010783788bf28f3272a5e50798ce</a
                >]<a href="#finalize">↩</a></sup
              >
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
              <p>Gaka-Chu: The Robot That Dreams of Being an Artist</p>
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
              <p>Gaka-chu draws Twitter trending words from hashtags</p>
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
              <p>First launches of Gaka-chu</p>
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
                src="../../../public/assets/i/gakachu-firsts-steps.jpg"
                width="60%"
              />
              <p>First steps of Gaka-chu</p>
            </div>
            <div class="media">
              <img
                src="../../../public/assets/i/gakachu-old-room.png"
                width="60%"
              />
              <p>The first drawing room for Gaka-chu in Tolyatti</p>
            </div>
            <div class="media">
              <img
                src="../../../public/assets/i/gakachu-old-work.jpg"
                width="60%"
              />
              <p>Gaka-chu is working in the old drawing room, Tolyatti</p>
            </div>
            <div class="media">
              <img
                src="../../../public/assets/i/gaka-chu-new-room.jpg"
                width="60%"
              />
              <p>Gaka-chu in a new place, St. Petersburg</p>
            </div>
            <div class="media">
              <img
                src="../../../public/assets/i/gakachu-new-work.jpg"
                width="60%"
              />
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
