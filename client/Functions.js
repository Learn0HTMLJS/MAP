function AddModel(vector)
{
//console.log(ModelLable.files[0]['name']);
  var meshTask = assetsManager.addMeshTask("obj task", "", "../models/", ModelLable.files[0]['name']);
  meshTask.onSuccess = function (task) {
    task.loadedMeshes[countMod].position = vector;
//    task.loadedMeshes[ModelsArray.length - 1].position = vector;
console.log(ModelsArray);

    var t = {
      ModelName: 'Model3.gtlf',
      Number: countMod,
      Position:  vector
    }
    ModelsArray.Push(t);
    
    countMod++;
  }
  assetsManager.onFinish = function (tasks) {
    engine.runRenderLoop(function () { scene.render(); });
  }
  assetsManager.load();
//  BABYLON.SceneLoader.Append("../models/", "Model3.gltf", scene, function(scene){});
}

function AddModelCancel()
{
  ModelAdding = false;
  Add_model_button.style.backgroundColor = 'white';
}

function SelectModel(mesh, vect)
{
  SelectedModel = mesh;
  ModelMooving = true;
  var mat = new BABYLON.StandardMaterial("blue", scene);
  mat.diffuseColor = new BABYLON.Color3.Blue();
  SelectedModel.material = mat;
  CurrentXpos.value = SelectedModel.position.x;
  CurrentYpos.value = SelectedModel.position.z;
  CurrentZpos.value = SelectedModel.position.y;
}

function ModelMove(vect)
{
//  SelectedModel.position = vect;
  SelectedModel.position.x = vect.x;
  SelectedModel.position.z = vect.z;
  CurrentXpos.value = vect.x;
  CurrentYpos.value = vect.z;
  CurrentZpos.value = vect.y;
}

function ModelMoveEnd()
{
  var mat2 = new BABYLON.StandardMaterial("gray", scene);
  mat2.diffuseColor = new BABYLON.Color3.Gray();
  SelectedModel.material = mat2;
  SelectedModel = null;
  ModelMooving = false;
  CurrentXpos.value = 0;
  CurrentYpos.value = 0;
  CurrentZpos.value = 0;
}