<template>
  <v-dialog
    v-model="modal"
    width="500"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon color="grey lighten-1">mdi-pencil-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col>
            <v-card-title class="hecontactline px-0">Edit contact</v-card-title>
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
              v-model="editedName"
            />
            <v-text-field
              label="Phone"
              :rules="rulesPhone"
              placeholder="1-234-567-8910"
              name="phone"
              type="text"
              v-model="editedPhone"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="onCancel">Cancel</v-btn>
              <v-btn color="success" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'editContactModal',
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ownerId() {
      return this.$store.getters.user.id;
    },
  },
  data() {
    return {
      modal: false,
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
      editedName: this.contact.name,
      editedPhone: this.contact.phone,
    };
  },
  methods: {
    onSave() {
      this.modal = false;
      if (this.editedPhone !== '' && this.editedName !== '') {
        this.$store
          .dispatch('updateContact', {
            name: this.editedName,
            phone: this.editedPhone,
            id: this.contact.id,
            ownerId: this.ownerId,
          })
          .finally(() => {
            this.$store.dispatch('fetchContacts');
          });
        this.modal = false;
      }
    },
    onCancel() {
      this.editedPhone = this.contact.phone;
      this.editedName = this.contact.name;
      this.modal = false;
    },
  },
};
</script>
