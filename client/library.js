//******** Глобальные константы и переменные *********
let GroundWidtch = 0;
let GroundHeight = 0;
let ground;
let ModelAdding = false;
let countMod = 0;
let ModelLable = document.getElementById('Model');

var canvas = document.getElementById("renderCanvas");
var engine = null;
var scene = null;
var sceneToRender = null;
var assetsManager;

class CModels
{
    ModelName;
    Position;
    Number;
};
var ModelsArray = [];
//****************************************************