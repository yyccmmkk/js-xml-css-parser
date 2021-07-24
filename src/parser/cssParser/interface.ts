export interface Selector {
  selector: string; // 子子级选择器，
  tStart: number; // 整条css 样式起始位
  tEnd: number; // 整条css 样式截止位
  sStart: number; // 整个选择器开始位
  sEnd: number; // 整个选择器结束位
  start: number;// 子选择器开始位
  end: number; // 子选择器截止位
  delStart: number; // 子选择器删除起始位，包含选择器前逗号
  delEnd: number; // 子选择器删除截止位
  line: number;
}
