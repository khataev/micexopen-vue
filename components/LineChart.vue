<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  watch: {
    chartdata() {
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
