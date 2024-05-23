const Proveedor = require('../models/Proveedor');

//funcion para buscar los proveedores que esten en la base de datos
exports.buscarProveedor = async(req, res) =>{
  try {

    const  proveedor = await Proveedor.find();
    res.json(proveedor);

  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error al buscar el proveedor');
    
  }
}



//funcion agregar proveedores
exports.agregarProveedor = async(req, res) => {
    try {
        
        let proveedor;
        proveedor = new Proveedor(req.body)
        await proveedor.save();
        res.send(proveedor);


    } catch (error) {
      console.log(error)
      res.status(500).send('Hubo un error al agregar un proveedor');   
    }
}

//esta funcion es para mostrar un solo proveedor
exports.buscarProveedor = async(req, res) =>{

  try {
    
    let proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor){
      res.status(404).send({msg:'El proveedor no fue encontrado con el ID'});
      return
    }
    res.json(proveedor);
  

  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error al buscar un proveedor');
      }
}

//esta funcion nos sirve para eliminar un proveedor
exports.eliminarProveedor = async(req, res)=>{
  try {    
      let proveedor = await Proveedor.findById(req.params.id);
      if(!proveedor){
        res.status(404).json({msg:'El proveedor no existe'});
        return 
      }
      await Proveedor.findOneAndDelete({_id: req.params.id});
      res.json({msg:'El proveedor se eliminó correctamente'});
      return 

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar el proveedor'); 
  }
}

//esta funcion nos sirve para actualizar un proveedor

exports.actualizarProveedor = async(req, res) => {
  try {    
    const {empresa, nit, correo, telefono, direccion} = req.body
    let proveedor = await Proveedor.findById(req.params.id);
    
    if(!proveedor){
      res.status(404).json({msg:'El proveedor no existe'});
      return
    }else{
      proveedor.empresa = empresa;
      proveedor.nit = nit;
      proveedor.correo = correo;
      proveedor.telefono = telefono;
      proveedor.direccion = direccion;

      proveedor = await Proveedor.findOneAndUpdate({_id: req.params.id}, proveedor,{new:true});
      res.json(proveedor);
    }   
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el proveedor'); 
    return
    
  }
}