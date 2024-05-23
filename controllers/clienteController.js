const Cliente = require('../models/Cliente');

//funcion para buscar los clientes que esten enn la base de datos
exports.buscarClientes = async(req, res) =>{
  try {

    const  cliente = await Cliente.find();
    res.json({cliente})

  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error al buscar los clientes');
    
  }
}



//funcion agregar clentes
exports.agregarClientes = async(req, res) => {
    try {
        
        let clientes;
        clientes = new Cliente(req.body)
      await clientes.save();
        res.send(clientes);


    } catch (error) {
      console.log(error)
      res.status(500).json({msg: 'Hubo un error al agregar un cliente'});   
    }
}

//esta funcion es para mostrar un solo cliente
exports.buscarCliente = async(req, res) =>{

  try {
    
    let cliente = await Cliente.findById(req.params.id);
    if (!cliente){
      res.status(404).send({msg:'El cliente no fue encontrado con el ID'});
      return
    }
    res.json(cliente);
  

  } catch (error) {
    console.log(error)
    res.status(500).send('Hubo un error al buscar un cliente');
      }
}

//esta funcion nos sirve para eliminar un cliente
exports.eliminarCliente = async(req, res)=>{
  try {    
      let cliente = await Cliente.findById(req.params.id);
      if(!cliente){
        res.status(404).json({msg:'El cliente no existe'});
        return 
      }
      await Cliente.findOneAndDelete({_id: req.params.id});
      res.json({msg:'El cliente se eliminó correctamente'});
      return 

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al eliminar un cliente'); 
  }
}

//esta funcion nos sirve para actualizar un cliente

exports.actualizarCliente = async(req, res) => {
  try {    
    const {nombres, apellidos, documento, correo, telefono, direccion} = req.body
    let cliente = await Cliente.findById(req.params.id);
    
    if(!cliente){
      res.status(404).json({msg:'El cliente no existe'});
      return
    }else{
      cliente.nombres = nombres;
      cliente.apellidos = apellidos;
      cliente.documento = documento;
      cliente.correo = correo;
      cliente.telefono = telefono;
      cliente.direccion = direccion;

      cliente = await Cliente.findOneAndUpdate({_id: req.params.id}, cliente,{new:true});
      res.json(cliente);
    }   
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error al actualizar el cliente'); 
    return
    
  }
}