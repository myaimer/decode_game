
cc.Class({
    extends: cc.Component,

    properties: {
        bg1: cc.Node,
        bg2: cc.Node,
        bg3: cc.Node,
    },

    // start () {

    // },
    onEnable() {
        this.playList = [0, 0, 0, 0, 0];
        this.ironBoxList = [7, 9, 9, 5];
        this.playList2 = [0, 0, 0, 0]
    },
    // 捡手机
    pickUpPhone(event) {
        let phoneNode = event.target;
        let parent = window.gameUI.canUseNode(phoneNode.name);
        let animation1 = cc.sequence(
            cc.rotateTo(0, 0, 0),
            cc.scaleTo(1, 0.3)
        )
        phoneNode.runAction(
            cc.sequence(
                cc.scaleTo(1, 0),
                cc.callFunc(() => {
                    cc.vv.changeString(parent)
                    phoneNode.parent = parent;
                    phoneNode.setPosition(cc.v2(0, 0));
                    phoneNode.runAction(
                        animation1
                    )
                    phoneNode.removeComponent(cc.Button);
                }, this)
            )
        )
        this.bg1.getChildByName("phone").destroy();
    },
    openBox() {
        cc.vv.controlNode(this.bg1, this.bg2);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    closeBox() {
        cc.vv.controlNode(this.bg2, this.bg1);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    openIronBox() {
        cc.vv.controlNode(this.bg1, this.bg3);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    closeIronBox() {
        cc.vv.controlNode(this.bg3, this.bg1);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    changeNumber(event, customEventData) {
        let num = Number(customEventData);
        num++;
        if (num > 9) {
            num = 0;
        }
        event.target.getComponent(cc.Label).string = num;
        event.target.getComponent(cc.Button).clickEvents[0].customEventData = num;
        console.log(this.playList2)
        this.playList2[event.target.name] = num;
        if(this.canOpenIronBox()){
            this.changeIronBoxPic();
            this.bg3.getChildByName("stop").active = true;
        }
    },
    // 改变图片上的文字
    changeString(event, customEventData) {
        let num = Number(customEventData);
        num += 1;
        if (num >= cc.vv.GAMESTRING.length) {
            num = 0
        }
        event.target.getComponent(cc.Label).string = cc.vv.GAMESTRING[num];
        event.target.getComponent(cc.Button).clickEvents[0].customEventData = num;
        let name = event.target.name
        this.bg1.getChildByName("box1").getChildByName(name).getComponent(cc.Label).string = cc.vv.GAMESTRING[num];
        this.playList[event.target.name] = num;
        console.log(this.playList);
        if (this.canOpenBox()) {
            this.changePic();
            this.bg2.getChildByName("stop").active = true;
        }

    },
    // 是否可以打开背包
    canOpenBox() {
        let num = 0;
        for (let i = 0; i < this.playList.length; i++) {
            if (this.playList[i] == (i + 5)) {
                num++
            }
        }
        if (num == this.playList.length) {
            return true;
        } else {
            return false;
        }
    },
    // 是否可以打开铁箱
    canOpenIronBox() {
        let num = 0;
        for (let i = 0; i < this.ironBoxList.length; i++) {
            if(this.playList2[i] == this.ironBoxList[i]){
                num++
            }
        }
        if (num == this.playList2.length) {
            return true;
        } else {
            return false;
        }
    },
    // 改变背包的图片
    changePic() {
        let sprite = this.bg1.getChildByName("box1").getComponent(cc.Sprite);
        let sprite2 = this.bg2.getChildByName("box1").getComponent(cc.Sprite)
        cc.loader.loadRes("layer4/box2", cc.SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
            sprite2.spriteFrame = spriteFrame;
        });
        // 去除背包上的字母
        let child = this.bg1.getChildByName("box1").children;
        let child2 = this.bg2.getChildByName("box1").children;
        for (let i = 0; i < child.length; i++) {
            child[i].destroy();
            child2[i].destroy();
        }
    },
    // 改变铁箱上的图片
    changeIronBoxPic(){
        let sprite = this.bg1.getChildByName("ironbox1").getComponent(cc.Sprite);
        let sprite2 = this.bg3.getChildByName("ironbox1").getComponent(cc.Sprite)
        cc.loader.loadRes("layer4/ironbox2 ", cc.SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
            sprite2.spriteFrame = spriteFrame;
        });
        // 去除背包上的字母
        let child = this.bg1.getChildByName("ironbox1").children;
        let child2 = this.bg3.getChildByName("ironbox1").children;
        for (let i = 0; i < child.length; i++) {
            child[i].destroy();
            child2[i].destroy();
        }
    },
    // 捡起shop图片
    pickUpPic(event) {
        let stopNode = event.target;
        let parent = window.gameUI.canUseNode(stopNode.name);
        stopNode.parent = parent;
        cc.vv.changeString(parent);
        stopNode.setPosition(cc.v2(0, 0));
        stopNode.removeComponent(cc.Button);
    }
});
