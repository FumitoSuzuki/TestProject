<template>
  <section id="form">
    <!-- This is Input Form. This Form is not submitted. -->
    <b-form ref="form" @submit.prevent="onConfirm" @reset="onReset">
      <ValidationObserver ref="observer" v-slot="{ invalid }">
        <b-form-row>
          <b-col cols="12" md="3">
            <FormInputName v-model="form.name" />
          </b-col>
          <b-col cols="12" md="4">
            <FormInputEmail v-model="form.email" />
          </b-col>
          <b-col cols="12" md="5">
            <FormInputPhone v-model="form.phone" />
          </b-col>
        </b-form-row>
        <b-form-row>
          <b-col cols="12">
            <FormTextareaMessage v-model="form.message" />
          </b-col>
        </b-form-row>
        <b-row align-h="center" class="mt-3">
          <b-col cols="4">
            <b-button
              v-b-modal.confirm
              block
              variant="primary"
              :disabled="invalid"
            >
              Confirm
            </b-button>
          </b-col>
        </b-row>
      </ValidationObserver>
    </b-form>
    <!-- This is Input confirmaition window -->
    <b-modal id="confirm" title="Please Confirm." scrollable>
      <p>Name: {{ form.name }}</p>
      <p>Email: {{ form.email }}</p>
      <p>Phone: {{ form.phone.number }}</p>
      <p>Message: {{ form.message.type }}</p>
      <p>{{ form.message.text }}</p>
      <template v-slot:modal-footer>
        <b-button @click="$bvModal.hide('confirm')">Cancel</b-button>
        <b-button variant="info" @click="onSubmit">Submit! 🤩</b-button>
      </template>
    </b-modal>
    <!-- This is thanks message window -->
    <b-modal id="thanks" title="Thanks Contact!">
      <p>
        <Break>Thank you for your inquiry.</Break>
        <Break>We will contact you after confirming the contents.</Break>
      </p>
      <template v-slot:modal-footer>
        <b-button variant="info" @click="onFihish">OK! 🤩</b-button>
      </template>
    </b-modal>
    <!-- Stand-in static forms -->
    <form name="conatact" netlify netlify-honeypot="bot-field" hidden>
      <input name="bot-field" />
      <input type="text" name="name" />
      <input type="text" name="email" />
      <input type="text" name="number" />
      <input type="text" name="type" />
      <textarea name="text" />
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: {
          country: '',
          number: '',
        },
        message: {
          type: '',
          text: '',
        },
      },
      encodeForm: '',
    }
  },
  methods: {
    onConfirm() {
      this.$bvModal.show('confirm')
    },
    onSubmit() {
      const encodeForm = this.encode({
        'form-name': 'contact',
        ...this.form,
      })
      console.log(encodeForm)
      const axiosConfig = {
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      this.$axios.post('/', encodeForm, axiosConfig)
      this.$bvModal.hide('confirm')
      this.$bvModal.show('thanks')
      this.onReset()
    },
    onFihish() {
      this.$bvModal.hide('thanks')
    },
    onReset() {
      this.$refs.form.reset()
      this.$refs.observer.reset()
      Object.assign(this.$data, this.$options.data.call(this))
    },
    encode(data) {
      return Object.keys(data)
        .map((key) => {
          if (typeof data[key] === 'object') {
            return this.encode(data[key])
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        })
        .join('&')
    },
  },
}
</script>
