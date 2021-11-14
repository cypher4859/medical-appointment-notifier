<script lang="ts">
import { Component, Mixins, Prop, Vue, Watch } from 'vue-property-decorator'
import { Line, mixins as chartMixins } from 'vue-chartjs-typescript'

const { reactiveProp } = chartMixins

@Component({
  name: 'line-chart-custom',
  extends: Line,
  mixins: [reactiveProp]
})
export default class LineChart extends Mixins(Line) {
  @Prop(Object) public chartData!: object
  @Prop(Object) public options!: object

  @Watch('chartData', { deep: true })
  onChartDataChange (newChange: any, oldChange: any) {
    console.log('Chart Data changed:', this.chartData)
    this.renderChart(this.chartData, this.options)
  }

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
