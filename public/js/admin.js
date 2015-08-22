var TableItem = React.createClass({displayName: "TableItem",
  getInitialState: function () {
    return {position: null};
  },
  componentDidMount: function () {
    var f = this.props.friend;
    var geoc = new BMap.Geocoder();
    geoc.getLocation(new BMap.Point(f.lng, f.lat), function (rs) {
      var addComp = rs.addressComponents;
      this.setState({
        position: addComp.province + ", " + addComp.city
        + ", " + addComp.district + ", " + addComp.street
        + ", " + addComp.streetNumber
      })
    }.bind(this));
  },
  handleDelete: function () {
    var f = this.props.friend;
    if (typeof(f) != "undefined") {
      $.ajax({
        url: "/admin/friends?uid=" + f.uid,
        method: "DELETE",
        dataType: "json",
        success: function (json) {
          if (typeof(json) != "undefined") {
            if (json.no == 0) {
              // this.props.onDelete(this.props.index); TODO: fix bug
              location.href = location.href;
            } else {
              alert(json.msg);
            }
          }
        }.bind(this)
      });
    }
  },
  render: function () {
    var f = this.props.friend;
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, 
          React.createElement("a", {href: "http://tieba.baidu.com/home/main/?un=" + f.username + "&ie=utf-8", 
             target: "_blank"}, f.username)
        ), 
        React.createElement("td", null, this.state.position), 
        React.createElement("td", null, f.level), 
        React.createElement("td", null, f.ip), 
        React.createElement("td", null, 
          React.createElement("a", {onClick: this.handleDelete, href: "javascript:void(0)"}, "删除")
        )
      )
    );
  }
});

var Table = React.createClass({displayName: "Table",
  getInitialState: function () {
    return {friends: []};
  },
  componentDidMount: function () {
    $.ajax({
      url: "/admin/friends",
      method: "GET",
      dataType: "json",
      success: function (json) {
        if (typeof(json) != "undefined") {
          this.setState({friends: json});
        }
      }.bind(this)
    });
  },
  handleDelete: function (i) {
    var newFriends = this.state.friends.splice(i, 1);
    this.setState({
      friends: newFriends
    });
  },
  render: function () {
    var list = this.state.friends.map(function (f, i) {
      return React.createElement(TableItem, {friend: f, onDelete: this.handleDelete, key: i, index: i})
    }.bind(this));
    return (
      React.createElement("table", {className: "am-table am-table-bordered am-table-striped am-table-hover", 
             style: {backgroundColor:"#fff"}}, 
        React.createElement("thead", null, 
        React.createElement("tr", null, 
          React.createElement("th", null, "ID"), 
          React.createElement("th", null, "地点"), 
          React.createElement("th", null, "等级"), 
          React.createElement("th", null, "IP地址"), 
          React.createElement("th", null, "操作")
        )
        ), 
        React.createElement("tbody", null, 
        list
        )
      )
    );
  }
});

var Container = React.createClass({displayName: "Container",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(Header, null), 
        React.createElement(Table, null), 
        React.createElement(Footer, null)
      )
    );
  }
});

React.render(React.createElement(Container, null), document.getElementById("container"));