
cc.Class({
    extends: cc.Component,

    properties: {
        bg1: cc.Node,
        bg2: cc.Node,
        bg3: cc.Node,
    },

    onEnable() {
        // this.changePic();
        this.playList = [4, 1, 3, 2];
    },
    // 捡水瓶
    pickUpBottle(event) {
        let bottleNode = event.target;
        let parent = window.gameUI.canUseNode(bottleNode.name);
        let animation1 = cc.scaleTo(1, 0.2);
        bottleNode.runAction(
            cc.sequence(
                cc.scaleTo(1, 0),
                cc.callFunc(() => {
                    bottleNode.parent = parent;
                    cc.vv.changeString(parent);
                    bottleNode.setPosition(cc.v2(0, 0));
                    bottleNode.runAction(
                        animation1
                    )
                    bottleNode.removeComponent(cc.Button);
                }, this)
            )
        )
    },
    // 打開桌子的界面
    openDesk() {
        cc.vv.controlNode(this.bg1, this.bg2);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    // 关闭桌子的界面
    closeDesk() {
        cc.vv.controlNode(this.bg2, this.bg1);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    // 移开障碍物
    moveBarrier(event) {
        event.target.runAction(
            cc.moveBy(0.5, -200, 0)
        )
    },
    // 打开箱子
    openBox() {
        cc.vv.controlNode(this.bg1, this.bg3);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    // 关闭箱子
    closeBox() {
        cc.vv.controlNode(this.bg3, this.bg1);
        cc.vv.closeChangeLayer(this.bg1.active);
    },
    changeColor(event, customEventData) {
        let num = Number(customEventData);
        let index = cc.vv.colorList[num];
        let color = new cc.Color(index[0], index[1], index[2], index[3]);
        event.target.color = color;
        num += 1;
        if (num >= cc.vv.colorList.length) {
            num = 0;
        }
        event.target.getComponent(cc.Button).clickEvents[0].customEventData = num;
        this.playList[event.target.name] = num;
        console.log(this.playList)
        if (this.canOpenBox()) {
            this.changePic();
            this.bg3.getChildByName("biao").active = true;
        }
    },
    canOpenBox() {
        let num = 0;
        for (let i = 0; i < this.playList.length; i++) {
            if (this.playList[i] == (i + 1)) {
                num++
            }
        }
        if (num == this.playList.length) {
            return true;
        } else {
            return false;
        }
    },
    // 改变箱子的图片
    changePic() {
        let sprite = this.bg1.getChildByName("box").getComponent(cc.Sprite);
        let sprite2 = this.bg3.getChildByName("box").getComponent(cc.Sprite)
        cc.loader.loadRes("layer2/box2", cc.SpriteFrame, (err, spriteFrame) => {
            sprite.spriteFrame = spriteFrame;
            sprite2.spriteFrame = spriteFrame;
        });
        // 去除箱子上的颜色
        let child = this.bg1.getChildByName("box").children;
        let child2 = this.bg3.getChildByName("box").children;
        for (let i = 0; i < child.length; i++) {
            child[i].destroy();
            child2[i].destroy();
        }
    },
    // 捡起箱子里面的图片
    packUpPic(event){
        let picNode = event.target;
        let parent = window.gameUI.canUseNode(picNode.name);
        picNode.parent = parent;
        cc.vv.changeString(parent);
        picNode.setPosition(cc.v2(0, 0));
        picNode.removeComponent(cc.Button);    
    }
    // update (dt) {},
});
