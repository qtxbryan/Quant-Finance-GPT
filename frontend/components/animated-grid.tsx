"use client";

import { GridTile } from "@/components/grid-tile";

export function AnimatedGrid() {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <GridTile className="col-span-1" delay={0.1}>
        <div className="aspect-square" />
      </GridTile>
      <GridTile color="purple" className="col-span-1" delay={0.2}>
        <div className="h-full flex flex-col justify-center">
          <p className="text-lg font-medium">
            Total Care.
            <br />
            Total Different.
          </p>
        </div>
      </GridTile>
      <GridTile className="col-span-1" delay={0.3}>
        <div className="aspect-square" />
      </GridTile>
      <GridTile color="purple" className="col-span-1" delay={0.4}>
        <div className="aspect-square flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
          </svg>
        </div>
      </GridTile>
      <GridTile color="yellow" className="col-span-1" delay={0.5}>
        <div className="h-full flex flex-col justify-center">
          <p className="text-lg font-medium">
            Building trust
            <br />
            in blockchain
            <br />
            technology
          </p>
        </div>
      </GridTile>
      <GridTile className="col-span-1" delay={0.6}>
        <div className="aspect-square" />
      </GridTile>
      <GridTile color="yellow" className="col-span-1" delay={0.7}>
        <div className="h-full flex flex-col justify-center">
          <p className="text-lg font-medium">
            Own
            <br />
            your power
          </p>
        </div>
      </GridTile>
      <GridTile className="col-span-1" delay={0.8}>
        <div className="aspect-square" />
      </GridTile>
      <GridTile className="col-span-1" delay={0.9}>
        <div className="aspect-square" />
      </GridTile>
    </div>
  );
}
