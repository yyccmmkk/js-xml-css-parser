import {
  regExpCssSelectorSplit,
  regExpCssStart,
  regExpBr,
  regExpRepeatSpace,
  regExpCutToken,
  regExpEmpty,
  regExpIsPercent
} from "../../regExp";
import {findLineNo} from "../../utils";
import {Selector} from "./interface";

export default function cssParser(str: string): Selector[][] {
  let result;
  let selectors = [];
  while ((result = regExpCssSelectorSplit.exec(str)) !== null) {
    let tStart = result.index;
    let tEnd = result.index + result[0].length;
    let selector = result[1].replace(regExpBr, '').trim();
    let tempMatch = result[1].match(regExpCssStart);
    let tempOffset = tempMatch && tempMatch.index || 0;
    let sStart = result.index + tempOffset;
    let sEnd = sStart + (tempMatch && tempMatch[0].length || 0);

    selectors.push({
      selector,
      tStart,
      tEnd,
      sStart,
      sEnd
    })
  }
  let list: Selector[][] = [];
  for (let v of selectors) {
    const {selector, tStart, tEnd, sStart, sEnd} = v;
    let tempList = selector.split(',');
    let count = 0;
    let delStart = sStart;
    for (let v of tempList) {
      count += v.length + 1;
      let tempStr = v.trim().replace(regExpRepeatSpace, '\u0020').replace(regExpEmpty, '$1');
      let selector: string [] = tempStr.match(regExpCutToken) || [];
      let tempCount = sStart + count - 1;
      let tempStart = sStart + (count - v.length - 1);
      let line = findLineNo(str, tempStart);
      !regExpIsPercent.test(v.trim()) && list.push(selector.map(v => ({
        selector: v, // 子级选择器，
        tStart, // 整条css 样式起始位
        tEnd, // 整条css 样式截止位
        sStart, // 整个选择器开始位
        sEnd, // 整个选择器结束位
        start: tempStart,// 子选择器开始位
        end: tempCount, // 子选择器截止位
        delStart, // 子选择器删除起始位，包含选择器前逗号
        delEnd: tempCount, // 子选择器删除截止位
        line
      })));
      delStart = tempCount
    }
  }
  return list;
}
export {cssParser}
