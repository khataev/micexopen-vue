<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Pie,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    title: { type: String, default: '' }
  },
  watch: {
    chartdata() {
      this.renderChart(this.chartData, this.opts())
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.opts())
  },
  methods: {
    opts() {
      return {
        title: {
          display: true,
          text: this.title
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>
