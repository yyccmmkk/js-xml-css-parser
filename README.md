# js-xml-css-parser
包含两个文本解析方法 分别为xmlParser 和cssParser,xmlParser 用来解析html 或xml， cssParser则是解析css

### `xmlParser` 
  xmlParser 会解析XML HTML字符串，提取出虚拟DOM结构及辅助信息，每个虚拟DOM节点对应一个唯一的key，
        
     //例子
     let {tree, nodeMap, idMap, classNameMap, tagMap, deep} = xmlParser(htmlStr);
     
         tree, // 虚拟 DOM tree
         nodeMap, // key和虚拟节点映射 key1: {}
         tagMap, // tagName和key映射 div:[key1,key2,...]
         idMap, // id 和key 映射
         classNameMap, // class 和 key 映射
         deep // 如果不是0 则表明解析节点发生了错误
      
### `cssParser` 
  cssParser 会从字符串中提取出所有的CSS 选择器及其规则，然后标记其位置信息

    //例子
    let selectors = cssParser(cssStr); // [[selector1,selector2],...]
    
            selector: string, // CSS选择器，
            tStart: number, // 整条css 样式起始位
            tEnd: number, // 整条css 样式截止位
            sStart: number, // 整个选择器开始位
            sEnd: number, // 整个选择器结束位
            start: number, // 子选择器开始位
            end: number, // 子选择器截止位
            delStart: number, // 子选择器删除起始位，包含选择器前逗号
            delEnd: number, // 子选择器删除截止位
            line: number // 行号
`npm run dev`
 本地开发启动

