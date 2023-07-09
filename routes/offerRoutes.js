const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");

// GET /offers
router.get("/", (req, res) => {
    offerController.getAllOffers((offers) => {
        res.json(offers);
    });
});

// GET /offers/:offerId
router.get("/:offerId", (req, res) => {
    const offerId = req.params.offerId;
    offerController.getOfferById(offerId, (offer) => {
        if (offer) {
            res.json(offer);
        } else {
            res.status(404).json({ error: "Offer not found" });
        }
    });
});

// POST /offers
router.post("/", (req, res) => {
    offerController.createOffer(req.body, (success, offerId) => {
        if (success) {
            res.status(201).json({ message: "Offer created", offerId });
        } else {
            res.status(500).json({ error: "Error creating offer" });
        }
    });
});

// PUT /offers/:offerId
router.put("/:offerId", (req, res) => {
    const offerId = req.params.offerId;
    console.log(req.body)
    offerController.updateOffer(offerId, req.body, (success) => {
        if (success) {
            res.status(200).json({ message: "Offer updated" });
        } else {
            res.status(500).json({ error: "Error updating offer" });
        }
    });
});

// DELETE /offers/:offerId
router.delete("/:offerId", (req, res) => {
    const offerId = req.params.offerId;
    offerController.deleteOfferById(offerId, (success) => {
        if (success) {
            res.status(200).json({ message: "Offer deleted" });
        } else {
            res.status(500).json({ error: "Error deleting offer" });
        }
    });
});

module.exports = router;
