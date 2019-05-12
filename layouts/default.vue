<template>
  <!-- TODO: Адаптивность к экранам разных устройств -->
  <!-- Строка меню -->
  <b-container>
    <!-- <b-nav pills>
      <b-nav-item active>Инструкция</b-nav-item>
      <b-nav-item>Связаться с автором</b-nav-item>
      <b-nav-item>Хочу отблагодарить!</b-nav-item>
      <b-nav-item>Плюшки от меня</b-nav-item>
    </b-nav> -->
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand href="#">MICEXOPEN</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-b-modal.instructionsModal>Инструкция</b-nav-item>
          <b-nav-item v-b-modal.contactsModal>Связаться с автором</b-nav-item>
          <b-nav-item v-b-modal.thanksModal>Хочу отблагодарить!</b-nav-item>
          <b-nav-item v-b-modal.usefulLinksModal>Плюшки от меня</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <nuxt />

    <!-- Instructions modal -->
    <InstructionsModal />
    <!-- Contacts modal -->
    <ContactsModal />
    <!-- Thanks modal -->
    <ThanksModal />
    <!-- Useful links modal -->
    <UsefulLinksModal />
  </b-container>
</template>

<style>
/* html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
} */
</style>
<script>
import InstructionsModal from '~/components/InstructionsModal.vue'
import ContactsModal from '~/components/ContactsModal.vue'
import ThanksModal from '~/components/ThanksModal.vue'
import UsefulLinksModal from '~/components/UsefulLinksModal.vue'

export default {
  components: {
    InstructionsModal,
    ContactsModal,
    ThanksModal,
    UsefulLinksModal
  },
  data() {
    return {}
  }
}
</script>
