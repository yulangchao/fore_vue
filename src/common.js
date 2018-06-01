let common = function(Vue, options) {
  Vue.prototype.abc = function() {
    //全局函数1
    return "123";
  };
  Vue.prototype.text2 = function() {
    //全局函数2
    alert("执行成功2");
  };
  Vue.prototype.url = function() {
    //全局函数2
    return "http://foreclean.tk:8000/storage/";
  };

  Vue.prototype.getTimeFromMinutes = function(time) {
    let min = time % 60;
    console.log(min);
    let hour = Math.floor(time / 60);
    if (min < 10) {
      min = "0" + min;
    }
    return hour + ":" + min;
  };
  Vue.prototype.getCityName = function(city_id) {
    let city = "";
    switch (city_id) {
      case 1:
        city = "Vancouver";
        break;
      case 2:
        city = "Richmond";
        break;
      case 3:
        city = "Tuesday";
        break;
      case 4:
        city = "Wednesday";
        break;
      case 5:
        city = "Thursday";
        break;
      case 6:
        city = "Friday";
        break;
      case 7:
        city = "Saturday";
    }
    return city;
  };
  Vue.prototype.getAdditionals = function(type_id) {
    let addtionals = [];
    switch (type_id) {
      case 1:
        addtionals = [2, 3, 4];
        break;
      case 2:
        addtionals = [1, 2, 3, 4, 5];
        break;
      case 3:
        addtionals = [1, 2, 3, 4];
        break;
    }
    return addtionals;
  };
  Vue.prototype.getAdditionalName = function(type_id) {
    let objectname = "";
    switch (type_id) {
      case 1:
        objectname = "Inside fridge";
        break;
      case 2:
        objectname = "Inside oven";
        break;
      case 3:
        objectname = "Inside cabinets";
        break;
      case 4:
        objectname = "Interior windows";
        break;
      case 5:
        objectname = "Laundry wash & dry";
        break;
    }
    return objectname;
  };
  Vue.prototype.getHour = function(type_id, bedroom, addtionals) {
    let hours = 0;
    switch (type_id) {
      case 1:
        if (bedroom < 4) {
          hours = 1.5 + bedroom * 0.5 + addtionals.length * 0.5;
        } else {
          hours = bedroom + addtionals.length;
        }
        break;
      case 2:
        if (bedroom < 4) {
          hours =
            2.5 +
            bedroom * 0.5 +
            (addtionals.indexOf(5) > -1
              ? addtionals.length * 0.5 + 0.5
              : addtionals.length * 0.5);
        } else {
          hours = bedroom + 1;
          for (let i of addtionals) {
            if (i == 1 || i == 2) {
              hours += 0.5;
            } else if (i == 3 || i == 4) {
              hours += 1;
            } else {
              hours += 1.5;
            }
          }
        }
        break;
      case 3:
        if (bedroom < 4) {
          hours = 3 + 0.5 * bedroom + addtionals.length * 0.5;
        } else {
          hours = bedroom + 1;
          for (let i of addtionals) {
            if (i == 1 || i == 2) {
              hours += 0.5;
            } else if (i == 3 || i == 4) {
              hours += 1;
            }
          }
        }
        break;
    }
    return hours;
  };
};

export default common;
