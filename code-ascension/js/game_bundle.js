
// ==========================================
// Utils
// ==========================================
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==========================================
// SVG Icons
// ==========================================
const SVG_ICONS = {
    avatar_player: `<svg viewBox="0 0 100 100" class="w-full h-full"><circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#60a5fa" stroke-width="5"/><path d="M30 65 Q50 80 70 65" stroke="white" stroke-width="5" fill="none"/><circle cx="35" cy="45" r="5" fill="white"/><circle cx="65" cy="45" r="5" fill="white"/></svg>`,
    avatar_ai: `<svg viewBox="0 0 100 100" class="w-full h-full"><rect x="15" y="15" width="70" height="70" rx="10" fill="#450a0a" stroke="#f87171" stroke-width="5"/><circle cx="35" cy="40" r="8" fill="#f87171"/><circle cx="65" cy="40" r="8" fill="#f87171"/><rect x="30" y="65" width="40" height="4" fill="#f87171"/></svg>`,
    
    attack: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full text-red-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`, 
    dodge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full text-blue-400"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>`,
    heal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full text-green-500"><path d="M12 20v-8m0 0V4m0 8h8m-8 0H4"/></svg>`,
    equip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full text-blue-300"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    scroll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full text-yellow-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    satchel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-full h-full text-purple-400"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`
};

function getCardIcon(type, id) {
    if (id === 'attack') return SVG_ICONS.attack;
    if (id === 'dodge') return SVG_ICONS.dodge;
    if (id === 'heal') return SVG_ICONS.heal;
    if (id === 'satchel') return SVG_ICONS.satchel;
    if (type === 'EQUIPMENT') return SVG_ICONS.equip;
    return SVG_ICONS.scroll;
}

// Global Error Handler
window.onerror = function(msg, url, line, col, error) {
    const log = document.getElementById('log-container');
    if (log) {
        const div = document.createElement('div');
        div.textContent = `! ERROR: ${msg} (Line ${line})`;
        div.className = "text-red-500 font-bold border-b border-red-800 pb-1";
        log.prepend(div);
    }
    return false;
};

// ==========================================
// Constants & Card Definitions
// ==========================================
const CARD_TYPES = {
    BASIC: 'BASIC',         // 基础牌 (杀、闪、桃)
    SCROLL: 'SCROLL',       // 锦囊牌
    EQUIPMENT: 'EQUIPMENT', // 装备牌
    DELAYED: 'DELAYED'      // 延时锦囊 (判定牌)
};

const EQUIP_TYPES = {
    WEAPON: 'WEAPON', // 武器
    ARMOR: 'ARMOR',   // 防具
    OFF_HORSE: 'OFF_HORSE', // 进攻马
    DEF_HORSE: 'DEF_HORSE'  // 防御马
};

// 完整卡牌库定义
const CARD_LIBRARY = {
    // --- 基础牌 ---
    'attack': {
        name: '上线发版',
        type: CARD_TYPES.BASIC,
        description: '造成 1 点伤害。每回合限用一次。',
        flavor: 'Git Push Force!',
        actionType: 'ATTACK'
    },
    'dodge': {
        name: '代码回滚',
        type: CARD_TYPES.BASIC,
        description: '抵消一次“上线发版”造成的伤害。',
        flavor: 'Revert 那个提交！',
        actionType: 'DODGE'
    },
    'heal': {
        name: '获得融资',
        type: CARD_TYPES.BASIC,
        description: '回复 1 点资金(HP)。',
        flavor: '天使轮到了。',
        actionType: 'HEAL'
    },

    // --- 装备牌 ---
    'equip_multi_attack': {
        name: 'CI/CD流水线',
        type: CARD_TYPES.EQUIPMENT,
        equipType: EQUIP_TYPES.WEAPON,
        description: '你可以无限次使用“上线发版”。',
        flavor: '自动化部署，恐怖如斯。'
    },
    'equip_auto_dodge': {
        name: '负载均衡',
        type: CARD_TYPES.EQUIPMENT,
        equipType: EQUIP_TYPES.ARMOR,
        description: '受到伤害时，50% 概率自动视为打出“代码回滚”。',
        flavor: '流量自动分发。'
    },
    'equip_unavoidable': {
        name: '强制推送',
        type: CARD_TYPES.EQUIPMENT,
        equipType: EQUIP_TYPES.WEAPON,
        description: '你的“上线发版”无法被“代码回滚”响应。',
        flavor: '没有人能阻止我上线。'
    },
    'equip_shield_wall': {
        name: '防火墙',
        type: CARD_TYPES.EQUIPMENT,
        equipType: EQUIP_TYPES.ARMOR,
        description: '受到伤害时，66% 概率免疫，否则伤害+1。',
        flavor: '要么防住，要么被穿透。'
    },
    'equip_berserk': {
        name: '996福报',
        type: CARD_TYPES.EQUIPMENT,
        equipType: EQUIP_TYPES.WEAPON,
        description: '你造成的伤害+1，受到的伤害+1。',
        flavor: '拿命换钱。'
    },
    'equip_reflect': {
        name: '反弹Shell',
        type: CARD_TYPES.EQUIPMENT,
        equipType: EQUIP_TYPES.ARMOR,
        description: '受到伤害时，33% 概率反弹 100% 伤害给来源。',
        flavor: '攻击者终将被反噬。'
    },

    // --- 锦囊牌 ---
    'steal': {
        name: '挖墙脚',
        type: CARD_TYPES.SCROLL,
        description: '获得对方一张牌(手牌或装备)。',
        flavor: '高薪聘请。',
        actionType: 'STEAL'
    },
    'dismantle': {
        name: 'DDOS攻击',
        type: CARD_TYPES.SCROLL,
        description: '弃置对方一张牌。50% 概率再弃置一张。',
        flavor: '流量洪峰。',
        actionType: 'DISMANTLE'
    },
    'control_no_play': {
        name: '服务器宕机',
        type: CARD_TYPES.DELAYED,
        description: '判定阶段：50% 概率跳过出牌阶段。',
        flavor: '正在重启服务...',
        actionType: 'JUDGE_SKIP_PLAY'
    },
    'control_no_draw': {
        name: '资金冻结',
        type: CARD_TYPES.DELAYED,
        description: '判定阶段：50% 概率跳过摸牌阶段。',
        flavor: '财务正在审核。',
        actionType: 'JUDGE_SKIP_DRAW'
    },
    'buff_damage': {
        name: '打鸡血',
        type: CARD_TYPES.SCROLL,
        description: '本回合下一张“上线发版”伤害+1。',
        flavor: '今晚通宵，必须上线！',
        actionType: 'BUFF_DAMAGE'
    },
    'aoe_damage': {
        name: '内卷',
        type: CARD_TYPES.SCROLL,
        description: '对方需打出“代码回滚”，否则受到 1 点伤害。',
        flavor: '所有人都在卷。',
        actionType: 'AOE'
    },
    'global_damage': {
        name: '恶性竞争',
        type: CARD_TYPES.SCROLL,
        description: '双方各扣 1 点资金。',
        flavor: '杀敌一千，自损一千。',
        actionType: 'GLOBAL_HURT'
    },
    'global_heal': {
        name: '行业峰会',
        type: CARD_TYPES.SCROLL,
        description: '双方各回复 1 点资金。',
        flavor: '合作共赢。',
        actionType: 'GLOBAL_HEAL'
    },
    'control_cant_hurt': {
        name: '空城计',
        type: CARD_TYPES.SCROLL,
        description: '下回合对方无法使用普通伤害牌。',
        flavor: '假装没人在维护。',
        actionType: 'CONTROL_CANT_HURT'
    },
    'control_cant_heal': {
        name: '断供',
        type: CARD_TYPES.SCROLL,
        description: '下回合对方无法回血。',
        flavor: '切断现金流。',
        actionType: 'CONTROL_CANT_HEAL'
    },
    'duel': {
        name: '技术辩论',
        type: CARD_TYPES.SCROLL,
        description: '对方需展示一张杀或闪，否则弃置所有装备。',
        flavor: 'Talk is cheap, show me the code.',
        actionType: 'DUEL_DISCARD_EQUIP'
    },
    'special_hurt': {
        name: '借刀杀人',
        type: CARD_TYPES.SCROLL,
        description: '对方展示一张牌，若你有同名牌则打出造成2点必中伤害。',
        flavor: '用你的代码击败你。',
        actionType: 'BORROW_KNIFE'
    },
    'reshuffle': {
        name: '重构项目',
        type: CARD_TYPES.SCROLL,
        description: '弃置所有手牌，摸 5 张牌。',
        flavor: '推倒重来。',
        actionType: 'RESHUFFLE'
    },
    'redraw': {
        name: '热更新',
        type: CARD_TYPES.SCROLL,
        description: '弃置此牌，摸一张牌。',
        flavor: '无感更新。',
        actionType: 'REDRAW'
    },
    'robbery': {
        name: '专利流氓',
        type: CARD_TYPES.SCROLL,
        description: '若对方有伤害牌则给你，否则受 1 点伤害。',
        flavor: '这是我的专利。',
        actionType: 'ROBBERY'
    },
    'satchel': {
        name: '备用方案',
        type: CARD_TYPES.SCROLL,
        description: '可存入一张手牌，免疫拆偷。',
        flavor: 'Plan B.',
        actionType: 'SATCHEL_EQUIP'
    }
};

function createCard(id) {
    const template = CARD_LIBRARY[id];
    if (!template) {
        console.error(`Unknown card ID: ${id}`);
        return null;
    }
    return {
        ...template,
        id: id,
        uid: Math.random().toString(36).substr(2, 9)
    };
}

// 初始牌堆配置
const INITIAL_DECK_CONFIG = [
    { id: 'attack', count: 20 },
    { id: 'dodge', count: 12 },
    { id: 'heal', count: 8 },
    { id: 'equip_multi_attack', count: 1 },
    { id: 'equip_auto_dodge', count: 1 },
    { id: 'equip_unavoidable', count: 1 },
    { id: 'equip_shield_wall', count: 1 },
    { id: 'equip_berserk', count: 1 },
    { id: 'equip_reflect', count: 1 },
    { id: 'steal', count: 3 },
    { id: 'dismantle', count: 3 },
    { id: 'control_no_play', count: 2 },
    { id: 'control_no_draw', count: 2 },
    { id: 'buff_damage', count: 2 },
    { id: 'aoe_damage', count: 1 },
    { id: 'global_damage', count: 1 },
    { id: 'global_heal', count: 1 },
    { id: 'control_cant_hurt', count: 1 },
    { id: 'control_cant_heal', count: 1 },
    { id: 'duel', count: 2 },
    { id: 'special_hurt', count: 1 },
    { id: 'reshuffle', count: 1 },
    { id: 'redraw', count: 3 },
    { id: 'robbery', count: 2 },
    { id: 'satchel', count: 2 }
];

// ==========================================
// Game Engine
// ==========================================
class Player {
    constructor(isAi, name) {
        this.isAi = isAi;
        this.name = name;
        this.hp = 5;
        this.maxHp = 5;
        this.hand = [];
        this.equips = {}; // { WEAPON: card, ARMOR: card }
        this.satchel = null; // 锦囊槽里的牌
        this.judges = []; // 判定区 (延时锦囊)
        
        // 状态标记
        this.flags = {
            attackCount: 0,
            skipDraw: false,
            skipPlay: false,
            cantHurt: false, // 下回合不能出杀
            cantHeal: false, // 下回合不能回血
            drunk: false     // 酒状态
        };
    }

    resetFlags() {
        this.flags.attackCount = 0;
        this.flags.skipDraw = false;
        this.flags.skipPlay = false;
        this.flags.drunk = false;
    }

    hasEquip(equipId) {
        return Object.values(this.equips).some(c => c.id === equipId);
    }
}

class Game {
    constructor() {
        this.ui = new UIManager(this);
        this.players = [
            new Player(false, "创业者"),
            new Player(true, "AI资本家")
        ];
        this.deck = [];
        this.discardPile = [];
        this.turnIndex = 0; // 0 will become 1 (AI) on first nextTurn call
        
        this.state = 'INIT'; 
    }

    log(msg) {
        this.ui.addLog(msg);
    }

    async init() {
        this.initDeck();
        this.players.forEach(p => this.drawCards(p, 5));
        this.ui.updateAll();
        
        this.log("游戏开始！初始资金 500 万 (5HP)");
        await wait(1000);
        this.nextTurn();
    }

    initDeck() {
        this.deck = [];
        INITIAL_DECK_CONFIG.forEach(cfg => {
            for(let i=0; i<cfg.count; i++) {
                const card = createCard(cfg.id);
                if(card) this.deck.push(card);
            }
        });
        shuffle(this.deck);
    }

    drawCards(player, count) {
        if (player.flags.skipDraw) {
            this.log(`${player.name} 被资金冻结，跳过摸牌！`);
            player.flags.skipDraw = false;
            return;
        }

        for (let i = 0; i < count; i++) {
            if (this.deck.length === 0) {
                if (this.discardPile.length === 0) break;
                this.deck = [...this.discardPile];
                this.discardPile = [];
                shuffle(this.deck);
                this.log("洗牌！");
            }
            player.hand.push(this.deck.pop());
        }
    }

    // --- Turn System ---

    async nextTurn() {
        this.turnIndex = (this.turnIndex + 1) % 2;
        const currentPlayer = this.players[this.turnIndex];
        
        this.log(`--- ${currentPlayer.name} 的回合 ---`);
        currentPlayer.resetFlags();
        this.ui.updateAll();

        // 1. 准备阶段 & 判定阶段
        await this.judgePhase(currentPlayer);
        
        // 2. 摸牌阶段
        if (!currentPlayer.flags.skipDraw) {
            this.drawCards(currentPlayer, 3);
            this.ui.updateAll();
        }

        // 3. 出牌阶段
        if (!currentPlayer.flags.skipPlay) {
            this.state = 'ACTION_PHASE';
            
            // 重要：更新 UI 状态以解锁玩家控制 (如果是玩家回合)
            this.ui.updateTurnStateUI();

            if (currentPlayer.isAi) {
                await this.aiAct(currentPlayer);
            } else {
                this.log("轮到你出牌了...");
                this.ui.enablePlayerControls();
            }
        } else {
            this.log(`${currentPlayer.name} 服务器宕机，跳过出牌！`);
            // 跳过出牌也需要进入结束流程
            await wait(1000);
            this.endTurnLogic(currentPlayer);
        }
    }

    async judgePhase(player) {
        // 处理延时锦囊 (倒序处理)
        for (let i = player.judges.length - 1; i >= 0; i--) {
            const judgeCard = player.judges[i];
            
            // 动画：判定中
            this.log(`正在判定 ${judgeCard.name}...`);
            await this.ui.animateJudge(judgeCard);
            
            const judgeResult = Math.random() < 0.5; // 50% 概率生效
            
            this.log(`判定 ${judgeCard.name}: ${judgeResult ? "生效 (不幸)" : "失效 (幸运)"}`);
            
            if (judgeResult) {
                if (judgeCard.actionType === 'JUDGE_SKIP_PLAY') player.flags.skipPlay = true;
                if (judgeCard.actionType === 'JUDGE_SKIP_DRAW') player.flags.skipDraw = true;
            }
            
            this.discardPile.push(judgeCard);
            player.judges.splice(i, 1);
            this.ui.updateAll();
            await wait(800);
        }
    }
    
    // Explicit end turn method to be called by button or AI
    async endTurnLogic(player) {
         // 4. 弃牌阶段 (暂略)
        
        // 5. 结束阶段
        if (player.flags.cantHurt) {
            player.flags.cantHurt = false;
            this.log(`${player.name} 的空城计效果结束。`);
        }
        if (player.flags.cantHeal) {
            player.flags.cantHeal = false;
            this.log(`${player.name} 的断供效果结束。`);
        }
        
        if (this.checkGameOver()) return;

        if (this.state !== 'GAME_OVER') {
            await wait(500);
            this.nextTurn();
        }
    }

    // --- Action Handling ---

    async playCard(player, card, target = null) {
        // 检查出杀限制
        if (card.actionType === 'ATTACK') {
            if (player.flags.attackCount >= 1 && !player.hasEquip('equip_multi_attack')) {
                this.log("每回合只能使用一次上线发版！(需要 CI/CD 流水线)");
                return;
            }
        }

        // 动画
        this.ui.animateCardPlay(card, player);
        await wait(600); // 等待动画飞跃

        // 从手牌移除
        player.hand = player.hand.filter(c => c.uid !== card.uid);
        
        // 装备牌特殊处理
        if (card.type === CARD_TYPES.EQUIPMENT) {
            this.log(`${player.name} 装备了 ${card.name}`);
            const oldEquip = player.equips[card.equipType];
            if (oldEquip) this.discardPile.push(oldEquip);
            player.equips[card.equipType] = card;
            this.ui.updateAll();
            return;
        }

        // 锦囊：备用方案 (特殊装备)
        if (card.actionType === 'SATCHEL_EQUIP') {
             this.log(`${player.name} 准备了备用方案`);
             player.equips['SATCHEL'] = card; // 占用特殊槽位
             this.ui.updateAll();
             return;
        }

        // 延时锦囊
        if (card.type === CARD_TYPES.DELAYED) {
            const realTarget = target || this.getOpponent(player);
            this.log(`${player.name} 对 ${realTarget.name} 使用了 ${card.name}`);
            realTarget.judges.push(card);
            this.ui.updateAll();
            return;
        }
        
        // 普通锦囊进入弃牌堆
        this.discardPile.push(card);

        // 执行效果
        await this.resolveEffect(player, card, target);
        this.ui.updateAll();
    }

    async resolveEffect(source, card, target) {
        const opponent = this.getOpponent(source);
        const realTarget = target || opponent;

        this.log(`${source.name} 使用了 [${card.name}]`);

        switch (card.actionType) {
            case 'ATTACK':
                source.flags.attackCount++;
                await this.handleAttack(source, realTarget, card);
                break;
            case 'HEAL':
                await this.heal(source, 1);
                break;
            case 'STEAL': 
                await this.handleSteal(source, realTarget);
                break;
            case 'DISMANTLE':
                await this.handleDismantle(source, realTarget);
                break;
            case 'BUFF_DAMAGE':
                source.flags.drunk = true;
                this.log(`${source.name} 处于打鸡血状态，下一击伤害+1`);
                break;
            case 'AOE': 
                await this.handleAOE(source);
                break;
            case 'GLOBAL_HURT': 
                await this.damage(source, source, 1);
                await this.damage(source, opponent, 1);
                break;
            case 'GLOBAL_HEAL': 
                await this.heal(source, 1);
                await this.heal(opponent, 1);
                break;
            case 'CONTROL_CANT_HURT': 
                realTarget.flags.cantHurt = true;
                this.log(`${realTarget.name} 下回合无法使用伤害牌`);
                break;
            case 'CONTROL_CANT_HEAL':
                realTarget.flags.cantHeal = true;
                this.log(`${realTarget.name} 下回合无法回血`);
                break;
            case 'DUEL_DISCARD_EQUIP':
                this.log(`${source.name} 发起了技术辩论(决斗)！`);
                
                let current = opponent;
                let attacker = source;
                
                while(true) {
                    // Current needs to play Slash or Dodge
                    const hasResponse = await this.askForCardShow(current, ['attack', 'dodge']);
                    if (!hasResponse) {
                        // Current failed to respond
                        this.log(`${current.name} 辩论失败，被弃置所有装备！`);
                        Object.keys(current.equips).forEach(k => {
                             this.discardPile.push(current.equips[k]);
                        });
                        current.equips = {};
                        this.ui.updateAll();
                        break;
                    } else {
                        // Swap roles
                        this.log(`${current.name} 展示了核心代码，反驳了回去！`);
                        await wait(500);
                        const temp = current;
                        current = attacker;
                        attacker = temp;
                    }
                }
                break;
            case 'RESHUFFLE':
                while(source.hand.length > 0) this.discardPile.push(source.hand.pop());
                this.drawCards(source, 5);
                break;
            case 'REDRAW':
                this.drawCards(source, 1);
                break;
            case 'ROBBERY': 
                await this.damage(source, realTarget, 1);
                break;
        }
    }

    // --- Damage System ---

    async handleAttack(source, target, card) {
        if (target.hasEquip('equip_auto_dodge')) {
            if (Math.random() < 0.5) {
                this.log(`${target.name} 的负载均衡触发，自动回滚了代码！`);
                this.ui.animateTrigger(target.equips['ARMOR'], target);
                return; 
            }
        }

        const unavoidable = source.hasEquip('equip_unavoidable');
        
        let dodged = false;
        if (!unavoidable) {
            dodged = await this.askForCard(target, 'dodge', `${source.name} 对你发起了上线，是否回滚？`);
        } else {
            this.log("强制推送！无法回滚！");
            this.ui.animateTrigger(source.equips['WEAPON'], source);
        }

        if (dodged) {
            this.log(`${target.name} 回滚了代码，防御成功。`);
        } else {
            let damage = 1;
            if (source.flags.drunk) {
                damage++;
                source.flags.drunk = false;
            }
            if (source.hasEquip('equip_berserk')) damage++;

            await this.damage(source, target, damage);
        }
    }

    async damage(source, target, amount) {
        if (target.hasEquip('equip_shield_wall')) {
            if (Math.random() < 0.66) {
                this.log(`${target.name} 的防火墙拦截了攻击！`);
                this.ui.animateTrigger(target.equips['ARMOR'], target);
                return;
            } else {
                this.log("防火墙被穿透，伤害+1！");
                amount++;
            }
        }
        
        if (target.hasEquip('equip_berserk')) amount++;

        let reflect = false;
        if (target.hasEquip('equip_reflect') && Math.random() < 0.33) {
            reflect = true;
            this.ui.animateTrigger(target.equips['ARMOR'], target);
        }

        this.log(`${target.name} 受到 ${amount} 点伤害！`);
        target.hp -= amount;
        
        if (!target.isAi) document.body.classList.add('animate-pulse');
        setTimeout(() => document.body.classList.remove('animate-pulse'), 200);

        this.ui.updateAll();

        if (target.hp <= 0) {
            await this.handleDying(target);
        }

        if (reflect && source.hp > 0 && target.hp > 0) { 
            this.log(`${target.name} 的反弹Shell触发！反弹全额伤害！`);
            await this.damage(target, source, amount);
        }
    }

    async handleDying(player) {
        this.log(`${player.name} 资金链断裂 (濒死)！请求融资...`);
        
        while (player.hp <= 0) {
            let saved = await this.askForUseActive(player, ['heal', 'world_peace']);
            if (!saved) break; 
        }

        if (player.hp > 0) {
            this.log(`${player.name} 成功挺过危机！`);
        } else {
            this.state = 'GAME_OVER';
            this.ui.showGameOver(player.isAi); 
        }
    }

    async heal(player, amount) {
        if (player.hp >= player.maxHp) return;
        if (player.flags.cantHeal) return;
        player.hp = Math.min(player.hp + amount, player.maxHp);
        this.log(`${player.name} 回复了 ${amount} 点资金。`);
        this.ui.updateAll();
    }

    // --- Special Actions ---
    
    async handleSteal(source, target) {
        if (target.hand.length === 0 && Object.keys(target.equips).length === 0) return;
        
        const totalCards = [...target.hand, ...Object.values(target.equips)];
        const stolen = totalCards[randomInt(0, totalCards.length - 1)];
        
        if (target.hand.includes(stolen)) {
            target.hand = target.hand.filter(c => c !== stolen);
        } else {
            const type = Object.keys(target.equips).find(k => target.equips[k] === stolen);
            delete target.equips[type];
        }
        
        source.hand.push(stolen);
        this.log(`${source.name} 挖走了 ${stolen.name}`);
        this.ui.updateAll();
    }

    async handleDismantle(source, target) {
        if (target.hand.length === 0 && Object.keys(target.equips).length === 0) return;

        const discardOne = () => {
             const totalCards = [...target.hand, ...Object.values(target.equips)];
             if (totalCards.length === 0) return;
             const card = totalCards[randomInt(0, totalCards.length - 1)];
             if (target.hand.includes(card)) {
                target.hand = target.hand.filter(c => c !== card);
             } else {
                const type = Object.keys(target.equips).find(k => target.equips[k] === card);
                delete target.equips[type];
             }
             this.discardPile.push(card);
             this.log(`${target.name} 的 ${card.name} 被弃置`);
        };

        discardOne();
        if (Math.random() < 0.5) {
            this.log("DDOS 触发二次攻击！");
            discardOne();
        }
        this.ui.updateAll();
    }
    
    async handleAOE(source) {
        const opponent = this.getOpponent(source);
        const dodged = await this.askForCard(opponent, 'dodge', '遭遇内卷，是否回滚？');
        if (!dodged) {
            await this.damage(source, opponent, 1);
        } else {
            this.log(`${opponent.name} 躲过了内卷。`);
        }
    }

    // --- Interaction ---

    getOpponent(player) {
        return this.players.find(p => p !== player);
    }
    
    // New: Ask player to show a card from hand
    async askForCardShow(player, cardIdList) {
        // Filter available cards
        const validCards = player.hand.filter(c => cardIdList.includes(c.id) || cardIdList.includes(c.actionType.toLowerCase()) || (c.actionType === 'ATTACK' && cardIdList.includes('attack')) || (c.actionType === 'DODGE' && cardIdList.includes('dodge')));
        
        if (validCards.length === 0) return null;
        
        if (player.isAi) {
            // AI Randomly shows one
            await wait(800);
            const card = validCards[randomInt(0, validCards.length - 1)];
            this.ui.animateCardPlay(card, player); // Show it
            await wait(1000);
            // It's just a show, not play/discard, so we put it back? 
            // The card is not discarded by show.
            // Wait, animateCardPlay moves it to played container.
            // We should probably just "flash" it or show in modal.
            // For simplicity, let's use animateCardPlay but cloning, not removing from hand.
            // But animateCardPlay assumes playing.
            // Let's create `animateCardShow`.
            this.ui.animateCardShow(card, player);
            return card;
        } else {
            // Player chooses
            return await this.ui.promptCardShow(validCards, "请展示一张手牌以响应");
        }
    }

    async askForCard(player, cardId, promptText) {
        if (player.isAi) {
            const card = player.hand.find(c => c.id === cardId || (cardId === 'dodge' && c.actionType === 'DODGE'));
            if (card) {
                await wait(500);
                this.discardPile.push(card);
                player.hand = player.hand.filter(c => c !== card);
                this.ui.updateAll();
                return true;
            }
            return false;
        } else {
            // 自动扣血逻辑：如果没有对应卡牌，直接返回 false
            const validCards = player.hand.filter(c => c.id === cardId || (cardId === 'dodge' && c.actionType === 'DODGE'));
            if (validCards.length === 0) {
                return false;
            }
            return await this.ui.promptCardSelection(cardId, promptText);
        }
    }

    async askForUseActive(player, validTypes) {
        if (player.isAi) {
            const card = player.hand.find(c => validTypes.includes(c.id) || validTypes.includes(c.actionType.toLowerCase()));
            if (card) {
                await wait(500);
                this.log(`AI 自救使用 ${card.name}`);
                player.hand = player.hand.filter(c => c !== card);
                this.discardPile.push(card);
                if (card.actionType === 'HEAL') player.hp++;
                return true;
            }
            return false;
        } else {
            const hasWorldPeace = player.hand.some(c=>c.id==='attack') && player.hand.some(c=>c.id==='dodge');
            return await this.ui.promptDyingRescue(validTypes, hasWorldPeace);
        }
    }

    checkGameOver() {
        if (this.players[0].hp <= 0) {
            this.ui.showGameOver(false);
            this.state = 'GAME_OVER';
            return true;
        }
        if (this.players[1].hp <= 0) {
            this.ui.showGameOver(true);
            this.state = 'GAME_OVER';
            return true;
        }
        return false;
    }

    // --- AI Logic ---
    async aiAct(ai) {
        await wait(1500);
        
        // 0. 濒死自救
        if (ai.hp < 2) {
             const heal = ai.hand.find(c => c.actionType === 'HEAL');
             if (heal) {
                 await this.playCard(ai, heal);
                 await wait(1500);
             }
        }

        // 1. 装备优先 (包括备用方案)
        const equip = ai.hand.find(c => c.type === CARD_TYPES.EQUIPMENT || c.actionType === 'SATCHEL_EQUIP');
        if (equip) {
            await this.playCard(ai, equip);
            await wait(1500);
        }

        // 2. 备用方案存卡
        if (ai.equips['SATCHEL'] && !ai.satchel && ai.hand.length > 0) {
            let cardToStore = null;
            
            // 优先存桃 (如果满血)
            if (ai.hp === ai.maxHp) {
                cardToStore = ai.hand.find(c => c.actionType === 'HEAL');
            }
            
            // 其次存闪 (如果闪多)
            if (!cardToStore) {
                const dodges = ai.hand.filter(c => c.actionType === 'DODGE');
                if (dodges.length >= 2) {
                    cardToStore = dodges[0];
                }
            }
            
            // 随机存
            if (!cardToStore && Math.random() < 0.3) {
                 cardToStore = ai.hand[randomInt(0, ai.hand.length - 1)];
            }
            
            if (cardToStore) {
                ai.satchel = cardToStore;
                ai.hand = ai.hand.filter(c => c !== cardToStore);
                this.log("AI 将一张牌存入了备用方案");
                this.ui.updateAll();
                await wait(1500);
            }
        }

        // 3. 锦囊
        const trick = ai.hand.find(c => ['STEAL', 'DISMANTLE', 'AOE'].includes(c.actionType));
        if (trick) {
            await this.playCard(ai, trick);
            await wait(1500);
        }

        // 4. 出杀
        const attack = ai.hand.find(c => c.actionType === 'ATTACK');
        if (attack) {
            if (ai.flags.attackCount === 0 || ai.hasEquip('equip_multi_attack')) {
                const buff = ai.hand.find(c => c.actionType === 'BUFF_DAMAGE');
                if (buff) {
                    await this.playCard(ai, buff);
                    await wait(800);
                }
                await this.playCard(ai, attack);
            }
        }

        this.log("AI 结束回合");
        await wait(1000);
        this.endTurnLogic(ai);
    }
}

// ==========================================
// UI Manager
// ==========================================
class UIManager {
    constructor(game) {
        this.game = game;
        this.logContainer = document.getElementById('log-container');
        this.handContainer = document.getElementById('hand-container');
        this.aiHandContainer = document.getElementById('ai-hand-container');
        this.playedContainer = document.getElementById('played-cards-container');
        
        this.modal = document.getElementById('interaction-modal');
        this.modalText = document.getElementById('modal-text');
        this.modalButtons = document.getElementById('modal-buttons');
        
        document.getElementById('merge-btn').onclick = () => this.handleMergeAttack();
        document.getElementById('end-turn-btn').onclick = () => {
             this.game.players[0].flags.skipPlay = true; 
             this.game.state = 'TURN_END'; 
             this.game.endTurnLogic(this.game.players[0]);
        };
        
        this.setupHandScroll();
    }

    addLog(msg) {
        const div = document.createElement('div');
        div.textContent = `> ${msg}`;
        div.className = "mb-1 border-b border-gray-700 pb-1";
        this.logContainer.prepend(div);
    }

    animateJudge(card) {
        return new Promise(resolve => {
            const overlay = document.createElement('div');
            overlay.className = "fixed inset-0 z-[60] flex flex-col justify-center items-center bg-black/50 pointer-events-none";
            
            const cardEl = this.createCardEl(card, false);
            cardEl.className += " transform scale-150 shadow-2xl animate-bounce";
            
            const text = document.createElement('div');
            text.className = "text-white text-2xl font-bold mt-4 animate-pulse";
            text.textContent = "判定中...";
            
            overlay.appendChild(cardEl);
            overlay.appendChild(text);
            document.body.appendChild(overlay);
            
            setTimeout(() => {
                document.body.removeChild(overlay);
                resolve();
            }, 1500);
        });
    }

    animateCardPlay(card, source) {
        // Clone for animation
        const el = this.createCardEl(card, false);
        el.style.position = 'fixed';
        el.style.zIndex = 1000;
        el.style.width = '8rem'; // w-32
        el.style.height = '12rem'; // h-48
        el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        // Start position (Approximate hand positions)
        if (source.isAi) {
             el.style.top = '10%'; 
             el.style.left = '50%';
        } else {
             el.style.bottom = '10%';
             el.style.left = '50%';
        }
        
        document.body.appendChild(el);
        
        // Force reflow
        el.offsetHeight;
        
        // Target container based on source
        const targetContainer = source.isAi ? 
            document.getElementById('ai-played-cards') : 
            document.getElementById('player-played-cards');
            
        const containerRect = targetContainer.getBoundingClientRect();
        
        const targetY = containerRect.top + (containerRect.height - 192) / 2; // 192 is 12rem height
        // Add some random rotation
        const rotation = (Math.random() - 0.5) * 10;
        
        // Center of the specific row
        el.style.top = `${targetY}px`;
        // Initial fly target: center of container
        el.style.left = `${containerRect.left + containerRect.width / 2 - 64}px`; 
        el.style.transform = `scale(1.2) rotate(${rotation}deg)`;
        
        setTimeout(() => {
            el.style.position = 'static';
            el.style.zIndex = '0'; // Fix: Reset z-index so it doesn't block modal
            el.style.transform = `scale(1) rotate(${rotation}deg)`;
            el.style.marginLeft = '-80px'; // Overlap
            el.style.transition = 'none';
            
            // Fade old cards IN THIS ROW
            Array.from(targetContainer.children).forEach((c) => {
                if (!c.classList.contains('pointer-events-none')) {
                    c.style.opacity = '0.5';
                    c.style.filter = 'grayscale(60%)';
                }
            });
            
            targetContainer.appendChild(el);
            targetContainer.scrollLeft = targetContainer.scrollWidth;
        }, 600);
    }

    updateAll() {
        this.renderPlayer(this.game.players[0], 'player');
        this.renderPlayer(this.game.players[1], 'ai');
        this.updateButtons();
        this.updateTurnStateUI();
        this.renderJudges();
    }

    renderJudges() {
        ['player', 'ai'].forEach((prefix, index) => {
            const container = document.getElementById(`${prefix}-judges`);
            if (!container) return;
            container.innerHTML = '';
            const player = this.game.players[index];
            player.judges.forEach(card => {
                const div = document.createElement('div');
                div.className = "bg-purple-900 text-xs p-1 rounded border border-purple-500 truncate w-full mb-1 flex items-center gap-1 shadow-sm animate-pulse";
                div.innerHTML = `
                    <div class="w-4 h-4 text-purple-300">${getCardIcon(card.type, card.id)}</div>
                    <span class="truncate">${card.name}</span>
                `;
                div.title = card.description;
                container.appendChild(div);
            });
        });
    }

    updateTurnStateUI() {
        const isPlayerTurn = this.game.turnIndex === 0 && this.game.state === 'ACTION_PHASE';
        const handContainer = document.getElementById('hand-container');
        const endTurnBtn = document.getElementById('end-turn-btn');
        const mergeBtn = document.getElementById('merge-btn');
        
        if (!isPlayerTurn) {
            // Gray out hand
            if (handContainer) {
                handContainer.classList.add('grayscale', 'opacity-50', 'pointer-events-none');
            }
            if (endTurnBtn) {
                endTurnBtn.disabled = true;
                endTurnBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
            if (mergeBtn) {
                mergeBtn.disabled = true;
            }
        } else {
            // Restore
            if (handContainer) {
                handContainer.classList.remove('grayscale', 'opacity-50', 'pointer-events-none');
            }
            if (endTurnBtn) {
                endTurnBtn.disabled = false;
                endTurnBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
            // Merge btn is handled by updateButtons
        }
    }

    renderPlayer(player, prefix) {
        const hpEl = document.getElementById(`${prefix}-hp`);
        const countEl = document.getElementById(`${prefix}-count`);
        const avatarEl = document.getElementById(`${prefix}-avatar`);
        
        if(hpEl) hpEl.textContent = `${player.hp}/${player.maxHp}`;
        if(countEl) countEl.textContent = player.hand.length;
        if(avatarEl) avatarEl.innerHTML = prefix === 'player' ? SVG_ICONS.avatar_player : SVG_ICONS.avatar_ai;
        
        // Render Equips (Simplified)
        const equipContainer = document.getElementById(`${prefix}-equips`);
        if (equipContainer) {
            equipContainer.innerHTML = '';
            Object.values(player.equips).forEach(card => {
                if (card.actionType === 'SATCHEL_EQUIP') return; // Handled separately

                const div = document.createElement('div');
                div.className = "bg-gray-800 text-xs p-1 rounded border border-blue-500 truncate w-full mb-1 flex items-center gap-1 shadow-sm";
                div.innerHTML = `
                    <div class="w-4 h-4 text-blue-300">${getCardIcon(card.type, card.id)}</div>
                    <span class="truncate">${card.name}</span>
                `;
                div.title = card.description;
                equipContainer.appendChild(div);
            });
        }

        // Render Satchel Slot
        if (prefix === 'player') {
            const satchelContainer = document.getElementById('player-satchel');
            const satchelCard = player.equips['SATCHEL'];
            
            if (!satchelCard) {
                satchelContainer.className = "hidden";
            } else {
                satchelContainer.classList.remove('hidden');
                satchelContainer.className = "border border-purple-500 border-dashed rounded h-8 flex items-center justify-center text-xs text-purple-300 cursor-pointer hover:bg-purple-900/30 transition select-none w-full";
                
                if (player.satchel) {
                    satchelContainer.innerHTML = `
                        <div class="w-4 h-4 mr-1">${getCardIcon(player.satchel.type, player.satchel.id)}</div>
                        已存牌
                    `;
                    satchelContainer.title = `已存: ${player.satchel.name} (点击取出)`;
                    satchelContainer.onclick = () => this.handleSatchelInteract(player);
                } else {
                    satchelContainer.innerHTML = `[空]`;
                    satchelContainer.title = "点击手牌存入";
                    satchelContainer.onclick = null; // Interaction is via hand card click
                }
            }
        
            this.handContainer.innerHTML = '';
            player.hand.forEach(card => {
                const el = this.createCardEl(card, true);
                
                // Add Satchel Store Option logic
                if (player.equips['SATCHEL'] && !player.satchel && !this.game.players[0].isAi && this.game.state === 'ACTION_PHASE') {
                    // We modify onclick to show option
                    const originalClick = el.onclick;
                    el.onclick = () => {
                        // Check if we want to play or store?
                        // Let's pop a modal
                        this.promptCardOrSatchel(card, originalClick);
                    };
                }
                
                this.handContainer.appendChild(el);
            });
        } else {
            this.aiHandContainer.innerHTML = '';
            player.hand.forEach(() => {
                const div = document.createElement('div');
                div.className = "w-12 h-16 bg-gray-700 border border-gray-500 rounded m-1 shadow-md bg-gradient-to-br from-gray-700 to-gray-800";
                this.aiHandContainer.appendChild(div);
            });
        }
    }

    createCardEl(card, playable) {
        const div = document.createElement('div');
        div.className = `
            relative w-32 h-48 bg-gray-800 border-2 ${this.getTypeColor(card.type)} 
            rounded-lg m-1 flex flex-col p-2 cursor-pointer transition-transform
            shadow-lg card-hover flex-shrink-0 bg-gradient-to-b from-gray-800 to-gray-900
        `;
        
        const icon = getCardIcon(card.type, card.id);
        
        div.innerHTML = `
            <div class="flex justify-between items-start mb-1">
                <div class="font-bold text-sm text-gray-200 truncate">${card.name}</div>
            </div>
            <div class="flex-1 flex justify-center items-center my-1 opacity-80">
                <div class="w-16 h-16">${icon}</div>
            </div>
            <div class="text-[10px] bg-black/40 p-1 rounded h-12 text-gray-300 leading-tight overflow-hidden">${card.description}</div>
            <div class="text-[10px] text-gray-500 italic mt-1 text-right truncate">${card.flavor}</div>
        `;
        
        if (playable) {
            div.onclick = () => {
                if (this.game.state === 'ACTION_PHASE' && !this.game.players[0].isAi) {
                    this.game.playCard(this.game.players[0], card);
                }
            };
        }
        return div;
    }

    getTypeColor(type) {
        switch(type) {
            case CARD_TYPES.BASIC: return 'border-red-500 shadow-red-900/20';
            case CARD_TYPES.SCROLL: return 'border-yellow-500 shadow-yellow-900/20';
            case CARD_TYPES.EQUIPMENT: return 'border-blue-500 shadow-blue-900/20';
            case CARD_TYPES.DELAYED: return 'border-purple-500 shadow-purple-900/20';
            default: return 'border-gray-500';
        }
    }
    
    // Interaction Handlers
    
    promptCardOrSatchel(card, playAction) {
        this.modalText.textContent = `对 [${card.name}] 进行操作`;
        this.modal.classList.remove('hidden');
        this.modalButtons.innerHTML = '';

        const playBtn = document.createElement('button');
        playBtn.className = "bg-green-600 hover:bg-green-500 px-4 py-2 rounded m-2";
        playBtn.textContent = "打出";
        playBtn.onclick = () => {
            this.modal.classList.add('hidden');
            playAction();
        };
        this.modalButtons.appendChild(playBtn);

        const storeBtn = document.createElement('button');
        storeBtn.className = "bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded m-2";
        storeBtn.textContent = "存入备用方案";
        storeBtn.onclick = () => {
            this.modal.classList.add('hidden');
            const p = this.game.players[0];
            p.satchel = card;
            p.hand = p.hand.filter(c => c !== card);
            this.game.log(`${p.name} 将 [${card.name}] 存入备用方案`);
            this.updateAll();
        };
        this.modalButtons.appendChild(storeBtn);
        
        const cancel = document.createElement('button');
        cancel.className = "bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded m-2";
        cancel.textContent = "取消";
        cancel.onclick = () => {
            this.modal.classList.add('hidden');
        };
        this.modalButtons.appendChild(cancel);
    }
    
    handleSatchelInteract(player) {
        if (!player.satchel) return;
        
        this.modalText.textContent = `备用方案: [${player.satchel.name}]`;
        this.modal.classList.remove('hidden');
        this.modalButtons.innerHTML = '';
        
        const retrieveBtn = document.createElement('button');
        retrieveBtn.className = "bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded m-2";
        retrieveBtn.textContent = "取出到手牌";
        retrieveBtn.onclick = () => {
            this.modal.classList.add('hidden');
            player.hand.push(player.satchel);
            player.satchel = null;
            this.game.log(`${player.name} 取出了备用方案`);
            this.updateAll();
        };
        this.modalButtons.appendChild(retrieveBtn);
        
        // Maybe allow direct use? For now just retrieve.
        
        const cancel = document.createElement('button');
        cancel.className = "bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded m-2";
        cancel.textContent = "取消";
        cancel.onclick = () => {
            this.modal.classList.add('hidden');
        };
        this.modalButtons.appendChild(cancel);
    }

    enablePlayerControls() {
        // Visual feedback for turn start
    }
    
    updateButtons() {
        const p = this.game.players[0];
        const canMerge = p.hand.filter(c => c.actionType === 'ATTACK').length >= 2;
        const mergeBtn = document.getElementById('merge-btn');
        if (mergeBtn) mergeBtn.disabled = !canMerge;
    }

    // --- Visual Helpers ---
    
    setupHandScroll() {
        const container = this.handContainer;
        if (!container) return;
        
        container.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        }, { passive: false });
    }

    animateCardShow(card, source) {
        // Just flash the card in the center for a second
        const el = this.createCardEl(card, false);
        el.style.position = 'fixed';
        el.style.zIndex = 1000;
        el.style.width = '10rem';
        el.style.height = '14rem';
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.transform = 'translate(-50%, -50%) scale(0.5)';
        el.style.transition = 'all 0.3s ease-out';
        
        document.body.appendChild(el);
        
        // Reflow
        el.offsetHeight;
        
        el.style.transform = 'translate(-50%, -50%) scale(1.2)';
        
        setTimeout(() => {
             el.style.transform = 'translate(-50%, -50%) scale(0.5) opacity(0)';
             setTimeout(() => document.body.removeChild(el), 300);
        }, 1500);
    }

    animateTrigger(card, source) {
        // Animate equipment trigger (flash on equipment slot)
        // Since we don't track exact DOM element easily, we just flash a clone near player area
        const el = this.createCardEl(card, false);
        el.style.position = 'fixed';
        el.style.zIndex = 1000;
        el.style.width = '6rem';
        el.style.height = '8rem';
        
        if (source.isAi) {
            el.style.top = '15%';
            el.style.left = '20%';
        } else {
            el.style.bottom = '15%';
            el.style.left = '20%';
        }
        
        el.className += " border-4 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]";
        document.body.appendChild(el);
        
        setTimeout(() => {
             el.style.opacity = '0';
             el.style.transition = 'opacity 0.5s';
             setTimeout(() => document.body.removeChild(el), 500);
        }, 1000);
    }
    
    // --- Prompts ---
    
    promptCardShow(cards, text) {
        return new Promise(resolve => {
            this.modalText.textContent = text;
            this.modal.classList.remove('hidden');
            this.modalButtons.innerHTML = '';
            
            // Create a mini grid for cards
            const grid = document.createElement('div');
            grid.className = "flex gap-2 flex-wrap justify-center mb-4";
            
            cards.forEach(card => {
                // Simplified card view for selection
                const cardDiv = document.createElement('div');
                cardDiv.className = `w-20 h-28 bg-gray-800 border ${this.getTypeColor(card.type)} rounded cursor-pointer hover:scale-105 transition`;
                cardDiv.innerHTML = `
                    <div class="text-[10px] p-1 truncate text-white">${card.name}</div>
                    <div class="flex justify-center mt-2">
                        <div class="w-8 h-8">${getCardIcon(card.type, card.id)}</div>
                    </div>
                `;
                cardDiv.onclick = () => {
                     this.modal.classList.add('hidden');
                     this.animateCardShow(card, this.game.players[0]);
                     resolve(card);
                };
                grid.appendChild(cardDiv);
            });
            
            this.modalButtons.appendChild(grid);
            
            // Cancel button (Give up)
            const cancel = document.createElement('button');
            cancel.className = "bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded m-2 w-full";
            cancel.textContent = "无法响应/放弃";
            cancel.onclick = () => {
                this.modal.classList.add('hidden');
                resolve(null);
            };
            this.modalButtons.appendChild(cancel);
        });
    }

    promptCardSelection(cardId, text) {
        return new Promise(resolve => {
            this.modalText.textContent = text;
            this.modal.classList.remove('hidden');
            this.modalButtons.innerHTML = '';

            const p = this.game.players[0];
            const validCards = p.hand.filter(c => c.id === cardId || (cardId === 'dodge' && c.actionType === 'DODGE'));

            // Check auto-dodge equipment for manual trigger? No, auto dodge handled in logic.
            
            if (validCards.length > 0) {
                const btn = document.createElement('button');
                btn.className = "bg-green-600 hover:bg-green-500 px-4 py-2 rounded m-2";
                btn.textContent = `使用 ${validCards[0].name}`;
                btn.onclick = () => {
                    this.modal.classList.add('hidden');
                    const card = validCards[0];
                    p.hand = p.hand.filter(c => c !== card);
                    this.game.discardPile.push(card);
                    
                    // Animate defense card too?
                    this.animateCardPlay(card, p);
                    
                    this.updateAll();
                    resolve(true);
                };
                this.modalButtons.appendChild(btn);
            }

            const cancel = document.createElement('button');
            cancel.className = "bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded m-2";
            cancel.textContent = "取消/不出";
            cancel.onclick = () => {
                this.modal.classList.add('hidden');
                resolve(false);
            };
            this.modalButtons.appendChild(cancel);
        });
    }

    promptDyingRescue(validTypes, hasWorldPeace) {
        return new Promise(resolve => {
            this.modalText.textContent = "资金链断裂！是否自救？";
            this.modal.classList.remove('hidden');
            this.modalButtons.innerHTML = '';

            const p = this.game.players[0];

            const healCard = p.hand.find(c => validTypes.includes(c.actionType.toLowerCase()));
            if (healCard) {
                const btn = document.createElement('button');
                btn.className = "bg-green-600 hover:bg-green-500 px-4 py-2 rounded m-2";
                btn.textContent = `使用 ${healCard.name}`;
                btn.onclick = () => {
                    this.modal.classList.add('hidden');
                    p.hand = p.hand.filter(c => c !== healCard);
                    this.game.discardPile.push(healCard);
                    if (healCard.actionType === 'HEAL') p.hp++;
                    this.animateCardPlay(healCard, p);
                    this.updateAll();
                    resolve(true);
                };
                this.modalButtons.appendChild(btn);
            }

            if (hasWorldPeace) {
                const btn = document.createElement('button');
                btn.className = "bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded m-2";
                btn.textContent = "世界和平 (弃杀闪回1血)";
                btn.onclick = () => {
                    this.modal.classList.add('hidden');
                    const atk = p.hand.find(c=>c.id==='attack');
                    const dodge = p.hand.find(c=>c.id==='dodge');
                    p.hand = p.hand.filter(c => c !== atk && c !== dodge);
                    this.game.discardPile.push(atk, dodge);
                    p.hp = 1;
                    this.game.log("世界和平！强制回血并结束回合！");
                    resolve(true);
                };
                this.modalButtons.appendChild(btn);
            }

            const die = document.createElement('button');
            die.className = "bg-red-800 hover:bg-red-700 px-4 py-2 rounded m-2";
            die.textContent = "放弃治疗";
            die.onclick = () => {
                this.modal.classList.add('hidden');
                resolve(false);
            };
            this.modalButtons.appendChild(die);
        });
    }

    showGameOver(victory) {
        const overlay = document.getElementById('game-over-overlay');
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        document.getElementById('game-over-title').textContent = victory ? "商战胜利！" : "破产清算";
        document.getElementById('game-over-desc').textContent = victory ? "你成为了行业寡头。" : "你被市场淘汰了。";
    }

    handleMergeAttack() {
        const p = this.game.players[0];
        const attacks = p.hand.filter(c => c.actionType === 'ATTACK');
        if (attacks.length < 2) return;
        
        const c1 = attacks[0];
        const c2 = attacks[1];
        p.hand = p.hand.filter(c => c !== c1 && c !== c2);
        this.game.discardPile.push(c1, c2);
        
        // Animate
        this.animateCardPlay(c1, p);
        setTimeout(() => this.animateCardPlay(c2, p), 200);
        
        this.game.log("合并发版！造成必中伤害！");
        
        // Calculate Damage
        let damage = 1;
        if (p.flags.drunk) {
            damage++;
            p.flags.drunk = false; // Consume drunk
        }
        if (p.hasEquip('equip_berserk')) damage++;
        
        this.game.damage(p, this.game.players[1], damage);
        this.updateAll();
    }
}

// ==========================================
// Initialization
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    try {
        const game = new Game();
        game.init().catch(err => {
            console.error(err);
            alert("游戏初始化失败: " + err);
        });
    } catch (e) {
        console.error(e);
        alert("严重错误: " + e.message);
    }
});
