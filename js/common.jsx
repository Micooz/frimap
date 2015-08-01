var Header = React.createClass({
  render: function () {
    return (
      <h1 className="am-text-center">百度贴吧吧友地图</h1>
    );
  }
});

var Footer = React.createClass({
  render: function () {
    var footerStyle = {
      padding: "30px 0",
      color: "#000",
      fontSize: "15px",
      backgroundColor: "rgba(0,0,0,0)"
    };
    return (
      <div className="footer" style={footerStyle}>
        © 2015 Micooz.<br/>
        Supported by&nbsp;
        <a href="https://github.com/catfan/Medoo" target="_blank">catfan/medoo</a>,&nbsp;
        <a href="https://github.com/rmccue/Requests" target="_blank">rmccue/requests</a>,&nbsp;
        <a href="https://github.com/facebook/react" target="_blank">react</a>,&nbsp;
        <a href="https://github.com/allmobilize/amazeui" target="_blank">amazeui</a>.<br/>
        Fork me on <a href="#"><i className="am-icon-github"></i>&nbsp;Github</a>
      </div>
    );
  }
});

var config = config ||
  {
    forum: "机器猫吧",
    level: 7
  };