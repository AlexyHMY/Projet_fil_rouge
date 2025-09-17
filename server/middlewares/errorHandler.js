export const errorHandler = (error, req, res, next) => {
    console.error("Erreur API:", error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: {
            message: error.message || 'Erreur serveur',
            code: statusCode
        }
    })
};
