var Header = React.createClass({displayName: "Header",
  render: function () {
    return (
      React.createElement("h1", {className: "am-text-center"}, "百度贴吧吧友地图")
    );
  }
});

var Footer = React.createClass({displayName: "Footer",
  render: function () {
    var footerStyle = {
      padding: "30px 0",
      color: "#000",
      fontSize: "15px",
      backgroundColor: "rgba(0,0,0,0)"
    };
    return (
      React.createElement("div", {className: "footer", style: footerStyle}, 
        "© 2015 Micooz.", React.createElement("br", null), 
        "Supported by ", 
        React.createElement("a", {href: "https://github.com/catfan/Medoo", target: "_blank"}, "catfan/medoo"), ", ", 
        React.createElement("a", {href: "https://github.com/rmccue/Requests", target: "_blank"}, "rmccue/requests"), ", ", 
        React.createElement("a", {href: "https://github.com/facebook/react", target: "_blank"}, "react"), ", ", 
        React.createElement("a", {href: "https://github.com/allmobilize/amazeui", target: "_blank"}, "amazeui"), ".", React.createElement("br", null), 
        "Fork me on ", React.createElement("a", {href: "https://github.com/micooz/frimap"}, React.createElement("i", {className: "am-icon-github"}), " Github")
      )
    );
  }
});

var config = config ||
  {
    forum: "机器猫吧",
    level: 7
  };