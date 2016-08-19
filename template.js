// 精简模板实现
// 不带参数，返回模板函数，重复调用效率高。
// 带varname 将不用with(obj) 自己在模板中指定对象名
// 如果是函数要当前记录值，则参数加obj{functionName(obj)}
// 20160818 实现render方法的缓存,调用方法改为$().template().render;
$.fn.template = $.fn.tmpl = function (data, varname) {
    //20160818 取缓存方法
    var render = this.data('render');
    if (render) {
        return { render: render }
    }

    //取模板内容
    var text = this.html();

    // 需要转义的字符
    var escaper = /\\|'|\r|\n|\t/g;
    var escapes = { "'": "'", '\\': '\\', '\r': 'r', '\n': 'n', '\t': 't' };
    var escapeChar = function (match) {
        return '\\' + escapes[match];
    };
    // 解析变量或表达式：{evaluate} 转为:'+evaluate+';
    var matcher = /\{([\s\S]+?)\}|$/g;

    // 生成函数脚本代码
    var index = 0;
    var code = "__h+='";

    text.replace(matcher, function (match, evaluate, offset) {
        //if (evaluate === undefined) return;

        code += text.slice(index, offset).replace(escaper, escapeChar);
        index = offset + match.length;

        code += "'+ " + evaluate + "+\n'";

        return match;
    });
    code += "';\n";

    // 如果定义的变量名，则不用with，默认为with(obj)
    if (!varname) code = 'with(obj||{}){\n' + code + '}\n';

    code = "var __h='';\n" + code + "return __h;\n";

    //20160818 缓存render方法，并返回对象方法render使不用重复调用生成模板函数。
    render = new Function('obj', code);
    this.data('render', render);

    return {
        render: render
    }

};