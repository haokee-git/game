# Bug 修复计划：游戏初始化与回合循环

根据用户反馈，游戏存在以下严重问题：
1.  **无发牌动画/显示**：玩家和AI手牌为空或未正确渲染。
2.  **AI 不动**：AI 回合卡死，无法出牌。
3.  **回合死循环**：只能反复点击结束回合，无事发生。

经检查代码，发现主要原因在于 `game.init()` 中的异步调用顺序和 `nextTurn` 逻辑可能存在竞争条件或 UI 渲染未及时更新。此外，DOM 注入可能发生在 `UIManager` 绑定事件之前或之后，导致元素引用失效。

## 修复步骤

### 1. 修复 DOM 初始化顺序 (Critical)
目前的 `UIManager` 在 `constructor` 中绑定 DOM 元素，但 `main.innerHTML` 是在 `DOMContentLoaded` 回调中动态注入的。如果 `new Game()` 在注入之前执行（虽然代码看起来是注入后执行），或者注入过程导致引用失效，就会出问题。
*   **Fix**: 确保 `main.innerHTML` 注入完全完成后，再实例化 `Game` 和 `UIManager`。

### 2. 修复 UI 渲染逻辑
`renderPlayer` 方法中，AI 的手牌容器 `aiHandContainer` 和玩家的 `handContainer` 可能因为 CSS 类名问题导致不可见（如 `gap-[-10px]` 语法错误，Tailwind 不支持这种写法，应为 `-space-x-4`）。
*   **Fix**: 修正 Tailwind CSS 类名。
*   **Fix**: 增加发牌时的日志输出，确保 `drawCards` 确实增加了手牌数组。

### 3. 修复 AI 逻辑死锁
AI 的 `aiAct` 方法使用了 `await wait(800)`。如果 `nextTurn` 中的 `aiAct` 调用没有正确 `await` 或者状态机卡在 `ACTION_PHASE` 而没有自动结束回合，就会导致卡死。
*   **Fix**: 在 `aiAct` 执行完毕后，**必须主动调用** `endTurn` 或直接进入下一回合。目前代码中 `aiAct` 结束后只是退出了函数，没有触发 `nextTurn`，导致 AI 回合永远停留在那里。

### 4. 增强调试信息
在关键步骤（初始化、发牌、回合切换、AI 思考结束）增加 `console.log` 和游戏内 Log，以便排查。

## 修改后的核心逻辑 (AI Turn)
```javascript
// AI 行动结束后必须结束回合
async aiAct(ai) {
    // ... 出牌逻辑 ...
    
    // 必须显式结束回合
    this.log("AI 结束回合");
    await wait(500);
    this.nextTurn(); 
}
```

## 执行计划
1.  修改 `game_bundle.js`，重构 `aiAct` 增加回合结束调用。
2.  修正 Tailwind CSS class (`gap-[-10px]` -> `-space-x-4`).
3.  确保 `drawCards` 后调用 `updateAll`。
