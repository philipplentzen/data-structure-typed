/**
 * data-structure-typed
 *
 * @author Tyler Zeng
 * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT License
 */
import {arrayRemove} from '../../utils';
import {AbstractEdge, AbstractGraph, AbstractVertex} from './abstract-graph';
import type {VertexId} from '../types';

export class UndirectedVertex<V = number> extends AbstractVertex<V> {
    /**
     * The constructor function initializes a vertex with an optional value.
     * @param {VertexId} id - The `id` parameter is the identifier for the vertex. It is of type `VertexId`, which is
     * typically a unique identifier for each vertex in a graph.
     * @param {V} [val] - The "val" parameter is an optional parameter of type V. It is used to initialize the value of the
     * vertex. If no value is provided, the vertex will be initialized with a default value.
     */
    constructor(id: VertexId, val?: V) {
        super(id, val);
    }

    // _createVertex(id: VertexId, val?: V): UndirectedVertex<V> {
    //     return new UndirectedVertex<V>(id, val);
    // }
}

export class UndirectedEdge<E = number> extends AbstractEdge<E> {
    /**
     * The constructor function initializes an instance of a class with two vertex IDs, an optional weight, and an optional
     * value.
     * @param {VertexId} v1 - The parameter `v1` is of type `VertexId` and represents the first vertex in the edge.
     * @param {VertexId} v2 - The parameter `v2` is a `VertexId`, which represents the identifier of the second vertex in a
     * graph edge.
     * @param {number} [weight] - The weight parameter is an optional number that represents the weight of the edge.
     * @param {E} [val] - The "val" parameter is an optional parameter of type E. It represents the value associated with
     * the edge.
     */
    constructor(v1: VertexId, v2: VertexId, weight?: number, val?: E) {
        super(weight, val);
        this._vertices = [v1, v2];
    }

    private _vertices: [VertexId, VertexId];

    get vertices() {
        return this._vertices;
    }

    set vertices(v: [VertexId, VertexId]) {
        this._vertices = v;
    }

    // _createEdge(src: VertexId, dest: VertexId, weight?: number, val?: E): UndirectedEdge<E> {
    //     if (weight === undefined || weight === null) weight = 1;
    //     return new UndirectedEdge(src, dest, weight, val);
    // }
}

export class UndirectedGraph<V extends UndirectedVertex, E extends UndirectedEdge> extends AbstractGraph<V, E> {
    /**
     * The constructor initializes a new instance of the class with an empty map of edges.
     */
    constructor() {
        super();
        this._edges = new Map<UndirectedVertex<V>, UndirectedEdge<E>[]>();
    }

    protected _edges: Map<UndirectedVertex<V>, UndirectedEdge<E>[]>;

    get edges(): Map<UndirectedVertex<V>, UndirectedEdge<E>[]> {
        return this._edges;
    }

    /**
     * In TypeScript, a subclass inherits the interface implementation of its parent class, without needing to implement the same interface again in the subclass. This behavior differs from Java's approach. In Java, if a parent class implements an interface, the subclass needs to explicitly implement the same interface, even if the parent class has already implemented it.
     * This means that using abstract methods in the parent class cannot constrain the grandchild classes. Defining methods within an interface also cannot constrain the descendant classes. When inheriting from this class, developers need to be aware that this method needs to be overridden.
     * @param id
     * @param val
     */
    _createVertex(id: VertexId, val?: V): UndirectedVertex<V> {
        return new UndirectedVertex<V>(id, val);
    }

    /**
     * In TypeScript, a subclass inherits the interface implementation of its parent class, without needing to implement the same interface again in the subclass. This behavior differs from Java's approach. In Java, if a parent class implements an interface, the subclass needs to explicitly implement the same interface, even if the parent class has already implemented it.
     * This means that using abstract methods in the parent class cannot constrain the grandchild classes. Defining methods within an interface also cannot constrain the descendant classes. When inheriting from this class, developers need to be aware that this method needs to be overridden.
     * @param src
     * @param dest
     * @param weight
     * @param val
     */
    _createEdge(src: VertexId, dest: VertexId, weight?: number, val?: E): UndirectedEdge<E> {
        if (weight === undefined || weight === null) weight = 1;
        return new UndirectedEdge(src, dest, weight, val);
    }

    /**
     * The function `getEdge` returns the first undirected edge that connects two given vertices, or null if no such edge
     * exists.
     * @param {UndirectedVertex<V> | null | VertexId} v1 - The parameter `v1` represents either an `UndirectedVertex<V>`
     * object, `null`, or a `VertexId`. It is used to specify one of the vertices of the edge.
     * @param {UndirectedVertex<V> | null | VertexId} v2 - The parameter `v2` represents either an `UndirectedVertex`
     * object or a `VertexId` (identifier) of an undirected vertex.
     * @returns an instance of `UndirectedEdge<E>` or `null`.
     */
    getEdge(v1: UndirectedVertex<V> | null | VertexId, v2: UndirectedVertex<V> | null | VertexId): UndirectedEdge<E> | null {
        let edges: UndirectedEdge<E>[] | undefined = [];

        if (v1 !== null && v2 !== null) {
            const vertex1: UndirectedVertex<V> | null = this._getVertex(v1);
            const vertex2: UndirectedVertex<V> | null = this._getVertex(v2);

            if (vertex1 && vertex2) {
                edges = this._edges.get(vertex1)?.filter(e => e.vertices.includes(vertex2.id));
            }
        }

        return edges ? edges[0] || null : null;
    }

    /**
     * The function adds an undirected edge to a graph by updating the adjacency list.
     * @param edge - An object representing an undirected edge in a graph. It has a property called "vertices" which is an
     * array of two vertices connected by the edge.
     * @returns a boolean value.
     */
    addEdge(edge: UndirectedEdge<E>): boolean {
        for (const end of edge.vertices) {
            const endVertex = this._getVertex(end);
            if (endVertex === null) return false;
            if (endVertex) {
                const edges = this._edges.get(endVertex);
                if (edges) {
                    edges.push(edge);
                } else {
                    this._edges.set(endVertex, [edge]);
                }
            }
        }
        return true;
    }

    /**
     * The function removes an edge between two vertices in an undirected graph.
     * @param {UndirectedVertex<V> | VertexId} v1 - The parameter `v1` represents either an `UndirectedVertex<V>` object or
     * a `VertexId`. It is used to specify one of the vertices of the edge that needs to be removed.
     * @param {UndirectedVertex<V> | VertexId} v2 - The parameter `v2` represents either an instance of the
     * `UndirectedVertex` class or a `VertexId`. It is used to identify the second vertex of the edge that needs to be
     * removed.
     * @returns The function `removeEdgeBetween` returns an `UndirectedEdge<E>` object if an edge is successfully removed
     * between the two vertices `v1` and `v2`. If either `v1` or `v2` is not found in the graph, or if there is no edge
     * between them, the function returns `null`.
     */
    removeEdgeBetween(v1: UndirectedVertex<V> | VertexId, v2: UndirectedVertex<V> | VertexId): UndirectedEdge<E> | null {

        const vertex1: UndirectedVertex<V> | null = this._getVertex(v1);
        const vertex2: UndirectedVertex<V> | null = this._getVertex(v2);

        if (!vertex1 || !vertex2) {
            return null;
        }

        const v1Edges = this._edges.get(vertex1);
        let removed: UndirectedEdge<E> | null = null;
        if (v1Edges) {
            removed = arrayRemove<UndirectedEdge<E>>(v1Edges, (e: UndirectedEdge<E>) => e.vertices.includes(vertex2.id))[0] || null;
        }
        const v2Edges = this._edges.get(vertex2);
        if (v2Edges) {
            arrayRemove<UndirectedEdge<E>>(v2Edges, (e: UndirectedEdge<E>) => e.vertices.includes(vertex1.id));
        }
        return removed;
    }

    /**
     * The removeEdge function removes an edge between two vertices in an undirected graph.
     * @param edge - An object representing an undirected edge. It has a property called "vertices" which is an array
     * containing the two vertices connected by the edge.
     * @returns The method is returning an UndirectedEdge object or null.
     */
    removeEdge(edge: UndirectedEdge<E>): UndirectedEdge<E> | null {
        return this.removeEdgeBetween(edge.vertices[0], edge.vertices[1]);
    }

    /**
     * The function "degreeOf" returns the degree of a given vertex in an undirected graph.
     * @param {VertexId | UndirectedVertex<V>} vertexOrId - The parameter `vertexOrId` can be either a `VertexId` or an
     * `UndirectedVertex<V>`.
     * @returns the degree of the vertex.
     */
    degreeOf(vertexOrId: VertexId | UndirectedVertex<V>): number {
        const vertex = this._getVertex(vertexOrId);
        if (vertex) {
            return this._edges.get(vertex)?.length || 0;
        } else {
            return 0;
        }
    }

    /**
     * The function "edgesOf" returns an array of undirected edges connected to a given vertex or vertex ID.
     * @param {VertexId | UndirectedVertex<V>} vertexOrId - The parameter `vertexOrId` can be either a `VertexId` or an
     * `UndirectedVertex<V>`.
     * @returns an array of UndirectedEdge objects.
     */
    edgesOf(vertexOrId: VertexId | UndirectedVertex<V>): UndirectedEdge<E>[] {
        const vertex = this._getVertex(vertexOrId);
        if (vertex) {
            return this._edges.get(vertex) || [];
        } else {
            return [];
        }
    }

    /**
     * The function "edgeSet" returns an array of unique undirected edges from a set of edges.
     * @returns The method `edgeSet()` returns an array of `UndirectedEdge<E>` objects.
     */
    edgeSet(): UndirectedEdge<E>[] {
        const edgeSet: Set<UndirectedEdge<E>> = new Set();
        this._edges.forEach(edges => {
            edges.forEach(edge => {
                edgeSet.add(edge);
            });
        });
        return [...edgeSet];
    }

    /**
     * The function "getEdgesOf" returns an array of undirected edges connected to a given vertex or vertex ID.
     * @param {UndirectedVertex<V> | VertexId} vertexOrId - The parameter `vertexOrId` can be either an
     * `UndirectedVertex<V>` object or a `VertexId`.
     * @returns The function `getEdgesOf` returns an array of `UndirectedEdge<E>` objects.
     */
    getEdgesOf(vertexOrId: UndirectedVertex<V> | VertexId): UndirectedEdge<E>[] {
        const vertex = this._getVertex(vertexOrId);
        if (!vertex) {
            return [];
        }
        return this._edges.get(vertex) || [];
    }

    /**
     * The function `getNeighbors` returns an array of neighboring vertices of a given vertex in an undirected graph.
     * @param {UndirectedVertex<V> | VertexId} vertexOrId - The `vertexOrId` parameter can be either an
     * `UndirectedVertex<V>` object or a `VertexId`. It represents the vertex for which we want to find the neighbors.
     * @returns an array of UndirectedVertex objects.
     */
    getNeighbors(vertexOrId: UndirectedVertex<V> | VertexId): UndirectedVertex<V>[] {
        const neighbors: UndirectedVertex<V>[] = [];
        const vertex = this._getVertex(vertexOrId);
        if (vertex) {
            const neighborEdges = this.getEdgesOf(vertex);
            for (const edge of neighborEdges) {
                const neighbor = this._getVertex(edge.vertices.filter(e => e !== vertex.id)[0]);
                if (neighbor) {
                    neighbors.push(neighbor);
                }
            }
        }
        return neighbors;
    }

    /**
     * The function "getEndsOfEdge" returns the two vertices that form the ends of a given undirected edge, or null if the
     * edge does not exist in the graph.
     * @param edge - An object representing an undirected edge in a graph. It has a property called "vertices" which is an
     * array containing two vertices that the edge connects.
     * @returns The function `getEndsOfEdge` returns an array containing the two ends of the given `edge` if the edge
     * exists in the graph. If the edge does not exist, it returns `null`.
     */
    getEndsOfEdge(edge: UndirectedEdge<E>): [UndirectedVertex<V>, UndirectedVertex<V>] | null {
        if (!this.hasEdge(edge.vertices[0], edge.vertices[1])) {
            return null;
        }
        const v1 = this._getVertex(edge.vertices[0]);
        const v2 = this._getVertex(edge.vertices[1]);
        if (v1 && v2) {
            return [v1, v2];
        } else {
            return null;
        }
    }

    protected _setEdges(v: Map<UndirectedVertex<V>, UndirectedEdge<E>[]>) {
        this._edges = v;
    }
}
