/*var canvas = document.getElementById("renderCanvas");
var engine = null;
var scene = null;
var sceneToRender = null;
var assetsManager;*/

async function GetMapFile() {
    let Map;
    await fetch('http://localhost:3000/api/models', {
        method: 'GET'
    })
        .then(response => response.text())
        .then((result) => {
            Map = JSON.parse(result);
            console.log(Map);
            return Map;
        })
        .catch((err) => { console.log(err); return false });
}

function LoadMap(engine, scene, assetsManager) {
    let MapFile;

    fetch('http://localhost:3000/api/models', {
        method: 'GET'
    })
    .then(response => response.text())
    .then((result) => {
        MapFile = JSON.parse(result);
        if (!MapFile)
            return;
        let width = MapFile['SceneWidtch'];
        let height = MapFile['SceneHeight'];
        if (ground)
            ground.dispose();
        ground = new BABYLON.MeshBuilder.CreateGround("ground",
        { width: width, height: height }, scene);
        let array = MapFile['Models'];
        array = JSON.parse(array);
        for (let i = 0; i < array.length; i++) {
            var meshTask = assetsManager.addMeshTask("obj task", "", "../models/", array[i]['ModelName']);
            meshTask.onSuccess = function (task) {
console.log(array[i]);
                task.loadedMeshes[i].position.x = array[i]['Position']['_x'];
                task.loadedMeshes[i].position.y = array[i]['Position']['_y'];
                task.loadedMeshes[i].position.z = array[i]['Position']['_z'];
                task.loadedMeshes[i].rotation = array[i]['Rotation'];
            }
            assetsManager.onFinish = function (tasks) {
                engine.runRenderLoop(function () { scene.render(); });
            }
            assetsManager.load();
        }
    })
    .catch((err) => { console.log(err); return false });
}