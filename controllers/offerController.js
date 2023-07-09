const db = require("../config/database");

//Create Offer
function createOffer(offer, callback) {
    const {
        offer_title,
        merchant_id,
        merchant_name,
        merchant_location,
        merchant_latitude,
        merchant_longitude,
        inclusion_tags,
        other_tags,
        offer_description,
        rewards_description,
        enabled,
    } = offer;

    const inclusionTagsString = JSON.stringify(inclusion_tags);
    const otherTagsString = JSON.stringify(other_tags);

    db.run(
        `INSERT INTO offer (offer_title , merchant_id, merchant_name, merchant_location, merchant_latitude , merchant_longitude, inclusion_tags, other_tags, offer_description, rewards_description, enabled)
    VALUES (?,?, ?, ?, ?, ?, ?, ? , ? , ? , ? )`,
        [
            offer_title,
            merchant_id,
            merchant_name,
            merchant_location,
            merchant_latitude,
            merchant_longitude,
            inclusionTagsString,
            otherTagsString,
            offer_description,
            rewards_description,
            enabled,
        ],
        function (error) {
            if (error) {
                console.error("Error creating offer:", error);
                callback(false);
            } else {
                console.log("Offer created successfully");
                callback(true, this.lastID);
            }
        }
    );
}

// Get an offer by ID
function getOfferById(offerId, callback) {
    db.get("SELECT * FROM offer WHERE offerid = ?", [offerId], (error, row) => {
        if (error) {
            console.error("Error retrieving offer:", error);
            callback(null);
        } else {
            if (row) {
                const offer = {
                    ...row,
                    inclusion_tags: JSON.parse(row.inclusion_tags),
                    other_tags: JSON.parse(row.other_tags),
                };
                callback(offer);
            } else {
                callback(null);
            }
        }
    });
}

// Get all offers
function getAllOffers(callback) {
    db.all("SELECT * FROM offer", (error, rows) => {
        if (error) {
            console.error("Error retrieving offers:", error);
            callback([]);
        } else {
            const offers = rows.map((row) => {
                return {
                    ...row,
                    inclusion_tags: JSON.parse(row.inclusion_tags),
                    other_tags: JSON.parse(row.other_tags),
                };
            });
            callback(offers);
        }
    });
}

//Update offer by ID
function updateOffer(offerId, updatedOffer, callback) {
    const {
        offer_title,
        merchant_id,
        merchant_name,
        merchant_location,
        inclusion_tags,
        merchant_latitude,
        merchant_longitude,
        other_tags,
        offer_description,
        rewards_description,
        enabled,
    } = updatedOffer;

    const inclusionTagsString = JSON.stringify(inclusion_tags);
    const otherTagsString = JSON.stringify(other_tags);

    db.run(
        `UPDATE offer SET offer_title = ? , merchant_id = ?, merchant_name = ?, merchant_location = ?, merchant_latitude = ? , merchant_longitude = ? , inclusion_tags = ?, other_tags = ?, offer_description = ?, rewards_description = ?, enabled = ?
      WHERE offer_id = ?`,
        [
            offer_title,
            merchant_id,
            merchant_name,
            merchant_location,
            merchant_latitude,
            merchant_longitude,
            inclusionTagsString,
            otherTagsString,
            offer_description,
            rewards_description,
            enabled,
            offerId,
        ],
        function (error) {
            if (error) {
                console.error("Error updating offer:", error);
                callback(false);
            } else {
                console.log("Offer updated successfully");
                callback(true);
            }
        }
    );
}

// Delete an offer by ID
function deleteOfferById(offerId, callback) {
    db.run("DELETE FROM offer WHERE offer_id = ?", [offerId], function (error) {
        if (error) {
            console.error("Error deleting offer:", error);
            callback(false);
        } else {
            console.log("Offer deleted successfully");
            callback(true);
        }
    });
}

module.exports = {
    getOfferById,
    getAllOffers,
    createOffer,
    updateOffer,
    deleteOfferById,
};
