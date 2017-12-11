<template>
  <div id="app" class="container">
    <b-jumbotron header="Vovinam Viet Vo Dao" lead="Liste de présence">
    </b-jumbotron>
    <b-container>
      <b-row class="text-center">
        <b-col sm="8">

          <!-- champ de recherche -->
          <b-form-input v-model="search" type="text" placeholder="Nom du vo sinh"></b-form-input>
          </br>

          <!-- pagination -->
          <b-pagination :total-rows="userFilteredList.length" v-model="currentPage"
            align="center" size="sm" hide-ellipsis :per-page="elementPerPage" v-show="userList.length > 0">
          </b-pagination>

          <!-- liste des personnes -->
          <b-table striped hover
              :items="userFilteredList"
              :fields="tableColumns"
              :current-page="currentPage"
              :per-page="elementPerPage">
            <template slot="firstName" scope="row">
              {{ row.item.firstName }} {{ row.item.lastName }}
            </template>
            <template slot="action" scope="row">
              <b-button @click="addUser(row.item)" size="sm" variant="success">Ajouter</b-button>
            </template>
          </b-table>

        </b-col>

        <!-- liste des personnes selectionnees -->
        <b-col sm="4">
          <h5 v-if="userAttending.length > 0">
            Cours du {{ today }} <b-badge>{{ userAttending.length }}</b-badge>
          </h5>
          <b-list-group>
            <!-- TODO userList => userAttending -->
            <b-list-group-item v-for="(user, index) in userAttending">
              {{ user.firstName }}
              <b-button @click="removeUser(index)"
                size="sm" variant="danger"
                class="float-sm-right">Supprimer</b-button>
            </b-list-group-item>
          </b-list-group>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'app',
  data () {
    return {
      search: '',
      today: moment().locale('fr').format('dddd DD/MM/YYYY'),
      currentPage: 1,
      elementPerPage: 10,
      tableColumns: [
        // WARN sortable: true trie sur la page affichee uniquement
        { key: 'firstName', label: 'Nom'},
        { key: 'rank', label: 'Grade'},
        { key: 'action', label: ' '}
      ],
      userAttending: [],
      userList: []
    }
  },
  methods: {
    addUser: function (user) {
      if(this.userAttending.indexOf(user) === -1) {
        this.userAttending.push(user);
      }
    },
    removeUser: function(index) {
      this.userAttending.splice(index, 1);
    }
  },
  computed: {
    userFilteredList() {
  	  var self = this;
      return self.userList.filter(function(user) {
        // TODO sanitize carateres speciaux
        return (user.firstName + ' ' + user.lastName)
          .toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
      });
    }
    // userSlicedList() {
  	//   var self = this;
    //   var offset = (self.currentPage - 1) * self.elementPerPage;
    //   return self.userFilteredList.filter(function(user, index) {
    //     return index >= offset && index < offset + self.elementPerPage;
    //   });
    // },
  },
  created() {
    var self = this;
    axios.get('https://raw.githubusercontent.com/pomverte/vovinam-attendance/develop/users.json')
      .then(function (response) {
        self.userList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
