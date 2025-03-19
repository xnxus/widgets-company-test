import React, { useState } from "react";
import {
  Mosaic,
  MosaicWindow,
  MosaicNode,
  getLeaves,
  updateTree,
  createBalancedTreeFromLeaves,
  MosaicBranch,
  Corner,
  getPathToCorner,
  getNodeAtPath,
  MosaicDirection,
  MosaicParent,
  getOtherDirection,
} from "react-mosaic-component";
import dropRight from "lodash/dropRight";
import classNames from "classnames";
import InfoWidget from "./InfoWidget";
import { GoArrowUpRight } from "react-icons/go";
import { MdWindow } from "react-icons/md";

import "react-mosaic-component/react-mosaic-component.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { useCompanies } from "../hooks/useGetCompany";
import { CompanyInfo } from "../types/types";
import WindowTool from "./WindowTool";

export const THEMES = {
  Blueprint: "mosaic-blueprint-theme",
  "Blueprint Dark": classNames("mosaic-blueprint-theme", "bp4-dark"),
  None: "",
};

export type Theme = keyof typeof THEMES;

const Dash: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<MosaicNode<string> | null>({
    direction: "row",
    first: "a",
    second: {
      direction: "column",
      first: "b",
      second: "c",
    },
    splitPercentage: 40,
  });

  const [currentTheme, setCurrentTheme] = useState<Theme>("Blueprint");
  const [idCounter, setIdCounter] = useState(4);
  const [selectedTickers, setSelectedTickers] = useState<{
    [key: string]: string;
  }>({});
  const { companies } = useCompanies();

  const tickers = companies.map((company) => company.ticker);

  const handleTickerChange = (id: string, ticker: string) => {
    setSelectedTickers((prevSelectedTickers) => ({
      ...prevSelectedTickers,
      [id]: ticker,
    }));
  };

  const autoArrange = () => {
    const leaves = getLeaves(currentNode);
    setCurrentNode(createBalancedTreeFromLeaves(leaves));
  };

  const addToTopRight = () => {
    let layoutNode = currentNode;
    const newId = `new_${idCounter}`;
    setIdCounter(idCounter + 1);

    if (layoutNode) {
      try {
        const path = getPathToCorner(
          layoutNode,
          Corner.TOP_RIGHT
        ) as MosaicBranch[];
        const parent = getNodeAtPath(
          layoutNode,
          dropRight(path)
        ) as MosaicParent<string> | null;
        const destination = getNodeAtPath(
          layoutNode,
          path
        ) as MosaicNode<string> | null;

        if (!parent || !destination) {
          console.warn("Invalid path or node:", path);
          return;
        }

        const direction: MosaicDirection = parent
          ? getOtherDirection(parent.direction)
          : "row";
        let first: MosaicNode<string>;
        let second: MosaicNode<string>;

        if (direction === "row") {
          first = destination;
          second = newId;
        } else {
          first = newId;
          second = destination;
        }

        layoutNode = updateTree(layoutNode, [
          {
            path,
            spec: {
              $set: {
                direction,
                first,
                second,
              },
            },
          },
        ]);
      } catch (error) {
        console.error("Failed to add node to top-right:", error);
      }
    } else {
      layoutNode = {
        direction: "row",
        first: newId,
        second: "a",
      };
    }

    setCurrentNode(layoutNode);
  };

  const handleExpand = (targetId: string) => {
    setCurrentNode((prevNode) => {
      if (!prevNode) return prevNode;
      const expandTargetNode = (
        node: MosaicNode<string>
      ): MosaicNode<string> => {
        if (
          typeof node === "object" &&
          (node.first === targetId || node.second === targetId)
        ) {
          return {
            ...node,
            splitPercentage: node.first === targetId ? 80 : 20,
          };
        }
        if (typeof node === "object") {
          return {
            ...node,
            first: expandTargetNode(node.first as MosaicNode<string>),
            second: expandTargetNode(node.second as MosaicNode<string>),
          };
        }

        return node;
      };

      return expandTargetNode(prevNode);
    });
  };

  const handleSplit = (targetId: string) => {
    setCurrentNode((prevNode) => {
      if (!prevNode) return prevNode;
      const swapTargetNode = (node: MosaicNode<string>): MosaicNode<string> => {
        if (
          typeof node === "object" &&
          (node.first === targetId || node.second === targetId)
        ) {
          return {
            ...node,
            first: node.second,
            second: node.first,
          };
        }
        if (typeof node === "object") {
          return {
            ...node,
            first: swapTargetNode(node.first),
            second: swapTargetNode(node.second),
          };
        }

        return node;
      };

      return swapTargetNode(prevNode);
    });
  };

  const removeNode = (
    node: MosaicNode<string> | null,
    targetId: string
  ): MosaicNode<string> | null => {
    if (!node) return null;
    if (typeof node === "string") {
      return node === targetId ? null : node;
    }

    const { direction, first, second } = node;

    const updatedFirst = removeNode(first, targetId);
    const updatedSecond = removeNode(second, targetId);

    if (!updatedFirst) return updatedSecond;

    if (!updatedSecond) return updatedFirst;

    return { direction, first: updatedFirst, second: updatedSecond };
  };

  const handleCloseWindow = (id: string) => {
    setCurrentNode((prevNode) => removeNode(prevNode, id));
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-100">
      <div className="flex flex-col sm:flex-row text-sm sm:text-xs items-baseline justify-between bg-gray-600 p-2 text-white shadow-lg">
        <div className="flex items-center font-bold text-white mb-2 sm:mb-0">
          react-mosaic{" "}
          <span className="text-gray-400 ml-2 text-xs md:text-sm">v6.1.0</span>
        </div>
        <div className="flex flex-row items-center gap-2">
          <label className="mr-0 md:mr-4 text-xs md:text-sm">
            Theme:
            <select
              value={currentTheme}
              onChange={(e) => setCurrentTheme(e.currentTarget.value as Theme)}
              className="ml-2 bg-gray-600 text-white rounded p-1 md:p-2 border-stone-400 border-[1px] text-xs md:text-sm"
            >
              {React.Children.toArray(
                Object.keys(THEMES).map((label) => <option>{label}</option>)
              )}
            </select>
          </label>
          <button
            className="mr-0 md:mr-4 bg-slate-600 px-2 py-1 md:px-3 md:py-2 border-stone-400 border-[1px] rounded text-white flex flex-row gap-2 items-center text-xs md:text-sm"
            onClick={autoArrange}
          >
            <MdWindow fill="grey" className="w-4 h-4 md:w-5 md:h-5" />
            Auto Arrange
          </button>
          <button
            className="bg-slate-600 px-2 py-1 md:px-3 md:py-2 rounded border-stone-400 border-[1px] text-white flex flex-row gap-2 items-center text-xs md:text-sm"
            onClick={addToTopRight}
          >
            <GoArrowUpRight
              title="Add Window to Top Right"
              className="w-4 h-4 md:w-5 md:h-5"
            />
            <span className="hidden md:inline">Add Window to Top Right</span>
          </button>
        </div>
      </div>
      <div className="h-full pb-14">
        <Mosaic<string>
          renderTile={(id, path) => {
            const selectedTicker = selectedTickers[id];
            const company =
              companies.find((comp) => comp.ticker === selectedTicker) ||
              companies[0];
            return (
              <MosaicWindow<string>
                path={path}
                createNode={() => `new_${idCounter}`}
                title={`Window ${id}`}
                renderToolbar={() => (
                  <div>
                    <WindowTool
                      id={id}
                      tickers={tickers}
                      selectedTicker={selectedTickers[id]}
                      onTickerChange={handleTickerChange}
                      onExpand={() => handleExpand(id)}
                      onAdd={addToTopRight}
                      onClose={() => handleCloseWindow(id)}
                      onSplit={() => handleSplit(id)}
                    />
                  </div>
                )}
              >
                <div className="p-1 h-full overflow-auto">
                  <InfoWidget company={company || ({} as CompanyInfo)} />
                </div>
              </MosaicWindow>
            );
          }}
          value={currentNode}
          onChange={(newNode) => setCurrentNode(newNode)}
          className={THEMES[currentTheme]}
        />
      </div>
    </div>
  );
};

export default Dash;
