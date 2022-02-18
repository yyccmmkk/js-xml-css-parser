#find-unused-css
本例子假定有CSS文件包含无效冗余的css 样式，利用xml-css-parser 找到所有的CSS 选择器 DOM节点，查找无效的CSS选择器， 来标记出其具体的位置，为后边的删除作准备。


测试文档结构 （参见 src/index.ts 文件内容）

       <div class=" demo " id="x">
           <div class="same dk" id="kx">11
               <img src="{{src}}"/>
               <p><span class="demo2"></span></p>
               <div>3</div>
           </div>
           <div class=" same s7 tr">
               <h5 class="demo3">1</h5>
           </div>
           <div>
               <div class="same">
                   <p class="m2">
                       <span class="same">5</span>
                   </p>
               </div>
           </div>
       </div>
       
 测试css 样式
    
       <style type="text/css">
       
           * {
               padding: 0;
           }
       
           html, body, div {
               margin: 0;
           }
       
           div, div.demo {
               border: 0px solid red;
           }
       
           div, div.xxxx {
               border: 0px solid red;
           }
       
           div.xxxx {
               border: 0px solid red;
           }
       
           div.xxxx.as {
               border: 0px solid red;
           }
       
           div:hover {
               color: red;
           }
       
           button[type="button"] {
               width: 100px;
           }
       
           button[type^="but"] {
               height: 30px;
           }
       
       
           p:first-of-type {
               background: #fff;
           }
       
           div[lang="en"]:host > div.a.b .c + p ~ img > span[type="as"]:hover {
               font-size: 14px;
           }
       
           div[lang="en"]:host > div.a.b .c + p ~ img > span[type="as"]:hover {
               font-size: 14px;
           }
       
           div div p span a {
               font-size: 12px;
           }
       
           div.line,
           p.line2,
           img {
               font-size: 14px;
           }
       
           div.line,
           p.line2,
           img {
               font-size: 14px;
           }
       
           div.line,
           p.line2,
           img {
               font-size: 14px;
           }
       
       
           @media screen and (max-width: 300px) {
               body {
                   background-color: lightblue;
               }
       
               #demo {
                   width: 222px;
               }
           }
       
       
       </style>
       
### `npm run dev` 
 
 本地开发 打开http://localhost:8080/
