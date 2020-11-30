<template>
  <b-form-group label="Name" label-for="name">
    <ValidationProvider v-slot="{ errors }" rules="required" name="Name">
      <b-form-input id="name" v-model="commit" type="text" />
      <b-form-invalid-feedback :state="!errors.length">
        <p v-for="(item, key) in errors" :key="key" v-text="item" />
      </b-form-invalid-feedback>
    </ValidationProvider>
  </b-form-group>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    commit: {
      get() {
        return this.name
      },
      set(value) {
        this.name = value
        this.$emit('input', value)
      },
    },
  },
}
</script>
