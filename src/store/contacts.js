import * as fb from 'firebase';

class Contact {
  constructor(name, phone, id = null) {
    this.name = name;
    this.phone = phone;
    this.id = id;
  }
}

export default {
  state: {
    contacts: [],
    filteredContacts: [],
    isContactsLoaded: false,
  },
  mutations: {
    saveContacts(state, payload) {
      state.contacts = (payload);
    },
    filteredContacts(state, payload) {
      state.filteredContacts = state.contacts.filter(
        (item) => item.name.toLowerCase().includes(payload),
      );
    },
    setContactsLoaded(state, payload) {
      state.isContactsLoaded = payload;
    },
    updateContact(state, { name, phone, id }) {
      const contact = state.contacts.find((el) => el.id === id);
      contact.name = name;
      contact.phone = phone;
    },
    addContact(state, payload) {
      state.contacts.push(payload);
      state.filteredContacts = state.contacts;
    },
    clearContacts(state, payload) {
      state.contacts = payload;
      state.filteredContacts = state.contacts;
    },
    removeContact(state, { id }) {
      state.contacts = state.contacts.filter((el) => el.id !== id);
      state.filteredContacts = state.contacts;
    },
  },
  actions: {
    async createContact({ commit }, {
      name, phone, ownerId,
    }) {
      const contact = new Contact(name, phone);
      commit('clearError');
      try {
        await fb.database().ref(`/users/${ownerId}/contacts`).push(contact);
        commit('addContact', contact);
      } catch (error) {
        commit('setError', error.message);
        throw error;
      }
    },
    filterContacts({ commit }, payload) {
      commit('filteredContacts', payload);
    },
    setContactsLoaded({ commit }, payload) {
      commit('setContactsLoaded', payload);
    },
    clearContacts({ commit }) {
      commit('clearContacts', []);
    },
    async fetchContacts({ commit, getters }) {
      commit('setLoading', true);
      commit('clearError');

      const resultContacts = [];

      try {
        const fbVal = await fb.database().ref(`/users/${getters.savedUserId || getters.user.id}/contacts`).once('value');
        const contacts = fbVal.val();

        if (contacts === null) {
          commit('saveContacts', []);
          commit('setLoading', false);
          return;
        }

        Object.keys(contacts).forEach((key) => {
          const c = contacts[key];
          resultContacts.push(
            new Contact(c.name, c.phone, key),
          );
        });
        commit('saveContacts', resultContacts);
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    async updateContact({ commit }, {
      name, phone, id, ownerId,
    }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        await fb.database().ref(`/users/${ownerId}/contacts`).child(id).update({
          name, phone,
        });
        commit('updateContact', { name, phone, id });
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
    async removeContact({ commit }, { id, ownerId }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        await fb.database().ref(`/users/${ownerId}/contacts`).child(id).remove();
        commit('removeContact', {
          id,
        });
        commit('setLoading', false);
      } catch (error) {
        commit('setError', error.message);
        commit('setLoading', false);
        throw error;
      }
    },
  },
  getters: {
    contacts(state) {
      return state.contacts;
    },
    filteredContacts(state) {
      return state.filteredContacts;
    },
    isContactsLoaded(state) {
      return state.isContactsLoaded;
    },
  },
};
