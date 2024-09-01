class AppController {
    static getStatus(req, res) {
        res.status(200).json({ 
            "redis": true,
            "db": true
         });
    }

    static getStats(req, res) {
        const stats = {
            users: 12,
            files: 1231
        };
        res.status(200).json(stats);
    }
}

export default AppController;
