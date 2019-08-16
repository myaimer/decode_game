
cc.Class({
    extends: cc.Component,

    properties: {
        bg1:cc.Node,
        bg2:cc.Node,
        bg3:cc.Node,
    },


    start () {
        window.Game3 = this;
    },
    // onEnable(){

    // },
    // 捡手机
    pickUpPhone(event){
        let phoneNode = event.target;
        let parent = window.gameUI.canUseNode(phoneNode.name);
        let animation1 =  cc.sequence(
            cc.rotateTo(0,0,0),
            cc.scaleTo(1,0.3)
        )    
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
    openCalendar(event){
        cc.vv.controlNode(this.bg1,this.bg2);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    closeCalendar(event){
        cc.vv.controlNode(this.bg2,this.bg1);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    openWallpic(event){
        cc.vv.controlNode(this.bg1,this.bg3);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    closeWallpic(event){
        cc.vv.controlNode(this.bg3,this.bg1);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    // 打开提示框
    openHint(){
        this.bg3.getChildByName("hint").active = true;
    }
});
