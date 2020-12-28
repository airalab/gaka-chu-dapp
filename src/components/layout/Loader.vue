<template>
  <div class="loading-screen">
    <div class="loading-logo">
      <svg
        class="logo-robonomics"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="196.9px"
        height="170.3px"
        viewBox="0 0 196.9 170.3"
        style="enable-background:new 0 0 196.9 170.3;"
        xml:space="preserve"
      >
        <g transform="translate(2530 155)">
          <path
            class="line"
            d="M-2523.4,7.9l184.2,0.5l-91.7-158.1L-2523.4,7.9z"
          />
          <circle class="dot" cx="-2339.7" cy="8.7" r="6.6" />
          <circle class="dot" cx="-2523.4" cy="8.2" r="6.6" />
          <circle class="dot" cx="-2430.8" cy="-148.4" r="6.6" />
          <path
            class="triangle-1"
            d="M-2477.3-18.3l92.1,0.3l-45.8-79L-2477.3-18.3z"
          />
          <path
            class="triangle-2"
            d="M-2431.2-18.1l46,0.1l-45.8-79L-2431.2-18.1z"
          />
          <path
            class="triangle-3"
            d="M-2477.3-18.3l92.1,0.3l-46-20.3L-2477.3-18.3z"
          />
        </g>
      </svg>
    </div>
    <h1>robonomics.network dapp</h1>
  </div>
</template>

<style scoped>
.loading-screen {
  text-align: center;
}
.loading-screen h1 {
  opacity: 0;
  transform: translateY(20px);
  animation: 0.8s AnimateTitle 1s linear forwards;
}
.loading-logo {
  position: relative;
  padding-top: 16px;
  margin-top: 25vh;
}
.loader-ring {
  position: relative;
  display: inline-block;
  height: 16px;
  width: 16px;
  border-radius: 16px;
  border-width: 2px 2px 0 0;
  border-style: solid;
  animation: 0.8s Rotate ease-in-out infinite;
}
@keyframes AnimateTitle {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes DrawSvgPath {
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes logo-triangle-1 {
  0% {
    fill: #03a5ed;
  }
  25% {
    fill: #03a5ed;
  }
  50% {
    fill: #03a5ed;
  }
  75% {
    fill: #b5c0f1;
  }
  100% {
    fill: #03a5ed;
  }
}
@keyframes logo-triangle-2 {
  0% {
    fill: #b5c0f1;
  }
  25% {
    fill: #e0bded;
  }
  50% {
    fill: #03a5ed;
  }
  75% {
    fill: #03a5ed;
  }
  100% {
    fill: #b5c0f1;
  }
}
@keyframes logo-triangle-3 {
  0% {
    fill: #535974;
  }
  25% {
    fill: #b5c0f1;
  }
  50% {
    fill: #b5c0f1;
  }
  75% {
    fill: #282b38;
  }
  100% {
    fill: #535974;
  }
}
.logo-robonomics .dot {
  fill: #03a5ed;
  visibility: visible;
  opacity: 1;
  animation: 0.5s FadeIn 4s ease forwards;
}
.logo-robonomics .line {
  fill: transparent;
  stroke: #03a5ed;
  stroke-miterlimit: 10;
  stroke-dasharray: 700;
  stroke-dashoffset: 700;
  animation: 1s DrawSvgPath 0.5s ease-in-out forwards;
}
.logo-robonomics .triangle-1 {
  fill: #03a5ed;
  animation: 5s logo-triangle-1 0.1s linear infinite;
}
.logo-robonomics .triangle-2 {
  fill: #b5c0f1;
  animation: 5s logo-triangle-2 0.1s linear infinite;
}
.logo-robonomics .triangle-3 {
  fill: #535974;
  animation: 5s logo-triangle-3 0.1s linear infinite;
}
.theme-light {
  background-color: #f0f0f0;
  color: #656d76;
}
.theme-light .section-light {
  background-color: #fff;
  border-color: #ebebeb;
  color: #6c757e;
  box-shadow: 0 0.5rem 1.2rem rgba(189, 197, 209, 0.2);
}
.theme-light .section-dark {
  background-color: #f6f6f6;
  border-color: #ccc;
  color: #656d76;
}
.theme-light .section-mid {
  background-color: #f9f9f9;
  border-color: #f0f0f0;
  color: #656d76;
}
.theme-light .item-bottom {
  border-color: #ccc;
}
.theme-light .item-bottom--line {
  border-color: #ebebeb;
}
.theme-light a {
  color: #03a5ed;
}
.theme-light a.a-dashed {
  border-color: #03a5ed;
}
.theme-light blockquote {
  border-color: #03a5ed;
}
.theme-light table td {
  border-color: #e6e6e6;
}
.theme-light table th {
  background-color: #f2f2f2;
  color: #656d76;
  border-color: #d9d9d9;
}
.theme-light table.table-hover tr:hover td {
  background-color: #f7f7f7;
}
.theme-light .label {
  color: #fff;
}
.theme-light .label-violet {
  background-color: #809cff;
}
.theme-light .label-green {
  background-color: #54ce63;
}
.theme-light .label-orange {
  background-color: #f15a24;
}
.theme-light .tcolor-violet {
  color: #809cff;
}
.theme-light .tooltip {
  background-color: #6c757e;
  color: #fff;
}
.theme-light .popper .popper__arrow,
.theme-light .tooltip .tooltip-arrow {
  border-color: #6c757e;
}
.theme-light .loading-logo:after {
  color: #809cff;
}
</style>
