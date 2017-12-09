<template>
  <div id="app" class="container">
    <b-jumbotron header="Vovinam Viet Vo Dao" lead="Liste de présence">
    </b-jumbotron>
    <b-container>
      <b-row class="text-center">
        <b-col sm="8">
          <b-form-input v-model="search" type="text" placeholder="Nom du vo sinh"></b-form-input>
          </br>
          <b-table striped hover :items="userFilteredList" :per-page="10"></b-table>
        </b-col>
        <b-col sm="4">
          <p>I'm here</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      search: '',
      currentPage: 1,
      userList: []
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
  margin-top: 60px;
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
