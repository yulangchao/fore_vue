




let common = function (Vue, options) {
    Vue.prototype.abc = function (){//全局函数1
        return "123"
     };
     Vue.prototype.text2 = function (){//全局函数2
     alert('执行成功2');
     };
 };

export default common 