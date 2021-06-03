export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  // 预编译 不能用 template
  render(h) {
    return h('a', { domProps: { href: `#` + this.to } }, [this.$slots.default])
  },
}
