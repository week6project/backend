const PostsController = require("../../controllers/posts.controller");
const postsController = new PostsController();
const postsModel = require("../../models/Posts");

const httpMocks = require("node-mocks-http");
const mockInput = require("../data/article1.json");

postsModel.create = jest.fn();

describe("Posts controller Create", () => {
  console.log(mockInput);
  // todo : need mock!
  it("should call postsModel.createPost", () => {
    let req = httpMocks.createRequest();
    let res = httpMocks.createResponse();
    let next = null;

    req.body = mockInput;
    postsController.createPost(req, res, next);

    expect(postsModel.createPost).toBeCalledWith(mockInput);
  });
});

describe("Posts controller Read", () => {
  it("should have a getPosts function", () => {
    expect(typeof postsController.getPosts).toBe("function");
  });
});
