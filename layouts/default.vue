<template>
  <!-- TODO: Адаптивность к экранам разных устройств -->
  <!-- Строка меню -->
  <b-container>
    <b-row>
      <b-col>
        <b-navbar type="dark" variant="primary">
          <b-navbar-brand href="#">MICEXOPEN</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="http://micexopen-old.khataev.com">
                <b-badge variant="warning">Перейти на старый сайт</b-badge>
              </b-nav-item>
              <b-nav-item v-b-modal.instructionsModal>Инструкция</b-nav-item>
              <b-nav-item v-b-modal.contactsModal>Связаться с автором</b-nav-item>
              <b-nav-item v-b-modal.thanksModal>Хочу отблагодарить!</b-nav-item>
              <b-nav-item v-b-modal.usefulLinksModal>Плюшки от меня</b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <nuxt/>
      </b-col>
    </b-row>

    <!-- Instructions modal -->
    <InstructionsModal/>
    <!-- Contacts modal -->
    <ContactsModal/>
    <!-- Thanks modal -->
    <ThanksModal/>
    <!-- Useful links modal -->
    <UsefulLinksModal/>
  </b-container>
</template>

<style>
.container {
  margin-top: 20px;
}
/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
  body {
    font-size: 8px;
  }
  .text-header {
    font-size: 10px;
  }
  .show-button {
    size: xs;
  }
}

/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767.98px) {
  body {
    font-size: 10px;
  }
  .text-header {
    font-size: 10px;
  }
  .show-button {
    size: xs;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  body {
    font-size: 14px;
  }

  .text-header {
    font-size: 16px;
  }
  .show-button {
    size: xs;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  body {
    font-size: 14px;
  }

  .text-header {
    font-size: 16px;
  }
  .show-button {
    size: xs;
  }
}

body {
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

.text-header {
  padding-right: 20px;
  font-weight: bold;
}
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
