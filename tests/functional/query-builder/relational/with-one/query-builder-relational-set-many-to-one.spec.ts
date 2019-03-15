import "reflect-metadata";
import {Post} from "./entity/Post";
import {Category} from "./entity/Category";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "../../../../../test/utils/test-utils";
import {Connection} from "../../../../../src";

describe("query builder > relational query builder > set operation > many to one relation", () => {

    let connections: Connection[];
    beforeAll(async () => connections = await createTestingConnections({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    afterAll(() => closeTestingConnections(connections));

    test("should set entity relation of a given entity by entity objects", () => Promise.all(connections.map(async connection => {

        const category1 = new Category();
        category1.name = "category #1";
        await connection.manager.save(category1);

        const category2 = new Category();
        category2.name = "category #2";
        await connection.manager.save(category2);

        const category3 = new Category();
        category3.name = "category #3";
        await connection.manager.save(category3);

        const post1 = new Post();
        post1.title = "post #1";
        await connection.manager.save(post1);

        const post2 = new Post();
        post2.title = "post #2";
        await connection.manager.save(post2);

        const post3 = new Post();
        post3.title = "post #3";
        await connection.manager.save(post3);

        await connection
            .createQueryBuilder()
            .relation(Post, "category")
            .of(post1)
            .set(category1);

        let loadedPost1 = await connection.manager.findOne(Post, 1, { relations: ["category"] });
        expect(loadedPost1!.category).toEqual({ id: 1, name: "category #1" });

        let loadedPost2 = await connection.manager.findOne(Post, 2, { relations: ["category"] });
        expect(loadedPost2!.category).toBeNull();

        let loadedPost3 = await connection.manager.findOne(Post, 3, { relations: ["category"] });
        expect(loadedPost3!.category).toBeNull();

        await connection
            .createQueryBuilder()
            .relation(Post, "category")
            .of(post1)
            .set(null);

        loadedPost1 = await connection.manager.findOne(Post, 1, { relations: ["category"] });
        expect(loadedPost1!.category).toBeNull();

        loadedPost2 = await connection.manager.findOne(Post, 2, { relations: ["category"] });
        expect(loadedPost2!.category).toBeNull();

        loadedPost3 = await connection.manager.findOne(Post, 3, { relations: ["category"] });
        expect(loadedPost3!.category).toBeNull();
    })));

    test("should set entity relation of a given entity by entity id", () => Promise.all(connections.map(async connection => {

        const category1 = new Category();
        category1.name = "category #1";
        await connection.manager.save(category1);

        const category2 = new Category();
        category2.name = "category #2";
        await connection.manager.save(category2);

        const category3 = new Category();
        category3.name = "category #3";
        await connection.manager.save(category3);

        const post1 = new Post();
        post1.title = "post #1";
        await connection.manager.save(post1);

        const post2 = new Post();
        post2.title = "post #2";
        await connection.manager.save(post2);

        const post3 = new Post();
        post3.title = "post #3";
        await connection.manager.save(post3);

        await connection
            .createQueryBuilder()
            .relation(Post, "category")
            .of(2)
            .set(2);

        let loadedPost1 = await connection.manager.findOne(Post, 1, { relations: ["category"] });
        expect(loadedPost1!.category).toBeNull();

        let loadedPost2 = await connection.manager.findOne(Post, 2, { relations: ["category"] });
        expect(loadedPost2!.category).toEqual({ id: 2, name: "category #2" });

        let loadedPost3 = await connection.manager.findOne(Post, 3, { relations: ["category"] });
        expect(loadedPost3!.category).toBeNull();

        await connection
            .createQueryBuilder()
            .relation(Post, "category")
            .of(2)
            .set(null);

        loadedPost1 = await connection.manager.findOne(Post, 1, { relations: ["category"] });
        expect(loadedPost1!.category).toBeNull();

        loadedPost2 = await connection.manager.findOne(Post, 2, { relations: ["category"] });
        expect(loadedPost2!.category).toBeNull();

        loadedPost3 = await connection.manager.findOne(Post, 3, { relations: ["category"] });
        expect(loadedPost3!.category).toBeNull();
    })));

    test("should set entity relation of a given entity by entity id map", () => Promise.all(connections.map(async connection => {

        const category1 = new Category();
        category1.name = "category #1";
        await connection.manager.save(category1);

        const category2 = new Category();
        category2.name = "category #2";
        await connection.manager.save(category2);

        const category3 = new Category();
        category3.name = "category #3";
        await connection.manager.save(category3);

        const post1 = new Post();
        post1.title = "post #1";
        await connection.manager.save(post1);

        const post2 = new Post();
        post2.title = "post #2";
        await connection.manager.save(post2);

        const post3 = new Post();
        post3.title = "post #3";
        await connection.manager.save(post3);

        await connection
            .createQueryBuilder()
            .relation(Post, "category")
            .of({ id: 3 })
            .set({ id: 3 });

        let loadedPost1 = await connection.manager.findOne(Post, 1, { relations: ["category"] });
        expect(loadedPost1!.category).toBeNull();

        let loadedPost2 = await connection.manager.findOne(Post, 2, { relations: ["category"] });
        expect(loadedPost2!.category).toBeNull();

        let loadedPost3 = await connection.manager.findOne(Post, 3, { relations: ["category"] });
        expect(loadedPost3!.category).toEqual({ id: 3, name: "category #3" });

        await connection
            .createQueryBuilder()
            .relation(Post, "category")
            .of({ id: 3 })
            .set(null);

        loadedPost1 = await connection.manager.findOne(Post, 1, { relations: ["category"] });
        expect(loadedPost1!.category).toBeNull();

        loadedPost2 = await connection.manager.findOne(Post, 2, { relations: ["category"] });
        expect(loadedPost2!.category).toBeNull();

        loadedPost3 = await connection.manager.findOne(Post, 3, { relations: ["category"] });
        expect(loadedPost3!.category).toBeNull();
    })));

    test("should set entity relation of a multiple entities", () => Promise.all(connections.map(async connection => {

        const category1 = new Category();
        category1.name = "category #1";
        await connection.manager.save(category1);

        const category2 = new Category();
        category2.name = "category #2";
        await connection.manager.save(category2);

        const category3 = new Category();
        category3.name = "category #3";
        await connection.manager.save(category3);

        const post1 = new Post();
        post1.title = "post #1";
        await connection.manager.save(post1);

        const post2 = new Post();
        post2.title = "post #2";
        await connection.manager.save(post2);

        const post3 = new Post();
        post3.title = "post #3";
        await connection.manager.save(post3);

        await connection
            .createQueryBuilder()
            .relation(Post, "category")
            .of([{ id: 1 }, { id: 3 }])
            .set({ id: 3 });

        let loadedPost1 = await connection.manager.findOne(Post, 1, { relations: ["category"] });
        expect(loadedPost1!.category).toEqual({ id: 3, name: "category #3" });

        let loadedPost2 = await connection.manager.findOne(Post, 2, { relations: ["category"] });
        expect(loadedPost2!.category).toBeNull();

        let loadedPost3 = await connection.manager.findOne(Post, 3, { relations: ["category"] });
        expect(loadedPost3!.category).toEqual({ id: 3, name: "category #3" });

        await connection
            .createQueryBuilder()
            .relation(Post, "category")
            .of([{ id: 1 }, { id: 3 }])
            .set(null);

        loadedPost1 = await connection.manager.findOne(Post, 1, { relations: ["category"] });
        expect(loadedPost1!.category).toBeNull();

        loadedPost2 = await connection.manager.findOne(Post, 2, { relations: ["category"] });
        expect(loadedPost2!.category).toBeNull();

        loadedPost3 = await connection.manager.findOne(Post, 3, { relations: ["category"] });
        expect(loadedPost3!.category).toBeNull();
    })));

});