<template>
  <div>
    <div id="cesiumContainer" :style="earthMapStyle"></div>
  </div>
</template>

<script>
let viewer;

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';
const Cesium = require('cesium/Cesium');
const widgets = require('cesium/Widgets/widgets.css');

export default {
  extends: commonView_Component,

  data() {
    return {
      // ceisum viewer
      viewer: null,

      // provide tiles url
      tileUrl: 'http://szstt.tpddns.cn:8003/pics/tile/{z}/{y}/{x}.png',

      // maximum zoom level
      maximumLevel: 13,

      // the degree of camera will fly to
      cameraDegrees: null,

      // earth's style
      earthMapStyle: {
        opacity: null,
        position: null,
        zIndex: null,
      }
    }
  },

  methods: {
    initView() {
      if (!this.$el) return;
      if (!this.tileUrl) return;

      this.initEarth();

      // this.drawPolygon();

      if (this.cameraDegrees) {
        viewer.camera.flyTo(this.cameraDegrees)
      } else {
        // fly to shanghai
        viewer.camera.flyTo({
          destination: Cesium.Rectangle.fromDegrees(
            120.8523,
            30.69,
            122.1182,
            31.87
          ),
          duration: 6
        })
      }
    },

    initEarth() {
      viewer = new Cesium.Viewer('cesiumContainer', {
        terrainExaggeration: 1,
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        navigationHelpButton: false,
        timeline: false,
        selectionIndicator: false,
        sceneModePicker: false,
        homeButton: false,
        vrButton: false,
        geocoder: false,
        automaticallyTrackDataSourceClocks: false,
        navigationInstructionsInitiallyVisible: false,
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: this.tileUrl,
          credit: '',
          tilingScheme: new Cesium.WebMercatorTilingScheme(),
          maximumLevel: this.maximumLevel,
        })
      });
      this.viewer = viewer;
      // hide cesium ion
      viewer._cesiumWidget._creditContainer.style.display = 'none'

      viewer.scene.skyBox.show = false;
      viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);
      viewer.scene.globe.baseColor = Cesium.Color.RED;

      viewer.scene.globe.showGroundAtmosphere = false;
      viewer.scene.globe.enableLighting = false;
      viewer.scene.skyAtmosphere.brightnessShift = 0;
      viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString(
        "rgb(14,29,40)"
      );
    },

    drawPolygon(paramHash, paramAreaHash) {
      let tempHash;
      let tempAreaHash;

      if (paramHash) {
        tempHash = paramHash;
        tempAreaHash = paramAreaHash;
      } else {
        tempHash = shanghaiHash;
        tempAreaHash = shanghaiAreaHash;
      }

      if (!tempHash || !tempAreaHash) {
        return;
      }

      tempHash.forEach(index => {
        viewer.entities.add({
          name: index,
          polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray(window[index]),
            height: 0,
            material: Cesium.Color.fromCssColorString('rgba(5,5,5,0.618)'),
            outline: true,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2
          },
          material: Cesium.Color.RED,
          position: Cesium.Cartesian3.fromDegrees(tempAreaHash[index].lon, tempAreaHash[index].lat),
          label: {
            text: tempAreaHash[index].text,
            font: "150px Microsoft YaHei bold",
            scale: 0.1,
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 10.0,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            // showBackground: false,
            showBackground: true
          },
          show: true
        });
      })
    },
  },

  created() {

  },

  mounted() {
    // this.initView();
  }
}
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  opacity: 0.5;
  position: absolute;
  z-index: 1;
}
</style>