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
    <v-main style="margin-bottom: 50px;">
      <v-container grid-list-md>
        <v-layout justify-center row wrap>
          <v-flex md12 style="text-align:center;">
            <a @click="dialog = true"
              ><img src="assets/i/manifest.png" width="60%"
            /></a>
            <v-dialog v-model="dialog" width="500">
              <v-card>
                <v-card-text style="padding-top:20px">
                  <h3>Манифест</h3>
                  <p>
                    Развивающиеся технологии в области машинного обучения и
                    нейронных сетей позволяют роботизированным комплексам
                    показывать ранее недостижимые результаты в управлении и
                    коллаборации с человеком. Роботы уже потихоньку начинают
                    работать в непосредственной близости с человеком, а
                    благодаря блокчейн технологиям они становятся и
                    непосредственными участниками нашей экономики. Gaka-chu
                    является самостоятельным экономическим агентом благодаря
                    контрактам робономики и способен самостоятельно генерировать
                    изображения, но не имеет прав на свои произведения. В связи
                    с этим мы, группа студентов ИТМО под руководством Александра
                    Александровича Капитонова - кандидата технических наук,
                    отказываемся от прав на произведения, создаваемые
                    роботом-художником “Gaka-chu”, и признаем права
                    собственности за роботом-художником “Gaka-chu”.
                  </p>
                  <h3>Manifesto</h3>
                  <p>
                    Developing technologies in the field of machine learning and
                    neural networks allow robotized systems to show previously
                    unattainable results in control and collaboration with
                    humans. Robots are slowly beginning to work in close
                    proximity with humans, and due to blockchain technologies,
                    they also become direct participants in our economy.
                    Gaka-chu is an independent economic agent thanks to
                    robonomics contracts and is able to generate images
                    independently, but has no rights to its works. In this
                    regard, We, group of ITMO students led dy Alexandr
                    Kapitonov, PhD and Dean of the Faculty of Infocommunication
                    Technologies, give up the rights to works created by the
                    robot-artist “Gaka-chu”, and accept the ownership of the
                    robot-artist “Gaka-chu”.
                  </p>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex lg12>
            <slot />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
    <v-footer
      fixed
      class="pa-1"
      style="height:auto;border-top: 1px solid #dedede;"
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
