// 使用频次非常高的可以直接挂载到 Vue 原型链上
import wxPlugin from './wx';
import loggerPlugin from './logger';

export default [wxPlugin, loggerPlugin];
