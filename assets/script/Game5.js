

cc.Class({
    extends: cc.Component,

    properties: {
        bg1: cc.Node,
        bg2: cc.Node,
        bg3: cc.Node,
    },
    start() {
        window.Game5 = this;
        this.firstIndex = null;
        this.secondIndex = null;
        this.roundNum = true;
        this.oldNode = null;
        this.isLock = true;
        this.canNext = 0;
        this.firstClick = true;
        this.addButton2();
    },
    openLifeGame() {
        cc.vv.controlNode(this.bg1, this.bg3)
        cc.vv.closeChangeLayer(this.bg1.active);
    },
    closeLifeGame() {
        cc.vv.controlNode(this.bg3, this.bg1);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    openRightGame() {
        cc.vv.controlNode(this.bg1, this.bg2)
        cc.vv.closeChangeLayer(this.bg1.active);
    },
    closeRightGame() {
        cc.vv.controlNode(this.bg2, this.bg1)
        cc.vv.closeChangeLayer(this.bg1.active);
    },
    isCanEnterNextLevel(){
        let node1 = this.bg1.getChildByName("door4")
        let node2 = this.bg1.getChildByName("door3")
        cc.vv.controlNode(node1,node2);
        this.bg1.getChildByName("rightgame").destroy();
    },
    EnterNextLevel(){
        let node = this.node.parent.getChildByName("game6layer")
        cc.vv.controlNode(this.node,node)
    },
    // 给移动宝石的游戏添加按钮
    addButton2(){
            let nodeArr = this.bg3.getChildByName("leftgame").children;
            for (let i = 0; i < nodeArr.length; i++) {
                let node = nodeArr[i]
                let data = {
                    target: this.node,
                    btn: node.addComponent(cc.Button),
                    component: "Game5",
                    handler: "moveGem",
                    customEventData: i,
                    enableAutoGrayEffect: true,
                    interactable: true,
                }
                cc.vv.addButton(data);
            }
            console.log("添加button成功")
    },


    // 给翻转图片的游戏添加按钮
    addButton() {
        return function(){
            let nodeArr = this.bg2.getChildByName("rightgame").children;
            for (let i = 0; i < nodeArr.length; i++) {
                let node = nodeArr[i]
                let data = {
                    target: this.node,
                    btn: node.addComponent(cc.Button),
                    component: "Game5",
                    handler: "overturnPic",
                    customEventData: i,
                    enableAutoGrayEffect: true,
                    interactable: true,
                }
                cc.vv.addButton(data);
            }
            console.log("添加button成功")
        }.bind(this)
    },
    // 移动宝石
    moveGem(event,customEventData){
        if (this.isLock) {
            this.isLock = false;
            console.log("第一次点击");
            if(this.oldNode == event.target){
                this.isLock = true;
                return;
            }else{
                if(this.firstClick){
                    this.firstClick = false;
                    this.oldNode = event.target;
                    this.isLock = true;
                    return 
                }
                let oldChild = this.oldNode.children.length;
                let newChild = event.target.children.length;
                console.log(oldChild,newChild)
                if(oldChild > 0){
                    if(newChild == 0){
                        this.oldNode.children[0].parent = event.target;
                        event.target.children[0].runAction(
                            cc.sequence(
                                cc.moveTo(0.5,0,0),
                                cc.callFunc(()=>{
                                    console.log(123);
                                    this.isLock = true;
                                    this.firstClick = true;
                                    if(this.isVictory()){
                                        console.log("胜利！游戏结束")
                                    }
                                },this)
                            )
                        )
                        this.oldNode = null;
                    }
                }
                if(newChild > 0){
                    if(oldChild == 0){
                        event.target.children[0].parent = this.oldNode;
                        this.oldNode.children[0].runAction(
                            cc.sequence(
                                cc.moveTo(0.5,0,0),
                                cc.callFunc(()=>{
                                    this.isLock = true;
                                    this.firstClick = true;
                                    if(this.isVictory()){
                                        console.log("胜利！游戏结束")
                                    }
                                },this)
    
                            )
                        )
                        this.oldNode = null;
                    }
                }
                if(newChild > 0 && oldChild >0){
                    this.isLock = true;
                    this.firstClick = true;
                    this.oldNode = null;
                }
            }

        }
    },
    // 翻转图片
    overturnPic(event, customEventData) {
        if(this.isLock){
            console.log("第一次点击")
            this.isLock = false;
            if(event.target == this.oldNode){
                return;
            }
            if(this.roundNum){
                console.log(event.target)
                event.target.runAction(
                    cc.sequence(
                        cc.rotateTo(1, 180, 0),
                        cc.callFunc(()=>{
                            this.isLock = true;
                        },this)
                    )
                )
                let num1 = null ;
                let num2 = null ;
                if(customEventData < 6){
                    num1 = 0;
                    num2 = customEventData;
                }else if(customEventData >= 6 && customEventData <= 11 ){
                    num1 = 1;
                    num2 = customEventData - 6;
                }else if(customEventData > 11){
                    num1 = 2;
                    num2 = customEventData - 12;
                }
                let index = cc.vv.gameArr[num1][num2];
                this.replacePic(event.target,index);
                this.roundNum  =  false ;
                this.oldNode = event.target;
                this.firstIndex = index;
            }else{
                    this.oldNode = null;
                console.log("第二次点击")
                var callFunc = cc.callFunc(()=>{
                    this.isLock = true
                    if(!this.isSamePic()){
                        this.restorePic(this.oldNode,event.target);
                        this.oldNode.runAction(
                            cc.rotateTo(1, -180, 0)
                        )
                        event.target.runAction(
                            cc.rotateTo(1, -180, 0)
                        )
                    }else{
                        this.canNext += 1;
                        console.log(this.canNext)
                        if(this.canNext >= 9){
                            this.closeRightGame();
                            this.isCanEnterNextLevel();
                        }
                    }
                },this)
                this.roundNum = true;
                let num1 = null ;
                let num2 = null ;
                if(customEventData < 6){
                    num1 = 0;
                    num2 = customEventData;
                }else if(customEventData >= 6 && customEventData <= 11 ){
                    num1 = 1;
                    num2 = customEventData - 6;
                }else if(customEventData > 11){
                    num1 = 2;
                    num2 = customEventData - 12;
                }
                let index = cc.vv.gameArr[num1][num2];
                this.replacePic(event.target,index);
                this.secondIndex = index;
                event.target.runAction(
                    cc.sequence(
                        cc.rotateTo(1, 180, 0),
                        cc.delayTime(1),
                        callFunc
                    )
                )
            }
        }  
    },
    // 替换图片
    replacePic(node, index) {
        let sprite = node.getComponent(cc.Sprite);
        cc.loader.loadRes("layer5/" + index, cc.SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
        });
    },
    // 还原图片
    restorePic(node1,node2){
        let sprite = node1.getComponent(cc.Sprite);
        let sprite2 = node2.getComponent(cc.Sprite)
        cc.loader.loadRes("layer5/stop", cc.SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
            sprite2.spriteFrame = spriteFrame;
        });
    },
    // 黑色的图标复原
    replaceBlackPic(node){
        let sprite = node.getComponent(cc.Sprite);
        cc.loader.loadRes("layer5/stop", cc.SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
        });
    },

    // 判断是否2次点击的图片相同
    // 判断是否是同一张图片
    isSamePic(){
        if(this.firstIndex == this.secondIndex){
            return true
        }else{
            return false;
        }
    },
    // 判断宝石游戏成功
    isVictory(){
        let bool = true;
        let  arr = [];
        let  arr2 = [];
        let parentNode = this.bg3.getChildByName("leftgame").children
        for (let i = 0; i < parentNode.length; i++) {
            let name = parentNode[i].name
            if(name == "greencheck"){
                arr.push(parentNode[i])
            }else if(name == "pinkcheck"){
                arr2.push(parentNode[i])
            }
        }
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
            let name = null;
            console.log(arr[i].name)
            if(arr[i].children.length == 0){
                bool = false;
                return bool
            }
            name =arr[i].children[0].name;
            if(name != "greengem"){
                bool = false;
                return bool
            }
        }
        for (let i = 0; i < arr2.length; i++) {
            let name = null
            if(arr2[i].children.length == 0){
                bool = false;
                return bool
            }
            name = arr2[i].children[0].name;
            if(name != "redgem"){
                bool = false;
                return bool
            }
        }
        return bool;
    }
});
