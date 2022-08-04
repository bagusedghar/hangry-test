require('dotenv').config();

//models
let { user, task } = require(`${__base}/models`);

let Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
let httpStatus = require('http-status');
let response = require('../../helpers/response');

exports.create = async (req, res) => {
    let data = req.body;

    let { error } = Joi.object().options({ abortEarly: false }).keys({
        name: Joi.string().required(),
        description: Joi.string().optional().allow(null, ""),
        assignee_id: Joi.number().required()
    }).validate(data);

    if (error) {
        return response.JoiValidationError(req, res, error);
    }

    let userExist = await user.findOne({
        where: {
            id: data.assignee_id
        }
    });

    if (!userExist) {
        return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, 'Assignee not found');
    }

    const now = new Date();
    data.status = 'To Do';
    data.creator_id = req.authUser.id;
    data.created_at = now;
    data.updated_at = now;

    try {
        const newTask = await task.create(data);
        return response.responseJSON(req, res, httpStatus.OK, true, 'Add data success', newTask);
    } catch (err) {
        return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, err);
    }
}

exports.getAll = async (req, res) => {
    let query = req.query;

    let { error } = Joi.object().options({ abortEarly: false }).keys({
        assignee_id: Joi.number().optional(),
    }).validate(query);

    if (error) {
        return response.JoiValidationError(req, res, error);
    }

    const options = {
        include: [
            {
                model: user,
                as: "assignee",
                attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
            },
            {
                model: user,
                as: "creator",
                attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
            }
        ],
    }

    if (req.query.assignee_id) options.where = { assignee_id: req.query.assignee_id }

    let data = await task.findAll(options);

    if (data.length > 0) {
        return response.responseJSON(req, res, httpStatus.OK, true, 'Load data success', data);
    } else {
        return response.responseJSON(req, res, httpStatus.OK, true, 'No data found', data);
    }

}

exports.update = async (req, res) => {
    let id = req.params.id;

    let body = req.body;

    let { error } = Joi.object().options({ abortEarly: false }).keys({
        status: Joi.string().required().valid('To Do', 'In Progress', 'Ready For QA', 'QA In Progress', 'Bug Found', 'Done'),
    }).validate(body);

    if (error) {
        return response.JoiValidationError(req, res, error);
    }

    let getData = await task.findOne({
        where: {
            id
        }
    });

    if (!getData) {
        return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, 'No data found');
    }

    if (getData.creator != req.authUser.id){
        return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, 'Permission denied');
    }

    await task.update(
        { status: body.status },
        { where: { id } }
    );

    let data = await task.findOne({
        where: {
            id
        },
        include: [
            {
                model: user,
                as: "assignee",
                attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
            },
            {
                model: user,
                as: "creator",
                attributes: ['id', 'name', 'email', 'created_at', 'updated_at']
            }
        ],
    });

    return response.responseJSON(req, res, httpStatus.OK, true, 'Update data success', data);
}

exports.delete = async (req, res) => {
    let id = req.params.id;

    let getData = await task.findOne({
        where: {
            id
        }
    });

    if (!getData) {
        return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, 'No data found');
    }

    if (getData.creator != req.authUser.id){
        return response.responseJSON(req, res, httpStatus.UNPROCESSABLE_ENTITY, false, 'Permission denied');
    }


    await task.destroy(
        {
            where: { id }
        }
    );

    return response.responseJSON(req, res, httpStatus.OK, true, 'Delete data success', null);
}