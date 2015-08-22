var TableItem = React.createClass({
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
      <tr>
        <td>
          <a href={"http://tieba.baidu.com/home/main/?un=" + f.username + "&ie=utf-8"}
             target="_blank">{f.username}</a>
        </td>
        <td>{this.state.position}</td>
        <td>{f.level}</td>
        <td>{f.ip}</td>
        <td>
          <a onClick={this.handleDelete} href="javascript:void(0)">删除</a>
        </td>
      </tr>
    );
  }
});

var Table = React.createClass({
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
      return <TableItem friend={f} onDelete={this.handleDelete} key={i} index={i}/>
    }.bind(this));
    return (
      <table className="am-table am-table-bordered am-table-striped am-table-hover"
             style={{backgroundColor:"#fff"}}>
        <thead>
        <tr>
          <th>ID</th>
          <th>地点</th>
          <th>等级</th>
          <th>IP地址</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        {list}
        </tbody>
      </table>
    );
  }
});

var Container = React.createClass({
  render: function () {
    return (
      <div>
        <Header/>
        <Table/>
        <Footer/>
      </div>
    );
  }
});

React.render(<Container/>, document.getElementById("container"));