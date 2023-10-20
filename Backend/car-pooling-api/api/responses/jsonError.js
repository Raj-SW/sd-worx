module.exports = function jsonError(errorArray) {
    this.res.status(500);

    this.res.json({
        success: false,
        error: errorArray
    });
}