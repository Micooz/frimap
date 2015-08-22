var Form = React.createClass({
  render: function () {
    return (
      <form className="am-form-inline" role="form" action="/passport" method="POST">
        <div className="am-form-group am-form-icon">
          <i className="am-icon-lock"></i>
          <input type="password" name="password" className="am-form-field" placeholder="输入管理密码" maxLength="20"/>
        </div>
        &nbsp;
        <button type="submit" className="am-btn am-btn-primary">登录</button>
      </form>
    );
  }
});

var Container = React.createClass({
  render: function () {
    return (
      <div>
        <Header/>
        <Form/>
        <Footer/>
      </div>
    );
  }
});

React.render(<Container/>, document.getElementById("container"));