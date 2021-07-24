import {regExp, regExpClass, regExpComment, regExpId, regExpReplace} from "../../regExp";
import {closeList} from "./tagCloseList";

export default function xmlParser(str: string) {
  let result;
  let tree: { [key: string]: any } = {
    tagName: 'root',
    parent: null,
    children: []
  };
  let deep = 0;
  let cur = tree;
  let tagName;
  let count = 1;
  let nodeMap: { [key: string]: any } = {};
  let classNameMap: { [key: string]: any } = {};
  let idMap: { [key: string]: any } = {};
  let tagMap: { [key: string]: any } = {};

  str = str.replace(regExpReplace, '').replace(regExpComment, '');

  while ((result = regExp.exec(str)) !== null) {
    tagName = result[1];
    if (tagName) {
      if (tagName.charAt(0) === '/') {
        deep--;
        cur = cur.parent;
      } else {
        let attr = result[2].trim();

        let isClose = result[3] === '/' || closeList.includes(tagName);
        !isClose && deep++;

        let parent = cur;
        let tempKey = `key${count++}`;
        let id;
        let className;
        if (attr) {
          id = attr.match(regExpId);
          id = id && id[1].trim() || null;
          className = attr.match(regExpClass);
          className = className && className[1].trim() || null;
        }

        cur = {
          parent,
          children: [],
          tagName,
          id,
          className,
          attributes: [],
          selector: [],
          key: tempKey,
          position: result.index
        };
        parent.children.push(cur);
        nodeMap[tempKey] = cur;

        tagMap[tagName] ? tagMap[tagName].push(tempKey) : tagMap[tagName] = [tempKey];

        if (className) {
          let temp = className.split('\u0020');
          for (let v of temp) {
            classNameMap[v] ? classNameMap[v].push(tempKey) : classNameMap[v] = [tempKey];
          }
        }
        if (id) {
          idMap[id] ? idMap[id].push(tempKey) : idMap[id] = [tempKey];
        }

        if (isClose) {
          cur = parent;
        }

      }
    }

  }
  return {
    tree,
    nodeMap,
    tagMap,
    idMap,
    classNameMap,
    deep
  }

}
export {xmlParser}
