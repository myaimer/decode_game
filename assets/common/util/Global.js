cc.vv = cc.vv || {};
// 当前所在场景
cc.vv.layerNumber = 0;
// 颜色数组
cc.vv.colorList = [[158, 235, 66, 255], [253, 95, 64, 255], [93, 106, 252, 255], [241, 94, 252, 255], [36, 172, 242, 255]];
// 字符转数组
cc.vv.GAMESTRING = ["V", "J", "N", "H", "P", "F", "I", "L", "E", "S"];
// 第几个图片放进去了
cc.vv.pictureNum = 0;
// 准备替换的图片
cc.vv.gameArr = [[1, 2, 3, 4, 5, 6], [7, 8, 9, 1, 2, 3], [4, 5, 6, 7, 8, 9]];
cc.vv.addButton = function (data) {
    for (let i in data) {
        if (data[i] === null) {
            cc.warn([i] + '不存在');
            return false;
        }
    }
    const transition = cc.Button.Transition.SCALE;
    const duration = 0.1;
    const zoomScale = 1.2;

    var target = data.target;
    var btn = data.btn;
    var component = data.component;
    var handler = data.handler;
    var customEventData = data.customEventData;
    var enableAutoGrayEffect = data.enableAutoGrayEffect;
    var interactable = data.interactable;

    var clickEventHandler = new cc.Component.EventHandler();
    clickEventHandler.target = target;
    clickEventHandler.component = component;
    clickEventHandler.handler = handler;
    clickEventHandler.customEventData = customEventData;
    btn.clickEvents.push(clickEventHandler);

    btn.transition = transition;
    btn.duration = duration;
    btn.zoomScale = zoomScale;
    btn.enableAutoGrayEffect = enableAutoGrayEffect;
    btn.interactable = interactable;
};
//控制节点的开启和关闭
cc.vv.controlNode = function (node1, node2) {
    node1.active = false;
    node2.active = true;
};
cc.vv.closeChangeLayer = function (bool) {
    console.log("关闭了")
    if (cc.vv.layerNumber == window.gameUI.gameLayer.children.length - 1) {
        window.gameUI.node.getChildByName("nextbutton").active = false;
    } else {
        window.gameUI.node.getChildByName("nextbutton").active = bool;
    }
    if (cc.vv.layerNumber == 0) {
        window.gameUI.node.getChildByName("lastbutton").active = false;
    } else {
        window.gameUI.node.getChildByName("lastbutton").active = bool;
    }
}
cc.vv.res = {
    'box1': { url: 'layer2/box1', type: cc.SpriteFrame },
    'box2': { url: 'layer2/box2', type: cc.SpriteFrame },
}
// 背包上的文字
cc.vv.changeString = function (node) {
    let string = node.getChildByName("string")
    if (string.active) {
        let num = Number(string.getComponent(cc.Label).string);
        num += 1
        string.getComponent(cc.Label).string = num;
    } else {
        string.active = true;
    }
}
cc.vv.changeStringReduce = function (node) {
    let string = node.getChildByName("string")
        let num = Number(string.getComponent(cc.Label).string);
        num -= 1
        string.getComponent(cc.Label).string = num;
        if(num == 0){
            string.active = false;
    }
}
cc.Node.prototype.gn = cc.Node.prototype.getChildByName;