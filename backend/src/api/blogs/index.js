import express from 'express';
import { celebrate } from 'celebrate';
import blogController from './blog.controller';
import AuthService from '../../middlewares/auth';
import {
  createValidationSchema,
  updateValidationSchema,
  customPaginateValidateSchema,
} from './blog.validation';

const router = express.Router();
/**
 * @swagger
 *
 * definitions:
 *   Blog:
 *     type: object
 *     required:
 *       - title
 *       - author
 *       - content
 *     properties:
 *       title:
 *         type: string
 *       author:
 *         type: string
 *       content:
 *         type: string
 *       categories:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             slug:
 *               type: string
 *
 *   ArrayOfBlogs:
 *      type: array
 *      items:
 *        $ref: '#/definitions/Blog'
 */

/**
 * @swagger
 *
 * /blogs:
 *   post:
 *     tags: [blogs]
 *     description: create a blog
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/Blog'
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/Blog'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */

router.post(
  '/',
  [AuthService.required, celebrate({ body: createValidationSchema })],
  blogController.create
);

/**
 * @swagger
 *
 * /blogs:
 *   put:
 *     tags: [blogs]
 *     description: create a blog
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         in: body
 *         required: true
 *         schema:
 *          $ref: '#/definitions/Blog'
 *
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/Blog'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */

router.put(
  '/:id',
  [AuthService.required],
  celebrate({ body: updateValidationSchema }),
  blogController.update
);

/**
 * @swagger
 *
 * /blogs:
 *   get:
 *     tags: [blogs]
 *     description: get all blogs
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/pageParam'
 *       - $ref: '#/parameters/limitParam'
 *     responses:
 *        200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *              page:
 *                type: integer
 *                format: int32
 *              pages:
 *                type: integer
 *                format: int32
 *              limit:
 *                type: integer
 *                format: int32
 *              total:
 *                type: integer
 *                format: int32
 *              data:
 *                $ref: '#/definitions/ArrayOfBlogs'
 *        401:
 *          $ref: '#/responses/Unauthorized'
 */
router.get(
  '/',
  AuthService.optional,
  celebrate({ query: customPaginateValidateSchema }),
  blogController.findAll
);

/**
 * @swagger
 *
 * /blogs/{id}:
 *   get:
 *     tags: [blogs]
 *     description: get detail blog
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: blog id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/Blog'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */
router.get('/:id', blogController.findOne);

/**
 * @swagger
 *
 * /blogs/{id}:
 *   delete:
 *     tags: [blogs]
 *     description: delete a blog
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: blogs id
 *         required: true
 *         type: string
 *     responses:
 *      200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/Blog'
 *      400:
 *        $ref: '#/responses/Error'
 *      401:
 *        $ref: '#/responses/Unauthorized'
 */
router.delete('/:id', AuthService.required, blogController.remove);


export default router;
