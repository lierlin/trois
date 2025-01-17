import { defineComponent } from 'vue';
import { MeshToonMaterial } from 'three';
import { bindProps, propsValues } from '../tools';
import Material, { wireframeProps } from './Material';

export default defineComponent({
  extends: Material,
  props: {
    ...wireframeProps,
  },
  methods: {
    createMaterial() {
      this.material = new MeshToonMaterial(propsValues(this.$props));
    },
    addWatchers() {
      bindProps(this, Object.keys(wireframeProps), this.material);
    },
  },
  __hmrId: 'ToonMaterial',
});
