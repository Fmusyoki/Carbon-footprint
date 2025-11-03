import express from 'express';
import ActionPlan from '../models/ActionPlan.js'; // Use the model you actually have

const router = express.Router();

// Create a new action plan (instead of objective)
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, deadline } = req.body;
    
    const actionPlan = new ActionPlan({
      title,
      description,
      priority,
      deadline
    });

    const savedActionPlan = await actionPlan.save();
    
    res.status(201).json({
      success: true,
      data: savedActionPlan,
      message: 'Action plan created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get all action plans
router.get('/', async (req, res) => {
  try {
    const actionPlans = await ActionPlan.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: actionPlans,
      count: actionPlans.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single action plan
router.get('/:id', async (req, res) => {
  try {
    const actionPlan = await ActionPlan.findById(req.params.id);
    
    if (!actionPlan) {
      return res.status(404).json({
        success: false,
        message: 'Action plan not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: actionPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Update action plan
router.put('/:id', async (req, res) => {
  try {
    const actionPlan = await ActionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!actionPlan) {
      return res.status(404).json({
        success: false,
        message: 'Action plan not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: actionPlan,
      message: 'Action plan updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete action plan
router.delete('/:id', async (req, res) => {
  try {
    const actionPlan = await ActionPlan.findByIdAndDelete(req.params.id);
    
    if (!actionPlan) {
      return res.status(404).json({
        success: false,
        message: 'Action plan not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Action plan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;