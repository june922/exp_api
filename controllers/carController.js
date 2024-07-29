import carModel from '../models/carModel.js';
import fs from 'fs';
import slugify from 'slugify';

// Create car controller
export const createCarController = async (req, res) => {
  try {
    const {
      make,
      model,
      slug,
      price,
      year,
      color,
      category,
      engine,
      transmission,
      fuelType,
      cc,
      description,
      mileage
    } = req.fields;
    const { photo } = req.files;
    // Validation
    const requiredFields = {
      make,
      model,
      slug,
      price,
      year,
      color,
      category,
      engine,
      transmission,
      fuelType,
      cc,
      description,
      mileage
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(500).send({ error: `${field} is required` });
      }
      console.log(value)
    }

    if (photo && photo.size > 1000000) {
      return res.status(500).send({ error: 'Photo should be less than 1MB' });
    }

    const car = new carModel({ ...req.fields, slug: slugify(make) });
    if (photo) {
      car.photo.data = fs.readFileSync(photo.path);
      car.photo.contentType = photo.type;
    }
    await car.save();
    res.status(201).send({
      success: true,
      message: 'Car created successfully',
      car,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,     
      error: error.message,
      message: 'Error in creating car',
    });
  }
};

// Get all cars controller
export const getCarController = async (req, res) => {
  try {
    const cars = await carModel
      .find({})
      .populate('category')
      .select('-photo')
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: 'All cars',
      cars,
      countTotal: cars.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting cars',
      error: error.message,
    });
  }
};

// Get single car controller
export const getSingleCarController = async (req, res) => {
  try {
    const car = await carModel
      .findOne({ slug: req.params.slug })
      .select('-photo')
      .populate('category');
    res.status(200).send({
      success: true,
      message: 'Single car fetched',
      car,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting car',
      error: error.message,
    });
  }
};

// Get car photo controller
export const carPhotoController = async (req, res) => {
  try {
    const car = await carModel.findById(req.params.pid).select('photo');
    if (!car) {
      return res.status(404).send({
        success: false,
        message: 'Car not found',
      });
    }

    if (car.photo && car.photo.data) {
      res.set('Content-Type', car.photo.contentType);
      return res.status(200).send(car.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: 'Photo not found',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in getting car photo',
      error: error.message,
    });
  }
};


// Delete car controller
export const deleteCarController = async (req, res) => {
  try {
    await carModel.findByIdAndDelete(req.params.pid).select('-photo');
    res.status(200).send({
      success: true,
      message: 'Car deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Error in deleting car',
      error: error.message,
    });
  }
};

// Update car controller
export const updateCarController = async (req, res) => {
  try {
    const {
      make,
      model,
      price,
      year,
      color,
      category,
      engine,
      transmission,
      fuelType,
      cc,
      description,
      mileage
    } = req.fields;
    const { photo } = req.files;

    // Validation
    const requiredFields = {
      make,
      model,
      price,
      year,
      color,
      category,
      engine,
      transmission,
      fuelType,
      cc,
      description,
      mileage
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        return res.status(500).send({ error: `${field} is required` });
      }
    }

    if (photo && photo.size > 1000000) {
      return res.status(500).send({ error: 'Photo should be less than 1MB' });
    }

    const car = await carModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(make) },
      { new: true }
    );
    if (photo) {
      car.photo.data = fs.readFileSync(photo.path);
      car.photo.contentType = photo.type;
    }
    await car.save();
    res.status(201).send({
      success: true,
      message: 'Car updated successfully',
      car,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: 'Error in updating car',
    });
  }
};

