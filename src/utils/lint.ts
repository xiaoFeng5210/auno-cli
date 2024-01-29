import { ESLint } from 'eslint';

export async function lintCode(text: string) {
  // 创建一个ESLint实例
  const eslint = new ESLint({ fix: true });

  // 对提供的代码进行lint和fix
  const results = await eslint.lintText(text);

  // 如果有进行fix，结果将包含修正后的代码
  if (results[0].output) {
    console.log(results[0].output)
    return results[0].output;
  }

  // 如果没有任何更改，返回原始代码
  return text;
}
