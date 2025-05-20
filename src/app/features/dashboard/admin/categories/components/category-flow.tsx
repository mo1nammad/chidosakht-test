"use client";

import React, { useEffect } from "react";

import { generateFlow } from "../lib/generate-flow";
import { getFlowLayout } from "../lib/layout-flow";
import { useCategories } from "../api/use-categories";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import flowCategoryNode from "./flow-category-node";

export default function CategoryFlow() {
  const { data } = useCategories();
  const [nodes, setNodes, onNodesChange] = useNodesState<
    Node<{ label: string }>
  >([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  useEffect(() => {
    if (data) {
      const flowResult = generateFlow(data.allCategories);
      const { edges: layoutedEdges, nodes: layoutedNodes } = getFlowLayout(
        flowResult.nodes,
        flowResult.edges,
        "TB"
      );
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, [data, setEdges, setNodes]);

  const nodeTypes = {
    category: flowCategoryNode,
  };

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
