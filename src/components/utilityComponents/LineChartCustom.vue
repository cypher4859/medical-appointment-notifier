<script lang="ts">
import { Component, Mixins, Prop, Vue, Watch } from 'vue-property-decorator'
import { Line, mixins } from 'vue-chartjs-typescript'
import VueCharts from 'vue-chartjs'

@Component({
  name: 'line-chart-custom',
  extends: Line
})
export default class LineChart extends Mixins(Line, VueCharts.mixins.reactiveProp) {
  // @Prop(Object) public chartData!: object
  @Prop(Object) public options!: object

  @Watch('chartData', { deep: true })
  onChartDataChange (newChange: any, oldChange: any) {
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
