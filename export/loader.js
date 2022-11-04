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

async function LoadMap(engine, scene, assetsManager, ModelsCollection) {
    let MapFile;
    ModelsCollection = [];
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
            var meshTask = assetsManager.addMeshTask("obj task", "", "/models/", array[i]['ModelName']);
            meshTask.onSuccess = function (task) {
              console.log(assetsManager);
                task.loadedMeshes[i].position = array[i]['Position'];
                task.loadedMeshes[i].rotation = new BABYLON.Vector3( 
                    array[i]['Rotation']['_x'],
                    array[i]['Rotation']['_y'],
                    array[i]['Rotation']['_z'],
                );
                var t = {
                    ModelName: array[i]['ModelName'],
                    ModelMesh:  task.loadedMeshes[i]
                }
                ModelsCollection[i] = t;
            }
            assetsManager.onFinish = function (tasks) {
                engine.runRenderLoop(function () { scene.render(); });
            }            
        }
        assetsManager.load();
        console.log(ModelsCollection);
    })
    .catch((err) => { console.log(err); return false });
}