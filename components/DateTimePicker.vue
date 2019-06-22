<template>
  <vue-date-picker v-model="date" :config="options"/>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      options: {
        format: 'DD/MM/YYYY',
        useCurrent: true
      }
    }
  }
}
</script>
