const HomebrewModel = require('./homebrew.model.js').model;
const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const buildTitleConditions = (inputString) => {
    return [
        {
            $text: {
                $search: inputString,
                $caseSensitive: false,
            },
        },
    ];
};

const handleErrorResponse = (res, error, functionName) => {
    let status;
    let message;

    if (error.response && error.response.status) {
        status = error.response.status;
    } else {
        status = 500;
    }

    if (status === 503) {
        message = 'Service Unavailable';
    } else {
        message = 'Internal Server Error';
    }

    return res.status(status).json({
        errorCode: status.toString(),
        message: `Error in function ${functionName}: ${message}`,
    });
};

const buildBrewsQuery = (legacy, v3) => {
    const brewsQuery = {
        $or: [],
        published: true,
    };

    if (legacy === 'true') {
        brewsQuery.$or.push({ renderer: 'legacy' });
    }

    if (v3 === 'true') {
        brewsQuery.$or.push({ renderer: 'V3' });
    }

    return brewsQuery;
};

const archive = {
    findBrews: async (req, res, next) => {
        try {
            console.log(`Query as received in archive api:`);
            console.table(req.query);

            const title = req.query.title || '';
            const page = Math.max(parseInt(req.query.page) || 1, 1);
            const mincount = 10;
            const count = Math.max(parseInt(req.query.count) || 10, mincount);
            const skip = (page - 1) * count;

            const brewsQuery = buildBrewsQuery(req.query.legacy, req.query.v3);
            const titleConditionsArray = buildTitleConditions(title);

            const titleQuery = {
                $and: [brewsQuery, ...titleConditionsArray],
            };

            const projection = {
                editId: 0,
                googleId: 0,
                text: 0,
                textBin: 0,
            };
            const brews = await HomebrewModel.find(titleQuery, projection)
                .skip(skip)
                .limit(count)
                .maxTimeMS(5000)
                .exec();

            return res.json({ brews, page });

        } catch (error) {
            console.error(error);
            return handleErrorResponse(res, error, 'findBrews');
        }
    },
    findTotal: async (req, res) => {
        try {
            const title = req.query.title || '';

            const brewsQuery = buildBrewsQuery(req.query.legacy, req.query.v3);
            const titleConditionsArray = buildTitleConditions(title);

            const titleQuery = {
                $and: [brewsQuery, ...titleConditionsArray],
            };

            const totalBrews = await HomebrewModel.countDocuments(titleQuery);

            return res.json({ totalBrews });

        } catch (error) {
            console.error(error);
            return handleErrorResponse(res, error, 'findTotal');
        }
    },
};

router.get('/api/archive/total', asyncHandler(archive.findTotal));
router.get('/api/archive', asyncHandler(archive.findBrews));

module.exports = router;
