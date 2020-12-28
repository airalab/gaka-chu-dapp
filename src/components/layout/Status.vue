<template>
  <span>
    Status pubsub:
    <span
      v-if="status == statuses.OK || status == statuses.WARNING"
      style="color: #4b9c34"
    >
      connected
    </span>
    <span v-else style="color: #9C3436">disconnected</span>
  </span>
</template>

<script>
import { getStatusPeers } from "../../utils/tools";
import getConfigRobonomics from "../../config/robonomics";

export default {
  data() {
    return {
      required: [],
      other: [],
      status: "",
      statuses: {
        OK: 1,
        WARNING: 2,
        ERROR: 3
      }
    };
  },
  mounted() {
    this.getPeers();
  },
  methods: {
    async getPeers() {
      try {
        const peers = await getStatusPeers(
          this.$ipfs,
          this.$robonomics,
          getConfigRobonomics().statusPeers
        );
        this.required = peers.required;
        this.other = peers.other;

        const count = peers.required.length;
        if (count > 1) {
          this.status = this.statuses.OK;
        } else if (count === 1) {
          this.status = this.statuses.WARNING;
        } else {
          this.status = this.statuses.ERROR;
        }
      } catch (error) {
        this.status = this.statuses.ERROR;
      }

      setTimeout(() => {
        this.getPeers();
      }, 5000);
    }
  }
};
</script>
