const express = require("express");
const router = express.Router();
const merchantController = require("../controllers/merchantController");

// GET /merchants
router.get("/", (req, res) => {
  merchantController.getAllMerchants((merchants) => {
    res.json(merchants);
  });
});

// GET /merchants/:merchantId
router.get("/:merchantId", (req, res) => {
  const merchantId = req.params.merchantId;
  merchantController.getMerchantById(merchantId, (merchant) => {
    if (merchant) {
      res.json(merchant);
    } else {
      res.status(404).json({ error: 'Merchant not found' });
    }
  });
});

// POST /merchants
router.post("/", (req, res) => {
  merchantController.createMerchant(req.body, (success, merchantId) => {
    if (success) {
      res.status(201).json({ message: 'Merchant created', merchantId });
    } else {
      res.status(500).json({ error: 'Error creating merchant' });
    }
  });
});

// PUT /merchants/:merchantId
router.put("/:merchantId", (req, res) => {
    const merchantId = req.params.merchantId;
    merchantController.updateMerchant(merchantId, req.body, (success) => {
      if (success) {
        res.status(200).json({ message: 'Merchant updated' });
      } else {
        res.status(500).json({ error: 'Error updating merchant' });
      }
    });
  });

  // DELETE /merchants/:merchantId
router.delete("/:merchantId", (req, res) => {
    const merchantId = req.params.merchantId;
    merchantController.deleteMerchantById(merchantId, (success) => {
      if (success) {
        res.status(200).json({ message: 'Merchant deleted' });
      } else {
        res.status(500).json({ error: 'Error deleting merchant' });
      }
    });
  });

module.exports = router;
