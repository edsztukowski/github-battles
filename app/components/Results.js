var React = require("react");
var queryString = require('query-string');
var api = require('../utils/api')

class Results extends React.Component {
  construction(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }


  componentDidMount() {
    var players = queryString.parse(this.props.location.search)
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function(results) {
      if (results === null) {
        return this.setState(function() {
          return {
            error: 'Looks like there was an error. Make sure both users exist on github',
            loading: false
          }
        });
      }
      this.setState(function() {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      });
    }.bind(this));
  }
  render() {
    var error = this.state.error;
    var winner = this.state.winnder;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if (loading === true) {
      return <p>Loading</p>
    }

    return (
      <div>Results</div>
    )
  }
}

module.exports = Results;
