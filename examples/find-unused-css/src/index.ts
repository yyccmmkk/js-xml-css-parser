import {cssParser, xmlParser} from '../lib/parser';

export const regExpIsTag = /^[^#.+>~]+$/;

const ignoreList = ['*', 'html', 'body', 'page', 'from', 'to'];


class FindUnusedCss {
  check(html:string, css:string, js?:string) {
    let {tree, nodeMap, idMap, classNameMap, tagMap, deep} = xmlParser(html);
    let selectors = cssParser(css);

    let result = this.checkSelector(selectors, tree, nodeMap, idMap, classNameMap, tagMap);
    console.log(result, 'result::');

    console.log('tree::', tree, '\r\nnodeMap::', nodeMap, '\r\ndeep::', deep, '\r\nselectors::', selectors, '\r\nidMap::', idMap, '\r\nclassNameMap::', classNameMap, '\r\ntag::', tagMap);
  }

  isHasSelector(map:any, selector:string) {
    selector = selector.trim();
    let letter = selector.charAt(0);
    let key = letter === '#' ? 'idMap' : letter === '.' ? 'classNameMap' : 'tagMap';
    let tempSelector = regExpIsTag.test(selector) ? selector : selector.slice(1);

    return Object.keys(map[key]).includes(tempSelector.trim());
  }

  checkSelector(selectors:any[], tree:object, nodeMap:object, idMap:object, classNameMap:object, tagMap:object) {
    let result = [];
    debugger

    for (let v of selectors) {

      for (let i = 0, len = v.length; i < len; i++) {
        let item = v[i];
        let {selector} = item;
        let relationalSymbols = selector.charAt(0);

        if (ignoreList.includes(selector.trim()) || relationalSymbols === ':') { // 过滤白名单 伪类
          continue;
        }
        if (!this.isHasSelector({idMap, classNameMap, tagMap}, selector)) {
          result.push(item);
          break
        } else if (relationalSymbols === '#') {

          // todo check

        } else if (relationalSymbols === '.') {

          // todo check

        } else if (relationalSymbols === '+') {

          // todo check

        } else if (relationalSymbols === '~') {

          // todo check

        } else if (relationalSymbols === '>') {

          // todo check

        }

      }


    }

    return result
  }
}

let _instance = new FindUnusedCss();


let html = `<div class=" demo " id="x">
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
</div>`;

let css = `<style type="text/css">

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


</style>`

_instance.check(html,css)
