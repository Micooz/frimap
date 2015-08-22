var Map = React.createClass({
  componentDidMount: function () {
    var map = new BMap.Map("map");

    map.centerAndZoom(new BMap.Point(104.737059, 36.394564), 5);
    map.enableScrollWheelZoom();
    map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT}));
    map.addControl(new BMap.NavigationControl({enableGeolocation: true}));
    map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]}));

    // 利用浏览器定位
    var geolocation = new BMap.Geolocation();
    var _this = this;
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var pt = r.point;
        var mk = new BMap.Marker(pt);
        map.addOverlay(mk);
        map.panTo(pt);

        var geoc = new BMap.Geocoder();
        geoc.getLocation(r.point, function (rs) {
          var addComp = rs.addressComponents;
          document.getElementById("finder").value =
            addComp.province + ", " + addComp.city
            + ", " + addComp.district + ", " + addComp.street
            + ", " + addComp.streetNumber;
        });
        _this.props.setPosition(pt.lng, pt.lat);
      } else {
        alert('自动定位失败：' + this.getStatus());
      }
    }, {enableHighAccuracy: true});
    // 智能搜索
    var ac = new BMap.Autocomplete({
      "input": "finder",
      "location": map
    });

    ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
      var str;
      var _value = e.fromitem.value;
      var value = "";
      if (e.fromitem.index > -1) {
        value = _value.province + _value.city + _value.district + _value.street + _value.business;
      }
      str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

      value = "";
      if (e.toitem.index > -1) {
        _value = e.toitem.value;
        value = _value.province + _value.city + _value.district + _value.street + _value.business;
      }
      str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
      document.getElementById("searchResultPanel").innerHTML = str;
    });
    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
      var _value = e.item.value;
      var myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
      document.getElementById("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
      //map.clearOverlays();    //清除地图上所有覆盖物
      var local = new BMap.LocalSearch(map, { //智能搜索
        onSearchComplete: function () {
          var pp = local.getResults().getPoi(0).point;
          map.centerAndZoom(pp, 15);
          map.addOverlay(new BMap.Marker(pp));

          _this.props.setPosition(pp.lng, pp.lat);
        }
      });
      local.search(myValue);
    });
    // 右键菜单
    var menu = new BMap.ContextMenu();
    var txtMenuItem = [{
      text: "我在这里",
      callback: function (e) {
        var pt = new BMap.Point(e.lng, e.lat);
        var geoc = new BMap.Geocoder();
        geoc.getLocation(pt, function (rs) {
          var addComp = rs.addressComponents;
          document.getElementById("finder").value =
            addComp.province + ", " + addComp.city
            + ", " + addComp.district + ", " + addComp.street
            + ", " + addComp.streetNumber;
          var marker = new BMap.Marker(pt);
          map.addOverlay(marker);
        });
        this.props.setPosition(e.lng, e.lat);
      }.bind(this)
    }];

    for (var i = 0; i < txtMenuItem.length; i++) {
      menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
    }
    map.addContextMenu(menu);

    // load friends
    $.ajax({
      url: "/friends",
      method: "GET",
      dataType: "json",
      success: function (json) {
        if (typeof(json) != "undefined") {
          json.map(function (friend) {
            var point = new BMap.Point(friend.lng, friend.lat);
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
            var label = new BMap.Label(friend.username, {
              position: point,
              offset: new BMap.Size(10, -30)
            });
            label.setStyle({
              color: "red",
              fontSize: "12px",
              height: "20px",
              lineHeight: "18px",
              fontFamily: "微软雅黑"
            });
            map.addOverlay(label);
          });
        }
      }.bind(this)
    });
  },
  render: function () {
    var mapStyle = {
      width: "100%",
      height: "700px",
      border: "1px solid #DCDCDC"
    };
    return <div id="map" style={mapStyle}></div>;
  }
});

var Notes = React.createClass({
  render: function () {
    return (
      <ul className="am-list am-list-static am-list-border am-list-striped">
        <li>1. 请先输入自己的ID</li>
        <li>2. 请允许浏览器获取你的位置</li>
        <li>3. 如果自动定位有错误，请手动键入自己的位置<label>（需要根据自动提示选取项目）</label>，或者在地图上使用右键标示自己的位置</li>
        <li>4. 请勿冒用他人ID</li>
        <li>5. 请注意保证自己的隐私</li>
      </ul>
    );
  }
});

var Register = React.createClass({
  componentDidMount: function () {
    this.setState({
      doms: {
        id: React.findDOMNode(this.refs.id),
        level: React.findDOMNode(this.refs.level),
        submit: React.findDOMNode(this.refs.submit),
        tip: React.findDOMNode(this.refs.tip)
      }
    });
    React.findDOMNode(this.refs.id).focus();
    React.findDOMNode(this.refs.submit).setAttribute("disabled", "disabled");
  },
  getInitialState: function () {
    return {
      level_pending: false,
      doms: {
        id: null,
        level: null,
        submit: null,
        tip: null
      }
    };
  },
  handleGetLevel: function () {
    if (!this.state.level_pending) {
      var text_level = this.state.doms.level;
      var text_id = this.state.doms.id;
      var btn_submit = this.state.doms.submit;

      btn_submit.setAttribute("disabled", "disabled");

      if (text_id.value.trim() == "") {
        text_id.setAttribute("placeholder", "ID不能为空");
        return;
      } else {
        text_id.setAttribute("placeholder", "ID");
      }

      text_level.setAttribute("disabled", "disabled");
      text_level.value = "等级获取中...";
      this.setState({level_pending: true});
      $.ajax({
        url: "/level?id=" + text_id.value.trim(),
        method: "GET",
        dataType: "json",
        success: function (json) {
          if (parseInt(json.level) == -1) {
            text_level.value = "获取失败";
          } else {
            var level = parseInt(json.level);
            if (level < config.level) {
              text_level.setAttribute("placeholder", "等级[" + level + "]未达到要求");
              text_level.value = "";
            } else {
              text_level.value = level;
              btn_submit.removeAttribute("disabled");
            }
          }
        }.bind(this),
        complete: function () {
          this.setState({level_pending: false});
        }.bind(this)
      });
    }
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (!this.state.level_pending) {
      var btn_submit = this.state.doms.submit;
      var text_id = this.state.doms.id;
      var tip = this.state.doms.tip;

      var pos_lng = this.props.lng;
      var pos_lat = this.props.lat;

      btn_submit.innerText = "请稍后...";
      btn_submit.setAttribute("disabled", "disabled");

      $.ajax({
        url: "/",
        method: "POST",
        dataType: "json",
        data: {id: text_id.value.trim(), lng: pos_lng, lat: pos_lat},
        success: function (json) {
          if (typeof(json) != "undefined") {
            if (json.no == 0) {
              location.href = location.href;
            } else {
              if (json.msg[1] == 19) {
                tip.innerText = "已经登记过了";
              } else {
                tip.innerText = json.msg[2];
              }
            }
          }
        }.bind(this),
        complete: function () {
          btn_submit.innerText = "填好了";
          btn_submit.removeAttribute("disabled");
        }.bind(this)
      });
    }
  },
  render: function () {
    var styleSearchResultPanel = {
      border: "1px solid #C0C0C0",
      backgroundColor: "#fff",
      width: "150px",
      height: "auto",
      display: "none"
    };
    return (
      <section className="am-panel am-panel-default">
        <header className="am-panel-hd">
          <h3 className="am-panel-title am-text-center">位置登记</h3>
        </header>
        <div className="am-panel-bd">
          <Notes/>
          <label>等级验证</label>

          <form className="am-form am-form-inline">
            <div className="am-form-group am-form-icon">
              <i className="am-icon-list"></i>
              <input type="text" className="am-form-field" disabled placeholder="贴吧" value={config.forum}/>
            </div>
            &nbsp;
            <div className="am-form-group am-form-icon">
              <i className="am-icon-user"></i>
              <input type="text" className="am-form-field" placeholder="ID" maxLength="20"
                     onBlur={this.handleGetLevel}
                     ref="id"/>
            </div>
            &nbsp;
            <div className="am-form-group am-form-icon">
              <i className="am-icon-bar-chart"></i>
              <input type="text" className="am-form-field" placeholder={"等级 >= " + config.level.toString()}
                     disabled
                     ref="level"/>
            </div>
          </form>

          <label>坐标定位</label>
          <input type="text" className="am-form-field" placeholder="自动定位中..." id="finder"/>

          <div id="searchResultPanel" style={styleSearchResultPanel}></div>
          <button type="button" className="am-btn am-btn-primary" style={{zIndex:"999"}}
                  ref="submit"
                  onClick={this.handleSubmit}>填好了
          </button>
          &nbsp;<span className="am-text-warning" ref="tip"></span>
        </div>
      </section>
    );
  }
});

var ContentBox = React.createClass({
  getInitialState: function () {
    return {
      lng: 0.0,
      lat: 0.0
    };
  },
  setPosition: function (lng, lat) {
    this.setState({
      lng: lng,
      lat: lat
    });
  },
  render: function () {
    return (
      <div>
        <Map map={this.state.map} setPosition={this.setPosition}/>
        <br/>
        <Register lng={this.state.lng} lat={this.state.lat}/>
      </div>
    );
  }
});

var Container = React.createClass({
  render: function () {
    return (
      <div>
        <Header/>
        <ContentBox/>
        <Footer/>
      </div>
    );
  }
});

React.render(<Container/>, document.getElementById("container"));