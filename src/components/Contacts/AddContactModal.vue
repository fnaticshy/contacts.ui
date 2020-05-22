<template>
  <v-dialog v-model="modal" width="500">
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary ml-3"
        dark v-on="on"
      >
        Add contact
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title class="headline px-0"
            >Do you want add contact?</v-card-title
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              :rules="rulesName"
              name="name"
              placeholder="1-15 letters"
              type="text"
              v-model="name"
            />
            <v-text-field
              label="Phone"
              :rules="rulesPhone"
              placeholder="1-234-567-8910"
              name="phone"
              type="text"
              v-model="phone"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-btn text @click="onCancel" :disabled="localLoading">
                Close
              </v-btn>
              <v-btn
                color="success"
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
              >
                Add
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddContactModal',
  computed: {
    ownerId() {
      return this.$store.getters.user.id;
    },
  },
  data() {
    return {
      modal: false,
      localLoading: false,
      name: '',
      phone: '',
      rulesName: [
        (value) => !!value || 'Required.',
        (value) => (value || '').length <= 15 || 'Max 15 characters',
      ],
      rulesPhone: [
        (value) => !!value || 'Required.',
        (value) => {
          const pattern = /\(?([0-9][ .-][0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
          return pattern.test(value) || 'Invalid phone, pattern: X-XXX-XXX-XXXX';
        },
      ],
    };
  },
  methods: {
    onSave() {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true;
        this.$store
          .dispatch('createContact', {
            name: this.name,
            phone: this.phone,
            ownerId: this.ownerId,
          })
          .finally(() => {
            this.name = '';
            this.phone = '';
            this.localLoading = false;
            this.modal = false;
            this.$store.dispatch('fetchContacts');
          });
      }
    },
    onCancel() {
      this.name = '';
      this.phone = '';
      this.modal = false;
    },
  },
};
</script>
