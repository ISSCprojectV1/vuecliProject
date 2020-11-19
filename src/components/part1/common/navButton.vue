<template>
  <div style="position: fixed; width: 125px; height: 56px; bottom: 2%; right: 1%; z-index: 99999">
    <div class="go" @click="goBack" style="position: absolute; left: 1%">
      <div class="go-back"></div>
    </div>
    <div class="go" @click="goForward" style="position: absolute; right: 1%">
      <div class="go-forward"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navButton",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
  },
}
</script>

<style scoped>
div.go {
  display: block;
  z-index: 999999;
  position: fixed;
  border: 3px solid #ffffff;
  width: 50px;
  height: 50px;
  background-color: #1e90ff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.12) 0 10px 10px, rgba(0, 0, 0, 0.24) 0 1px 2px;
  /* background color transition */
  transition: 300ms;
  -moz-transition: 300ms;
  -webkit-transition: 300ms;
  -o-transition: 300ms;
}

div.go:hover {
  border-color: #1e90ff;
  background-color: #ffffff;
}

div.go:hover div.go-back {
  border-color: #1e90ff;
}

div.go:hover div.go-forward {
  border-color: #1e90ff;
}

div.go div.go-back {
  position: absolute;
  left: 18px;
  top: 13px;
  border: solid #ffffff;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 10px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

div.go div.go-forward {
  position: absolute;
  right: 18px;
  top: 13px;
  border: solid #ffffff;
  border-width: 3px 0 0 3px;
  display: inline-block;
  padding: 10px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
</style>