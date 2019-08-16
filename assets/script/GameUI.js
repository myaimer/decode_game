cc.Class({
    extends: cc.Component,

    properties: {
        concent: cc.Node,
        gameLayer: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.isLock = false;
        window.gameUI = this;
    },
    onClick(event, customEventData) {
        this[customEventData](event)
    },
    // 装备栏上移
    moveUp(event) {
        let height = 5 * (this.concent.getComponent(cc.Layout).spacingY + this.concent.children[0].height);
        if (!this.isLock && this.concent.y < this.concent.height - height) {
            this.isLock = true;
            this.concent.runAction(
                cc.sequence(
                    cc.moveBy(0.5, 0, 108),
                    cc.callFunc(() => { this.isLock = false }, this)
                )
            )
        }
    },
    // 装备栏下移
    moveDown(event) {
        if (!this.isLock && this.concent.y > 0) {
            this.isLock = true;
            this.concent.runAction(
                cc.sequence(
                    cc.moveBy(0.5, 0, -108),
                    cc.callFunc(() => { this.isLock = false }, this)
                )
            )
        }
    },
    nextLayer(event) {
        this.node.getChildByName("lastbutton").active = true;
        this.gameLayer.children[cc.vv.layerNumber].active = false;
        cc.vv.layerNumber += 1;
        this.gameLayer.children[cc.vv.layerNumber].active = true;
        if (cc.vv.layerNumber == this.gameLayer.children.length - 1) {
            event.target.active = false;
        }
    },
    lastLayer(event) {
        this.node.getChildByName("nextbutton").active = true;
        if (cc.vv.layerNumber > 0) {
            this.gameLayer.children[cc.vv.layerNumber].active = false;
            cc.vv.layerNumber -= 1;
            this.gameLayer.children[cc.vv.layerNumber].active = true;
        }
        if (cc.vv.layerNumber == 0) {
            event.target.active = false;
        }
    },
    // 返回一个可以放道具的节点
    canUseNode(name) {
        let arr = this.concent.children;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].children.length > 1) {
                if (arr[i].children[1].name == name) {
                    return arr[i];
                }
            } else {
                return arr[i];
            }
        }
    },
    // 检测放道具
    cauUseProp(event) {
        console.log(event.target)
        if (event.target.children.length > 1) {
            let node = event.target.children[1]
            let name = node.name;
            console.log(name)
            switch (name) {
                case "biao":
                    this.usePicture(node)
                    break;
                case "stop":
                    this.useStopPicture(node);
                    cc.vv.changeStringReduce(event.target)
                    break;
            }
        }
    },
    // 使用拼图图片
    usePicture(node) {
        if (window.Game3.bg3.active) {
            parent = window.Game3.bg3.getChildByName("pic");
            parent.active = true;
            node.parent = parent;
            node.setPosition(cc.v2(0, 0));
        }
    },
    // 使用stop图片
    useStopPicture(node) {
        if (window.Game5.bg2.active) {
            cc.vv.pictureNum++
            if (cc.vv.pictureNum == 1) {
                parent = window.Game5.bg2.getChildByName("rightgame").getChildByName("blackstop1");
                window.Game5.replaceBlackPic(parent)
            } else if (cc.vv.pictureNum == 2) {
                parent = window.Game5.bg2.getChildByName("rightgame").getChildByName("blackstop2");
                window.Game5.replaceBlackPic(parent)
                window.Game5.addButton()();
            }
        }
        node.destroy();
    },
    // update (dt) {},
});
