export const regExp = /<([^>\s]+)([^>]*)(\/?)>/g; // 解析节点
export const regExpReplace = /{{[^{}]*}}/g; // 替换&gt;&lt;
export const regExpClass = /class\s*=\s*["']?([^"']+)/; // className
export const regExpId = /id\s*=\s*["']?([^"']+)/; // id
export const regExpBr = /[\r\n]/g; // 换行
export const regExpRepeatSpace = /\s{2,}/g;
export const regExpCutToken = /[#.+>~\s:]*[^#.+>~:\s\[\]]+|\[[^\[\]]+\]/g || /[#.+>~]?[^#.+>~\[\]]+|\[[^\[\]]+\]/g; //todo 有意思
export const regExpCssSelectorSplit = /([^{}\n]+){([^{}]+)}/g;
export const regExpCssStart = /\S([\s\S]+)\S/;
export const regExpEmpty = /\s+([>+~])\s+/g;
export const regExpIsTag = /^[^#.+>~]+$/;
export const regExpComment = /<!--[\s\S]+?-->/g;
export const regExpIsPercent = /^\d+%$/;
