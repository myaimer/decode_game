cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onClose(){
        this.node.active = false;
        this.node.parent.gn('instructions_layer').active = true;
    }
    // update (dt) {},
});
