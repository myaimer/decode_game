
cc.Class({
    extends: cc.Component,

    properties: {
        bg1:cc.Node,
        bg2:cc.Node,
        bg3:cc.Node,
        bg4:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    openBiHua(event){
        cc.vv.controlNode(this.bg1,this.bg3)
    },
    closeBiHua(event){
        cc.vv.controlNode(this.bg3,this.bg1)
    },
    // 捡手机
    pickUpPhone(event){
        console.log(event.target);
        let phoneNode = event.target;
        let parent = window.gameUI.canUseNode(phoneNode.name);
        let animation1 =  cc.scaleTo(1,0.3);
        phoneNode.runAction(
            cc.sequence(
                cc.scaleTo(1,0),
                cc.callFunc(()=>{
                    phoneNode.parent = parent;
                    cc.vv.changeString(parent);
                    phoneNode.setPosition(cc.v2(0,0));
                    phoneNode.runAction(
                        animation1
                    )
                    phoneNode.removeComponent(cc.Button);
                },this)
            )
        )
    },
    // 打开背包
    openPackage(event){
        cc.vv.controlNode(this.bg1,this.bg2);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    // 关闭背包
    closePackage(event){
        cc.vv.controlNode(this.bg2,this.bg1)
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    // 开始解密
    startDecode(event){
        cc.vv.controlNode(this.bg2,this.bg4)
    },
    // 关闭解密
    closeDecode(event){
        cc.vv.controlNode(this.bg4,this.bg2)
    }
    // update (dt) {},
});
