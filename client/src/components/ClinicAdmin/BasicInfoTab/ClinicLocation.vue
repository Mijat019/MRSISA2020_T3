<template>
  <l-map
    :zoom="zoom"
    :center="center"
    :options="mapOptions"
    @update:center="centerUpdate"
    @update:zoom="zoomUpdate"
  >
    <l-tile-layer :url="url" :attribution="attribution" />

    <l-marker :lat-lng="marker"> </l-marker>
  </l-map>
</template>

<script>
import axios from 'axios';
import L, { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import { mapGetters } from 'vuex';
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },

  props: ['country', 'city', 'address'],

  data: () => ({
    zoom: 13,
    center: latLng(47.41322, -1.219482),
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    marker: latLng(47.41422, -1.250482),
    mapOptions: {
      zoomSnap: 0.5,
    },
  }),

  computed: {
    ...mapGetters({ getMyClinic: 'clinicAdmins/getMyClinic' }),
  },

  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },

    async getLocation() {
      const clinicAdress = `${this.country} ${this.city} ${this.address}`;
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${clinicAdress}`
      );

      const { lat, lon } = data[0];
      this.currentCenter = latLng(lat, lon);
      this.center = latLng(lat, lon);
      this.marker = latLng(lat, lon);
    },
  },

  async mounted() {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });

    this.getLocation();
  },

  watch: {
    country() {
      this.getLocation();
    },
    city() {
      this.getLocation();
    },
    address() {
      this.getLocation();
    },
  },
};
</script>

<style></style>
