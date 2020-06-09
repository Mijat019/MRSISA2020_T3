<script>
import { Line } from 'vue-chartjs';
import moment from 'moment';
import Vue from 'vue';
export default {
  extends: Line,
  name: 'Graph',
  props: ['dates'],
  data() {
    return {
      config: {
        datasets: [],
        labels: [],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Day',
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Number of appointments',
              },
              ticks: {
                max: 0,
                min: 0,
                stepSize: 5,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.show();
  },

  methods: {
    async show() {
      const { data } = await Vue.$axios.post('/report/appointmentCount', {
        dates: this.dates,
      });
      this.config.labels = [];
      this.config.datasets = [];
      this.config.labels = data.daysInBetween.map(el =>
        moment(el).format('lll')
      );
      this.options.scales.yAxes[0].ticks.min = 0;
      this.options.scales.yAxes[0].ticks.stepSize = 1;
      this.options.scales.yAxes[0].ticks.max =
        Math.max(...data.appointmentCounts) + 1;
      this.config.datasets = [
        {
          data: data.appointmentCounts,
          color: 'blue',
          backgroundColor: 'blue',
          fill: false,
          label: 'number of appointments',
        },
      ];

      this.renderChart(this.config, this.options);
    },
  },
  watch: {
    dates() {
      this.show();
    },
  },
};
</script>

<style></style>
