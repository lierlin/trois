import { defineComponent, watch } from 'vue';
import { FontLoader, TextGeometry } from 'three';
import Mesh from './Mesh.js';

const props = {
  text: String,
  fontSrc: String,
  size: { type: Number, default: 80 },
  height: { type: Number, default: 5 },
  depth: { type: Number, default: 1 },
  curveSegments: { type: Number, default: 12 },
  bevelEnabled: { type: Boolean, default: false },
  bevelThickness: { type: Number, default: 10 },
  bevelSize: { type: Number, default: 8 },
  bevelOffset: { type: Number, default: 0 },
  bevelSegments: { type: Number, default: 5 },
  align: { type: [Boolean, String], default: false },
};

export default defineComponent({
  extends: Mesh,
  props,
  data() {
    return {
      loading: true,
    };
  },
  created() {
    // add watchers
    const watchProps = [
      'text', 'size', 'height', 'curveSegments',
      'bevelEnabled', 'bevelThickness', 'bevelSize', 'bevelOffset', 'bevelSegments',
      'align',
    ];
    watchProps.forEach(p => {
      watch(() => this[p], () => {
        if (this.font) this.refreshGeometry();
      });
    });

    const loader = new FontLoader();
    loader.load(this.fontSrc, (font) => {
      this.loading = false;
      this.font = font;
      this.createGeometry();
      this.initMesh();
    });
  },
  methods: {
    createGeometry() {
      this.geometry = new TextGeometry(this.text, {
        font: this.font,
        size: this.size,
        height: this.height,
        depth: this.depth,
        curveSegments: this.curveSegments,
        bevelEnabled: this.bevelEnabled,
        bevelThickness: this.bevelThickness,
        bevelSize: this.bevelSize,
        bevelOffset: this.bevelOffset,
        bevelSegments: this.bevelSegments,
      });

      if (this.align === 'center') {
        this.geometry.center();
      }
    },
  },
});
