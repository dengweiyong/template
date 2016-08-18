# 最精简最快速的JQUERY模板插件
jquery template, 执行速度最快的javascript前端模板.

#介绍

非常轻量级前端模版，所用指令仅需{}，包含js变量。本模板使用极方便，是翻译与渲染数据执行速度最快的前端模板

#使用

1、引用jquery和本插件js
<pre><code>&lt;script type="text/javascript" src="template.js"&gt;&lt;/script&gt;
</code></pre>

2、写模板HTML

<pre><code>
    &lt;table id="table"&gt;
      &lt;tr&gt;
        &lt;td>帐号&lt;/td&gt;&lt;td&gt;姓名&lt;/td&gt;&lt;td&gt;地址&lt;/td&gt;
      &lt;/tr&gt;
      &lt;script type="text/template" id="template"&gt;
      &lt;tr&gt;
        &lt;td&gt;{userid}&lt;/td&gt;&lt;td&gt;{username}&lt;/td&gt;&lt;td&gt;{address}&lt;/td&gt;
      &lt;/tr&gt;
      &lt;/script&gt;
    &lt;/table&gt;

</code></pre>

3、执行模板加载数据

<pre><code>
var render = $('#template').template().reader;

var data = [{userid:1, username:'un1',address:'xxxxx'},{userid:2, username:'un2', address: 'yyyyy'}];

var table = $('#table');

$.each(data, function(){

  table.append(reader(this));
  
});
<pre><code>
