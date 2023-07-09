const db = require("../config/database");

//Create merchant
function createMerchant(merchant, callback) {
    const {
        merchant_id,
        merchant_location,
        merchant_name,
        accessibility_features,
        merchant_description,
        tags,
        merchant_latitude,
        merchant_longitude,
    } = merchant;

    let accessibility_features_string = JSON.stringify(accessibility_features);
    let tags_string = JSON.stringify(tags);

    db.run(
        `INSERT INTO merchant (merchant_id, merchant_location , merchant_latitude, merchant_longitude, merchant_name, accessibility_features, merchant_description, tags)
      VALUES (?, ?, ?, ?, ?, ? , ? , ?)`,
        [
            merchant_id,
            merchant_location,
            merchant_latitude,
            merchant_longitude,
            merchant_name,
            accessibility_features_string,
            merchant_description,
            tags_string,
        ],
        function (error) {
            if (error) {
                console.error("Error creating merchant:", error);
                callback(false);
            } else {
                console.log("Merchant created successfully");
                callback(true, this.lastID);
            }
        }
    );
}

// Get a merchant by ID
function getMerchantById(merchantId, callback) {
    db.get(
        "SELECT * FROM merchant WHERE merchantid = ?",
        [merchantId],
        (error, row) => {
            if (error) {
                console.error("Error retrieving merchant:", error);
                callback(null);
            } else {
                if (row) {
                    const merchant = {
                        ...row,
                        accessibility_features: JSON.parse(
                            row.accessibility_features
                        ),
                    };
                    callback(merchant);
                } else {
                    callback(null);
                }
            }
        }
    );
}

// Get all merchants
function getAllMerchants(callback) {
    db.all("SELECT * FROM merchant", (error, rows) => {
        if (error) {
            console.error("Error retrieving merchants:", error);
            callback([]);
        } else {
            const merchants = rows.map((row) => {
                return {
                    ...row,
                    tags: JSON.parse(row.tags),
                    accessibility_features: JSON.parse(
                        row.accessibility_features
                    ),
                };
            });
            callback(merchants);
        }
    });
}

// Update a merchant by ID
function updateMerchant(merchantId, updatedMerchant, callback) {
    const {
        merchant_location,
        merchant_name,
        accessibility_features,
        merchant_description,
        tags,
    } = updatedMerchant;

    const accessibility_features_string = JSON.stringify(
        accessibility_features
    );
    const tags_string = JSON.stringify(tags);

    db.run(
        `UPDATE merchant SET merchant_location = ?,merchant_name = ?, merchant_latitude = ? , merchant_longitude = ? , accessibility_features = ?, merchant_description = ?, tags = ?
      WHERE merchant_id = ?`,
        [
            merchant_location,
            merchant_name,
            accessibility_features_string,
            merchant_description,
            tags_string,
            merchantId,
        ],
        function (error) {
            if (error) {
                console.error("Error updating merchant:", error);
                callback(false);
            } else {
                console.log("Merchant updated successfully");
                callback(true);
            }
        }
    );
}

// Delete a merchant by ID
function deleteMerchantById(merchantId, callback) {
    db.run(
        "DELETE FROM merchant WHERE merchant_id = ?",
        [merchantId],
        function (error) {
            if (error) {
                console.error("Error deleting merchant:", error);
                callback(false);
            } else {
                console.log("Merchant deleted successfully");
                callback(true);
            }
        }
    );
}

module.exports = {
    getMerchantById,
    getAllMerchants,
    createMerchant,
    updateMerchant,
    deleteMerchantById,
};
