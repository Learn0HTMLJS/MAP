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

function ModelMove(vect)
{
  SelectedModel.position = vect;
}

function ModelMoveEnd()
{
  SelectedModel = null;
  ModelMooving = false;
}