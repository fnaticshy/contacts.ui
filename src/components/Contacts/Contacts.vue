<template>
  <div>
    <v-container
      v-if="!loading && isContactsLoaded"
      class="pa-0"
    >
      <v-row class="mx-0">
        <v-col class="pa-0 mt-5">
          <v-card class="pa-2">
            <v-card-actions>
              <v-text-field
                class="col-md-8 col-lg-10"
                prepend-icon="mdi-magnify"
                @input="find"
                v-model.trim="searchField"
                label="Enter name"
              ></v-text-field>
              <v-spacer></v-spacer>
              <AddContactModal></AddContactModal>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-list :two-line="true">
            <v-subheader>CONTACTS LIST</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                :ripple="false"
                v-for="(item, i) of filteredContacts"
                :key="i"
                style="position: relative;"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <v-list-item-subtitle>+ {{ item.phone }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="flex-row">
                  <EditContactModal :contact="item"></EditContactModal>
                  <v-btn
                    @click="remove(item.id)"
                    icon
                  >
                    <v-icon color="grey lighten-1">mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
    <div
      v-else
      class="loader"
    >
      <v-progress-circular
        :size="70"
        color="#6a9b9b"
        indeterminate>
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
import AddContactModal from './AddContactModal.vue';
import EditContactModal from './EditContactModal.vue';

export default {
  name: 'Contacts',
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    contacts() {
      return this.$store.getters.loading;
    },
    ownerId() {
      return this.$store.getters.user.id;
    },
    filteredContacts() {
      return this.$store.getters.filteredContacts;
    },
    isContactsLoaded() {
      return this.$store.getters.isContactsLoaded;
    },
  },
  methods: {
    find() {
      this.$store.dispatch('filterContacts', this.searchField);
    },
    remove(item) {
      this.$store.dispatch('removeContact', {
        id: item,
        ownerId: this.ownerId,
      });
      this.find();
    },
  },
  data: () => ({
    searchField: '',
  }),
  components: {
    AddContactModal,
    EditContactModal,
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'saveContacts' || mutation.type === 'updateContact') {
        this.$store.dispatch('setContactsLoaded', true);
        this.find();
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>
