import { ComponentPropsOptions, defineComponent, inject, watch } from 'vue'
import { BufferGeometry, Material, Mesh as TMesh } from 'three'
import Object3D from '../core/Object3D'
import { bindProp } from '../tools'
import { ThreeInterface } from '../core/useThree'

export const pointerProps = {
  onPointerEnter: Function,
  onPointerOver: Function,
  onPointerMove: Function,
  onPointerLeave: Function,
  onPointerDown: Function,
  onPointerUp: Function,
  onClick: Function,
}

interface MeshSetupInterface {
  three?: ThreeInterface
  mesh?: TMesh
  geometry?: BufferGeometry
  material?: Material
  loading?: boolean
}

export interface MeshInterface {
  setMaterial(m: Material): void
}

export function defaultSetup(): MeshSetupInterface {
  const three = inject('three') as ThreeInterface
  return { three }
}

const Mesh = defineComponent({
  name: 'Mesh',
  extends: Object3D,
  props: {
    castShadow: Boolean,
    receiveShadow: Boolean,
    ...pointerProps,
  },
  setup() {
    return defaultSetup()
  },
  created() {
  },
  provide() {
    return {
      mesh: this,
    }
  },
  mounted() {
    if (!this.mesh && !this.loading) this.initMesh()
  },
  methods: {
    initMesh() {
      const mesh = new TMesh(this.geometry, this.material)
      mesh.userData.component = this

      bindProp(this, 'castShadow', mesh)
      bindProp(this, 'receiveShadow', mesh)

      if (this.onPointerEnter ||
        this.onPointerOver ||
        this.onPointerMove ||
        this.onPointerLeave ||
        this.onPointerDown ||
        this.onPointerUp ||
        this.onClick) {
        this.three?.addIntersectObject(mesh)
      }

      this.mesh = mesh
      this.initObject3D(mesh)
    },
    createGeometry() {},
    addGeometryWatchers(props: ComponentPropsOptions) {
      Object.keys(props).forEach(prop => {
        // @ts-ignore
        watch(() => this[prop], () => {
          this.refreshGeometry()
        })
      })
    },
    setGeometry(geometry: BufferGeometry) {
      this.geometry = geometry
      if (this.mesh) this.mesh.geometry = geometry
    },
    setMaterial(material: Material) {
      this.material = material
      if (this.mesh) this.mesh.material = material
    },
    refreshGeometry() {
      const oldGeo = this.geometry
      this.createGeometry()
      if (this.mesh && this.geometry) this.mesh.geometry = this.geometry
      oldGeo?.dispose()
    },
  },
  unmounted() {
    if (this.mesh) {
      this.three?.removeIntersectObject(this.mesh)
    }
    // for predefined mesh (geometry is not unmounted)
    if (this.geometry) this.geometry.dispose()
  },
  __hmrId: 'Mesh',
})

export default Mesh

export function meshComponent(name, props, createGeometry) {
  return defineComponent({
    name,
    extends: Mesh,
    props,
    setup() {
      return defaultSetup()
    },
    created() {
      this.createGeometry()
      this.addGeometryWatchers(props)
    },
    methods: {
      createGeometry() {
        this.geometry = createGeometry(this)
      },
    },
    // __hmrId: name,
  })
}