const Cargo = require("../models/cargoModel");

exports.createCargo = async (req, res) => {
  try {
    const newCargo = await Cargo.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        cargo: newCargo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail!",
      message: err,
      details: err.message,
    });
  }
};

exports.getAllCargos = async (req, res) => {
  try {
    const cargos = await Cargo.find();

    res.status(200).json({
      status: "success",
      results: cargos.length,
      data: {
        cargos,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.getCargoById = async (req, res) => {
  try {
    const cargo = await Cargo.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        cargo,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.updateCargo = async (req, res) => {
  try {
    const cargo = await Cargo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        cargo,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.deleteCargo = async (req, res) => {
  try {
    const cargo = await Cargo.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};

exports.userCargos = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userCargos = await Cargo.find({ cargoHolder: userId });

    res.status(200).json({
      status: "success",
      results: userCargos.length,
      data: {
        userCargos,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
      details: error.message,
    });
  }
};