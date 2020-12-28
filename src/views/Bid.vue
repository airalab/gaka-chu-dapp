<template>
  <div>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="price"
        :rules="requireRule"
        label="Amount"
        required
      ></v-text-field>
    </v-form>

    <div>
      Balance: {{ balance.valueStr }} / {{ balanceEth.valueStr }}
      <span>
        (get xrt
        <a
          href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0x7de91b204c1c737bcee6f000aaa6569cf7061cb7"
          target="_blank"
          >uniswap</a
        >)
      </span>
      | Approved: {{ approveTrade.valueStr }}
    </div>

    <template v-if="isApprove">
      <v-btn
        v-if="isApprove"
        :loading="isLoadingApprove"
        :disabled="isApproveDisabled"
        color="warning"
        @click.native="sendApproveTrade"
        class="ml-0"
      >
        Approve
      </v-btn>

      <p v-if="tx">
        <b>Watch Tx:&nbsp;</b>
        <a :href="`https://etherscan.io/tx/${tx}`" target="_blank">{{ tx }}</a>
      </p>

      <p v-if="proccess === 4"><b>Success</b></p>
    </template>

    <v-btn
      v-if="isBid"
      :loading="loadingOrder"
      :disabled="isBidDisabled"
      color="warning"
      @click.native="order"
      class="ml-0"
      >Bid</v-btn
    >
  </div>
</template>

<script>
import web3 from "web3";
import { Token } from "robonomics-js";
import axios from "axios";
import { number } from "../utils/tools";
import config from "~config";

const STATUS = {
  EMPTY: 0,
  BTN: 1,
  TX: 2,
  SUCCESS: 3,
  FINISH: 4
};

export default {
  props: ["minCost", "objective"],
  data() {
    return {
      valid: false,

      requireRule: [(v) => !!v || "Field required"],

      token: null,
      loadingOrder: false,
      price: 0,
      balanceEth: {
        value: new web3.utils.BN(0),
        valueStr: `0 ETH`
      },
      balance: {
        value: new web3.utils.BN(0),
        valueStr: `0 ${config.TOKEN_SYMBOL}`
      },
      approveTrade: {
        value: new web3.utils.BN(0),
        valueStr: `0 ${config.TOKEN_SYMBOL}`
      },
      market: config.MARKET_MODEL,

      proccess: STATUS.EMPTY,
      tx: null
    };
  },
  computed: {
    isApprove: function() {
      return this.approveTrade.value.lt(
        new web3.utils.BN(
          String(number.toWei(this.price, config.TOKEN_DECIMALS))
        )
      );
    },
    isLoadingApprove: function() {
      return this.proccess > 0 && this.proccess < 3;
    },
    isApproveDisabled: function() {
      return (
        this.isLoadingApprove ||
        this.balance.value.lt(
          new web3.utils.BN(
            String(number.toWei(this.price, config.TOKEN_DECIMALS))
          )
        )
      );
    },
    isBid: function() {
      return this.approveTrade.value.gte(
        new web3.utils.BN(
          String(number.toWei(this.price, config.TOKEN_DECIMALS))
        )
      );
    },
    isBidDisabled: function() {
      return (
        this.loadingOrder ||
        this.balance.value.lt(
          new web3.utils.BN(
            String(number.toWei(this.price, config.TOKEN_DECIMALS))
          )
        ) ||
        !this.valid
      );
    }
  },
  watch: {
    minCost: function() {
      this.requireRule[1] = (v) => {
        return (
          new web3.utils.BN(String(number.toWei(v, config.TOKEN_DECIMALS))).gte(
            new web3.utils.BN(String(this.minCost))
          ) || `Min ${number.fromWei(this.minCost, config.TOKEN_DECIMALS)}`
        );
      };
      this.price = number.fromWei(this.minCost, config.TOKEN_DECIMALS);
    }
  },
  created() {
    this.requireRule.push((v) => {
      return (
        new web3.utils.BN(String(number.toWei(v, config.TOKEN_DECIMALS))).gte(
          new web3.utils.BN(String(this.minCost))
        ) || `Min ${number.fromWei(this.minCost, config.TOKEN_DECIMALS)}`
      );
    });
    this.price = number.fromWei(this.minCost, config.TOKEN_DECIMALS);

    this.token = new Token(this.$robonomics.web3, config.chain.get().TOKEN);
    this.fetchData().then(() => {
      console.log("xrt", this.$robonomics.xrt.address);
      console.log("factory", this.$robonomics.factory.address);
      console.log("lighthouse", this.$robonomics.lighthouse.address);
      this.$robonomics.onDemand(this.market, (msg) => {
        console.log("demand", msg);
      });
      this.$robonomics.onOffer(this.market, (msg) => {
        console.log("offer", msg);
      });
    });
  },
  methods: {
    fetchData() {
      return this.token.methods
        .balanceOf(this.$robonomics.account.address)
        .call()
        .then((balanceOf) => {
          this.balance.value = new web3.utils.BN(balanceOf);
          this.balance.valueStr = `${number.fromWei(
            balanceOf,
            config.TOKEN_DECIMALS
          )} ${config.TOKEN_SYMBOL}`;
          if (balanceOf > 0) {
            return this.token.methods
              .allowance(
                this.$robonomics.account.address,
                this.$robonomics.factory.address
              )
              .call();
          }
          return false;
        })
        .then((allowance) => {
          if (allowance) {
            this.approveTrade.value = new web3.utils.BN(allowance);
            this.approveTrade.valueStr = `${number.fromWei(
              allowance,
              config.TOKEN_DECIMALS
            )} ${config.TOKEN_SYMBOL}`;
          }
          this.$robonomics.web3.eth.getBalance(
            this.$robonomics.account.address,
            (e, r) => {
              this.balanceEth.value = new web3.utils.BN(r);
              this.balanceEth.valueStr = `${number.fromWei(r, 18)} ETH`;
            }
          );
        });
    },
    sendApproveTrade() {
      this.proccess = STATUS.BTN;
      return this.token.methods
        .approve(
          this.$robonomics.factory.address,
          number.toWei(this.price, config.TOKEN_DECIMALS)
        )
        .send(
          {
            from: this.$robonomics.account.address
          },
          (error, transactionHash) => {
            if (error) {
              return;
            }
            this.proccess = STATUS.TX;
            this.tx = transactionHash;
          }
        )
        .then((r) => {
          const watch = (blockNumber, cb) => {
            this.$robonomics.web3.eth.getBlockNumber(function(_, current) {
              if (current < blockNumber) {
                setTimeout(function() {
                  watch(blockNumber, cb);
                }, 1000);
              } else {
                cb();
              }
            });
          };
          watch(r.blockNumber, () => {
            this.proccess = STATUS.FINISH;
            this.tx = null;
            this.fetchData();
          });
        })
        .catch(() => {
          this.proccess = STATUS.EMPTY;
        });
    },
    order() {
      if (this.$refs.form.validate() && Number(this.price) > 0) {
        this.liability = null;
        this.loadingOrder = true;
        this.$robonomics.web3.eth.getBlockNumber((e, r) => {
          const demand = {
            model: this.market,
            objective: this.objective,
            token: this.token.address,
            cost: number.toWei(this.price, config.TOKEN_DECIMALS),
            lighthouse: this.$robonomics.lighthouse.address,
            validator: "0x0000000000000000000000000000000000000000",
            validatorFee: 0,
            deadline: r + 100000
          };

          this.$robonomics
            .sendDemand(demand, false, (msg) => {
              axios
                .post(config.AUCTION_API + "/demand/", msg.toObject())
                .then((r) => {
                  console.log(r.data.result);
                  this.loadingOrder = false;
                })
                .catch(() => {
                  this.loadingOrder = false;
                });
            })
            .catch(() => {
              this.loadingOrder = false;
            });

          // this.$robonomics
          //   .sendDemand(demand, false)
          //   .then(() => {
          //     this.loadingOrder = false;
          //   })
          //   .catch(() => {
          //     this.loadingOrder = false;
          //   });
        });
      }
      return false;
    }
  }
};
</script>
