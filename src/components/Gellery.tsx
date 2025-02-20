"use client";

import React from "react";

const Gallery = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-gray-600 mb-2">Share your setup with</p>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
          Photos
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 md:gap-4">
        <div className="col-span-2 md:col-span-4 lg:col-span-6">
          <div className="relative overflow-hidden rounded-2xl group aspect-[16/10]">
            <img
              src="/aa.jpg"
              alt="Modern workspace"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 max-md:hidden">
          <div className="relative overflow-hidden rounded-2xl group aspect-[3/4]">
            <img
              src="/aaaaa.jpg"
              alt="Minimalist furniture"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="col-span-2 md:col-span-2 lg:col-span-3 max-md:hidden">
          <div className="relative aspect-square overflow-hidden rounded-2xl group">
            <img
              src="/aa.jpg"
              alt="Living room setup"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="col-span-2 md:col-span-3 lg:col-span-4">
          <div className="relative overflow-hidden rounded-2xl group aspect-[16/9]">
            <img
              src="/aa.jpg"
              alt="Kitchen design"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 lg:col-span-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl group">
            <img
              src="/aaaa.jpg"
              alt="Bedroom interior"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="col-span-2 md:col-span-6 lg:col-span-8">
          <div className="relative overflow-hidden rounded-2xl group aspect-[16/9]">
            <img
              src="/aa.jpg"
              alt="Office setup"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
