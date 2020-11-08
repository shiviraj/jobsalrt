const request = require('supertest');
const { assert } = require('chai');
const app = require('../src/app');

const { setupPosts, cleanupPosts } = require('./fixture/postDB');

describe('Test Post Route', () => {
  beforeEach(setupPosts);
  afterEach(cleanupPosts);

  describe('Recent Posts', () => {
    it('Should give all recent posts', async () => {
      const { body } = await request(app).get('/api/recentPosts').expect(200);
      assert.equal(body.added.length, 2);
      assert.equal(body.modified.length, 2);
    });
  });

  describe('All Jobs', () => {
    it('Should give all jobs', async () => {
      const { body } = await request(app).get('/api/allJobs').expect(200);
      assert.equal(body.length, 2);
    });
  });

  describe('Latest Jobs', () => {
    it('Should give all latest jobs', async () => {
      const { body } = await request(app).get('/api/latestJobs').expect(200);
      assert.equal(body.length, 2);
    });
  });

  describe('Admit Cards', () => {
    it('Should give list of Admit cards jobs', async () => {
      const { body } = await request(app).get('/api/admitCard').expect(200);
      assert.equal(body.length, 0);
    });
  });

  describe('Results', () => {
    it('Should give list of Results jobs', async () => {
      const { body } = await request(app).get('/api/results').expect(200);
      assert.equal(body.length, 0);
    });
  });

  describe('Answer Key', () => {
    it('Should give list of Answer Key jobs', async () => {
      const { body } = await request(app).get('/api/answerKey').expect(200);
      assert.equal(body.length, 0);
    });
  });

  describe('Syllabus', () => {
    it('Should give list of Syllabus jobs', async () => {
      const { body } = await request(app).get('/api/syllabus').expect(200);
      assert.equal(body.length, 0);
    });
  });

  describe('Admission', () => {
    it('Should give list of Admission jobs', async () => {
      const { body } = await request(app).get('/api/admission').expect(200);
      assert.equal(body.length, 0);
    });
  });

  describe('Get Post By Id', () => {
    it('Should give post of given id', async () => {
      await request(app).get(`/api/post/post-one`).expect(200);
    });

    it('Should give 500 errorfor invalid post id', async () => {
      await request(app).get('/api/post/invalid').expect(500);
    });
  });

  describe('Get List', () => {
    it('Should serve the list of all locations', async () => {
      const { body } = await request(app)
        .post('/api/getList')
        .send({ name: 'location' })
        .expect(200);
      assert.equal(body.length, 2);
    });

    it('Should serve the list of all company', async () => {
      const { body } = await request(app)
        .post('/api/getList')
        .send({ name: 'company' })
        .expect(200);
      assert.equal(body.length, 1);
    });

    it('Should serve the list of all qualifications', async () => {
      const { body } = await request(app)
        .post('/api/getList')
        .send({ name: 'qualification' })
        .expect(200);
      assert.equal(body.length, 4);
    });
  });

  describe('Post By', () => {
    it('Should serve the post by location name', async () => {
      const { body } = await request(app)
        .post('/api/postsBy')
        .send({ name: 'location', jobsBy: 'uttar-pradesh' })
        .expect(200);
      assert.equal(body.length, 1);
    });

    it('Should serve the by company name', async () => {
      const { body } = await request(app)
        .post('/api/postsBy')
        .send({ name: 'company', jobsBy: 'UCO-Bank' })
        .expect(200);
      assert.equal(body.length, 2);
    });

    it('Should serve the post by qualification name', async () => {
      const { body } = await request(app)
        .post('/api/postsBy')
        .send({ name: 'qualification', jobsBy: 'Post-Graduate' })
        .expect(200);
      assert.equal(body.length, 2);
    });

    it('Should serve the post by qualification without value', async () => {
      const { body } = await request(app)
        .post('/api/postsBy')
        .send({ name: 'qualification' })
        .expect(200);
      assert.equal(body.length, 2);
    });
  });

  describe('Search', () => {
    it('Should search the post according to post title', async () => {
      const { body } = await request(app)
        .post('/api/search')
        .send({ value: 'post one' })
        .expect(200);
      assert.equal(body.length, 1);
    });

    it('Should search the post according to location name', async () => {
      const { body } = await request(app)
        .post('/api/search')
        .send({ value: 'uttar' })
        .expect(200);
      assert.equal(body.length, 1);
    });

    it('Should search the post according to company name', async () => {
      const { body } = await request(app)
        .post('/api/search')
        .send({ value: 'uco bank' })
        .expect(200);
      assert.equal(body.length, 2);
    });

    it('Should search the post according to qualification name', async () => {
      const { body } = await request(app)
        .post('/api/search')
        .send({ value: '12th' })
        .expect(200);
      assert.equal(body.length, 1);
    });
  });

  describe('Save Feedback', () => {
    it('Should save the customers feedbacks', async () => {
      await request(app)
        .post('/api/shareFeedback')
        .send({
          title: 'contact-us',
          name: 'shiviraj',
          email: 'example@gmail.com',
          message: 'Trial message',
        })
        .expect(200);
    });
  });
});
