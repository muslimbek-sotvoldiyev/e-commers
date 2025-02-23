"use client";

import React from "react";
import Image from "next/image";

const Gallery = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-gray-600 mb-2">Share your setup with</p>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
          Photos
        </h2>
      </div>

      <div className="grid grid-cols-12 gap-3 md:gap-4">
        <div className="col-span-6">
          <div className="relative overflow-hidden rounded-2xl group aspect-[16/10]">
            <Image
              src="/bike.jpg"
              alt="Modern workspace"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="col-span-3 row-span-2">
          <div className="relative overflow-hidden rounded-2xl group aspect-[3/4]">
            <Image
              src="/bag.jpg"
              alt="Minimalist furniture"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="col-span-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl group">
            <Image
              src="/smartwatch.jpg"
              alt="Living room setup"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="col-span-4">
          <div className="relative overflow-hidden rounded-2xl group aspect-[16/9]">
            <Image
              src="/heatphone.jpg"
              alt="Kitchen design"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="col-span-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl group">
            <Image
              src="/motobile.jpg"
              alt="Bedroom interior"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="col-span-8">
          <div className="relative overflow-hidden rounded-2xl group aspect-[16/9]">
            <Image
              src="/keta.jpg"
              alt="Office setup"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
