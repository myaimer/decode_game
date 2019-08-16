
cc.Class({
    extends: cc.Component,

    properties: {
        logo:cc.Node,
        kNode:cc.Node,
        yNode:cc.Node,
        gameNode:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.logoAnimation();
    },
    logoAnimation(){
        this.logo.runAction(
            cc.sequence(
                cc.rotateBy (1,90,90),
                cc.callFunc(()=>{
                    this.gameAnimation()
                },this)
            )
        )
    },
    kAnimation(){
        this.kNode.runAction(
            cc.moveTo(1,-110,0)
        );
        this.yNode.runAction(
            cc.sequence(
                cc.moveTo(1,110,0),
                cc.callFunc(()=>{
                    cc.director.loadScene("main");
                },this,1)
            )

        ) 
    },
    gameAnimation(){
        this.gameNode.runAction(
            cc.sequence(
                cc.moveTo(1,71,12),
                cc.callFunc(()=>{
                    this.kAnimation();
                },this)
            )

        )
    }

    // update (dt) {},
});
