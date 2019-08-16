
cc.Class({
    extends: cc.Component,

    properties: {
        bg1:cc.Node,
        bg2:cc.Node,
        bg3:cc.Node,
    },
    openDesk(){
        cc.vv.controlNode(this.bg1,this.bg2);
        cc.vv.closeChangeLayer(this.bg1.active)
    },
    closeDesk(){
        cc.vv.controlNode(this.bg2,this.bg1);
        cc.vv.closeChangeLayer(this.bg1.active);
        
    },
    openCabinet(){
        cc.vv.controlNode(this.bg1,this.bg3);
        cc.vv.closeChangeLayer(this.bg1.active)        
    },
    closeCabinet(){
        cc.vv.controlNode(this.bg3,this.bg1);
        cc.vv.closeChangeLayer(this.bg1.active)
    },

    // update (dt) {},
});
