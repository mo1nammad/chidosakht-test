"use client";

import React, { use, useEffect, useMemo } from "react";

import { generateFlow } from "../lib/generate-flow";
import { getFlowLayout } from "../lib/layout-flow";

import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import flowCategoryNode from "./flow-category-node";
import { CategoryContext } from "./category-context";

export default function CategoryFlow() {
  const { categories, edgesApi, nodesApi } = use(CategoryContext);
  const [nodes, setNodes, onNodesChange] = nodesApi;
  const [edges, setEdges, onEdgesChange] = edgesApi;

  useEffect(() => {
    if (categories) {
      const flowResult = generateFlow(categories.allCategories);
      const { edges: layoutedEdges, nodes: layoutedNodes } = getFlowLayout(
        flowResult.nodes,
        flowResult.edges,
        "LR"
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, [categories, setEdges, setNodes]);

  const nodeTypes = useMemo(
    () => ({
      category: flowCategoryNode,
    }),
    []
  );
  return (
    <div className="w-full h-100 bg-background border rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
        zoomOnDoubleClick
        maxZoom={1.5}
      >
        <Background />
        <Controls />
        <MiniMap
          nodeStrokeWidth={3}
          nodeStrokeColor={"#4f39f6"}
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
}
